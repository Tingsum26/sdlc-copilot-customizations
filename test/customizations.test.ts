import { readFileSync, readdirSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

// Ported from packages/contracts/test/customizations.test.ts
// (seven-repo-split-baseline bf48e15). Layout adapted: this repository keeps the
// former central/* directories at its root, so all "central/" prefixes are gone.
const root = resolve(import.meta.dirname, "..");
const read = (path: string) => readFileSync(resolve(root, path), "utf8");

describe("central Copilot customizations", () => {
  const skillPaths: Record<string, string> = {
    "start-ticket": "skills/workflow/start-ticket/SKILL.md",
    "resume-workflow": "skills/workflow/resume-workflow/SKILL.md",
    "prepare-pr": "skills/review/prepare-pr/SKILL.md",
  };
  for (const [name, path] of Object.entries(skillPaths)) {
    it(`${name} has valid skill metadata and safety boundaries`, () => {
      const source = read(path);
      expect(source).toMatch(new RegExp(`^---\\r?\\nname: ${name}\\r?\\ndescription: `, "m"));
      expect(source).toMatch(/human|用户|人工|confirm|approv/i);
      expect(source).not.toMatch(/cloud agent|background agent|Jenkins.*scan|MongoDB driver/i);
    });
  }

  for (const name of ["requirement-analyst", "solution-architect", "pr-reviewer"]) {
    it(`${name} is a bounded agent definition`, () => {
      const source = read(`agents/${name}.agent.md`);
      expect(source).toMatch(/^---\r?\nname:/);
      expect(source).toMatch(/tools:/);
      expect(source).toMatch(/GitHub-only|Context Receipt|workflow_/i);
      expect(source).not.toMatch(/tools:.*(?:edit|terminal|execute|MongoDB)/i);
    });
  }

  it("the reviewer remains read-only and reports evidence", () => {
    const source = read("agents/pr-reviewer.agent.md");
    expect(source).toMatch(/read.only|只读/i);
    expect(source).toMatch(/evidence|证据/i);
    expect(source).toMatch(/severity|严重/i);
  });
});

describe("copilot format intersection", () => {
  it("uses no Claude-only fields in agents or skills", () => {
    const scan = (dir: string) => readdirSync(dir, { recursive: true } as never)
      .filter((name) => String(name).endsWith(".agent.md") || String(name).endsWith("SKILL.md"))
      .map((name) => readFileSync(resolve(dir, String(name)), "utf8"))
      .join("\n");
    const content = scan(resolve(root, "agents")) + scan(resolve(root, "skills"));
    expect(content).not.toMatch(/allowed-tools|agent-instructions:/);
    expect(content).not.toContain("claude:");
  });

  it("publishes the GitHub-only Context Receipt guard and deterministic validators", () => {
    expect(read("instructions/github-journey-collaboration.instructions.md")).toMatch(/Context Receipt/);
    expect(read("policies/context-receipt.json")).toMatch(/BLOCK/);
    expect(read("scripts/prepare-journey-context.mjs")).toMatch(/sha256/);
    expect(read("scripts/verify-journey-artifact.mjs")).toMatch(/stale/);
  });
});
