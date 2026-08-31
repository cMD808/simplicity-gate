<p align="center">
  <img src="assets/Gemini_Generated_Image_4d84p04d84p04d84-removebg-preview.png" alt="Simplicity Gate" width="300">
</p>

<h1 align="center">⚡ Simplicity Gate</h1>

<p align="center">
  <em>The Rule of Least Power enforcer for AI coding agents.</em>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/version-6.0.0-blue" alt="Version">
  <img src="https://img.shields.io/badge/license-MIT-green" alt="License">
  <img src="https://img.shields.io/badge/agents-12+-purple" alt="Agents">
  <img src="https://img.shields.io/badge/languages-11-orange" alt="Languages">
  <img src="https://img.shields.io/badge/quick--check-50ms-brightgreen" alt="Quick Check">
  <img src="https://img.shields.io/badge/auto--fix-enabled-brightgreen" alt="Auto-Fix">
  <img src="https://img.shields.io/badge/learning--mode-enabled-brightgreen" alt="Learning Mode">
  <img src="https://img.shields.io/badge/proactive--prevention-enabled-brightgreen" alt="Proactive Prevention">
  <img src="https://img.shields.io/badge/gamification-enabled-brightgreen" alt="Gamification">
  <img src="https://img.shields.io/badge/real--time--review-enabled-brightgreen" alt="Real-Time Review">
  <img src="https://img.shields.io/badge/autonomous--mode-enabled-brightgreen" alt="Autonomous Mode">
</p>

<br>

<div align="center">
  <a href="#-the-problem">💡 Problem</a> · <a href="#-the-hierarchy">📊 Hierarchy</a> · <a href="#-installation">📦 Install</a> · <a href="#-how-it-works">⚙️ How It Works</a> · <a href="#-examples">📋 Examples</a> · <a href="#-cli">🖥️ CLI</a> · <a href="#%EF%B8%8F-configuration">🛠 Config</a>
</div>

<br>

---

## 💡 The Problem

> **AI agents instinctively reach for the most powerful tool available. That instinct is usually wrong.**

<table>
  <tr>
    <th>You ask for…</th>
    <th>The agent builds…</th>
    <th>But this works…</th>
  </tr>
  <tr>
    <td>Rename a JSON key</td>
    <td>Node.js script + lodash</td>
    <td><code>jq</code> one-liner</td>
  </tr>
  <tr>
    <td>UI toggle state</td>
    <td>React + Zustand</td>
    <td>CSS <code>:has()</code></td>
  </tr>
  <tr>
    <td>Disk monitoring</td>
    <td>Python + psutil + cron</td>
    <td><code>df | awk</code></td>
  </tr>
  <tr>
    <td>API proxy</td>
    <td>Nginx + Docker</td>
    <td><code>curl</code> + cron</td>
  </tr>
  <tr>
    <td>Log filtering</td>
    <td>Python script</td>
    <td><code>grep</code> + <code>awk</code></td>
  </tr>
</table>

<br>

<p align="center">
  <strong>More power = more complexity.</strong><br>
  More dependencies. More things that break at 3 AM.
</p>

<br>

---

## 📊 The Hierarchy

<p align="center"><em>Choose the simplest tool that does the job.</em></p>

<br>

