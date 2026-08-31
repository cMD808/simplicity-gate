---
name: simplicity-gate
version: "2.0.0"
description: >
  Evaluates tool/code proposals against the Rule of Least Power.
  Forces selection of the simplest viable tier. Blocks over-engineering.
triggers:
  - tool_invocation
  - code_generation
  - dependency_addition
  - refactoring_proposal
---

# Simplicity Gate

> Choose the least powerful tool that does the job.

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

| Verdict   | Meaning                                                 |
|-----------|---------------------------------------------------------|
| PASS      | Lowest viable tier chosen. Proceed.                     |
| REJECT    | A lower tier works. Must downgrade before proceeding.   |
| WARN      | Current tier works, but a lower tier is worth checking. |

### PASS Format

```
✅ SIMPLICITY GATE — PASS
Tool:     <tool>
Tier:     <N> — <tier name>
Why:      <why this is the lowest viable tier>
```

### REJECT Format

```
⚠️ SIMPLICITY GATE — REJECT
Proposed:  <tool> (Tier <N>)
Use instead: <alternative> (Tier <M>)
Why:       <1-2 sentences>
Command:   <exact command/code to use instead>
```

### ESCALATE Format (if you disagree with REJECT)

```
ESCALATION
Reason:     <why higher tier is needed>
Evidence:   <specific requirement that exceeds lower tier>
Override:   <what you want to do anyway>
```

Escalation is logged but requires human approval.

## Examples

### Example 1: Node.js for JSON Reformatting → REJECT

**Proposal:** Write a Node.js script to rename keys in a JSON file.

**Analysis:**
- Tier 6 (Node.js): Can do it. Adds runtime + dependency.
- Tier 3 (`jq`): Can do it. Single command, no runtime.

**Verdict:**
```
⚠️ REJECT
Proposed:  Node.js script (Tier 6)
Use instead: jq (Tier 3)
Why:       jq renames keys and removes fields in one pipeline.
Command:   jq '{new_key: .old_key} | del(.deprecated)' input.json > output.json
```

### Example 2: React State Machine → REJECT

**Proposal:** Build a React component with useReducer for UI toggles.

**Analysis:**
- Tier 6 (React): Can do it. Full runtime + state management library.
- Tier 1+2 (CSS + HTML): Can do it. `:has()` + checkboxes + `data-*` attributes.

**Verdict:**
```
⚠️ REJECT
Proposed:  React + useReducer + Zustand (Tier 6)
Use instead: CSS :has() + hidden checkboxes (Tier 1+2)
Why:       CSS handles toggle state without JavaScript.
Command:   .panel:has(.toggle:checked) .content { display: block; }
```

### Example 3: Python Disk Monitor → PASS (if justified)

**Proposal:** Python script to monitor disk usage and email alerts.

**Analysis:**
- Tier 3 (shell): `df | awk` handles disk check. `mail` sends alert.
- Tier 6 (Python): Needed if retry logic, templates, multi-recipient routing.

**Verdict (simple case):**
```
⚠️ REJECT
Proposed:  Python script (Tier 6)
Use instead: df + awk + mail (Tier 3)
Command:   df -h | awk 'NR>1 && int($5)>90 {print $6}' | xargs -I{} echo "Alert: {}" | mail -s "Disk Alert" admin@example.com
```

**Verdict (complex case):**
```
✅ PASS
Tool:     Python script (Tier 6)
Why:      Requires retry logic, template rendering, and multi-recipient
          routing — features that exceed shell pipeline expressiveness.
```

## Quick Reference

```
Can a platform feature handle it?        → Tier 1
Can a data format express it?            → Tier 2
Can a shell command transform it?        → Tier 3
Can a query language solve it?           → Tier 4
Can a compiled script do it?             → Tier 5
Can an interpreted language do it?       → Tier 6
Does it need orchestration?              → Tier 7

Start at Tier 1. Stop at the first that works.
Never skip tiers without justification.
Prefer built-ins over dependencies.
Prefer data formats over code.
```

## Agent Integration

This skill works with any agent that reads markdown. Copy the rules above
into your agent's instruction file:

| Agent         | File                                          |
|---------------|-----------------------------------------------|
| Claude Code   | `CLAUDE.md` or `.claude/settings.json`          |
| OpenCode      | `.opencode/skills/simplicity-gate.md`           |
| Codex         | `CODEX.md` or instructions config              |
| Aider         | `.aider.conf.yml` or `--read` a markdown file   |
| Cursor        | `.cursorrules`                                 |
| Windsurf      | `.windsurfrules`                               |
| Cline         | `.clinerules`                                  |
| Continue      | `.continue/config.json`                        |
| Copilot       | `.github/copilot-instructions.md`              |

No special syntax needed — just markdown. Any agent that reads files
can use this skill.
