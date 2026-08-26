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
const advance = join(root, "scripts", "advance-journey-stage.mjs");
const renderPr = join(root, "scripts", "render-agent-pr.mjs");
const recordPr = join(root, "scripts", "record-journey-pr.mjs");
const checkOnboarding = join(root, "scripts", "check-journey-onboarding.mjs");

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

  it("blocks stage advancement until human approval, then advances only in declared order", () => {
    const workspace = mkdtempSync(join(tmpdir(), "journey-gate-"));
    try {
      mkdirSync(join(workspace, ".sdlc"), { recursive: true });
      const state = {
        workflowId: "AO-123", journeyId: "account-opening", currentStage: "REQUIREMENTS", status: "IN_PROGRESS",
        journeyRepository: { status: "CONFIGURED", name: "journey-account-opening", remote: "https://github.example/journey-account-opening" },
        stageOrder: ["REQUIREMENTS", "DESIGN"],
        artifacts: { REQUIREMENT_CONTRACT: { path: "docs/requirement.md", status: "PENDING_APPROVAL" } },
        stages: { REQUIREMENTS: { role: "requirement-analyst", output: "REQUIREMENT_CONTRACT" }, DESIGN: { role: "solution-architect", output: "SOLUTION_DESIGN" } },
      };
      writeFileSync(join(workspace, ".sdlc", "workflow.json"), JSON.stringify(state));
      const blocked = spawnSync(node, [advance, "--workspace", workspace, "--actor", "alice", "--evidence", "PR-1"], { encoding: "utf8" });
      expect(blocked.status).not.toBe(0);
      expect(blocked.stderr).toMatch(/GATE_BLOCKED/);
      state.artifacts.REQUIREMENT_CONTRACT.status = "APPROVED";
      writeFileSync(join(workspace, ".sdlc", "workflow.json"), JSON.stringify(state));
      const advanced = spawnSync(node, [advance, "--workspace", workspace, "--actor", "alice", "--evidence", "PR-1"], { encoding: "utf8" });
      expect(advanced.status, advanced.stderr).toBe(0);
      expect(JSON.parse(readFileSync(join(workspace, ".sdlc", "workflow.json"), "utf8")).currentStage).toBe("DESIGN");
    } finally {
      rmSync(workspace, { recursive: true, force: true });
    }
  });

  it("renders a GitHub report card with the gated next Agent and persists the Journey PR reference", () => {
    const workspace = mkdtempSync(join(tmpdir(), "journey-pr-card-"));
    try {
      mkdirSync(join(workspace, ".sdlc"), { recursive: true });
      mkdirSync(join(workspace, "docs", "02-requirements"), { recursive: true });
      const state = {
        workflowId: "AO-123", journeyId: "account-opening", branch: "journey/AO-123-open-account", currentStage: "REQUIREMENTS",
        journeyRepository: { status: "CONFIGURED", name: "journey-account-opening", remote: "https://github.example/journey-account-opening" },
        stageOrder: ["REQUIREMENTS", "DESIGN"],
        artifacts: { REQUIREMENT_CONTRACT: { path: "docs/02-requirements/requirement-contract.md", status: "PENDING_APPROVAL" } },
        stages: { REQUIREMENTS: { role: "requirement-analyst", output: "REQUIREMENT_CONTRACT" }, DESIGN: { role: "solution-architect", output: "SOLUTION_DESIGN" } },
      };
      writeFileSync(join(workspace, ".sdlc", "workflow.json"), JSON.stringify(state));
      writeFileSync(join(workspace, "docs", "02-requirements", "requirement-contract.md"), "---\nworkflowId: AO-123\nstage: REQUIREMENTS\nrole: requirement-analyst\ncontextReceipt: .sdlc/context-receipts/requirements-requirement-analyst.json\n---\n# Requirement Contract\n\n| API | Change |\n| --- | --- |\n| Open account | additive |\n");
      const body = spawnSync(node, [renderPr, "--workspace", workspace, "--format", "body"], { encoding: "utf8" });
      expect(body.status, body.stderr).toBe(0);
      expect(body.stdout).toContain("Human review is required");
      expect(body.stdout).toContain("solution-architect");
      expect(body.stdout).toContain("/resume-workflow AO-123");
      const comment = spawnSync(node, [renderPr, "--workspace", workspace, "--format", "comment"], { encoding: "utf8" });
      expect(comment.status, comment.stderr).toBe(0);
      expect(comment.stdout).toContain("sdlc-agent-report:AO-123:REQUIREMENT_CONTRACT");
      expect(comment.stdout).toContain("Agent report content");
      const recorded = spawnSync(node, [recordPr, "--workspace", workspace, "--number", "42", "--url", "https://github.example/org/journey/pull/42", "--base", "main", "--artifact-id", "REQUIREMENT_CONTRACT", "--comment-url", "https://github.example/org/journey/pull/42#issuecomment-100"], { encoding: "utf8" });
      expect(recorded.status, recorded.stderr).toBe(0);
      const persisted = JSON.parse(readFileSync(join(workspace, ".sdlc", "workflow.json"), "utf8"));
      expect(persisted.journeyPullRequest.number).toBe(42);
      expect(persisted.journeyPullRequest.reports.REQUIREMENT_CONTRACT.commentUrl).toContain("issuecomment-100");
    } finally {
      rmSync(workspace, { recursive: true, force: true });
    }
  });

  it("blocks Start Epic until the reusable Journey onboarding is complete", () => {
    const workspace = mkdtempSync(join(tmpdir(), "journey-onboarding-"));
    try {
      mkdirSync(join(workspace, ".sdlc"), { recursive: true });
      const missing = spawnSync(node, [checkOnboarding, "--workspace", workspace, "--repositories", "account-opening-api"], { encoding: "utf8" });
      expect(missing.status).not.toBe(0);
      expect(missing.stderr).toContain("BLOCKED_BY_ONBOARDING");
      for (const path of ["journey-baseline.md", "repository-landscape.md", "api-call-graph.md", "code-context.md"]) {
        mkdirSync(join(workspace, "docs", "01-context"), { recursive: true });
        writeFileSync(join(workspace, "docs", "01-context", path), `${path}\n`);
      }
      writeFileSync(join(workspace, ".sdlc", "journey-onboarding.json"), JSON.stringify({
        schemaVersion: "journey-onboarding/v1", journeyId: "account-opening", status: "APPROVED", verifiedAt: "2026-08-26T00:00:00Z",
        artifacts: Object.fromEntries(["journey-baseline.md", "repository-landscape.md", "api-call-graph.md", "code-context.md"].map((path, index) => [["JOURNEY_BASELINE", "REPOSITORY_LANDSCAPE", "API_CALL_GRAPH", "CODE_CONTEXT"][index], { path: `docs/01-context/${path}`, status: "APPROVED", verifiedAgainst: "abc123" }])),
        repositories: [{ name: "account-opening-api", channel: "API", status: "APPROVED", verifiedAgainst: "def456" }],
      }, null, 2));
      const ready = spawnSync(node, [checkOnboarding, "--workspace", workspace, "--repositories", "account-opening-api"], { encoding: "utf8" });
      expect(ready.status, ready.stderr).toBe(0);
      expect(JSON.parse(ready.stdout).ready).toBe(true);
    } finally {
      rmSync(workspace, { recursive: true, force: true });
    }
  });
});