<table align="center">
  <tr>
    <th>Tier</th>
    <th>Power Level</th>
    <th>Examples</th>
  </tr>
  <tr>
    <td align="center"><strong>0</strong></td>
    <td>Built-in APIs</td>
    <td><code>fetch()</code>, <code>structuredClone()</code>, <code>URL</code>, <code>Intl</code></td>
  </tr>
  <tr>
    <td align="center"><strong>1</strong></td>
    <td>Declarative markup</td>
    <td>HTML, CSS, JSON Schema</td>
  </tr>
  <tr>
    <td align="center"><strong>2</strong></td>
    <td>Declarative logic</td>
    <td>CSS <code>:has()</code>, Jinja, YAML</td>
  </tr>
  <tr>
    <td align="center"><strong>3</strong></td>
    <td>Standard utilities</td>
    <td><code>jq</code>, <code>grep</code>, <code>awk</code>, <code>curl</code></td>
  </tr>
  <tr>
    <td align="center"><strong>4</strong></td>
    <td>Query languages</td>
    <td>SQL, GraphQL, SQLite</td>
  </tr>
  <tr>
    <td align="center"><strong>5</strong></td>
    <td>High-level scripting</td>
    <td>Python, Ruby, shell scripts</td>
  </tr>
  <tr>
    <td align="center"><strong>6</strong></td>
    <td>Application frameworks</td>
    <td>Express, Rails, Django</td>
  </tr>
  <tr>
    <td align="center"><strong>7</strong></td>
    <td>Custom infrastructure</td>
    <td>Kubernetes, service meshes</td>
  </tr>
  <tr>
    <td align="center"><strong>8</strong></td>
    <td>External services</td>
    <td>Zapier, IFTTT, n8n, Make</td>
  </tr>
</table>

<br>

---

## 📦 Installation

<p align="center"><em>One command. Any agent. Instant simplicity enforcement.</em></p>

<br>

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
<summary><strong>Claude Code</strong></summary>

```bash
mkdir -p ~/.claude/commands
cp SKILL.md ~/.claude/commands/simplicity-gate.md
```

</details>

<details>
<summary><strong>OpenCode</strong></summary>

```bash
mkdir -p ~/.config/opencode/skills
cp SKILL.md ~/.config/opencode/skills/simplicity-gate.md
```

</details>

<details>
<summary><strong>Codex</strong></summary>

```bash
mkdir -p ~/.codex/skills
cp SKILL.md ~/.codex/skills/simplicity-gate.md
```

</details>

<details>
<summary><strong>Aider</strong></summary>

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
<summary><strong>Cursor / Windsurf / Cline</strong></summary>

```bash
tail -n +52 SKILL.md > .cursorrules
# Restart editor after copying
```

</details>

<details>
<summary><strong>Continue</strong></summary>

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
<summary><strong>GitHub Copilot</strong></summary>

```bash
mkdir -p .github/copilot-instructions
cp SKILL.md .github/copilot-instructions/simplicity-gate.md
```

</details>

<details>
<summary><strong>Roo Code</strong></summary>

```bash
mkdir -p .roo/skills
cp SKILL.md .roo/skills/simplicity-gate.md
```

</details>

<details>
<summary><strong>Amazon Q</strong></summary>

```bash
mkdir -p .amazonq/rules
cp SKILL.md .amazonq/rules/simplicity-gate.md
```

</details>

<br>

---

## ⚙️ How It Works

<p align="center"><em>From proposal to verdict in under 200ms.</em></p>

<br>

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

<table>
  <tr>
    <th>Verdict</th>
    <th>Meaning</th>
    <th>Example</th>
  </tr>
  <tr>
    <td><strong>PASS</strong></td>
    <td>Appropriate tool selected</td>
    <td><code>PASS: jq selected (Tier 3) for JSON transformation</code></td>
  </tr>
  <tr>
    <td><strong>REJECT</strong></td>
    <td>Over-engineered, use simpler alternative</td>
    <td><code>REJECT: Express.js (Tier 7) for JSON rename — use jq (Tier 3)</code></td>
  </tr>
  <tr>
    <td><strong>WARN</strong></td>
    <td>Borderline, document justification</td>
    <td><code>WARN: React (Tier 6) for simple toggle — CSS :has() (Tier 2) may suffice</code></td>
  </tr>
  <tr>
    <td><strong>ESCALATE</strong></td>
    <td>Requires human judgment</td>
    <td><code>ESCALATE: Custom ORM (Tier 6) vs raw SQL (Tier 4) for complex queries</code></td>
  </tr>
