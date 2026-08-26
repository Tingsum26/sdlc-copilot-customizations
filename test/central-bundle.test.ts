import { existsSync, readFileSync, readdirSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

// Ported from the monorepo packages/contracts bundle tests at
// seven-repo-split-baseline (bf48e15). In this standalone repository the
// former central/* content lives at the repository root, so every
// "central/<path>" reference becomes "<path>".
const root = resolve(import.meta.dirname, "..");

const expectedAgents = [
  "epic-delivery-analyst", "delivery-coordinator", "requirement-analyst",
  "code-context-analyst", "solution-architect", "planner", "java-implementer",
  "web-implementer", "ios-implementer", "android-implementer", "test-designer",
  "accessibility-qa", "pr-reviewer",
];
const skillDirectories: Record<string, string> = {
  "start-epic": "workflow", "initialize-journey-workspace": "workflow", "advance-stage": "workflow", "join-epic": "workflow", "change-epic": "workflow",
  "start-ticket": "workflow", "resume-workflow": "workflow", "prepare-stage-context": "workflow", "record-human-decision": "workflow", "import-pod-members": "workflow", "publish-agent-report": "workflow",
  "analyze-code-context": "analysis", "build-repository-map": "analysis", "assess-context-freshness": "analysis", "trace-api-contract": "analysis", "grill-requirement": "analysis", "assess-api-compatibility": "analysis",
  "impact-analysis": "analysis",
  "design-solution": "design", "design-review": "design", "plan-change": "design", "adr": "design",
  "implement-task": "implement", "verification-loop": "implement", "java-development": "implement", "web-development": "implement",
  "ios-development": "implement", "android-development": "implement",
  "generate-tests": "test", "contract-test-matrix": "test", "plan-manual-e2e": "test", "record-manual-e2e": "test",
  "review-accessibility": "test", "review-analytics-tagging": "test",
  "prepare-pr": "review", "review-pr": "review", "review-loop": "review",
  "onboard-repository": "onboard", "onboard-journey": "onboard", "sync-onboarding": "onboard", "analyze-http-call-graph": "onboard",
  "analyze-epic-risk": "sm", "prepare-standup": "sm", "find-blockers": "sm",
  "check-release-readiness": "sm", "draft-jira-update": "sm",
  "customization-audit": "meta",
};
const expectedSkills = Object.keys(skillDirectories);

describe("central customization bundle", () => {
  it("separates always-on instructions, policies, MCP catalog, and evals", () => {
    for (const path of [
      "policies/stage-gates.json",
      "policies/api-backward-compatibility.json",
      "mcp/catalog.json",
      "evals/agents-behavior.md",
    ]) expect(existsSync(resolve(root, path)), path).toBe(true);
    expect(existsSync(resolve(root, "manifests/agent-skill-routing.json"))).toBe(true);
  });

  it("publishes a versioned, non-secret inventory for VSIX installation", () => {
    const manifest = JSON.parse(readFileSync(resolve(root, "manifests/bundle-manifest.json"), "utf8"));
    expect(manifest.schemaVersion).toBe("2.0");
    expect(manifest.agents).toBe(13);
    expect(JSON.stringify(manifest)).not.toMatch(/token|password|cookie|company\.com/i);
  });
});

describe("central catalog", () => {
  it("contains all 13 agents with frontmatter", () => {
    const dir = resolve(root, "agents");
    expect(existsSync(dir)).toBe(true);
    const files = readdirSync(dir).filter((name) => name.endsWith(".agent.md"));
    expect(files).toHaveLength(13);
    for (const agent of expectedAgents) {
      const content = readFileSync(resolve(dir, `${agent}.agent.md`), "utf8");
      expect(content).toContain(`name: ${agent}`);
      expect(content).toContain("description:");
    }
  });

  it("keeps typed Agent contracts and Skill routes synchronized", () => {
    const contracts = JSON.parse(readFileSync(resolve(root, "manifests/agent-contracts.json"), "utf8"));
    const routing = JSON.parse(readFileSync(resolve(root, "manifests/agent-skill-routing.json"), "utf8"));
    for (const agent of expectedAgents) {
      expect(contracts.agents[agent], agent).toBeTruthy();
      const route = routing.agents[agent];
      expect(route, agent).toBeTruthy();
      for (const skill of [...route.requiredSkills, ...route.allowedSkills]) {
        expect(expectedSkills, `${agent} -> ${skill}`).toContain(skill);
      }
    }
  });

  it("manifest counts match the catalog", () => {
    const manifest = JSON.parse(readFileSync(`${root}/manifests/bundle-manifest.json`, "utf8"));
    expect(manifest.agents).toBe(13);
    expect(manifest.skills).toBe(47);
    expect(manifest.prompts).toBe(14);
    expect(manifest.instructions).toBe(23);
    expect(manifest.policies).toBe(16);
    expect(manifest.templates).toBe(30);
    expect(existsSync(`${root}/${manifest.referencesFile}`)).toBe(true);
    expect(manifest.agentSkillRouting).toBe("manifests/agent-skill-routing.json");
    expect(manifest.agentContracts).toBe("manifests/agent-contracts.json");
    expect(existsSync(resolve(root, manifest.agentContracts))).toBe(true);
  });

  it("contains all 47 skills with valid frontmatter", () => {
    const files = readdirSync(`${root}/skills`, { recursive: true } as never)
      .filter((name) => String(name).endsWith("SKILL.md"));
    expect(files).toHaveLength(47);
    for (const skill of expectedSkills) {
      const group = skillDirectories[skill];
      if (!group) throw new Error(`No directory mapping for skill: ${skill}`);
      const content = readFileSync(`${root}/skills/${group}/${skill}/SKILL.md`, "utf8");
      expect(content).toContain(`name: ${skill}`);
      expect(content).toContain("description:");
      expect(content).toContain("version:");
    }
  });

  it("has a license-traceable REFERENCES file", () => {
    const content = readFileSync(resolve(root, "REFERENCES.md"), "utf8");
    expect(content).toContain("Apache-2.0");
    expect(content).toContain("MIT");
    expect(content).toContain("never copied");
  });

  it("every copied reference row carries an SPDX license and concept-only repos stay out of content", () => {
    const references = readFileSync(`${root}/REFERENCES.md`, "utf8");
    const tableSection = references.split("## Concept-only")[0];
    const rows = tableSection.split("\n").filter((line) => /^\| [a-zA-Z0-9_.-]+\/[a-zA-Z0-9_.-]+ /.test(line));
    for (const row of rows) {
      expect(row).toMatch(/ (MIT|Apache-2\.0) /);
    }
    const catalogContent = ["agents", "skills"]
      .filter((dir) => existsSync(`${root}/${dir}`))
      .map((dir) =>
        readdirSync(`${root}/${dir}`, { recursive: true } as never)
          .filter((name) => String(name).endsWith(".md"))
          .map((name) => readFileSync(`${root}/${dir}/${name}`, "utf8"))
          .join("\n")).join("\n");
    for (const conceptOnly of ["anthropics/skills", "vercel-labs/agent-skills", "ComposioHQ/awesome-claude-skills"]) {
      expect(catalogContent).not.toContain(conceptOnly);
    }
  });

  it("manifest counts include hooks and profiles", () => {
    const manifest = JSON.parse(readFileSync(`${root}/manifests/bundle-manifest.json`, "utf8"));
    expect(manifest.hooks).toBe(1);
    expect(manifest.profiles).toBe(6);
  });

  it("ships role-bound Prompt Files for each interactive MVP entry point", () => {
    const files = readdirSync(`${root}/prompts`).filter((name) => name.endsWith(".prompt.md"));
    expect(files).toHaveLength(14);
    for (const file of files) {
      const content = readFileSync(`${root}/prompts/${file}`, "utf8");
      const agent = content.match(/^agent: '([^']+)'$/m)?.[1];
      expect(content, file).toMatch(/^---\n[\s\S]+?\n---\n/);
      expect(content, file).toContain("## Inputs");
      expect(content, file).toContain("## Required outcome");
      expect(agent, file).toBeTruthy();
      expect(expectedAgents, `${file} -> ${agent}`).toContain(agent!);
    }
  });

  it("declares hooks for deterministic lifecycle events only", () => {
    const hooks = JSON.parse(readFileSync(`${root}/hooks/hooks-manifest.json`, "utf8"));
    expect(hooks.schemaVersion).toBe("1.0");
    expect(hooks.events.map((hook: { event: string }) => hook.event).sort()).toEqual(["PostToolUse", "PreCompact", "PreToolUse", "SessionStart", "Stop", "UserPromptSubmit"]);
    for (const hook of hooks.events) {
      expect(["SessionStart", "UserPromptSubmit", "PreToolUse", "PostToolUse", "PreCompact", "Stop"]).toContain(hook.event);
      expect(hook.action).toBeTruthy();
      expect(hook.deterministic).toBe(true);
    }
  });

  it("defines role profiles referencing real skills and catalog servers", () => {
    const profiles = JSON.parse(readFileSync(`${root}/mcp/profiles.json`, "utf8")).profiles;
    const catalog = JSON.parse(readFileSync(`${root}/mcp/catalog.json`, "utf8"));
    const serverIds = catalog.servers.map((server: { id: string }) => server.id);
    const skills = readdirSync(`${root}/skills`, { recursive: true } as never)
      .filter((name) => String(name).endsWith("SKILL.md"))
      .map((name) => String(name).split(/[\\/]/).slice(-2, -1)[0]);
    expect(Object.keys(profiles)).toHaveLength(6);
    for (const profile of Object.values(profiles) as Array<{ skills: string[]; servers: string[] }>) {
      for (const skill of profile.skills) expect(skills).toContain(skill);
      for (const server of profile.servers) expect(serverIds).toContain(server);
    }
  });

  it("review-pr mandates residual risks in its output contract", () => {
    const content = readFileSync(`${root}/skills/review/review-pr/SKILL.md`, "utf8");
    expect(content).toMatch(/residual risks/i);
  });

  it("requires each sequential stage specialist to publish its verified Journey report", () => {
    const routing = JSON.parse(readFileSync(resolve(root, "manifests/agent-skill-routing.json"), "utf8"));
    for (const agent of ["requirement-analyst", "solution-architect", "planner", "test-designer", "pr-reviewer"]) {
      expect(routing.agents[agent].requiredSkills, agent).toContain("publish-agent-report");
    }
  });

  it("assigns technical Journey onboarding and HTTP graph ownership to code-context-analyst only", () => {
    const routing = JSON.parse(readFileSync(resolve(root, "manifests/agent-skill-routing.json"), "utf8"));
    expect(routing.rules.exclusiveSkillOwners).toMatchObject({
      "onboard-journey": "code-context-analyst",
      "onboard-repository": "code-context-analyst",
      "analyze-http-call-graph": "code-context-analyst",
    });
    expect(routing.agents["epic-delivery-analyst"].allowedSkills).not.toContain("onboard-journey");
  });
});
