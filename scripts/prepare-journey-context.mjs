import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, relative } from "node:path";

const argument = (name) => {
  const index = process.argv.indexOf(name);
  return index === -1 ? undefined : process.argv[index + 1];
};
const workspace = argument("--workspace") ?? process.cwd();
const stageName = argument("--stage");
const role = argument("--role");
if (!stageName || !role) throw new Error("Usage: --stage <STAGE> --role <ROLE> [--workspace <path>]");

const statePath = join(workspace, ".sdlc", "workflow.json");
if (!existsSync(statePath)) throw new Error(`Missing ${relative(workspace, statePath)}`);
const state = JSON.parse(readFileSync(statePath, "utf8"));
const stage = state.stages?.[stageName];
if (!stage) throw new Error(`Unknown stage ${stageName}`);
if (stage.role !== role) throw new Error(`Stage ${stageName} belongs to ${stage.role}, not ${role}`);

const acceptedStatuses = new Set(["APPROVED", "ACCEPTED", "CURRENT", "SKIPPED_WITH_EVIDENCE"]);
const sha256 = (value) => createHash("sha256").update(value).digest("hex");
const inputs = stage.requiredInputs.map((artifactId) => {
  const artifact = state.artifacts?.[artifactId];
  if (!artifact) throw new Error(`Stage ${stageName} requires undeclared artifact ${artifactId}`);
  if (!acceptedStatuses.has(artifact.status)) {
    throw new Error(`Required artifact ${artifactId} is ${artifact.status}; approve it or record SKIPPED_WITH_EVIDENCE first`);
  }
  const inputPath = join(workspace, artifact.path);
  if (!existsSync(inputPath)) throw new Error(`Required artifact file is missing: ${artifact.path}`);
  const content = readFileSync(inputPath);
  return { artifactId, path: artifact.path.replaceAll("\\", "/"), status: artifact.status, sha256: sha256(content) };
});

const receipt = {
  schemaVersion: "github-journey-context-receipt/v1",
  workflowId: state.workflowId,
  journeyId: state.journeyId,
  branch: state.branch,
  stage: stageName,
  role,
  generatedAt: new Date().toISOString(),
  inputs,
};
const receiptPath = join(workspace, ".sdlc", "context-receipts", `${stageName.toLowerCase()}-${role}.json`);
mkdirSync(dirname(receiptPath), { recursive: true });
writeFileSync(receiptPath, `${JSON.stringify(receipt, null, 2)}\n`);
console.log(JSON.stringify({ receipt: relative(workspace, receiptPath).replaceAll("\\", "/"), sha256: sha256(readFileSync(receiptPath)), inputs }, null, 2));
