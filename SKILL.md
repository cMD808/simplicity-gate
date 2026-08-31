---
name: simplicity-gate
version: "4.1.0"
description: >
  Evaluates tool/code proposals against the Rule of Least Power.
  Forces selection of the simplest viable tier. Blocks over-engineering.
  Auto-triggers on every code generation, dependency addition, and architecture decision.
  v4.1: 11 language tiers, quick-check mode, AST detection, security audit, bundle estimation.
triggers:
  - tool_invocation
  - code_generation
  - dependency_addition
  - refactoring_proposal
  - framework_selection
  - architecture_decision
  - file_creation
  - package_install
  - npm_install
  - pip_install
  - docker_compose
  - new_endpoint
  - new_component
  - new_function
auto_trigger: true
settings:
  auto_fix: true
  interactive_mode: true
  learning_mode: true
  suppressions: true
  multi_file_scan: true
  dependency_cost: true
  quick_check: true
  cache_evaluations: true
  early_termination: true
  ast_detection: true
  bundle_estimation: true
  security_audit: true
---

# Simplicity Gate v4.1

> Choose the least powerful tool that does the job.

---

## Auto-Trigger Rules

**This skill fires automatically on:**

| Trigger | Example |
|---------|---------|
| Writing new code | "Create a function that...", "Add a script to..." |
| Adding dependencies | "Install express", "Add lodash", "npm install..." |
| Creating files | "Write a file that...", "Create a config for..." |
| Architecture decisions | "We should use...", "Let's add a microservice..." |
| Refactoring proposals | "Refactor this to use...", "Migrate to..." |
| Framework selection | "Should we use React or...", "Which database..." |
| Package installation | Any `npm install`, `pip install`, `cargo add`, `go get` |
| Docker/container creation | "Add a Dockerfile", "Create a compose file..." |
| API endpoint creation | "Add a route for...", "Create an endpoint..." |
| Component creation | "Create a component that...", "Build a UI for..." |

**When triggered, ALWAYS run the gate before proceeding.** Do not skip. Do not assume PASS.

---

## Tier 0 — Built-in APIs

Before Tier 1, check if a built-in platform API already exists:

```
Tier 0 — Built-in APIs
├── fetch()           — HTTP requests (no axios/node-fetch needed)
├── URL               — URL parsing (no url.parse needed)
├── structuredClone() — Deep copy (no lodash.cloneDeep needed)
├── Intl.DateTimeFormat — Date formatting (no moment needed)
├── AbortController   — Request cancellation (no axios cancel needed)
├── crypto.randomUUID — UUID generation (no uuid package needed)
├── File System Access — Local file ops (no fs-extra needed)
└── Web Streams       — Streaming (no stream library needed)
```

**Rule:** If a built-in API does it, don't add a package. Tier 0 is free.

---

## Tier 8 — External Services

For workflow automation, check if a no-code service works:

```
Tier 8 — External Services
├── Zapier       — App integrations, webhooks, triggers
├── IFTTT        — Simple if-this-then-that automations
├── n8n          — Self-hosted workflow automation
├── Make         — Complex multi-step automations
├── Airtable     — Database + forms + automations
└── Notion API   — Docs + databases + automations
```

**Rule:** If Zapier/IFTTT/n8n can do it, don't build a custom integration. Tier 8 > Tier 7.

---

## Inline Suppressions

You can skip evaluation for specific lines using comments:

```javascript
// simplicity-gate: ignore
const data = require('lodash').cloneDeep(obj);  // Gate won't evaluate this

// simplicity-gate: tier-6-approved
const app = express();  // Gate marks this as pre-approved

// sg-ignore
fetch('https://api.example.com');  // Short form also works
```

**Suppression rules:**
- `// simplicity-gate: ignore` — Skip this line entirely
- `// simplicity-gate: tier-N-approved` — Mark as approved at tier N
- `// sg-ignore` — Short form skip
- Suppressions are logged in metrics as `suppressed_count`
- Max 3 suppressions per file; more triggers a WARN

---

## Auto-Fix Mode

When `auto_fix: true` (default), the gate doesn't just suggest — it applies the fix:

```
SIMPLICITY GATE — AUTO-FIX APPLIED
Original:   Node.js script (Tier 6)
Replaced:   jq command (Tier 3)
File:       transform.sh
Severity:   3/5
Tokens:     ~2,000 saved
```

**Auto-fix rules:**
- Severity 1-2: Suggest only, ask user to confirm
- Severity 3: Auto-fix with notification
- Severity 4-5: Auto-fix and block proceeding until confirmed
- Always show what changed before and after

---

## Interactive Mode

When `interactive_mode: true`, REJECTs offer choices instead of just blocking:

