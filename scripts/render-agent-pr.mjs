import { existsSync, readFileSync } from "node:fs";
import { isAbsolute, join, relative, resolve } from "node:path";

const argument = (name) => {
  const index = process.argv.indexOf(name);
  return index === -1 ? undefined : process.argv[index + 1];
};
const workspace = argument("--workspace") ?? process.cwd();
const requestedStage = argument("--stage");
const format = argument("--format") ?? "body";
const maximumInlineCharacters = Number(argument("--max-inline-chars") ?? "45000");
if (!Number.isSafeInteger(maximumInlineCharacters) || maximumInlineCharacters < 1) {
  throw new Error("--max-inline-chars must be a positive integer");
}

const statePath = join(workspace, ".sdlc", "workflow.json");
if (!existsSync(statePath)) throw new Error("Missing .sdlc/workflow.json");
const state = JSON.parse(readFileSync(statePath, "utf8"));
const stageName = requestedStage ?? state.currentStage;
const stage = state.stages?.[stageName];
if (!stage) throw new Error(`Unknown stage ${stageName}`);
const artifactId = stage.output;
const artifact = state.artifacts?.[artifactId];
if (!artifact?.path) throw new Error(`Stage ${stageName} has no declared output artifact`);

const relativePath = (value) => {
  if (typeof value !== "string" || !value || isAbsolute(value)) throw new Error("Artifact paths must be non-empty and relative");
  const fullPath = resolve(workspace, value);
  const fromWorkspace = relative(resolve(workspace), fullPath);
  if (!fromWorkspace || fromWorkspace.startsWith("..") || isAbsolute(fromWorkspace)) throw new Error("Artifact path escapes Journey workspace");
  return fromWorkspace.replaceAll("\\", "/");
};
const artifactPath = relativePath(artifact.path);
const artifactAbsolute = join(workspace, artifactPath);
if (!existsSync(artifactAbsolute)) throw new Error(`Missing output artifact ${artifactPath}`);
const artifactMarkdown = readFileSync(artifactAbsolute, "utf8");
const frontMatter = artifactMarkdown.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
if (!frontMatter) throw new Error(`${artifactPath} requires YAML-style front matter`);
const metadata = Object.fromEntries(frontMatter[1].split(/\r?\n/).flatMap((line) => {
  const separator = line.indexOf(":");
  return separator === -1 ? [] : [[line.slice(0, separator).trim(), line.slice(separator + 1).trim()]];
}));
if (metadata.workflowId !== state.workflowId || metadata.stage !== stageName || metadata.role !== stage.role) {
  throw new Error("Artifact front matter does not match workflow stage and role");
}
const reportBody = artifactMarkdown.slice(frontMatter[0].length).trim();
const oneLine = (value) => String(value ?? "—").replace(/[\r\n`]/g, " ").trim() || "—";
const code = (value) => `\`${oneLine(value)}\``;
const markdownLink = (path, label = path) => `[${label}](./${path})`;
const reportTitle = reportBody.match(/^#\s+(.+)$/m)?.[1]?.trim() ?? artifactId;
const stageOrder = state.stageOrder ?? [];
const stageIndex = stageOrder.indexOf(stageName);
const nextStage = stageIndex >= 0 ? stageOrder[stageIndex + 1] : undefined;
const nextRole = nextStage ? state.stages?.[nextStage]?.role : undefined;
const status = artifact.status ?? metadata.status ?? "UNKNOWN";
const pr = state.journeyPullRequest ?? {};
const reportIndex = Object.entries(state.artifacts ?? {}).map(([id, item]) => {
  const path = relativePath(item.path);
  return `- ${id === artifactId ? "**Current:** " : ""}${markdownLink(path, code(id))} — ${code(item.status ?? "UNKNOWN")}`;
}).join("\n");
const approvalText = ["APPROVED", "SKIPPED_WITH_EVIDENCE"].includes(status)
  ? "The current output is approved. Ask the Coordinator to advance only through the declared stage order."
  : "Human review is required. Do not advance the workflow until a person records approval or an evidence-backed skip.";
const handoff = nextRole
  ? `After approval, select ${code("delivery-coordinator")} in VS Code Copilot Chat and run ${code(`/resume-workflow ${state.workflowId}`)}. The Coordinator will validate the gate and route ${code(nextRole)} for ${code(nextStage)}.`
  : "After approval, select `delivery-coordinator` in VS Code Copilot Chat and run the resume command to close the workflow.";
const title = `[${oneLine(state.workflowId)}] ${oneLine(stageName)}: ${oneLine(artifactId)}`;

const body = `# ${title}\n\n## Current report\n\n- Report: ${markdownLink(artifactPath, code(reportTitle))}\n- Stage / role: ${code(stageName)} / ${code(stage.role)}\n- Artifact status: ${code(status)}\n- Context Receipt: ${code(metadata.contextReceipt ?? "missing")}\n- Journey branch: ${code(state.branch ?? "missing")}\n- Journey PR: ${pr.url ? `[${code(`#${pr.number ?? "PR"}`)}](${pr.url})` : "to be created"}\n\n## Human decision required\n\n${approvalText}\n\n## Next action\n\n${handoff}\n\n## Shared Agent report index\n\n${reportIndex}\n\n## Verification\n\n- Artifact validator: ${code(`node scripts/verify-journey-artifact.mjs --stage ${stageName} --artifact ${artifactPath}`)}\n- This PR is the shared review surface; the committed Markdown is the canonical, versioned report.\n`;

const inlineReport = reportBody.length <= maximumInlineCharacters
  ? `${reportBody}\n`
  : `Report body is ${reportBody.length} characters, above the inline comment limit. Read the canonical artifact: ${markdownLink(artifactPath, code(artifactPath))}.\n`;
const comment = `<!-- sdlc-agent-report:${oneLine(state.workflowId)}:${oneLine(artifactId)} -->\n## Agent Report · ${code(artifactId)}\n\n| Field | Value |\n| --- | --- |\n| Stage / role | ${code(stageName)} / ${code(stage.role)} |\n| Status | ${code(status)} |\n| Canonical report | ${markdownLink(artifactPath, code(artifactPath))} |\n| Context Receipt | ${code(metadata.contextReceipt ?? "missing")} |\n\n### Decision required\n\n${approvalText}\n\n### Next Agent and command\n\n${handoff}\n\n<details>\n<summary>Agent report content</summary>\n\n${inlineReport}\n</details>\n`;

const outputs = { title, body, comment, json: JSON.stringify({ workflowId: state.workflowId, stage: stageName, role: stage.role, artifactId, artifactPath, status, nextStage: nextStage ?? null, nextRole: nextRole ?? null, command: `/resume-workflow ${state.workflowId}` }, null, 2) };
if (!(format in outputs)) throw new Error("--format must be title, body, comment, or json");
console.log(outputs[format]);
