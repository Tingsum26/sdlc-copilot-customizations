import { existsSync, readFileSync } from "node:fs";
import { isAbsolute, join, relative, resolve } from "node:path";

const argument = (name) => {
  const index = process.argv.indexOf(name);
  return index === -1 ? undefined : process.argv[index + 1];
};
const workspace = argument("--workspace") ?? process.cwd();
const requestedRepositories = (argument("--repositories") ?? "").split(",").map((value) => value.trim()).filter(Boolean);
const manifestPath = join(workspace, ".sdlc", "journey-onboarding.json");
const accepted = new Set(["APPROVED", "CURRENT"]);
const blockers = [];
if (!existsSync(manifestPath)) {
  blockers.push({ type: "MISSING_MANIFEST", action: "Run onboard-journey and create .sdlc/journey-onboarding.json" });
} else {
  const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
  if (!accepted.has(manifest.status)) blockers.push({ type: "ONBOARDING_NOT_APPROVED", status: manifest.status ?? "MISSING", action: "Complete onboarding PR review or run sync-onboarding" });
  for (const artifactId of ["JOURNEY_BASELINE", "REPOSITORY_LANDSCAPE", "API_CALL_GRAPH", "CODE_CONTEXT"]) {
    const artifact = manifest.artifacts?.[artifactId];
    if (!artifact) { blockers.push({ type: "MISSING_ARTIFACT", artifactId, action: "Run onboard-journey" }); continue; }
    if (!accepted.has(artifact.status)) blockers.push({ type: "ARTIFACT_NOT_APPROVED", artifactId, status: artifact.status ?? "MISSING", action: "Run onboard-journey or sync-onboarding" });
    if (typeof artifact.path !== "string" || !artifact.path || isAbsolute(artifact.path)) { blockers.push({ type: "INVALID_ARTIFACT_PATH", artifactId }); continue; }
    const absolute = resolve(workspace, artifact.path);
    const fromWorkspace = relative(resolve(workspace), absolute);
    if (!fromWorkspace || fromWorkspace.startsWith("..") || isAbsolute(fromWorkspace) || !existsSync(absolute)) blockers.push({ type: "MISSING_ARTIFACT_FILE", artifactId, path: artifact.path });
  }
  const knownRepositories = new Map((manifest.repositories ?? []).map((repository) => [repository.name, repository]));
  for (const name of requestedRepositories) {
    const repository = knownRepositories.get(name);
    if (!repository) { blockers.push({ type: "MISSING_REPOSITORY_ONBOARDING", repository: name, action: "Run onboard-repository, then update Journey onboarding" }); continue; }
    if (!accepted.has(repository.status)) blockers.push({ type: "REPOSITORY_ONBOARDING_NOT_APPROVED", repository: name, status: repository.status ?? "MISSING", action: "Run onboard-repository or sync-onboarding" });
    if (!repository.verifiedAgainst) blockers.push({ type: "MISSING_REPOSITORY_EVIDENCE", repository: name, action: "Record the source commit after onboarding" });
  }
  if (blockers.length === 0) {
    console.log(JSON.stringify({ ready: true, journeyId: manifest.journeyId, manifest: ".sdlc/journey-onboarding.json", verifiedAt: manifest.verifiedAt, repositories: requestedRepositories }, null, 2));
    process.exit(0);
  }
}
console.error(`BLOCKED_BY_ONBOARDING: ${JSON.stringify({ ready: false, manifest: ".sdlc/journey-onboarding.json", blockers }, null, 2)}`);
process.exit(1);
