# Simplicity Gate

> The Rule of Least Power enforcer for AI agents.

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

---

## The Problem

AI agents default to the most powerful tool available. Need to rename a JSON key? They reach for Node.js. Want a UI toggle? They scaffold a React component with Zustand. Need a cron job? They spin up Docker containers.

**More power means more complexity.** More dependencies, more runtime, more things that break.

## The Solution

Simplicity Gate evaluates every tool and code proposal against a 7-tier power hierarchy. It forces agents to **start at the lowest tier** and **stop at the first tier that works**.

```
Tier 1 — Platform Features     HTTP headers, CDN, CSS animations, HTML forms
Tier 2 — Data Formats          JSON, YAML, TOML, XML, CSS, Markdown
Tier 3 — Shell / CLI           grep, sed, awk, jq, yq, curl, find, xargs
Tier 4 — Query Languages       SQL, GraphQL, XPath, CSS selectors
Tier 5 — Static Scripting      TypeScript, Go, Rust (compiled, typed)
Tier 6 — Dynamic Languages     Python, Node.js, Ruby (interpreted, mutable)
Tier 7 — Microservices         Kubernetes, Docker, Express, Django
```

**Start at Tier 1. Stop at the first tier that works.**

## Quick Start

Copy the rules from [`SKILL.md`](SKILL.md) into your agent's instruction file:

| Agent         | Config File                                  |
|---------------|----------------------------------------------|
| Claude Code   | `CLAUDE.md`                                  |
| OpenCode      | `.opencode/skills/simplicity-gate.md`         |
| Codex         | `CODEX.md` or instructions config            |
| Aider         | `.aider.conf.yml` or `--read` a markdown file |
| Cursor        | `.cursorrules`                               |
| Windsurf      | `.windsurfrules`                             |
| Cline         | `.clinerules`                                |
| Continue      | `.continue/config.json`                      |
| Copilot       | `.github/copilot-instructions.md`            |

No special syntax — just markdown. Any agent that reads files can use this.

## Verdicts

| Verdict   | Meaning                                                 |
|-----------|---------------------------------------------------------|
| `PASS`    | Lowest viable tier chosen. Proceed.                     |
| `REJECT`  | A lower tier works. Must downgrade before proceeding.   |
| `WARN`    | Current tier works, but a lower tier is worth checking. |

### Example: JSON Reformatting

**Proposal:** Write a Node.js script to rename keys in a JSON file.

```
SIMPLICITY GATE — REJECT
Proposed:     Node.js script (Tier 6)
Use instead:  jq (Tier 3)
Why:          jq renames keys and removes fields in one pipeline.
Command:      jq '{new_key: .old_key} | del(.deprecated)' input.json > output.json
```

### Example: UI Toggle

**Proposal:** Build a React component with `useReducer` for toggle states.

```
SIMPLICITY GATE — REJECT
Proposed:     React + useReducer + Zustand (Tier 6)
Use instead:  CSS :has() + hidden checkboxes (Tier 1+2)
Why:          CSS handles toggle state without JavaScript.
Command:      .panel:has(.toggle:checked) .content { display: block; }
```

### Example: Disk Monitor (Complex)

**Proposal:** Python script with retry logic, templates, and multi-recipient routing.

```
SIMPLICITY GATE — PASS
Tool:     Python script (Tier 6)
Why:      Requires retry logic, template rendering, and multi-recipient
          routing — features that exceed shell pipeline expressiveness.
```

## Rules

These are non-negotiable. Violating them triggers REJECT.

| # | Rule | Why |
|---|------|-----|
| 1 | **No unnecessary runtimes** | Don't add Node.js/Python when shell commands work |
| 2 | **No unnecessary dependencies** | Don't add packages when stdlib or Unix utilities work |
| 3 | **No code for data problems** | Don't write scripts when jq, sed, awk, or CSS works |
| 4 | **No microservices for single-machine problems** | Don't add containers when a cron job works |
| 5 | **No frameworks for plain solutions** | Don't reach for Express/Flask when a simple script works |
| 6 | **Schema before code** | If JSON Schema or CSS can enforce it, write the schema |
| 7 | **Text processing before programming** | If grep/sed/awk can transform it, use the pipeline |
| 8 | **Compile-time over runtime** | If static analysis can catch the error, prefer it |

## Examples

See the [`examples/`](examples/) directory for full walkthroughs:

| Example | Tiers Compared | Verdict |
|---------|---------------|---------|
| [CSS Toggle](examples/css-toggle.md) | React (Tier 6) vs CSS + HTML (Tier 1+2) | REJECT |
| [JSON Reformat](examples/reformat-json.md) | Node.js (Tier 6) vs jq (Tier 3) | REJECT |
| [Disk Monitor](examples/shell-monitor.md) | Python (Tier 6) vs Shell (Tier 3) | PASS (if justified) |

## When Higher Tiers Are Justified

The gate is not anti-complexity — it's anti-unnecessary-complexity. Higher tiers pass when:

| Tier | Justified When |
|------|----------------|
| **5** (Static Scripting) | Type safety is critical, performance matters, or the logic is complex |
| **6** (Dynamic Languages) | External API calls, retry logic, templates, or integration with larger systems |
| **7** (Microservices) | Multi-service orchestration, independent scaling, or polyglot teams |

## Project Structure

```
simplicity-gate/
├── SKILL.md              ← The skill (agents read this)
├── README.md             ← This file
├── CONTRIBUTING.md       ← How to contribute
├── SECURITY.md           ← Security policy
├── LICENSE               ← MIT
└── examples/             ← Walkthrough examples
    ├── css-toggle.md
    ├── reformat-json.md
    └── shell-monitor.md
```

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines. PRs that add new examples, improve verdict logic, or expand agent compatibility are welcome.

## Security

See [SECURITY.md](SECURITY.md) for the security policy.

## License

MIT — see [LICENSE](LICENSE).
