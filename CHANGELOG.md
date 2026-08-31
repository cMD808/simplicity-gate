<p align="center">
  <img src="assets/Gemini_Generated_Image_4d84p04d84p04d84-removebg-preview.png" alt="Simplicity Gate" width="200">
</p>

<h1 align="center">📋 Changelog</h1>

<p align="center">
  <em>All notable changes to Simplicity Gate.</em>
</p>

<br>

---

## [5.0.0] — 2026-08-31

### 🚀 Game-Changing Features

- **Proactive Write Prevention** — Blocks over-engineered code before it's written
- **Real-World Cost Calculator** — Ties tier violations to actual cloud costs ($/month)
- **Community Pattern Library** — Growing database of anti-patterns → alternatives
- **Agent Behavior Profiling** — Tracks which agents over-engineer most
- **Interactive Teaching Mode** — Explains WHY simpler is better, not just WHAT
- **Team Gamification** — Simplicity leaderboard and achievements
- **Auto-Migration** — Scans codebase for old over-engineering
- **Dependency Weight Reporter** — Real dependency costs before adding packages

### ⚡ CLI Tool

- Added `simplicity-gate` CLI — zero-dependency, 408K evals/sec
- Commands: `eval`, `scan`, `tiers`, `bench`, `help`
- Anti-pattern detection with severity scoring
- Directory scanning for over-engineering patterns

### 📦 Package

- Added `package.json` for npm distribution
- `npx simplicity-gate` support

---

## [4.1.0] — 2026-08-30

### 🌐 Language Support

- Added 11 language-specific tiers: JavaScript, TypeScript, Python, Java, C#, PHP, Ruby, Go, Rust, Swift, Kotlin, Scala

### ⚡ Performance

- **Quick-Check Mode** — 50ms evaluation
- **Cached Evaluations** — Reuse results for repeated patterns
- **Early Termination** — Stop processing when verdict is clear

### 🔍 Detection

- **AST Pattern Detection** — Recognize common code patterns
- **Bundle Size Estimation** — Estimate impact on bundle size
- **Security Audit Integration** — Flag security concerns in verdicts
- **Performance Profiling** — Identify performance implications

---

## [4.0.0] — 2026-08-30

### ✨ Features

- **Auto-Fix Mode** — Every REJECT includes copy-pasteable replacement
- **Interactive Mode** — Ask before applying fixes
- **Learning Mode** — Explain WHY not just WHAT
- **Inline Suppressions** — `// simplicity-gate: suppress`
- **Tier 0 (Built-in APIs)** — `fetch()`, `structuredClone()`, `URL`, `Intl`
- **Tier 8 (External Services)** — Zapier, IFTTT, n8n, Make
- **Multi-File Awareness** — Check across project files
- **Dependency Cost Calculator** — Show dependency weight

---

## [3.0.0] — 2026-08-29

### ✨ Features

- **Severity Scoring (1-5)** — Quantify how over-engineered a proposal is
- **Auto-Fix Templates** — Copy-pasteable replacement code
- **Project Context Awareness** — Check what's already installed
- **Cost Estimation** — Token savings per tier
- **Test Coverage for Escalations** — Require test plans
- **Dependency Graph Check** — Verify if dependency exists
- **Performance Benchmarks** — Include benchmark data in verdicts
- **Migration Path Suggestions** — Steps to migrate from over-engineered
- **Team-Specific Overrides** — `.simplicity-gate.yml` config
- **CI/CD Integration** — GitHub Action template
- **Metrics Tracking** — Session summaries with counters
- **Language-Specific Tiers** — Adjusted tiers per language

### 🔧 Auto-Trigger

- Configured auto-trigger on 14 event types

---

## [2.1.0] — 2026-08-28

### ✨ Features

- Decision flowchart
- WARN/ESCALATE verdicts
- Edge case handling
- 4th example (shell monitor)

### 📦 Compatibility

- YAML frontmatter for OpenCode
- Pure markdown body for all agents
- Installation guides for 12 agents

---

## [2.0.0] — 2026-08-27

### ✨ Initial Release

- 9-tier hierarchy (0-8)
- PASS/REJECT verdicts
- 5 example scenarios
- Installation for 11 agents
- MIT License

---

<p align="center">
  <a href="README.md">← Back to README</a>
</p>
