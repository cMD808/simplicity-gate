---
name: Tool Tier Request
about: Request a new tool to be added to the tier hierarchy
title: '[TOOL] '
labels: ['tool-tier', 'needs-triage']
assignees: ''

---

## Tool Information
- **Tool name**: [e.g. "my-new-tool"]
- **Website/Repo**: [URL]
- **Purpose**: What does this tool do?
- **Category**: [Framework / Library / Service / Utility / Runtime]

## Proposed Tier
**Tier**: [0-8]
**Tier Name**: [e.g. "Application frameworks"]

### Tier Definitions (for reference)
- Tier 0: Built-in APIs (fetch, URL, Intl, etc.)
- Tier 1: Declarative markup (HTML, CSS, JSON Schema)
- Tier 2: Declarative logic (CSS :has(), Jinja, YAML)
- Tier 3: Standard utilities (jq, grep, awk, curl, make)
- Tier 4: Query languages (SQL, GraphQL, SQLite)
- Tier 5: High-level scripting (Python, Ruby, Node.js)
- Tier 6: Application frameworks (Express, React, Django)
- Tier 7: Custom infrastructure (Kubernetes, Docker, Terraform)
- Tier 8: External services (Zapier, Stripe, Auth0)

## Justification
Why should this tool be at the proposed tier? What simpler alternatives exist at lower tiers?

## Anti-Pattern Detection
Should this tool trigger an anti-pattern warning when used for simple tasks?

- [ ] Yes - it's commonly overused for simple tasks
- [ ] No - it's appropriately used at its tier

If yes, what's the simpler alternative and its tier?
- **Alternative**: [e.g. "fetch()"]
- **Alternative Tier**: [e.g. 0]
- **Pattern to detect**: [regex or description]

## Language-Specific Tiers
Does this tool have different tiers for different languages?
- [ ] No, same tier for all languages
- [ ] Yes (specify below)

| Language | Tier | Notes |
|----------|------|-------|
| JavaScript | | |
| TypeScript | | |
| Python | | |
| Go | | |
| Rust | | |
| Other | | |

## Configuration Impact
Should this tool be:
- [ ] Blocked in "minimal" preset
- [ ] Have tier adjustment in "frontend" preset
- [ ] Have tier adjustment in "backend" preset
- [ ] Have tier adjustment in "enterprise" preset
- [ ] Other: ___________

## Additional Context
Any other information, benchmarks, or references.