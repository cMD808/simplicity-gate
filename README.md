<p align="center">
  <img src="assets/Gemini_Generated_Image_4d84p04d84p04d84-removebg-preview.png" alt="Simplicity Gate" width="300">
</p>

<h1 align="center">Simplicity Gate</h1>

<p align="center">
  <em>The Rule of Least Power enforcer for AI coding agents.</em>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/version-5.0.0-blue" alt="Version">
  <img src="https://img.shields.io/badge/license-MIT-green" alt="License">
  <img src="https://img.shields.io/badge/agents-12+-purple" alt="Agents">
  <img src="https://img.shields.io/badge/languages-11-orange" alt="Languages">
  <img src="https://img.shields.io/badge/quick--check-50ms-brightgreen" alt="Quick Check">
  <img src="https://img.shields.io/badge/auto--fix-enabled-brightgreen" alt="Auto-Fix">
  <img src="https://img.shields.io/badge/learning--mode-enabled-brightgreen" alt="Learning Mode">
  <img src="https://img.shields.io/badge/proactive--prevention-enabled-brightgreen" alt="Proactive Prevention">
  <img src="https://img.shields.io/badge/gamification-enabled-brightgreen" alt="Gamification">
</p>

<div align="center">
  <a href="#the-problem">Problem</a> · <a href="#the-hierarchy">Hierarchy</a> · <a href="#installation">Install</a> · <a href="#how-it-works">How It Works</a> · <a href="#examples">Examples</a> · <a href="#configuration">Config</a>
</div>

---

## The Problem

AI agents instinctively reach for the most powerful tool available. That instinct is usually wrong.

| You ask for... | The agent builds... | But this works... |
|:---------------|:--------------------|:------------------|
| Rename a JSON key | Node.js script + lodash | `jq` one-liner |
| UI toggle state | React + Zustand | CSS `:has()` |
| Disk monitoring | Python + psutil + cron | `df \| awk` |
| API proxy | Nginx + Docker | `curl` + cron |
| Log filtering | Python script | `grep` + `awk` |

**More power = more complexity.** More dependencies. More things that break at 3 AM.

---

## The Hierarchy

| Tier | Power Level | Examples |
|:----:|:------------|:---------|
| 0 | Built-in APIs | `fetch()`, `structuredClone()`, `URL`, `Intl` |
| 1 | Declarative markup | HTML, CSS, JSON Schema |
| 2 | Declarative logic | CSS `:has()`, Jinja, YAML |
| 3 | Standard utilities | `jq`, `grep`, `awk`, `curl` |
| 4 | Query languages | SQL, GraphQL, SQLite |
| 5 | High-level scripting | Python, Ruby, shell scripts |
| 6 | Application frameworks | Express, Rails, Django |
| 7 | Custom infrastructure | Kubernetes, service meshes |
| 8 | External services | Zapier, IFTTT, n8n, Make |

---

## Installation

### Quick Copy

```bash
# Claude Code
cp SKILL.md ~/.claude/commands/simplicity-gate.md

# OpenCode
cp SKILL.md ~/.config/opencode/skills/simplicity-gate.md

# Codex
cp SKILL.md ~/.codex/skills/simplicity-gate.md

# Aider
cp SKILL.md .aider.conf.yml  # or add to .aider/skills/

# Cursor / Windsurf / Cline
tail -n +52 SKILL.md > .cursorrules  # skip YAML frontmatter

# GitHub Copilot
mkdir -p .github/copilot-instructions
cp SKILL.md .github/copilot-instructions/simplicity-gate.md

# Roo Code
mkdir -p .roo/skills
cp SKILL.md .roo/skills/simplicity-gate.md

# Amazon Q
mkdir -p .amazonq/rules
cp SKILL.md .amazonq/rules/simplicity-gate.md
```

### Full Install Guides

<details>
<summary>Claude Code</summary>

```bash
mkdir -p ~/.claude/commands
cp SKILL.md ~/.claude/commands/simplicity-gate.md
```

</details>

<details>
<summary>OpenCode</summary>

```bash
mkdir -p ~/.config/opencode/skills
cp SKILL.md ~/.config/opencode/skills/simplicity-gate.md
```