```
SIMPLICITY GATE — REJECT [Severity: 3]
Proposed: Express.js (Tier 7) for API proxy

Options:
  1. curl + cron (Tier 3) — simplest, no runtime
  2. Node.js http module (Tier 5) — no dependencies, stays in Node.js
  3. Keep Express (Tier 7) — justify why lower tiers won't work

Type 1, 2, or 3 (or 'override' to skip gate):
```

**Interactive rules:**
- Severity 1-2: Show options, user chooses
- Severity 3-4: Show options, default to simplest
- Severity 5: Block, require explicit override
- User can type `override` to skip any REJECT (logged in metrics)

---

## Learning Mode

When `learning_mode: true`, the gate tracks decisions and adapts:

```yaml
# .simplicity-gate/history.json
{
  "evaluations": [
    {
      "date": "2026-03-15",
      "tool": "react",
      "verdict": "REJECT",
      "severity": 4,
      "override": true,
      "reason": "existing React project",
      "user_choice": 3
    }
  ],
  "patterns": {
    "react_overrides": 5,
    "express_overrides": 3,
    "jq_accepted": 12
  },
  "suggestions": [
    "React is frequently overridden — consider adding to allowed_tools",
    "jq is rarely rejected — tier adjustment not needed"
  ]
}
```

**Learning rules:**
- Track all overrides and user choices
- After 5+ overrides for same tool, suggest adding to `allowed_tools`
- After 10+ accepts for same tool, suggest tier adjustment
- Suggestions appear at session start: "Based on 15 evaluations, consider..."

---

## Multi-File Awareness

When `multi_file_scan: true`, the gate scans the codebase for patterns:

```
MULTI-FILE SCAN RESULTS:
├── JSON parsing found in 3 files (utils/parse.js, api/handler.js, scripts/convert.js)
│   └── Suggestion: Create shared jq script for all 3
├── HTTP requests found in 5 files (all using axios)
│   └── Suggestion: Use fetch() (Tier 0) — remove axios dependency
└── Date formatting found in 4 files (all using moment)
    └── Suggestion: Use Intl.DateTimeFormat (Tier 0) — remove moment dependency
```

**Multi-file rules:**
- Scan imports/dependencies across all files
- Group similar operations
- Suggest centralized solutions
- Show total savings: "Consolidating saves ~15,000 tokens across 12 files"

---

## Dependency Cost Calculator

When evaluating a package, show actual cost:

```
DEPENDENCY COST: lodash
├── Size: 4.2 MB (73.8 KB gzipped)
├── Install time: ~2s
├── Transitive deps: 0
├── Known CVEs: 0
└── Alternative: Native Array methods (0 bytes, 0 deps)

DEPENDENCY COST: moment
├── Size: 2.9 MB (72 KB gzipped)
├── Install time: ~1.5s
├── Transitive deps: 0
├── Known CVEs: 1 (prototype pollution)
└── Alternative: Intl.DateTimeFormat (0 bytes, 0 deps)
```

**Cost rules:**
- Show size, install time, transitive deps, CVEs
- Compare to native/stdlib alternative
- If CVEs exist → REJECT with security note
- If transitive deps > 10 → WARN about bloat

---

## Speed Optimizations

### Quick-Check Mode

For obvious violations, skip the full flowchart:

```
QUICK CHECK (< 100ms):
├── Is it a framework for a one-liner?     → REJECT immediately
├── Is it a runtime for a shell command?   → REJECT immediately
├── Is it a database for a file read?      → REJECT immediately
└── Is it a microservice for a script?     → REJECT immediately
```

**Quick-check patterns:**

| Pattern | Verdict | Time |
|:--------|:--------|:----:|
| Express for `curl` task | REJECT | 50ms |
| React for CSS toggle | REJECT | 50ms |
| Python for `grep` task | REJECT | 50ms |
| Docker for cron job | REJECT | 50ms |
| Node.js for `jq` task | REJECT | 50ms |
| `lodash.cloneDeep` for `structuredClone` | REJECT | 50ms |
| `moment` for `Intl.DateTimeFormat` | REJECT | 50ms |
| `axios` for `fetch` | REJECT | 50ms |

### Cached Evaluations

Cache common patterns to avoid re-evaluation:

```yaml
cache:
  # Pattern → Verdict (instant lookup)
  "express for curl": REJECT
  "react for css toggle": REJECT
  "python for grep": REJECT
  "docker for cron": REJECT
  "lodash for native": REJECT
  "moment for intl": REJECT
  "axios for fetch": REJECT
  
  # Cache TTL: 1 hour
  # Max cache size: 1000 entries
```

### Early Termination

Stop evaluating as soon as a match is found:

