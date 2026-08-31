# Security Policy

## Overview

Simplicity Gate is a markdown-based instruction set for AI agents. It does not execute code, access networks, or handle user data. The security surface is minimal.

## Scope

This project contains:
- **Markdown files** (SKILL.md, README.md, examples) — agent instructions
- **No executable code** — no scripts, no binaries, no runtime
- **No dependencies** — no npm, pip, or package managers
- **No network access** — no API calls, no telemetry

## What Simplicity Gate Does

It tells AI agents to prefer simpler tools. When an agent reads the skill, it evaluates proposals against the tier hierarchy. The agent itself handles execution.

## What Simplicity Gate Does NOT Do

- Execute code on your machine
- Send data to external servers
- Modify files without your explicit instruction
- Access credentials, tokens, or secrets
- Install packages or runtimes

## Supply Chain

This project has zero dependencies. There is no `package.json`, `requirements.txt`, or equivalent. The only external artifact is the MIT license file.

## Threat Model

| Threat | Risk | Mitigation |
|--------|------|------------|
| Malicious markdown injection | Low | Agents read markdown as instructions, not code. Standard markdown cannot execute. |
| Social engineering via examples | Low | Examples show rejected (bad) patterns alongside recommended (good) patterns. |
| Agent misuse of tier advice | Low | The gate restricts what agents do — it never enables new capabilities. |
| Typo-squatting on repo name | Low | Users must explicitly copy SKILL.md into their agent config. |

## Reporting a Vulnerability

If you find a security issue:

1. **Do not** open a public issue
2. Email: [create an issue with `[SECURITY]` prefix](https://github.com/cMD808/simplicity-gate/issues/new?labels=security&title=%5BSECURITY%5D)
3. Include:
   - Description of the issue
   - Steps to reproduce
   - Potential impact
   - Suggested fix (if any)

We will respond within 7 days.

## Agent Security Note

When using Simplicity Gate with an agent:
- The agent still has access to your filesystem and tools
- Simplicity Gate only constrains *which* tools the agent reaches for
- It does not replace your agent's existing permission system
- Review the agent's own security documentation for full threat coverage