</details>

<details>
<summary>Codex</summary>

```bash
mkdir -p ~/.codex/skills
cp SKILL.md ~/.codex/skills/simplicity-gate.md
```

</details>

<details>
<summary>Aider</summary>

Add to your `.aider.conf.yml`:
```yaml
skill_files:
  - .aider/skills/simplicity-gate.md
```
```bash
mkdir -p .aider/skills
cp SKILL.md .aider/skills/simplicity-gate.md
```

</details>

<details>
<summary>Cursor / Windsurf / Cline</summary>

```bash
tail -n +52 SKILL.md > .cursorrules
# Restart editor after copying
```

</details>

<details>
<summary>Continue</summary>

Add to `~/.continue/config.json`:
```json
{
  "customInstructions": "./continue/skills/simplicity-gate.md"
}
```
```bash
mkdir -p continue/skills
cp SKILL.md continue/skills/simplicity-gate.md
```

</details>

<details>
<summary>GitHub Copilot</summary>

```bash
mkdir -p .github/copilot-instructions
cp SKILL.md .github/copilot-instructions/simplicity-gate.md
```

</details>

<details>
<summary>Roo Code</summary>

```bash
mkdir -p .roo/skills
cp SKILL.md .roo/skills/simplicity-gate.md
```

</details>

<details>
<summary>Amazon Q</summary>

```bash
mkdir -p .amazonq/rules
cp SKILL.md .amazonq/rules/simplicity-gate.md
```

</details>

---

## How It Works

1. Agent proposes a solution
2. Gate checks: project context → language tiers → dependency graph
3. Gate evaluates against the tier hierarchy
4. Verdict issued: **PASS**, **REJECT**, **WARN**, or **ESCALATE**

```
Agent proposes solution
        │
        ▼
┌─────────────────┐
│ Check project    │  What's already installed?
│ context          │
└────────┬────────┘
         ▼
┌─────────────────┐
│ Check language   │  Language-specific tier adjustments
│ tiers            │
└────────┬────────┘
         ▼
┌─────────────────┐
│ Check dependency │  Does the dependency already exist?
│ graph            │
└────────┬────────┘
         ▼
┌─────────────────┐
│ Evaluate vs      │  Compare proposed tier to simplest viable tier
│ hierarchy        │
└────────┬────────┘
         ▼
┌─────────────────┐
│ Issue verdict    │  PASS / REJECT / WARN / ESCALATE
└─────────────────┘
```

### Verdicts

**PASS** — Appropriate tool selected:
```
PASS: jq selected (Tier 3) for JSON transformation
Cost Savings: ~4,500 tokens saved
```

**REJECT** — Over-engineered, use simpler alternative:
```
REJECT: Express.js (Tier 7) for JSON rename — use jq (Tier 3)
Severity: 4/5 (4-tier gap)
Auto-fix: jq '{new_key: .old_key}' input.json > output.json
Cost Savings: ~8,200 tokens saved
```

**WARN** — Borderline, document justification:
```
WARN: React (Tier 6) for simple toggle — CSS :has() (Tier 2) may suffice
Severity: 2/5
Justification: [required]
```

**ESCALATE** — Requires human judgment:
```
ESCALATE: Custom ORM (Tier 6) vs raw SQL (Tier 4) for complex queries
Test Plan: [required]
```

<p align="center">
  <img src="assets/Gemini_Generated_Image_5rnseu5rnseu5rns-removebg-preview.png" alt="Simplicity Gate Examples" width="400">
</p>

<h2 align="center">Examples</h2>

| # | Task | Without Gate | With Gate | Tier Gap | Lines Saved |
|:-:|:-----|:-------------|:----------|:--------:|:-----------:|
| 1 | JSON Reformat | Node.js + lodash | `jq` one-liner | 6→3 | 39+ |
| 2 | UI Toggle | React + Zustand | CSS `:has()` | 6→1 | 115+ |
| 3 | Disk Monitor | Python + psutil | `df` + `awk` | 6→3 | 79+ |
| 4 | Data Query | Python + pandas | SQL | 6→4 | 22+ |
| 5 | Form Validation | JavaScript | HTML5 + CSS | 6→1 | 35+ |
| 6 | API Proxy | Express.js + axios | `curl` | 7→3 | 59+ |
| 7 | Build Scripts | npm + eslint + jest | Makefile | 6→3 | 8+ |