```
EARLY TERMINATION:
├── Tier 0 match? → STOP, PASS
├── Tier 1 match? → STOP, PASS
├── Tier 2 match? → STOP, PASS
├── Tier 3 match? → STOP, PASS
└── No match by Tier 7? → ESCALATE
```

**Rule:** Never evaluate all 7 tiers if Tier 1 works. Stop at first match.

---

## Power Features

### AST Pattern Detection

Detect anti-patterns in proposed code:

```
AST PATTERNS DETECTED:
├── JSON.parse(JSON.stringify())     → Use structuredClone()
├── Array.reduce() for simple map    → Use .map()
├── Manual deep clone                → Use structuredClone()
├── require('lodash')                → Use native methods
├── require('moment')                → Use Intl.DateTimeFormat
├── require('axios')                 → Use fetch()
├── setTimeout for intervals         → Use setInterval
├── for...of with break              → Use .find() or .some()
└── Manual retry logic               → Use AbortController + fetch
```

**Rule:** If AST pattern matches, auto-suggest native alternative.

### Bundle Size Estimation

Show impact before adding dependencies:

```
BUNDLE IMPACT:
├── lodash: +73.8 KB gzipped
├── moment: +72.0 KB gzipped
├── axios: +5.3 KB gzipped
├── express: +230 KB (server, not bundled)
├── react: +42 KB gzipped
├── zustand: +1.2 KB gzipped
└── Total: +424.3 KB if all added

NATIVE ALTERNATIVES:
├── structuredClone: 0 KB (built-in)
├── fetch: 0 KB (built-in)
├── URL: 0 KB (built-in)
├── Intl.DateTimeFormat: 0 KB (built-in)
└── Total: 0 KB
```

### Security Audit Integration

Check for known vulnerabilities before adding:

```
SECURITY CHECK: lodash@4.17.21
├── CVE-2021-23337: Command Injection (High)
├── CVE-2020-28500: ReDoS (Medium)
└── Status: 2 vulnerabilities found

RECOMMENDATION: Use native Array methods instead
```

### Performance Profiling Suggestions

When a higher tier is justified, suggest profiling:

```
PERFORMANCE PROFILING:
├── If Tier 6+ justified: Add console.time() markers
├── If Tier 7 justified: Add APM (New Relic, Datadog)
├── If bundle size matters: Run webpack-bundle-analyzer
└── If runtime matters: Run clinic.js or py-spy
```

### Dependency Graph Visualization

Show full dependency tree:

```
DEPENDENCY TREE: express
├── express@4.18.2
│   ├── body-parser@1.20.2
│   │   ├── bytes@3.1.2
│   │   ├── content-type@1.0.5
│   │   ├── debug@2.6.9
│   │   │ └── ms@2.0.0
│   │   ├── depd@2.0.0
│   │   ├── destroy@1.2.0
│   │   ├── http-errors@2.0.0
│   │   │ └── inherits@2.0.4
│   │   ├── iconv-lite@0.4.24
│   │   ├── on-finished@2.4.1
│   │   ├── qs@6.11.0
│   │   ├── raw-body@2.5.2
│   │   └── safe-buffer@5.2.1
│   └── ... (47 total transitive deps)

ALTERNATIVE: curl (0 deps)
```

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

---

## Decision Flowchart

