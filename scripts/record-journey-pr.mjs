import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const argument = (name) => {
  const index = process.argv.indexOf(name);
  return index === -1 ? undefined : process.argv[index + 1];
};
const workspace = argument("--workspace") ?? process.cwd();
const number = Number(argument("--number"));
const url = argument("--url");
const baseBranch = argument("--base");
const artifactId = argument("--artifact-id");
const commentUrl = argument("--comment-url");
if (!Number.isSafeInteger(number) || number < 1) throw new Error("--number must be a positive PR number");
if (!url || !/^https?:\/\//i.test(url)) throw new Error("--url must be an http(s) PR URL");
if (!baseBranch) throw new Error("--base is required");
if (commentUrl && !/^https?:\/\//i.test(commentUrl)) throw new Error("--comment-url must be an http(s) URL");
const statePath = join(workspace, ".sdlc", "workflow.json");
if (!existsSync(statePath)) throw new Error("Missing .sdlc/workflow.json");
const state = JSON.parse(readFileSync(statePath, "utf8"));
if (state.journeyRepository?.status !== "CONFIGURED") throw new Error("BLOCKED_BY_JOURNEY_REPO");
if (artifactId && !state.artifacts?.[artifactId]) throw new Error(`Unknown artifact ${artifactId}`);
const existing = state.journeyPullRequest ?? {};
state.journeyPullRequest = {
  number,
  url,
  baseBranch,
  headBranch: state.branch,
  reports: { ...(existing.reports ?? {}) },
  updatedAt: new Date().toISOString(),
};
if (artifactId) state.journeyPullRequest.reports[artifactId] = { commentUrl: commentUrl ?? null, publishedAt: new Date().toISOString() };
writeFileSync(statePath, `${JSON.stringify(state, null, 2)}\n`);
console.log(JSON.stringify({ recorded: true, workflowId: state.workflowId, journeyPullRequest: state.journeyPullRequest }, null, 2));