</table>

<br>

---

<p align="center">
  <img src="assets/Gemini_Generated_Image_5rnseu5rnseu5rns-removebg-preview.png" alt="Simplicity Gate Examples" width="400">
</p>

<h2 align="center">📋 Examples</h2>

<p align="center"><em>Real-world scenarios where simpler wins.</em></p>

<br>

<table align="center">
  <tr>
    <th>#</th>
    <th>Task</th>
    <th>Without Gate</th>
    <th>With Gate</th>
    <th>Tier Gap</th>
    <th>Lines Saved</th>
  </tr>
  <tr>
    <td align="center">1</td>
    <td>JSON Reformat</td>
    <td>Node.js + lodash</td>
    <td><code>jq</code> one-liner</td>
    <td align="center">6→3</td>
    <td align="center">39+</td>
  </tr>
  <tr>
    <td align="center">2</td>
    <td>UI Toggle</td>
    <td>React + Zustand</td>
    <td>CSS <code>:has()</code></td>
    <td align="center">6→1</td>
    <td align="center">115+</td>
  </tr>
  <tr>
    <td align="center">3</td>
    <td>Disk Monitor</td>
    <td>Python + psutil</td>
    <td><code>df</code> + <code>awk</code></td>
    <td align="center">6→3</td>
    <td align="center">79+</td>
  </tr>
  <tr>
    <td align="center">4</td>
    <td>Data Query</td>
    <td>Python + pandas</td>
    <td>SQL</td>
    <td align="center">6→4</td>
    <td align="center">22+</td>
  </tr>
  <tr>
    <td align="center">5</td>
    <td>Form Validation</td>
    <td>JavaScript</td>
    <td>HTML5 + CSS</td>
    <td align="center">6→1</td>
    <td align="center">35+</td>
  </tr>
  <tr>
    <td align="center">6</td>
    <td>API Proxy</td>
    <td>Express.js + axios</td>
    <td><code>curl</code></td>
    <td align="center">7→3</td>
    <td align="center">59+</td>
  </tr>
  <tr>
    <td align="center">7</td>
    <td>Build Scripts</td>
    <td>npm + eslint + jest</td>
    <td>Makefile</td>
    <td align="center">6→3</td>
    <td align="center">8+</td>
  </tr>
</table>

<br>

<p align="center">
  <a href="examples/">📖 Full code examples →</a>
</p>

<br>

---

## 🖥️ CLI

<p align="center"><em>Light, fast, zero-dependency command-line tool.</em></p>

<br>

### Install

```bash
# Via npm
npm install -g simplicity-gate

# Or via npx (no install)
npx simplicity-gate eval <file>
```

### Commands

<table>
  <tr>
    <th>Command</th>
    <th>Description</th>
  </tr>
  <tr>
    <td><code>simplicity-gate eval &lt;file&gt;</code></td>
    <td>Evaluate a file's proposal against the tier hierarchy</td>
  </tr>
  <tr>
    <td><code>simplicity-gate scan [dir]</code></td>
    <td>Scan directory for over-engineering patterns</td>
  </tr>
  <tr>
    <td><code>simplicity-gate tiers</code></td>
    <td>Show the tier hierarchy</td>
  </tr>
  <tr>
    <td><code>simplicity-gate bench</code></td>
    <td>Self-benchmark (~400K evals/sec)</td>
  </tr>
</table>

### Example

```bash
$ simplicity-gate eval examples/reformat-json.md

⚡ SIMPLICITY GATE v6.0.0

File:      examples/reformat-json.md
Tool detected: Node.js script
Tier:        Tier 6 — Application frameworks

⚠  ANTI-PATTERNS DETECTED: 3

  [CRITICAL] Tier 6 → use Tier 0
    Use native JS methods or jq for data transforms

  [MEDIUM] Tier 5 → use Tier 3
    Use jq for JSON transformations

  [MEDIUM] Tier 5 → use Tier 3
    Use jq . for pretty-printing

Evaluated in 1.0ms
```