<p align="center">
  <a href="examples/">Full code examples →</a>
</p>

---

<h2 align="center">Configuration</h2>

<p align="center">Customize behavior with a project-level config file.</p>

Create `.simplicity-gate.yml` in your project root:

```yaml
allowed_tools:
  - "express"           # Allow specific tools

blocked_tools:
  - "kubernetes"        # Always reject

tier_adjustments:
  "my-project-tool": 3  # Custom tier assignment

thresholds:
  max_tier: 5
  escalation_threshold: 6

settings:
  auto_fix: true
  interactive_mode: true
  learning_mode: true
  suppressions: true
  multi_file_scan: true
  dependency_cost: true
  proactive_prevention: true
  real_world_costs: true
  community_patterns: true
  agent_profiling: true
  teaching_mode: true
  gamification: true
  auto_migration: true
  dependency_weight: true
```

---

<h2 align="center">What's New in v5.0</h2>

| Feature | What It Does |
|:--------|:-------------|
| **Proactive Write Prevention** | Blocks over-engineered code before it's written |
| **Real-World Cost Calculator** | Ties tier violations to actual cloud costs ($/month) |
| **Community Pattern Library** | Growing database of anti-patterns → alternatives |
| **Agent Behavior Profiling** | Tracks which agents over-engineer most |
| **Interactive Teaching Mode** | Explains WHY simpler is better, not just WHAT |
| **Team Gamification** | Simplicity leaderboard and achievements |
| **Auto-Migration** | Scans codebase for old over-engineering |
| **Dependency Weight Reporter** | Real dependency costs before adding packages |

---

<h2 align="center">FAQ</h2>

<details>
<summary><strong>What if my project already uses React?</strong></summary>

<br>

The gate checks project context first. If React is already installed, using it for new components may PASS even if a simpler alternative exists. The goal is preventing unnecessary additions, not forcing removal.

</details>

<details>
<summary><strong>Can I override a REJECT?</strong></summary>

<br>

Yes. Use `ESCALATE` to request human review, or add the tool to `allowed_tools` in `.simplicity-gate.yml`. You can also use inline suppression: `// simplicity-gate: suppress`

</details>

<details>
<summary><strong>Does this slow down the agent?</strong></summary>

<br>

Minimal overhead. The gate adds ~200ms per evaluation. Token savings from avoiding over-engineering far outweigh the cost.

</details>

<details>
<summary><strong>What languages are supported?</strong></summary>

<br>

All languages. Language-specific tiers are configured for JavaScript, TypeScript, Python, Java, C#, PHP, Ruby, Go, Rust, Swift, Kotlin, and Scala out of the box. Add more in `.simplicity-gate.yml`.

</details>

<details>
<summary><strong>How does auto-fix work?</strong></summary>

<br>

When a REJECT is issued, the gate provides a copy-pasteable replacement in the `--- AUTO-FIX ---` block. The agent can apply it directly or you can use it manually.

</details>

---

<h2 align="center">Impact</h2>

<table align="center">
  <tr>
    <td align="center" width="33%">
      <h1>~6K</h1>
      <p>Tokens Saved<br>per REJECT</p>
    </td>
    <td align="center" width="33%">
      <h1>70%</h1>
      <p>Complexity<br>Reduction</p>
    </td>
    <td align="center" width="33%">
      <h1>80%</h1>
      <p>Dependency<br>Reduction</p>
    </td>
  </tr>
</table>

---

<p align="center">
  <strong>Simplicity is the ultimate sophistication.</strong><br>
  <sub>— Leonardo da Vinci</sub>
</p>

<br>

<p align="center">
  <a href="CONTRIBUTING.md">Contributing</a> · <a href="SECURITY.md">Security</a> · <a href="LICENSE">License (MIT)</a>
</p>

<p align="center">
  <sub>Built for AI agents that ship production code.</sub>
</p>
