# Simplicity Gate

<p align="center">
  <strong>The Rule of Least Power enforcer for AI agents.</strong><br>
  Stop over-engineering. Start at the lowest tier. Ship less code.
</p>

<p align="center">
  <a href="LICENSE"><img src="https://img.shields.io/badge/License-MIT-blue.svg" alt="License"></a>
  <a href="CONTRIBUTING.md"><img src="https://img.shields.io/badge/PRs-Welcome-brightgreen.svg" alt="PRs Welcome"></a>
  <a href="SKILL.md"><img src="https://img.shields.io/badge/Skill-v2.1.0-orange.svg" alt="Skill Version"></a>
</p>

---

## Why This Exists

AI agents are trained on best practices from large codebases. Their instinct is to reach for the most robust, most powerful tool available. That instinct is usually wrong.

| You ask for... | The agent builds... | But this works... |
|----------------|--------------------|--------------------|
| Rename a JSON key | Node.js script + lodash | `jq` one-liner |
| UI toggle state | React + Zustand + useReducer | CSS `:has()` selector |
| Disk monitoring | Python + psutil + cron | `df \| awk` pipeline |
| Config validation | Express middleware | JSON Schema |
| API proxy | Nginx + Docker | `curl` + cron |

**More power means more complexity.** More dependencies to install. More runtime to manage. More things that break at 3 AM.

Simplicity Gate forces agents to evaluate every proposal against a 7-tier power hierarchy before writing a single line of code.

## The Hierarchy

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

Copy [`SKILL.md`](SKILL.md) into your agent's instruction file. That's it.

<table>
<tr><th>Agent</th><th>Config File</th><th>How to Install</th></tr>
<tr><td><strong>Claude Code</strong></td><td><code>CLAUDE.md</code></td><td>Copy SKILL.md contents into CLAUDE.md in your project root</td></tr>
<tr><td><strong>OpenCode</strong></td><td><code>.opencode/skills/simplicity-gate.md</code></td><td>Place file in .opencode/skills/ directory</td></tr>
<tr><td><strong>Codex</strong></td><td><code>CODEX.md</code></td><td>Copy SKILL.md contents into CODEX.md in your project root</td></tr>
<tr><td><strong>Aider</strong></td><td><code>--read SKILL.md</code></td><td>Pass flag or add to .aider.conf.yml</td></tr>
<tr><td><strong>Cursor</strong></td><td><code>.cursorrules</code></td><td>Copy SKILL.md contents into .cursorrules</td></tr>
<tr><td><strong>Windsurf</strong></td><td><code>.windsurfrules</code></td><td>Copy SKILL.md contents into .windsurfrules</td></tr>
<tr><td><strong>Cline</strong></td><td><code>.clinerules</code></td><td>Copy SKILL.md contents into .clinerules</td></tr>
<tr><td><strong>Continue</strong></td><td><code>.continue/config.json</code></td><td>Add rules to your Continue config</td></tr>
<tr><td><strong>GitHub Copilot</strong></td><td><code>.github/copilot-instructions.md</code></td><td>Copy SKILL.md contents into that file</td></tr>
<tr><td><strong>Roo Code</strong></td><td><code>.roo/rules/simplicity-gate.md</code></td><td>Place file in .roo/rules/ directory</td></tr>
<tr><td><strong>Cline (VS Code)</strong></td><td><code>.clinerules</code></td><td>Copy SKILL.md contents into .clinerules</td></tr>
<tr><td><strong>Amazon Q</strong></td><td><code>.amazonq/rules/simplicity-gate.md</code></td><td>Place file in .amazonq/rules/ directory</td></tr>
</table>

**No special syntax required.** Simplicity Gate is plain markdown. Any agent that reads files can use it.

## How It Works

When your agent proposes a solution, Simplicity Gate evaluates it:

```
PROPOSAL: "Write a Node.js script to rename JSON keys"

Simplicity Gate checks:
  Tier 1 — Can HTTP/HTML handle this?          → No
  Tier 2 — Can a data format express this?     → No
  Tier 3 — Can a shell command transform this? → Yes

VERDICT: REJECT
  Proposed:  Node.js script (Tier 6)
  Use instead: jq (Tier 3)
  Command:   jq '{new_key: .old_key}' input.json > output.json
```

