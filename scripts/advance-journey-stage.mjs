import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const argument = (name) => { const index = process.argv.indexOf(name); return index === -1 ? undefined : process.argv[index + 1]; };
const workspace = argument("--workspace") ?? process.cwd();
const actor = argument("--actor");
const evidence = argument("--evidence");
if (!actor || !evidence) throw new Error("Human approval is required: --actor <github-login> --evidence <commit-or-pr>");
const statePath = join(workspace, ".sdlc", "workflow.json");
if (!existsSync(statePath)) throw new Error("Missing .sdlc/workflow.json");
const state = JSON.parse(readFileSync(statePath, "utf8"));
if (state.journeyRepository?.status !== "CONFIGURED") throw new Error("BLOCKED_BY_JOURNEY_REPO");
const order = state.stageOrder ?? ["REQUIREMENTS", "DESIGN", "PLAN", "TEST", "REVIEW"];
const currentStage = state.currentStage;
const stage = state.stages?.[currentStage];
if (!stage) throw new Error(`Unknown current stage ${currentStage}`);
const output = state.artifacts?.[stage.output];
if (!output) throw new Error(`Stage ${currentStage} has no declared output ${stage.output}`);
if (!["APPROVED", "SKIPPED_WITH_EVIDENCE"].includes(output.status)) {
  throw new Error(`GATE_BLOCKED: ${stage.output} is ${output.status}; human approval or evidence-backed skip is required`);
}
const index = order.indexOf(currentStage);
if (index < 0) throw new Error(`Stage ${currentStage} is not in stageOrder`);
const nextStage = order[index + 1];
const event = { from: currentStage, to: nextStage ?? "COMPLETED", actor, evidence, at: new Date().toISOString(), output: stage.output, outputStatus: output.status };
state.stageHistory = [...(state.stageHistory ?? []), event];
if (nextStage) { state.currentStage = nextStage; state.status = "IN_PROGRESS"; }
else { state.status = "COMPLETED"; }
writeFileSync(statePath, `${JSON.stringify(state, null, 2)}\n`);
console.log(JSON.stringify({ advanced: true, ...event, currentStage: state.currentStage, status: state.status }, null, 2));
