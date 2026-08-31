---
name: simplicity-gate
version: "2.1.0"
description: >
  Evaluates tool/code proposals against the Rule of Least Power.
  Forces selection of the simplest viable tier. Blocks over-engineering.
triggers:
  - tool_invocation
  - code_generation
  - dependency_addition
  - refactoring_proposal
  - framework_selection
  - architecture_decision
---

# Simplicity Gate

> Choose the least powerful tool that does the job.

## Installation

Copy this file (or its contents) to your agent's config:

| Agent | Config Location | Command |
|-------|----------------|---------|
| **Claude Code** | `CLAUDE.md` | Copy contents below into `CLAUDE.md` in project root |
| **OpenCode** | `.opencode/skills/simplicity-gate.md` | Place this file as-is |
| **Codex** | `CODEX.md` | Copy contents below into `CODEX.md` in project root |
| **Aider** | `--read SKILL.md` or `.aider.conf.yml` | Pass `--read SKILL.md` or add to config |
| **Cursor** | `.cursorrules` | Copy contents below into `.cursorrules` |
| **Windsurf** | `.windsurfrules` | Copy contents below into `.windsurfrules` |
| **Cline** | `.clinerules` | Copy contents below into `.clinerules` |
| **Continue** | `.continue/config.json` | Add rules to your Continue config |
| **GitHub Copilot** | `.github/copilot-instructions.md` | Copy contents below into that file |
| **Roo Code** | `.roo/rules/simplicity-gate.md` | Place this file in `.roo/rules/` |
| **Amazon Q** | `.amazonq/rules/simplicity-gate.md` | Place this file in `.amazonq/rules/` |

**For agents that don't support YAML frontmatter:** Copy everything below the `---` line. The frontmatter is optional metadata — the rules below are the actual skill.

---

## The Rule

Before writing code or adding a dependency, evaluate your proposal against
this hierarchy. Start at Tier 1. Stop at the first tier that works.

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

## Decision Flowchart

```
PROPOSAL RECEIVED
       │
       ▼
Can a platform feature handle it?  ─── YES ──▶ PASS (Tier 1)
       │ NO
       ▼
Can a data format express it?      ─── YES ──▶ PASS (Tier 2)
       │ NO
       ▼
Can a shell command transform it?  ─── YES ──▶ PASS (Tier 3)
       │ NO
       ▼
Can a query language solve it?     ─── YES ──▶ PASS (Tier 4)
       │ NO
       ▼
Can a compiled script do it?       ─── YES ──▶ PASS (Tier 5)
       │ NO
       ▼
Can an interpreted language?       ─── YES ──▶ PASS (Tier 6)
       │ NO
       ▼
Does it need orchestration?        ─── YES ──▶ PASS (Tier 7)
       │ NO
       ▼
  INSUFFICIENT — escalate to human
```

**Never skip tiers without justification.**

## How to Evaluate

1. **State the problem** — what needs to happen?
2. **Check Tier 1** — can a platform feature handle it?
3. **Check Tier 2** — can a data format express it?
4. **Check Tier 3** — can a shell command transform it?
5. **Check Tier 4** — can a query language solve it?
6. **Check Tier 5** — can a compiled script do it?
7. **Check Tier 6** — can an interpreted language do it?
8. **Check Tier 7** — does it need orchestration?

Stop at the first tier that satisfies ALL functional requirements.
If you skip a tier, explain why.

## Rules

These are non-negotiable. Violating them triggers REJECT.

```
1. NO UNNECESSARY RUNTIMES
   Don't add Node.js/Python/Ruby when shell commands or data formats work.

2. NO UNNECESSARY DEPENDENCIES
   Don't add a package when stdlib, a Unix utility, or a platform feature works.

3. NO CODE FOR DATA PROBLEMS
   Don't write scripts to transform/filter/reformat when jq, sed, awk, or CSS works.

4. NO MICROSERVICES FOR SINGLE-MACHINE PROBLEMS
   Don't add containers/orchestration when a local process or cron job works.

5. NO FRAMEWORKS FOR PLAIN SOLUTIONS
   Don't reach for Express/Flask/Django when a simple script or static file works.

6. SCHEMA BEFORE CODE
   If a JSON Schema, YAML schema, or CSS can enforce it — write the schema, not code.

7. TEXT PROCESSING BEFORE PROGRAMMING
   If grep/sed/awk/jq can transform it — use the pipeline, not a script.

8. COMPILE-TIME OVER RUNTIME
   If static analysis can catch the error — prefer it over runtime validation.
```

## Verdicts

| Verdict | Meaning | Action |
|---------|---------|--------|
| PASS | Lowest viable tier chosen | Proceed |
| REJECT | A lower tier works | Must downgrade |
| WARN | Lower tier may work | Check first |
| ESCALATE | Needs human judgment | Present justification |

### PASS Format

