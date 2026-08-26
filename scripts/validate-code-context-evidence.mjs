import { existsSync, readFileSync } from "node:fs";
import { isAbsolute, relative, resolve } from "node:path";

const argument = (name) => {
  const index = process.argv.indexOf(name);
  return index === -1 ? undefined : process.argv[index + 1];
};
const workspace = argument("--workspace") ?? process.cwd();
const artifact = argument("--artifact");
const kind = argument("--kind");
if (!artifact || !["code-context", "api-call-graph"].includes(kind)) {
  throw new Error("Usage: --artifact <relative-path> --kind <code-context|api-call-graph> [--workspace <path>]");
}
if (isAbsolute(artifact)) throw new Error("Artifact path must be relative");
const path = resolve(workspace, artifact);
const fromWorkspace = relative(resolve(workspace), path);
if (!fromWorkspace || fromWorkspace.startsWith("..") || isAbsolute(fromWorkspace)) throw new Error("Artifact path escapes Journey workspace");
if (!existsSync(path)) throw new Error(`Missing evidence artifact ${artifact}`);
const content = readFileSync(path, "utf8");
const requirements = kind === "code-context"
  ? ["# Code Context", "## Repository Inventory", "## Entry Points and Consumers", "## API Contract Evidence", "## Evidence Register", "## Known Gaps and Next Evidence", "| Claim | Evidence level | Repository | Commit | File / symbol | Source / command |"]
  : ["# API Call Graph", "## Edge Register", "## Unmatched Endpoint or Client Facts", "## Graph Provenance", "| Caller repository / symbol | Callee repository / symbol | Method | Normalized path |"];
const missing = requirements.filter((required) => !content.includes(required));
if (missing.length > 0) throw new Error(`Evidence artifact is incomplete: missing ${missing.join(", ")}`);
const evidenceLabels = ["CODE_PROVEN", "CODE_VERIFIED", "TEST_VERIFIED", "DOC_STATED", "UNVERIFIED", "KNOWN_GAP"];
if (!evidenceLabels.some((label) => content.includes(label))) throw new Error("Evidence artifact has no recognized evidence label");
console.log(JSON.stringify({ valid: true, kind, artifact: fromWorkspace.replaceAll("\\", "/") }, null, 2));