```
PROPOSAL RECEIVED
       │
       ▼
┌─────────────────────────────┐
│ 1. CHECK PROJECT CONTEXT    │
│    What's already installed?│
│    What tier is the project │
│    currently operating at?  │
└─────────────┬───────────────┘
              │
              ▼
┌─────────────────────────────┐
│ 2. CHECK LANGUAGE TIERS     │
│    Is there a language-     │
│    specific override?       │
└─────────────┬───────────────┘
              │
              ▼
┌─────────────────────────────┐
│ 3. CHECK DEPENDENCY GRAPH   │
│    Does the dependency      │
│    already exist?           │
└─────────────┬───────────────┘
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

---

## Severity Scoring

Every REJECT and WARN includes a severity score (1-5) that indicates how
much over-engineering is being proposed.

| Score | Level | Description | Action |
|:-----:|-------|-------------|--------|
| 1 | Minor | 1 tier too high | Suggest alternative |
| 2 | Moderate | 2 tiers too high | Strongly recommend downgrade |
| 3 | Serious | 3 tiers too high | REJECT with replacement |
| 4 | Critical | 4+ tiers too high | REJECT, block proceeding |
| 5 | Absurd | 5+ tiers or completely wrong approach | REJECT, require redesign |

**Severity is calculated as:** `Proposed Tier - Lowest Viable Tier`

**Examples:**
- Shell script (Tier 3) proposed for grep task (Tier 3) → Severity 0 → PASS
- Node.js (Tier 6) proposed for JSON rename (Tier 3) → Severity 3 → REJECT
- Kubernetes (Tier 7) proposed for file watching (Tier 3) → Severity 4 → REJECT
- Microservice architecture (Tier 7) proposed for HTML form (Tier 1) → Severity 6 → Score capped at 5

---

## Project Context Awareness

Before evaluating, check what's already in the project:

```
CONTEXT CHECK:
├── Package manager?      (npm, pip, cargo, go mod)
├── Existing runtimes?    (node, python, ruby already present)
├── Existing frameworks?  (express, flask, react already in use)
├── Build system?         (make, webpack, vite, turbo)
├── CI/CD pipeline?       (GitHub Actions, GitLab CI)
└── Team conventions?     (monorepo, specific tooling)
```

**Rules for context:**

1. **Reusing an installed runtime is NOT adding an unnecessary runtime.**
   If Node.js is already in the project, using it for a new script is Tier 6 — not a violation.

2. **Adding a NEW runtime IS a violation** if a lower tier works.
   Adding Python to a Node.js project for a task shell can do → REJECT.

3. **Framework lock-in is acknowledged, not penalized.**
   If you're already in React, writing a React component is fine. The gate evaluates *new additions*, not existing infrastructure.

4. **Check dependency graph before adding packages.**
   If `lodash` is already installed, using `_.cloneDeep()` is acceptable. Don't add `ramda` for the same thing.

---

## Cost Estimation

Every verdict includes estimated cost savings to quantify the impact.

| Tier | Estimated Tokens | Typical Cost | Notes |
|:----:|:----------------:|:------------:|-------|
| 1 | ~0 | Free | Platform feature, no code |
| 2 | ~0 | Free | Data format, no code |
| 3 | 50-200 | ~$0.001 | Single command |
| 4 | 100-500 | ~$0.002 | Query statement |
| 5 | 500-2K | ~$0.01 | Compiled script |
| 6 | 1K-5K | ~$0.03 | Dynamic language script |
| 7 | 5K-50K | ~$0.10+ | Full service/container |

**In REJECT verdicts, include:**
```
Cost Savings: ~<N> tokens saved by using <lower tier> instead of <proposed tier>
```

---

## Auto-Fix Templates

Every REJECT **must** include a copy-pasteable replacement. No exceptions.

**Format:**
```
SIMPLICITY GATE — REJECT [Severity: <1-5>]
Proposed:    <tool> (Tier <N>)
Use instead: <alternative> (Tier <M>)
Why:         <1-2 sentences>
Command:     <exact command or code to use>

Cost Savings: ~<N> tokens saved

--- AUTO-FIX ---
<Copy-pasteable code/command that replaces the proposed solution>

--- MIGRATION PATH ---
<Steps to migrate if already using the proposed solution>
```

**Examples:**

```
--- AUTO-FIX ---
# Instead of a Node.js script, use jq:
jq '{name: .Name, age: .Age}' users.json > output.json
```

```
--- AUTO-FIX ---
# Instead of a Python validation script, use a JSON Schema:
# Save this as schema.json, then validate with:
# npx ajv validate -s schema.json -d data.json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "properties": {
    "name": { "type": "string" },
    "age": { "type": "integer", "minimum": 0 }
  },
  "required": ["name"]
}
```

---

## Dependency Graph Check

Before adding any dependency, verify:

```
DEPENDENCY CHECK:
├── Does this package already exist in the project?
├── Is there a stdlib alternative?
├── Is there a Unix tool alternative?
├── Does this introduce a new runtime?
├── What are its transitive dependencies?
└── Is this a known security risk?
```

**Rules:**
1. If the dependency already exists → use it, don't add another
2. If stdlib can do it → don't add a package
3. If Unix tools can do it → don't add a package
4. If it introduces a new runtime → REJECT (unless justified)
5. If transitive deps > 10 → WARN about bloat
6. If known CVEs exist → REJECT with security note

---

## Test Coverage for Escalations

If you ESCALATE (requesting a higher tier), you **must** provide:

```
ESCALATION REQUIREMENTS:
├── Test coverage plan for the proposed solution
├── Why lower tier cannot be tested adequately
├── Estimated test count
└── Testing framework to use
```

**Rule:** No escalation without a test plan. The gate assumes untested code is broken code.

---

## Performance Benchmarks in REJECT

When REJECTing a solution, include benchmark data when available:

```
PERFORMANCE COMPARISON:
├── Proposed solution:    ~<X>ms per operation
├── Recommended solution: ~<Y>ms per operation
├── Difference:           <Z>% faster/slower
└── Source:               <benchmark tool or reference>
```

**If no benchmark exists, state:** "No benchmark available — recommend measuring before proceeding."

---

## Migration Path Suggestions

Every REJECT includes migration steps if the proposed solution is already in use:

```
MIGRATION PATH:
1. Identify all files using <proposed tool>
2. Replace with <alternative> in each file
3. Remove <proposed tool> from dependencies
4. Run tests to verify
5. Update documentation
```

---

## Team-Specific Overrides

Teams can define overrides in a `.simplicity-gate.yml` file:

```yaml
# .simplicity-gate.yml
overrides:
  # Allow specific tools at specific tiers
  allow:
    - tool: "react"
      tier: 6
      reason: "Team standard for UI"
      approved_by: "tech-lead"
      date: "2025-01-15"
    
    - tool: "express"
      tier: 7
      reason: "Required for API gateway"
      approved_by: "architect"
      date: "2025-02-01"

  # Block specific tools regardless of tier
  block:
    - tool: "lodash"
      reason: "Use native Array methods instead"
    
    - tool: "moment"
      reason: "Use date-fns or Temporal API"

  # Custom tier adjustments
  tier_adjustments:
    - pattern: "database query"
      override_to: 4
      reason: "Team has SQL expertise"

  # Severity threshold (default: 3)
  # Scores above this auto-REJECT without escalation
  severity_threshold: 3

  # Auto-fix enabled (default: true)
  auto_fix: true

  # Cost estimation enabled (default: true)
  cost_estimation: true
