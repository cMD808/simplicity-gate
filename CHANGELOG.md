<p align="center">
  <img src="assets/Gemini_Generated_Image_4d84p04d84p04d84-removebg-preview.png" alt="Simplicity Gate" width="200">
</p>

<h1 align="center">📋 Changelog</h1>

<p align="center">
  <em>All notable changes to Simplicity Gate.</em>
</p>

<br>

---

## [6.1.0] — 2026-08-31

### 🏗️ Structural Improvements

- **Removed Duplicates** — Cleaned up duplicate "The Rule" and "How to Evaluate" sections
- **Quick-Reference Card** — Added single-page cheat sheet with tiers, verdicts, severity, CLI commands
- **Expanded Language Support** — Added 7 new languages: C, C++, Dart, Elixir, Haskell, Julia
- **Skill Chaining** — Shows how Simplicity Gate chains with build, plan, refactor-agent, security-warden, test-strategist
- **Decision Confidence** — Every verdict includes a confidence score (0-100%)
- **AI Anti-Patterns** — 8 common AI over-engineering patterns with evaluation adjustments
- **Major Condensation** — Reduced SKILL.md from 3,119 → 880 lines (72% reduction) with zero feature loss
- **Condensed Rules** — 8 verbose rule tables → single compact table
- **Condensed Changelog** — Full version history → summary table with CHANGELOG.md link
- **Condensed Cost/Severity** — Verbose examples → one-liners

### 📚 Expanded Data

- **Why-Not Database** — Added 11 new real-world incidents (Babel, ESLint, Jenkins, Terraform, Kafka, Elasticsearch, Jest, Webpack, Prisma, Storybook)
- **Community Patterns** — Added 6 new patterns (webpack→Vite, jest→node assert, eslint→Prettier, prisma→raw SQL, redux→useState, docker dev→native tools)

### 🔧 Polish

- **Tightened Rules** — Each rule now has tables showing "Don't Use" vs "Use Instead"
- **Conflict Resolution** — Priority order: Security > Performance > Team convention > The Rule > Simplicity
- **Pattern Submission** — Added format template and verification process
- **New Edge Cases** — 6 new edge cases (AI over-engineering, linting config, browser+Node.js, real-time, performance, shell speed)
- **Troubleshooting** — 8 common issues with solutions
- **Glossary** — 14 terms defined
- **Performance** — Benchmarks table + optimization tips

## [6.0.0] — 2026-08-31

### 🔍 Real-Time Code Review Integration

- **Pre-Write Hook Triggers** — Intercepts file writes, edits, imports, and installs BEFORE they happen
- **Severity-Based Actions** — Automatic response based on violation severity (1-5)
- **Real-Time Evaluation** — Evaluates code in <100ms during write operations
- **IDE Integration** — Works with VS Code, JetBrains, Terminal agents, Git hooks, CI/CD
- **Prevention Matrix** — npm install, require/import, docker run, new endpoints intercepted

### 📚 "Why Not" Database

- **20+ Real-World Incidents** — Left-pad, event-stream, log4j, colors.js, faker.js, and more
- **Searchable Database** — `simplicity-gate why-not <keyword>` to search incidents
- **Pattern Matching** — Links rejected approaches to proven failures
- **Community Contributions** — Teams can add their own over-engineering incidents
- **CVE Tracking** — New vulnerabilities added automatically
- **Deprecation Alerts** — Deprecated packages flagged with replacements

### ⚡ One-Click Fix

- **Auto-Apply Fixes** — `simplicity-gate fix <file>` applies simpler alternatives automatically
- **Recursive Directory Fix** — `simplicity-gate fix src/ --recursive` fixes entire directories
- **Dry Run Mode** — `--dry-run` previews fixes without applying
- **Test Integration** — `--test` runs tests after applying fixes
- **Commit Integration** — `--commit "message"` commits fixes automatically
- **Fix Types** — replace-import, replace-function, remove-dependency, simplify-pattern, inline-function, remove-file
- **Fix Safety** — Backups, test requirements, max changes per session, confirmation for large fixes
- **Fix History** — Complete audit trail of all auto-applied fixes

### 🤖 Autonomous Mode

- **Fully Autonomous** — Skill runs entirely without human intervention
- **Decision Matrix** — Severity ≤3 auto-fix, ≥4 block + require approval
- **Session Summaries** — Autonomous session reports with metrics and learnings
- **Safety Rails** — Max fixes per session, max lines per fix, test requirements
- **Rollback Capability** — `simplicity-gate revert last` reverts any fix
- **Override Learning** — Learns from human overrides to improve future decisions
- **Metrics Tracking** — Tokens saved, deps prevented, lines prevented per session

### ⚡ CLI Tool Updates

- Added `fix` command — one-click auto-fix for files and directories
- Added `why-not` command — search the "Why Not" database
- Added `revert` command — rollback autonomous fixes
- Updated all commands to v6.0.0
- Updated benchmarks (408K evals/sec maintained)

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
