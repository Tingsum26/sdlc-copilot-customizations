import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const argument = (name) => {
  const index = process.argv.indexOf(name);
  return index === -1 ? undefined : process.argv[index + 1];
};
const workspace = argument("--workspace") ?? process.cwd();
const actor = argument("--actor");
const evidence = argument("--evidence");
const decision = argument("--decision");
const reason = argument("--reason");
const acceptedRisk = argument("--accepted-risk");
if (!actor || !evidence) throw new Error("Human decision requires --actor <github-login> and --evidence <commit-or-pr>");
if (!['approve', 'skip'].includes(decision)) throw new Error("--decision must be approve or skip");
if (decision === 'skip' && (!reason || !acceptedRisk)) {
  throw new Error("An evidence-backed skip requires --reason and --accepted-risk");
}
const statePath = join(workspace, ".sdlc", "workflow.json");
if (!existsSync(statePath)) throw new Error("Missing .sdlc/workflow.json");
const state = JSON.parse(readFileSync(statePath, "utf8"));
if (state.journeyRepository?.status !== "CONFIGURED") throw new Error("BLOCKED_BY_JOURNEY_REPO");
const stage = state.stages?.[state.currentStage];
if (!stage?.output) throw new Error(`Unknown current stage ${state.currentStage}`);
const artifact = state.artifacts?.[stage.output];
if (!artifact) throw new Error(`Stage ${state.currentStage} has no declared output ${stage.output}`);
if (artifact.status !== 'PENDING_APPROVAL') {
  throw new Error(`DECISION_BLOCKED: ${stage.output} is ${artifact.status}; only PENDING_APPROVAL output can receive a human decision`);
}
const at = new Date().toISOString();
artifact.status = decision === 'approve' ? 'APPROVED' : 'SKIPPED_WITH_EVIDENCE';
artifact.decision = { type: decision, actor, evidence, at, ...(decision === 'skip' ? { reason, acceptedRisk } : {}) };
state.decisionHistory = [...(state.decisionHistory ?? []), { stage: state.currentStage, artifact: stage.output, ...artifact.decision }];
writeFileSync(statePath, `${JSON.stringify(state, null, 2)}\n`);
console.log(JSON.stringify({ recorded: true, stage: state.currentStage, artifact: stage.output, status: artifact.status, decision: artifact.decision }, null, 2));