```

**Override rules:**
- Overrides must be approved by tech lead or architect
- Overrides are reviewed quarterly
- Security-related blocks cannot be overridden
- All overrides are logged in the audit trail

---

## Language-Specific Tiers

Some languages have different tier capabilities:

```yaml
language_tiers:
  javascript:
    tier_0: "fetch, URL, structuredClone, Intl, crypto, AbortController"
    tier_1: "CSS animations, HTML forms, Web APIs"
    tier_2: "JSON, YAML, TOML"
    tier_3: "npx, shell commands via child_process"
    tier_4: "SQL via better-sqlite3, JSONPath"
    tier_5: "TypeScript (with tsc)"
    tier_6: "JavaScript (Node.js, Deno, Bun)"
    tier_7: "Express, Fastify, NestJS"

  typescript:
    tier_0: "fetch, URL, structuredClone, Intl, crypto, AbortController"
    tier_1: "CSS animations, HTML forms, Web APIs"
    tier_2: "JSON, YAML, TOML"
    tier_3: "npx, shell commands via child_process"
    tier_4: "SQL via better-sqlite3, JSONPath"
    tier_5: "TypeScript (with tsc)"
    tier_6: "JavaScript (Node.js, Deno, Bun)"
    tier_7: "Express, Fastify, NestJS"

  python:
    tier_0: "urllib, json, pathlib, dataclasses, typing"
    tier_1: "CSS, HTML, Jinja2 templates"
    tier_2: "JSON, YAML, TOML"
    tier_3: "subprocess, os.system"
    tier_4: "SQLite, SQLAlchemy queries"
    tier_5: "Rust (via PyO3), Cython"
    tier_6: "Python (standard)"
    tier_7: "Django, Flask, FastAPI"

  java:
    tier_0: "HttpClient, Files, Path, Record, Switch expressions"
    tier_1: "Thymeleaf, JSP, HTML templates"
    tier_2: "JSON (Jackson), YAML (SnakeYAML)"
    tier_3: "ProcessBuilder, Runtime.exec"
    tier_4: "JDBC, JPA queries"
    tier_5: "Java (compiled, typed)"
    tier_6: "Groovy, Kotlin scripting"
    tier_7: "Spring Boot, Micronaut, Quarkus"

  csharp:
    tier_0: "HttpClient, System.Text.Json, LINQ, Records"
    tier_1: "Razor, Blazor components"
    tier_2: "JSON, YAML, XML"
    tier_3: "Process.Start, Shell commands"
    tier_4: "Entity Framework, LINQ to SQL"
    tier_5: "C# (compiled, typed)"
    tier_6: "IronPython, F# scripting"
    tier_7: "ASP.NET Core, Minimal APIs"

  php:
    tier_0: "file_get_contents, json_encode, filter_var"
    tier_1: "Blade templates, Twig"
    tier_2: "JSON, YAML"
    tier_3: "exec, shell_exec, passthru"
    tier_4: "PDO, MySQLi queries"
    tier_5: "PHP (compiled with opcache)"
    tier_6: "PHP (standard)"
    tier_7: "Laravel, Symfony, Slim"

  ruby:
    tier_0: "Net::HTTP, JSON, Pathname, OpenURI"
    tier_1: "ERB, Slim, Haml templates"
    tier_2: "JSON, YAML"
    tier_3: "system, backticks, Open3"
    tier_4: "ActiveRecord queries"
    tier_5: "Ruby (compiled with YJIT)"
    tier_6: "Ruby (standard)"
    tier_7: "Rails, Sinatra, Hanami"

  go:
    tier_0: "net/http, encoding/json, html/template, os"
    tier_1: "net/http, html/template"
    tier_2: "encoding/json, encoding/xml"
    tier_3: "os/exec"
    tier_4: "database/sql"
    tier_5: "Go (standard)"
    tier_6: "CGo, plugin system"
    tier_7: "gRPC, Kubernetes operator"

  rust:
    tier_0: "reqwest, serde, tokio, std::fs"
    tier_1: "std::process, serde"
    tier_2: "serde_json, toml, yaml"
    tier_3: "std::process::Command"
    tier_4: "rusqlite, sqlx"
    tier_5: "Rust (standard)"
    tier_6: "Dynamic via WASM"
    tier_7: "Actix, Axum, Tonic"

  swift:
    tier_0: "URLSession, Codable, Combine, Foundation"
    tier_1: "SwiftUI, UIKit"
    tier_2: "JSON, YAML, PropertyList"
    tier_3: "Process, shell commands"
    tier_4: "Core Data, GRDB queries"
    tier_5: "Swift (compiled, typed)"
    tier_6: "SwiftScript (via swiftly)"
    tier_7: "Vapor, Kitura"

  kotlin:
    tier_0: "kotlinx.serialization, coroutines, Flow"
    tier_1: "Jetpack Compose, XML layouts"
    tier_2: "JSON, YAML, TOML"
    tier_3: "ProcessBuilder, Runtime.exec"
    tier_4: "Exposed, Ktorm queries"
    tier_5: "Kotlin (compiled, typed)"
    tier_6: "Kotlin Scripting"
    tier_7: "Ktor, Spring Boot, Micronaut"

  scala:
    tier_0: "scala.io, play-json, Cats"
    tier_1: "Play templates, Twirl"
    tier_2: "JSON, YAML, XML"
    tier_3: "sys.process"
    tier_4: "Slick, Doobie queries"
    tier_5: "Scala (compiled, typed)"
    tier_6: "Scala Scripting"
    tier_7: "Play Framework, Akka HTTP, ZIO HTTP"
