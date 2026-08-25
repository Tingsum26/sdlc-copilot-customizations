import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import { join, relative } from "node:path";

const argument = (name) => {
  const index = process.argv.indexOf(name);
  return index === -1 ? undefined : process.argv[index + 1];
};
const workspace = argument("--workspace") ?? process.cwd();
const artifactPath = argument("--artifact");
const stageName = argument("--stage");
if (!artifactPath || !stageName) throw new Error("Usage: --stage <STAGE> --artifact <path> [--workspace <path>]");

const sha256 = (value) => createHash("sha256").update(value).digest("hex");
const state = JSON.parse(readFileSync(join(workspace, ".sdlc", "workflow.json"), "utf8"));
const stage = state.stages?.[stageName];
if (!stage) throw new Error(`Unknown stage ${stageName}`);
const artifactAbsolutePath = join(workspace, artifactPath);
if (!existsSync(artifactAbsolutePath)) throw new Error(`Missing output artifact ${artifactPath}`);
const content = readFileSync(artifactAbsolutePath, "utf8");
const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
if (!match) throw new Error(`${artifactPath} requires YAML-style front matter`);
const fields = Object.fromEntries(match[1].split(/\r?\n/).map((line) => {
  const separator = line.indexOf(":");
  return separator === -1 ? [line, ""] : [line.slice(0, separator).trim(), line.slice(separator + 1).trim()];
}));
if (fields.workflowId !== state.workflowId || fields.stage !== stageName || fields.role !== stage.role) {
  throw new Error(`${artifactPath} has a workflowId, stage, or role that does not match workflow.json`);
}
if (!fields.contextReceipt || !fields.contextReceiptSha256) throw new Error(`${artifactPath} lacks Context Receipt references`);
const receiptPath = join(workspace, fields.contextReceipt);
if (!existsSync(receiptPath)) throw new Error(`Missing Context Receipt ${fields.contextReceipt}`);
const receiptRaw = readFileSync(receiptPath);
if (sha256(receiptRaw) !== fields.contextReceiptSha256) throw new Error("Context Receipt hash does not match artifact front matter");
const receipt = JSON.parse(receiptRaw);
if (receipt.workflowId !== state.workflowId || receipt.stage !== stageName || receipt.role !== stage.role) {
  throw new Error("Context Receipt does not belong to this workflow stage and role");
}
const expectedInputs = stage.requiredInputs;
if (JSON.stringify(receipt.inputs.map(({ artifactId }) => artifactId)) !== JSON.stringify(expectedInputs)) {
  throw new Error("Context Receipt has missing, extra, or reordered required inputs");
}
for (const input of receipt.inputs) {
  const declared = state.artifacts[input.artifactId];
  const inputPath = join(workspace, input.path);
  if (!declared || declared.path.replaceAll("\\", "/") !== input.path || !existsSync(inputPath)) {
    throw new Error(`Receipt input ${input.artifactId} no longer matches workflow.json`);
  }
  if (sha256(readFileSync(inputPath)) !== input.sha256) throw new Error(`Receipt is stale: ${input.artifactId} changed after context preparation`);
}
console.log(`Verified ${relative(workspace, artifactAbsolutePath)} against ${relative(workspace, receiptPath)}`);