<br>

---

## 🛠️ Configuration

<p align="center"><em>Customize behavior with a project-level config file.</em></p>

<br>

Create `.simplicity-gate.yml` in your project root:

```yaml
# ──────────────────────────────────────────────
# Simplicity Gate Configuration
# ──────────────────────────────────────────────

# Tools that always PASS (even if high-tier)
allowed_tools:
  - "express"

# Tools that always REJECT (even if low-tier)
blocked_tools:
  - "kubernetes"

# Custom tier assignments for your tools
tier_adjustments:
  "my-project-tool": 3

# Tier thresholds
thresholds:
  max_tier: 5
  escalation_threshold: 6

# Feature toggles
settings:
  auto_fix: true              # Include replacement code in REJECT verdicts
  interactive_mode: true      # Ask before applying fixes
  learning_mode: true         # Explain WHY, not just WHAT
  suppressions: true          # Allow inline suppression comments
  multi_file_scan: true       # Check across all project files
  dependency_cost: true       # Show dependency weight in verdicts
  proactive_prevention: true  # Block over-engineering before it's written
  real_world_costs: true      # Show $/month impact of tier violations
  community_patterns: true    # Use community anti-pattern database
  agent_profiling: true       # Track which agents over-engineer
  teaching_mode: true         # Interactive learning mode
  gamification: true          # Simplicity leaderboard
  auto_migration: true        # Scan codebase for old violations
  dependency_weight: true     # Report real dependency costs
```

<br>

---

## 🚀 What's New in v6.0

<table>
  <tr>
    <th>Feature</th>
    <th>What It Does</th>
  </tr>
  <tr>
    <td><strong>🔍 Real-Time Code Review</strong></td>
    <td>Intercepts writes BEFORE they happen, evaluates in real-time</td>
  </tr>
  <tr>
    <td><strong>📚 "Why Not" Database</strong></td>
    <td>20+ real-world incidents proving why over-engineering fails</td>
  </tr>
  <tr>
    <td><strong>⚡ One-Click Fix</strong></td>
    <td>CLI command that auto-applies simpler alternatives</td>
  </tr>
  <tr>
    <td><strong>🤖 Autonomous Mode</strong></td>
    <td>Skill runs entirely without human intervention</td>
  </tr>
  <tr>
    <td><strong>🛡️ Pre-Write Hooks</strong></td>
    <td>Intercepts file writes, edits, imports, and installs</td>
  </tr>
  <tr>
    <td><strong>🔄 Severity-Based Actions</strong></td>
    <td>Automatic response based on violation severity (1-5)</td>
  </tr>
  <tr>
    <td><strong>🔒 Fix Safety Rails</strong></td>
    <td>Backups, test requirements, max changes per session</td>
  </tr>
  <tr>
    <td><strong>📊 Session Summaries</strong></td>
    <td>Autonomous session reports with metrics and learnings</td>
  </tr>
  <tr>
    <td><strong>📜 Fix History</strong></td>
    <td>Complete audit trail of all auto-applied fixes</td>
  </tr>
  <tr>
    <td><strong>⏪ Rollback Capability</strong></td>
    <td>Revert any fix with one command</td>
  </tr>
</table>

<br>

---

## ❓ FAQ

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

<br>

---

## 📈 Impact

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

<br>

---

<p align="center">
  <em>✨ <strong>Simplicity is the ultimate sophistication.</strong> ✨</em><br>
  <sub>— Leonardo da Vinci</sub>
</p>

<br>

<p align="center">
  <a href="CONTRIBUTING.md">Contributing</a> · <a href="SECURITY.md">Security</a> · <a href="CHANGELOG.md">Changelog</a> · <a href="LICENSE">License (MIT)</a>
</p>

<p align="center">
  <sub>Built for AI agents that ship production code.</sub>
</p>