```

---

## Metrics Tracking

The gate tracks decisions for continuous improvement:

```yaml
metrics:
  # Per-session counters
  total_evaluations: 0
  pass_count: 0
  reject_count: 0
  warn_count: 0
  escalate_count: 0
  
  # Severity distribution
  severity_1: 0
  severity_2: 0
  severity_3: 0
  severity_4: 0
  severity_5: 0
  
  # Cost savings
  total_tokens_saved: 0
  total_cost_saved: "$0.00"
  
  # Most common violations
  top_violations:
    - rule: "No unnecessary runtimes"
      count: 0
    - rule: "No unnecessary dependencies"
      count: 0
    - rule: "No code for data problems"
      count: 0
```

**At session end, report:**
```
SIMPLICITY GATE — SESSION SUMMARY
Evaluations: <N> | PASS: <X> | REJECT: <Y> | WARN: <Z>
Tokens Saved: ~<N> | Cost Saved: ~$<X>
Top Violation: <most common rule broken>
Severity Avg: <average severity score>
```

---

## CI/CD Integration

### GitHub Action

```yaml
# .github/workflows/simplicity-gate.yml
name: Simplicity Gate
on:
  pull_request:
    types: [opened, synchronize]

jobs:
  gate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Check for new dependencies
        run: |
          # Check if package.json changed
          if git diff --name-only HEAD~1 | grep -q "package.json"; then
            echo "⚠️ Package.json changed — running Simplicity Gate"
            # Add your gate logic here
          fi
          
          # Check for new Docker files
          if git diff --name-only HEAD~1 | grep -q "Dockerfile"; then
            echo "⚠️ Dockerfile added — running Simplicity Gate"
          fi
          
          # Check for new framework imports
          if git diff HEAD~1 | grep -q "+.*import.*from.*express\|from.*flask\|from.*django"; then
            echo "⚠️ Framework import detected — running Simplicity Gate"
          fi
```

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

## How to Evaluate

1. **State the problem** — what needs to happen?
2. **Check project context** — what's already installed?
3. **Check language tiers** — any language-specific overrides?
4. **Check dependency graph** — does the dependency already exist?
5. **Check Tier 1** — can a platform feature handle it?
6. **Check Tier 2** — can a data format express it?
7. **Check Tier 3** — can a shell command transform it?
8. **Check Tier 4** — can a query language solve it?
9. **Check Tier 5** — can a compiled script do it?
10. **Check Tier 6** — can an interpreted language do it?
11. **Check Tier 7** — does it need orchestration?

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
| ESCALATE | Needs human judgment | Present justification + test plan |

### PASS Format

```
SIMPLICITY GATE — PASS
Tool:     <tool>
Tier:     <N> — <tier name>
Why:      <why this is the lowest viable tier>
Cost:     ~<N> tokens (already optimal)
```

### REJECT Format

```
SIMPLICITY GATE — REJECT [Severity: <1-5>]
Proposed:    <tool> (Tier <N>)
Use instead: <alternative> (Tier <M>)
Why:         <1-2 sentences>
Command:     <exact command/code to use>
Cost Savings: ~<N> tokens saved

