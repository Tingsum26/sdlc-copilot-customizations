import { mkdtempSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import { describe, expect, it } from "vitest";

const root = join(import.meta.dirname, "..");
const node = process.execPath;
const prepare = join(root, "scripts", "prepare-journey-context.mjs");
const verify = join(root, "scripts", "verify-journey-artifact.mjs");

describe("GitHub Journey Context Receipt scripts", () => {
  it("pins approved upstream artifacts and rejects a stale receipt", () => {
    const workspace = mkdtempSync(join(tmpdir(), "journey-context-"));
    try {
      mkdirSync(join(workspace, ".sdlc"), { recursive: true });
      mkdirSync(join(workspace, "docs", "01-context"), { recursive: true });
      mkdirSync(join(workspace, "docs", "02-requirements"), { recursive: true });
      writeFileSync(join(workspace, "docs", "01-context", "baseline.md"), "baseline\n");
      writeFileSync(join(workspace, "docs", "01-context", "code-context.md"), "code context\n");
      writeFileSync(join(workspace, ".sdlc", "workflow.json"), JSON.stringify({
        workflowId: "AO-123", journeyId: "account-opening", branch: "journey/AO-123-open-account",
        journeyRepository: { status: "CONFIGURED", provider: "GITHUB", owner: "example", name: "journey-account-opening", remote: "https://github.example/journey-account-opening", localPath: workspace },
        artifacts: {
          JOURNEY_BASELINE: { path: "docs/01-context/baseline.md", status: "APPROVED" },
          CODE_CONTEXT: { path: "docs/01-context/code-context.md", status: "APPROVED" },
        },
        stages: { REQUIREMENTS: { role: "requirement-analyst", requiredSkills: ["prepare-stage-context", "start-ticket", "grill-requirement"], requiredInputs: ["JOURNEY_BASELINE", "CODE_CONTEXT"] } },
      }, null, 2));
      const created = spawnSync(node, [prepare, "--workspace", workspace, "--stage", "REQUIREMENTS", "--role", "requirement-analyst"], { encoding: "utf8" });
      expect(created.status, created.stderr).toBe(0);
      const receiptPath = join(workspace, ".sdlc", "context-receipts", "requirements-requirement-analyst.json");
      const receiptHash = createHash("sha256").update(readFileSync(receiptPath)).digest("hex");
      writeFileSync(join(workspace, "docs", "02-requirements", "contract.md"), `---\nworkflowId: AO-123\nstage: REQUIREMENTS\nrole: requirement-analyst\nappliedSkills: prepare-stage-context@1.0, start-ticket@1.0, grill-requirement@1.0\ncontextReceipt: .sdlc/context-receipts/requirements-requirement-analyst.json\ncontextReceiptSha256: ${receiptHash}\n---\n# Contract\n`);
      const valid = spawnSync(node, [verify, "--workspace", workspace, "--stage", "REQUIREMENTS", "--artifact", "docs/02-requirements/contract.md"], { encoding: "utf8" });
      expect(valid.status, valid.stderr).toBe(0);
      writeFileSync(join(workspace, "docs", "01-context", "baseline.md"), "changed baseline\n");
      const stale = spawnSync(node, [verify, "--workspace", workspace, "--stage", "REQUIREMENTS", "--artifact", "docs/02-requirements/contract.md"], { encoding: "utf8" });
      expect(stale.status).not.toBe(0);
      expect(stale.stderr).toMatch(/stale/i);
    } finally {
      rmSync(workspace, { recursive: true, force: true });
    }
  });
});
