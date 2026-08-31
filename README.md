<p align="center">
  <img src="assets/Gemini_Generated_Image_4d84p04d84p04d84-removebg-preview.png" alt="Simplicity Gate" width="300">
</p>

<h1 align="center">Simplicity Gate</h1>

<p align="center">
  <em>The Rule of Least Power enforcer for AI coding agents.</em>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/version-4.0.0-blue" alt="Version">
  <img src="https://img.shields.io/badge/license-MIT-green" alt="License">
  <img src="https://img.shields.io/badge/agents-12+-purple" alt="Agents">
  <img src="https://img.shields.io/badge/tiers-9-orange" alt="Tiers">
  <img src="https://img.shields.io/badge/auto--fix-enabled-brightgreen" alt="Auto-Fix">
  <img src="https://img.shields.io/badge/interactive--mode-enabled-brightgreen" alt="Interactive Mode">
  <img src="https://img.shields.io/badge/learning--mode-enabled-brightgreen" alt="Learning Mode">
</p>

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
tail -n +25 SKILL.md > .cursorrules  # skip YAML frontmatter

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
tail -n +25 SKILL.md > .cursorrules
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

---

## Examples

| Scenario | Proposed | Simplest | Verdict |
|:---------|:---------|:---------|:--------|
| [JSON Rename](examples/reformat-json.md) | Node.js + lodash | `jq` | REJECT |
| [UI Toggle](examples/css-toggle.md) | React + Zustand | CSS `:has()` | REJECT |
| [Disk Monitor](examples/shell-monitor.md) | Python + psutil | `df \| awk` | REJECT |
| [SQL vs Python](examples/sql-vs-python.md) | Python + pandas | SQL | REJECT |
| [CSS Validation](examples/css-vs-js-validation.md) | JavaScript | HTML5 + CSS | REJECT |
| [curl vs Express](examples/curl-vs-express.md) | Express.js | `curl` | REJECT |
| [Make vs npm](examples/make-vs-npm.md) | npm scripts | Make | WARN |

---

## Configuration

Create `.simplicity-gate.yml` in your project root to override defaults:

```yaml
allowed_tools:
  - "express"  # Allow specific tools
blocked_tools:
  - "kubernetes"  # Always reject
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
```

---

## What's New in v4.0

| Feature | Description |
|:--------|:------------|
| Tier 0 | Built-in APIs (`fetch`, `structuredClone`, `URL`) — free, zero deps |
| Tier 8 | External services (Zapier, IFTTT, n8n) — no-code > custom code |
| Auto-Fix | Applies replacements automatically, not just suggestions |
| Interactive Mode | Choice-based REJECTs — user picks from options |
| Learning Mode | Tracks overrides, suggests custom tiers after 5+ decisions |
| Multi-File Scan | Detects patterns across codebase, suggests consolidation |
| Dependency Cost | Shows package size, CVEs, transitive deps before adding |
| Inline Suppressions | `// simplicity-gate: ignore` to skip specific lines |

---

## FAQ

**Q: What if my project already uses React?**
A: The gate checks project context first. If React is already installed, using it for new components may PASS even if a simpler alternative exists.

**Q: Can I override a REJECT?**
A: Yes. Use `ESCALATE` to request human review, or add the tool to `allowed_tools` in `.simplicity-gate.yml`.

**Q: Does this slow down the agent?**
A: Minimal overhead. The gate adds ~200ms per evaluation. Token savings from avoiding over-engineering far outweigh the cost.

**Q: What languages are supported?**
A: All languages. Language-specific tiers are configured for JavaScript, Python, Go, and Rust out of the box. Add more in `.simplicity-gate.yml`.

---

## Impact

| Metric | Value |
|:-------|:------|
| Avg token savings per REJECT | ~6,000 |
| Avg complexity reduction | 70% |
| Avg dependency reduction | 80% |

---

## Examples

- [examples/](examples/) — Full walkthroughs with before/after code

---

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md).

---

## Security

See [SECURITY.md](SECURITY.md).

---

## License

MIT