--- AUTO-FIX ---
<Copy-pasteable replacement code>

--- MIGRATION PATH ---
<Steps to migrate if already using the proposed solution>
```

### WARN Format

```
SIMPLICITY GATE — WARN [Severity: <1-5>]
Proposed:  <tool> (Tier <N>)
Note:      <lower tier> (Tier <M>) may work for <specific requirement>
Check:     <what to verify before proceeding>
Savings:   ~<N> tokens if lower tier works
```

### ESCALATE Format

```
SIMPLICITY GATE — ESCALATE
Reason:      <why higher tier is needed>
Evidence:    <specific requirement that exceeds lower tier>
Override:    <what you want to do anyway>
Test Plan:   <how this will be tested>
Cost Impact: ~<N> additional tokens for higher tier
```

Escalation requires human approval and a test plan.

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

### Node.js for JSON Reformatting → REJECT [Severity: 3]

**Proposal:** Write a Node.js script to rename keys in a JSON file.

**Analysis:**
- Tier 6 (Node.js): Can do it. Adds runtime + dependency.
- Tier 3 (`jq`): Can do it. Single command, no runtime.

**Verdict:**
```
SIMPLICITY GATE — REJECT [Severity: 3]
Proposed:    Node.js script (Tier 6)
Use instead: jq (Tier 3)
Why:         jq renames keys and removes fields in one pipeline.
Command:     jq '{new_key: .old_key} | del(.deprecated)' input.json > output.json
Cost Savings: ~2,000 tokens saved

--- AUTO-FIX ---
jq '{new_key: .old_key} | del(.deprecated)' input.json > output.json

--- MIGRATION PATH ---
1. Save the jq command as rename.sh
2. Replace Node.js script calls with: bash rename.sh
3. Remove Node.js script file
4. Remove any npm dependencies used only for this task
```

### React State Machine → REJECT [Severity: 4]

**Proposal:** Build a React component with useReducer for UI toggles.

**Analysis:**
- Tier 6 (React): Full runtime + state management library.
- Tier 1+2 (CSS + HTML): `:has()` + checkboxes + `data-*` attributes.

**Verdict:**
```
SIMPLICITY GATE — REJECT [Severity: 4]
Proposed:    React + useReducer + Zustand (Tier 6)
Use instead: CSS :has() + hidden checkboxes (Tier 1+2)
Why:         CSS handles toggle state without JavaScript.
Command:     .panel:has(.toggle:checked) .content { display: block; }
Cost Savings: ~3,500 tokens saved

--- AUTO-FIX ---
<!-- HTML -->
<label class="toggle">
  <input type="checkbox" class="toggle-input">
  <span class="toggle-label">Show Panel</span>
</label>
<div class="panel">
  <div class="content">Hidden content</div>
</div>

<!-- CSS -->
.panel .content { display: none; }
.panel:has(.toggle:checked) .content { display: block; }

--- MIGRATION PATH ---
1. Create hidden checkbox input
2. Add CSS :has() rule for toggle state
3. Remove React component
4. Remove useReducer/Zustand imports
5. Remove state management dependencies
```

### Python Disk Monitor → REJECT [Severity: 3] (simple) / PASS (complex)

**Simple case:**
```
SIMPLICITY GATE — REJECT [Severity: 3]
Proposed:    Python script (Tier 6)
Use instead: df + awk + mail (Tier 3)
Why:         Shell pipeline handles alerting without Python runtime.
Command:     df -h | awk 'NR>1 && int($5)>90 {print $6}' | xargs -I{} echo "Alert: {}" | mail -s "Disk Alert" admin@example.com
Cost Savings: ~1,500 tokens saved

--- AUTO-FIX ---
df -h | awk 'NR>1 && int($5)>90 {print $6}' | xargs -I{} echo "Alert: {}" | mail -s "Disk Alert" admin@example.com

--- MIGRATION PATH ---
1. Save shell command as disk-monitor.sh
2. Add to crontab: 0 * * * * /path/to/disk-monitor.sh
3. Remove Python script
4. Remove psutil/python dependencies
```

**Complex case (retry logic, templates, multi-recipient):**
```
SIMPLICITY GATE — PASS
Tool:     Python script (Tier 6)
Why:      Requires retry logic, template rendering, and multi-recipient
          routing — features that exceed shell pipeline expressiveness.