## Verdicts

| Verdict | Meaning | Action Required |
|---------|---------|-----------------|
| `PASS` | Lowest viable tier chosen | Proceed with implementation |
| `REJECT` | A lower tier works | Must downgrade before proceeding |
| `WARN` | Lower tier may work | Check if simpler option suffices |
| `ESCALATE` | Needs human judgment | Present justification for review |

### PASS

```
SIMPLICITY GATE — PASS
Tool:     Python script (Tier 6)
Why:      Requires retry logic, template rendering, and multi-recipient
          routing — features that exceed shell pipeline expressiveness.
```

### REJECT

```
SIMPLICITY GATE — REJECT
Proposed:  Node.js script (Tier 6)
Use instead: jq (Tier 3)
Why:       jq renames keys and removes fields in one pipeline.
Command:   jq '{new_key: .old_key} | del(.deprecated)' input.json > output.json
```

### WARN

```
SIMPLICITY GATE — WARN
Proposed:  Python + pyyaml (Tier 6)
Note:      yq (Tier 3) can validate structure with fewer dependencies.
Check:     Does the validation require logic beyond structural checks?
```

## The Rules

Non-negotiable. Violating them triggers REJECT.

| # | Rule | Violation Example | Correct Approach |
|---|------|-------------------|------------------|
| 1 | **No unnecessary runtimes** | Adding Node.js for JSON processing | Use `jq` |
| 2 | **No unnecessary dependencies** | Installing lodash for `_.get()` | Use native access |
| 3 | **No code for data problems** | Writing a script to filter CSV | Use `awk` or `cut` |
| 4 | **No microservices for single-machine** | Docker for a cron job | Use `crontab` |
| 5 | **No frameworks for plain solutions** | Express for a static file server | Use `python -m http.server` |
| 6 | **Schema before code** | JavaScript form validation | Use JSON Schema |
| 7 | **Text processing before programming** | Python for log parsing | Use `grep`/`sed`/`awk` |
| 8 | **Compile-time over runtime** | Runtime type checking | Use TypeScript or Go |

## When Higher Tiers Are Justified

This is not anti-complexity. It is anti-unnecessary-complexity.

| Tier | Justified When |
|------|----------------|
| **5** (Static) | Type safety is critical, performance is measured and documented, or logic is inherently complex |
| **6** (Dynamic) | External API calls during execution, retry logic, template rendering, or integration with existing runtime |
| **7** (Microservices) | Multi-service orchestration, independent scaling requirements, or polyglot team constraints |

## Examples

Full walkthroughs in [`examples/`](examples/):

| Example | Proposed | Recommended | Verdict | Files |
|---------|----------|-------------|---------|-------|
| JSON Reformatting | Node.js + lodash (T6) | `jq` (T3) | REJECT | [`reformat-json.md`](examples/reformat-json.md) |
| UI Toggle | React + Zustand (T6) | CSS `:has()` (T1+2) | REJECT | [`css-toggle.md`](examples/css-toggle.md) |
| Disk Monitor | Python + psutil (T6) | `df \| awk` (T3) | PASS* | [`shell-monitor.md`](examples/shell-monitor.md) |

*\*PASS when retry logic, templates, or multi-recipient routing are required.*

## Project Structure

```
simplicity-gate/
├── SKILL.md              The skill definition — copy this to your agent
├── README.md             This file
├── CONTRIBUTING.md       Contribution guidelines
├── SECURITY.md           Security policy
├── LICENSE               MIT License
└── examples/
    ├── css-toggle.md     React vs CSS toggle implementation
    ├── reformat-json.md  Node.js vs jq JSON transformation
    └── shell-monitor.md  Python vs shell disk monitoring
```

## Contributing

Contributions welcome. See [CONTRIBUTING.md](CONTRIBUTING.md) for:

- Adding new examples
- Expanding agent compatibility
- Improving verdict logic
- Reporting false PASS/REJECT verdicts

## Security

Simplicity Gate is plain markdown. It does not execute code, access networks, or handle data. See [SECURITY.md](SECURITY.md) for details.

## License

MIT License. See [LICENSE](LICENSE).