```
SIMPLICITY GATE — PASS
Tool:     <tool>
Tier:     <N> — <tier name>
Why:      <why this is the lowest viable tier>
```

### REJECT Format

```
SIMPLICITY GATE — REJECT
Proposed:  <tool> (Tier <N>)
Use instead: <alternative> (Tier <M>)
Why:       <1-2 sentences>
Command:   <exact command/code to use instead>
```

### WARN Format

```
SIMPLICITY GATE — WARN
Proposed:  <tool> (Tier <N>)
Note:      <lower tier> (Tier <M>) may work for <specific requirement>
Check:     <what to verify before proceeding>
```

### ESCALATE Format

```
SIMPLICITY GATE — ESCALATE
Reason:     <why higher tier is needed>
Evidence:   <specific requirement that exceeds lower tier>
Override:   <what you want to do anyway>
```

Escalation requires human approval.

## Rules Quick Reference

```
No unnecessary runtimes?                    → Check if shell/CLI works
No unnecessary dependencies?                → Check if stdlib/Unix tools work
No code for data problems?                  → Check if jq/sed/awk/CSS works
No microservices for single-machine?        → Check if cron/local process works
No frameworks for plain solutions?          → Check if simple script works
Schema before code?                         → Check if JSON Schema/CSS works
Text processing before programming?         → Check if grep/sed/awk works
Compile-time over runtime?                  → Check if static analysis works
```

## Examples

### Node.js for JSON Reformatting → REJECT

**Proposal:** Write a Node.js script to rename keys in a JSON file.

**Analysis:**
- Tier 6 (Node.js): Can do it. Adds runtime + dependency.
- Tier 3 (`jq`): Can do it. Single command, no runtime.

**Verdict:**
```
SIMPLICITY GATE — REJECT
Proposed:  Node.js script (Tier 6)
Use instead: jq (Tier 3)
Why:       jq renames keys and removes fields in one pipeline.
Command:   jq '{new_key: .old_key} | del(.deprecated)' input.json > output.json
```

### React State Machine → REJECT

**Proposal:** Build a React component with useReducer for UI toggles.

**Analysis:**
- Tier 6 (React): Full runtime + state management library.
- Tier 1+2 (CSS + HTML): `:has()` + checkboxes + `data-*` attributes.

**Verdict:**
```
SIMPLICITY GATE — REJECT
Proposed:  React + useReducer + Zustand (Tier 6)
Use instead: CSS :has() + hidden checkboxes (Tier 1+2)
Why:       CSS handles toggle state without JavaScript.
Command:   .panel:has(.toggle:checked) .content { display: block; }
```

### Python Disk Monitor → REJECT (simple) / PASS (complex)

**Simple case:**
```
SIMPLICITY GATE — REJECT
Proposed:  Python script (Tier 6)
Use instead: df + awk + mail (Tier 3)
Command:   df -h | awk 'NR>1 && int($5)>90 {print $6}' | \
           xargs -I{} echo "Alert: {}" | mail -s "Disk Alert" admin@example.com
```

**Complex case (retry logic, templates, multi-recipient):**
```
SIMPLICITY GATE — PASS
Tool:     Python script (Tier 6)
Why:      Requires retry logic, template rendering, and multi-recipient
          routing — features that exceed shell pipeline expressiveness.
```

### YAML Config Validation → WARN

**Proposal:** Write a Python script with pyyaml to validate a YAML config.

**Verdict:**
```
SIMPLICITY GATE — WARN
Proposed:  Python + pyyaml (Tier 6)
Note:      yq (Tier 3) can validate structure with fewer dependencies.
Check:     Does the validation require logic beyond structural checks?
```

## Edge Cases

**"My project already uses Tier 6"**
The gate evaluates *new* additions, not existing infrastructure. Reusing an installed runtime is not adding an unnecessary runtime.

**"The shell version is less readable"**
Readability is not a tier. The gate optimizes for fewer dependencies and less runtime. If the shell version is correct, use it. Document it.

**"I need error handling"**
Shell pipelines have `set -euo pipefail`. `jq` has `--exit-status`. Check if the lower tier's error handling is sufficient before escalating.

**"Cross-platform support"**
If you need Windows, Tier 3 shell commands may not work. Tier 5 or 6 may be necessary. Document this in the ESCALATE verdict.

**"Performance matters"**
If performance is a measured, documented requirement (not a vague preference), Tier 5 may be justified. The gate does not block performance — it blocks *assumed* performance needs.

## Changelog

### v2.1.0
- Added decision flowchart
- Added WARN and ESCALATE verdict formats
- Added edge cases section
- Added rules quick reference
- Expanded agent integration (Roo Code, Amazon Q, Cline VS Code)
- Added installation instructions per agent
- Improved examples with analysis steps

### v2.0.0
- Initial release with 7-tier hierarchy
- 8 non-negotiable rules
- PASS/REJECT verdict system