Cost:     ~1,500 tokens (already optimal for this complexity)
```

### YAML Config Validation → WARN [Severity: 2]

**Proposal:** Write a Python script with pyyaml to validate a YAML config.

**Verdict:**
```
SIMPLICITY GATE — WARN [Severity: 2]
Proposed:  Python + pyyaml (Tier 6)
Note:      yq (Tier 3) can validate structure with fewer dependencies.
Check:     Does the validation require logic beyond structural checks?
Savings:   ~1,000 tokens if yq works

--- AUTO-FIX ---
# Validate YAML structure with yq:
yq eval '.' config.yaml > /dev/null 2>&1 && echo "Valid" || echo "Invalid"

# If you need schema validation:
yq eval -o=json config.yaml | jq empty && echo "Valid JSON structure"
```

### SQL for Data Analysis → PASS [Severity: 0]

**Proposal:** Use SQL to analyze user behavior data.

**Analysis:**
- Tier 4 (SQL): Query language, designed for data analysis.
- No lower tier can express complex aggregations.

**Verdict:**
```
SIMPLICITY GATE — PASS
Tool:     SQL query (Tier 4)
Why:      SQL is the lowest tier that can express GROUP BY, JOIN, and aggregations.
Cost:     ~200 tokens (already optimal)
```

### Make vs npm Scripts → WARN [Severity: 1]

**Proposal:** Use npm scripts instead of Make for build automation.

**Analysis:**
- Tier 3 (Make): Build automation, dependency tracking, cross-platform via make.
- Tier 6 (npm scripts): Node.js required, but already in project.

**Verdict:**
```
SIMPLICITY GATE — WARN [Severity: 1]
Proposed:  npm scripts (Tier 6, but Node.js already in project)
Note:      Make (Tier 3) is simpler, but npm scripts work if Node.js is present.
Check:     Is Make available on all target platforms? If yes, use Make.
Savings:   ~100 tokens with Make

--- AUTO-FIX ---
# If Make is available:
make build    # instead of npm run build
make test     # instead of npm test
make lint     # instead of npm run lint

# If Node.js is required for other reasons, npm scripts are acceptable.
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

**"Team already decided on a framework"**
Check `.simplicity-gate.yml` for overrides. If the framework is approved, it's allowed. The gate evaluates *new additions*, not existing team decisions.

**"This is a one-off script"**
One-off scripts still follow the hierarchy. If jq can do it, use jq — even for a one-off.

**"I need to integrate with an API"**
Check if curl (Tier 3) can handle the integration. Only escalate to Tier 6 if you need persistent connections, connection pooling, or complex retry logic.

## Changelog

### v4.1.0
- Added 7 new language tiers: TypeScript, Java, C#, PHP, Ruby, Swift, Kotlin, Scala
- Added Tier 0 built-in APIs for all languages
- Added Quick-Check Mode — skip full flowchart for obvious violations (< 100ms)
- Added Cached Evaluations — instant lookup for common patterns
- Added Early Termination — stop at first tier match
- Added AST Pattern Detection — detect anti-patterns in code
- Added Bundle Size Estimation — show impact before adding deps
- Added Security Audit Integration — check CVEs before adding packages
- Added Performance Profiling Suggestions — recommend tools when higher tier justified
- Added Dependency Graph Visualization — show full transitive tree

### v4.0.0
- Added Tier 0 (Built-in APIs) — fetch, structuredClone, URL, Intl
- Added Tier 8 (External Services) — Zapier, IFTTT, n8n, Make
- Added inline suppressions — `// simplicity-gate: ignore` comments
- Added auto-fix mode — applies replacements automatically
- Added interactive mode — choice-based REJECTs with options
- Added learning mode — tracks overrides, suggests custom tiers
- Added multi-file awareness — scans codebase for patterns
- Added dependency cost calculator — size, CVEs, transitive deps

### v3.0.0
- Added auto-trigger rules — skill fires on every code generation, dependency addition, and architecture decision
- Added severity scoring (1-5) for REJECT and WARN verdicts
- Added auto-fix templates — every REJECT includes copy-pasteable replacement
- Added project context awareness — check what's already installed
- Added cost estimation — token savings per tier
- Added test coverage requirement for escalations
- Added dependency graph check — verify before adding packages
- Added performance benchmarks in REJECT
- Added migration path suggestions
- Added team-specific overrides via `.simplicity-gate.yml`
- Added CI/CD integration (GitHub Action)
- Added metrics tracking — session summaries and violation counts
- Added language-specific tiers (JS, Python, Go, Rust)
- Expanded examples with severity scores and auto-fix templates
- Added decision flowchart with context checks

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
