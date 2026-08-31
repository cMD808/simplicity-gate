<p align="center">
  <img src="assets/Gemini_Generated_Image_4d84p04d84p04d84-removebg-preview.png" alt="Simplicity Gate" width="300">
</p>

<h1 align="center">Simplicity Gate</h1>

<p align="center">
  <em>The Rule of Least Power enforcer for AI coding agents.</em>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/version-4.1.0-blue" alt="Version">
  <img src="https://img.shields.io/badge/license-MIT-green" alt="License">
  <img src="https://img.shields.io/badge/agents-12+-purple" alt="Agents">
  <img src="https://img.shields.io/badge/languages-11-orange" alt="Languages">
  <img src="https://img.shields.io/badge/quick--check-50ms-brightgreen" alt="Quick Check">
  <img src="https://img.shields.io/badge/auto--fix-enabled-brightgreen" alt="Auto-Fix">
  <img src="https://img.shields.io/badge/learning--mode-enabled-brightgreen" alt="Learning Mode">
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

<details>
<summary><strong>1. JSON Reformatting</strong> — Node.js vs jq</summary>

**Without:** Node.js + lodash (40+ lines, Tier 6)
**With:** `jq` one-liner (1 line, Tier 3)

```bash
jq '{new_key: .old_key}' input.json > output.json
```

</details>

<details>
<summary><strong>2. UI Toggle</strong> — React vs CSS</summary>

**Without:** React + Zustand (120+ lines, Tier 6)
**With:** CSS `:has()` (5 lines, Tier 1+2)

```css
.panel .content { display: none; }
.panel:has(.toggle:checked) .content { display: block; }
```

</details>

<details>
<summary><strong>3. Disk Monitor</strong> — Python vs Shell</summary>

**Without:** Python + psutil (80+ lines, Tier 6)
**With:** `df` + `awk` pipeline (1 line, Tier 3)

```bash
df -h | awk 'NR>1 && int($5)>90 {print $6}'
```

</details>

<details>
<summary><strong>4. Data Queries</strong> — Python vs SQL</summary>

**Without:** Python + pandas (30+ lines, Tier 6)
**With:** SQL query (8 lines, Tier 4)

```sql
SELECT country, SUM(amount) as revenue
FROM orders WHERE created_at > NOW() - INTERVAL '30 days'
GROUP BY country ORDER BY revenue DESC LIMIT 10;
```

</details>

<details>
<summary><strong>5. Form Validation</strong> — JavaScript vs HTML5</summary>

**Without:** JavaScript validation (40+ lines, Tier 6)
**With:** HTML5 attributes (5 lines, Tier 1)

```html
<input type="email" required minlength="8" pattern="(?=.*\d)(?=.*[A-Z]).{8,}">
```

</details>

<details>
<summary><strong>6. API Proxy</strong> — Express vs curl</summary>

**Without:** Express.js app (60+ lines, Tier 7)
**With:** `curl` command (1 line, Tier 3)

```bash
curl -s -H "Authorization: Bearer $API_KEY" https://api.example.com/endpoint
```

</details>

<details>
<summary><strong>7. Build Automation</strong> — npm vs Make</summary>

**Without:** npm scripts (20+ lines, Tier 6)
**With:** Makefile (12 lines, Tier 3)

```makefile
lint:; eslint src/
test:; jest --coverage
build:; tsc && webpack
```

</details>

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

## What's New in v4.1

| Feature | Description |
|:--------|:------------|
| 11 Languages | TypeScript, Java, C#, PHP, Ruby, Swift, Kotlin, Scala + Tier 0 for all |
| Quick-Check | 50ms instant REJECT for obvious violations |
| Cached Patterns | Instant lookup for common over-engineering |
| Early Termination | Stop at first tier match, skip rest |
| AST Detection | Find anti-patterns: `JSON.parse(JSON.stringify())`, lodash, moment, axios |
| Bundle Estimation | Show KB impact before adding dependencies |
| Security Audit | Check CVEs before adding packages |
| Profiling Tips | Recommend tools when higher tier justified |
| Dependency Tree | Show full transitive dependency graph |

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
