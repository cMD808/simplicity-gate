---
name: simplicity-gate
version: "6.1.0"
description: >
  Evaluates tool/code proposals against the Rule of Least Power.
  Forces selection of the simplest viable tier. Blocks over-engineering.
  Auto-triggers on code generation, dependency addition, architecture decisions.
triggers:
  - tool_invocation - code_generation - dependency_addition
  - refactoring_proposal - framework_selection - architecture_decision
  - file_creation - package_install - npm_install - pip_install
  - docker_compose - new_endpoint - new_component - new_function
  - write_operation - file_edit - shell_command
  - pre_write_hook - code_review - pull_request
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
  proactive_prevention: true
  real_world_costs: true
  community_patterns: true
  agent_profiling: true
  teaching_mode: true
  gamification: true
  auto_migration: true
  dependency_weight: true
  real_time_review: true
  why_not_database: true
  one_click_fix: true
  autonomous_mode: true
---

# Simplicity Gate v6.1

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

| API | Replaces | Token Savings |
|-----|----------|---------------|
| `fetch()` | axios, node-fetch | ~1,000 |
| `URL` | url.parse | ~200 |
| `structuredClone()` | lodash.cloneDeep | ~500 |
| `Intl.DateTimeFormat` | moment, date-fns | ~1,500 |
| `AbortController` | axios cancel | ~300 |
| `crypto.randomUUID` | uuid package | ~400 |
| File System Access | fs-extra | ~600 |
| Web Streams | stream library | ~800 |

**Rule:** If a built-in API does it, don't add a package. Tier 0 is free.

---

## Tier 8 — External Services

For workflow automation, check if a no-code service works:

| Service | Best For | Replaces |
|---------|----------|----------|
| Zapier | App integrations, webhooks | Custom API integrations |
| IFTTT | Simple if-this-then-that | Simple scripts |
| n8n | Self-hosted workflows | Docker + cron |
| Make | Complex multi-step | Microservices |
| Airtable | Database + forms + automations | Custom CRUD apps |
| Notion API | Docs + databases | Custom admin panels |

**Rule:** If Zapier/IFTTT/n8n can do it, don't build a custom integration. Tier 8 > Tier 7.

---

## Inline Suppressions

Skip evaluation for specific lines with comments:

- `// simplicity-gate: ignore` — Skip this line
- `// simplicity-gate: tier-N-approved` — Pre-approved at tier N
- `// sg-ignore` — Short form

**Rules:** Max 3 suppressions per file; more triggers a WARN. All suppressions logged as `suppressed_count`.

---

## Auto-Fix Mode

When `auto_fix: true` (default), the gate applies fixes automatically:

| Severity | Action |
|----------|--------|
| 1-2 | Suggest only, ask user to confirm |
| 3 | Auto-fix with notification |
| 4-5 | Block proceeding until confirmed |

Always shows before/after comparison.

---

## Interactive Mode

When `interactive_mode: true`, REJECTs offer numbered choices:

```
Options:
  1. curl + cron (Tier 3) — simplest, no runtime
  2. Node.js http module (Tier 5) — stays in Node.js
  3. Keep Express (Tier 7) — justify why lower tiers won't work
```

User can type `override` to skip any REJECT (logged in metrics).

---

## Learning Mode

When `learning_mode: true`, tracks decisions and adapts:

- Tracks all overrides and user choices
- After 5+ overrides for same tool → suggests adding to `allowed_tools`
- After 10+ accepts for same tool → suggests tier adjustment
- Suggestions appear at session start

---

## Multi-File Awareness

When `multi_file_scan: true`, scans codebase for patterns:

```
JSON parsing found in 3 files → Suggestion: shared jq script
HTTP requests in 5 files (all axios) → Suggestion: fetch() (Tier 0)
Date formatting in 4 files (all moment) → Suggestion: Intl.DateTimeFormat (Tier 0)
Total savings: ~15,000 tokens across 12 files
```

---

## Dependency Cost Calculator

Shows actual cost before adding packages:

| Package | Size | Deps | CVEs | Alternative |
|---------|------|:----:|:----:|-------------|
| lodash | 4.2 MB | 0 | 2 | Native Array methods (0 bytes) |
| moment | 2.9 MB | 0 | 1 | Intl.DateTimeFormat (0 bytes) |
| axios | 1.1 MB | 12 | 0 | fetch() (0 bytes) |

If CVEs exist → REJECT with security note. If transitive deps > 10 → WARN about bloat.

---

## Speed Optimizations

### Quick-Check Mode

For obvious violations, skip the full flowchart:

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

Cache common patterns for instant lookup. TTL: 1 hour. Max: 1000 entries.

### Early Termination

Stop evaluating as soon as a match is found. Never evaluate all 7 tiers if Tier 1 works.

---

## Power Features

| Feature | Description |
|---------|-------------|
| **AST Pattern Detection** | Detects anti-patterns like `JSON.parse(JSON.stringify())`, `require('lodash')`, manual deep clones |
| **Bundle Size Estimation** | Shows gzipped impact before adding deps (e.g., lodash +73.8KB vs native 0KB) |
| **Security Audit** | Checks CVEs before adding (e.g., lodash has 2 CVEs, use native Array instead) |
| **Performance Profiling** | Suggests `console.time()`, APM tools, bundle analyzers when higher tier justified |
| **Dependency Graph** | Shows full transitive tree (e.g., express = 47 transitive deps vs curl = 0) |

---

## Game-Changing Features

### 1. Proactive Write Prevention

**Blocks over-engineered code BEFORE it's written, not after.**

Intercepts file writes, package installs, imports, and Docker commands. Agent must choose the simpler alternative or ESCALATE with justification.

| Trigger | Action |
|---------|--------|
| `npm install <high-tier>` | Block install, suggest alternative |
| `require('express')` for proxy | Block import, suggest curl |
| `import React` for simple toggle | Block import, suggest CSS |
| `from django` for API endpoint | Block, suggest Flask or curl |
| `docker run` for cron job | Block, suggest native cron |

| Mode | Behavior |
|------|----------|
| `strict` | BLOCK the write, require alternative |
| `warn` | Show warning, allow override with reason |
| `off` | Log only, never block |

**Flow:** Agent attempts write → Gate intercepts → Evaluate tier → If violation → BLOCK + suggest alternative → Agent chooses or ESCALATE

---

### 2. Real-World Cost Calculator

**Ties tier violations to actual cloud costs, bandwidth, and maintenance burden.**

Every verdict includes monthly/annual cost comparison (AWS/GCP/Azure pricing + $75/hr maintenance). Example: Express.js (Tier 7) for proxy → $186/mo vs curl (Tier 3) → $0/mo = $2,234/yr saved.

---

### 3. Community Pattern Library

**Growing database of anti-patterns → simpler alternatives, contributed by the community.**

| ID | Anti-Pattern | Alternative | Gap | Saved |
|----|-------------|-------------|:---:|------:|
| `react-toggle-css` | React + useState for show/hide | CSS :has() + checkbox | 6 | 3,500 |
| `express-proxy-curl` | Express.js for API proxy | curl + cron | 4 | 2,000 |
| `lodash-native` | lodash cloneDeep/map/filter | structuredClone, Array methods | 6 | 1,500 |
| `moment-intl` | moment.js formatting | Intl.DateTimeFormat | 6 | 2,000 |
| `axios-fetch` | axios HTTP requests | fetch() API | 6 | 1,000 |
| `docker-cron` | Docker for scheduled tasks | System crontab | 4 | 5,000 |
| `webpack-vite` | Webpack bundling | Vite (25x faster) | 1 | 2,000 |
| `jest-assert` | Jest for simple utils | node:assert | 6 | 1,500 |
| `eslint-prettier` | 500-line ESLint config | Prettier | 1 | 3,000 |
| `prisma-raw-sql` | Prisma ORM for SQLite | raw SQL | 3 | 2,500 |
| `redux-zustand` | Redux for todo app | useState + useContext | 2 | 4,000 |
| `docker-dev` | Docker Compose for dev | Native package manager | 4 | 3,000 |
| `nextjs-static` | Next.js for static site | npx serve / Vite + static | 4 | 4,000 |
| `supabase-sqlite` | Supabase for simple local DB | SQLite + raw SQL | 4 | 3,000 |
| `tailwind-css` | Tailwind for 5 CSS rules | Native CSS variables | 2 | 1,500 |
| `trpc-rest` | tRPC for 3 endpoints | REST + fetch | 2 | 2,000 |
| `authjs-simple` | NextAuth for email/password only | Native crypto + cookies | 3 | 2,500 |
| `vercel-func` | Vercel Functions for cron | GitHub Actions + curl | 4 | 1,500 |
| `prisma-sqlite` | Prisma for 3-table SQLite | better-sqlite3 / raw SQL | 3 | 2,000 |
| `axios-instance` | axios instance for 1 endpoint | fetch + helper | 5 | 1,000 |
| `zustand-props` | Zustand for 2 props | useState + Context | 4 | 1,500 |
| `graphql-simple` | GraphQL for 5 fields | REST + query params | 4 | 2,000 |
| `k8s-static` | Kubernetes for static site | Static hosting (Netlify/Vercel) | 5 | 5,000 |
| `redis-cache` | Redis for <1000 rows | In-memory Map + TTL | 4 | 2,000 |

Contributions via PR with before/after code + token savings. Verified by maintainers.

---

### 4. Agent Behavior Profiling

**Tracks which AI agents over-engineer most and creates a simplicity leaderboard.**

| Agent | Score | Pass Rate | Top Violation | Trend |
|-------|:-----:|:---------:|---------------|:-----:|
| codestral | 81 | 81% | Using moment.js | ↑ |
| claude-3.5-sonnet | 72 | 72% | Express for simple APIs | ↑ |
| gpt-4-turbo | 65 | 65% | React for CSS-only tasks | → |
| gemini-pro | 58 | 58% | Unnecessary dependencies | ↓ |

Tracks: simplicity_score (0-100), pass/reject/warn rates, avg severity, top violations, trend. Profiles update per session, shareable across sessions.

---

### 5. Interactive Teaching Mode

**Don't just fix it — teach the agent WHY simpler is better.**

3 teaching styles: `socratic` (questions), `direct` (tell), `example-based` (show). Triggers on severity ≥ 3, repeat offenses, and new patterns. Example: "Express is for web apps with routing/middleware. curl does HTTP requests in one command — no runtime needed."

---

### 6. Team Gamification

**Gamifies simplicity — teams compete for the highest simplicity scores.**

| Achievement | Trigger |
|-------------|---------|
| First PASS ✓ | First suggestion that passes |
| On Fire 🔥 | 5 consecutive sessions without REJECT |
| Unstoppable ⚡ | 10 consecutive sessions |
| Simplicity Master 👑 | 20 consecutive sessions |
| CSS Champion 🎨 | Zero React for simple tasks |
| Native Ninja 🥷 | Zero lodash imports |
| Cost Cutter 💰 | Saved $100+ in cloud costs |

Monthly resets with all-time records preserved. Team leads can customize achievements.

---

### 7. Auto-Migration

**Scans codebase for old over-engineering and suggests migration to simpler alternatives.**

3 strategies: `safe` (one at a time, tests between), `batch` (similar patterns at once), `aggressive` (everything). Auto-backup + test verification after each migration. Reports: files scanned, instances found, token savings, migration plan.

---

### 8. Dependency Weight Reporter

**Shows real dependency costs before adding packages — size, transitive deps, CVEs, maintenance burden.**

Always show before adding a dependency. Compare to alternatives. Include annual cost projection ($75/hr maintenance rate). Flag unmaintained/deprecated packages.

---

## Real-Time Code Review Integration

**Evaluates code BEFORE it's written. Every write, edit, and import is intercepted and evaluated in real-time.**

Intercepts: `write()`, `edit()`, `npm install`, `import/require`, `docker run`, `git commit`.

| Severity | Action | Agent Response |
|----------|--------|----------------|
| 1 (Minor) | Allow with note | Continue, log |
| 2 (Moderate) | Allow + warning | Continue, show warning |
| 3 (Serious) | Block + suggest fix | Must apply or override |
| 4 (Critical) | Block + require approval | Cannot proceed |
| 5 (Absurd) | Block + require redesign | Must redesign |

Integrates with: VS Code/Zed (inline warnings), JetBrains (inspection badges), Terminal agents (blocks before write), Git hooks (pre-commit scan), CI/CD (blocks PRs).

---

## "Why Not" Database

**Every REJECT includes a real-world incident that proves why the rejected approach is dangerous.**

### The Database

| Anti-Pattern | Incident | Year | Lesson |
|-------------|----------|:----:|--------|
| `left-pad` | 11 chars broke thousands of npm packages | 2016 | Tiny deps cause cascading failures |
| `event-stream` | Malicious code in unused dep, stole crypto | 2018 | Every unused dep is an attack vector |
| `log4j` | RCE via logging, affected millions of servers | 2021 | "Simple" deps can have catastrophic CVEs |
| `colors.js` | Maintainer intentionally broke packages in protest | 2022 | Single-point-of-failure in dep chain |
| `faker.js` | Same maintainer destroyed his own library | 2022 | Trusted deps can become untrusted overnight |
| `ua-parser-js` | Cryptominer injected, 7M+ weekly downloads | 2021 | Popular ≠ safe |
| `coa` / `rc` | Malicious injection, 10M+ weekly downloads | 2021 | Supply chain attacks increasing |
| `node-ipc` | Protestware targeting specific countries | 2022 | Deps can have political motives |
| `moment.js` | Deprecated, 68KB for what `Date` does natively | 2020 | Deprecated = security liability |
| `request` | Deprecated, no security patches since 2019 | 2019 | Deprecated = vulnerable |
| `webpack` | 5s cold starts, Vite does it in 200ms | 2023 | Build tools can be over-engineered |
| `Redux` | 47 files for todo app, React state = 1 line | 2023 | State management can be massively over-engineered |
| `Express` | 47-line proxy for what curl does in 1 command | 2023 | HTTP clients can be over-engineered |
| `Docker` | Container for cron, native cron = 2 lines | 2023 | Containers can be over-engineered for scheduling |
| `Kubernetes` | 15 YAML files for static site, `npx serve` works | 2023 | Orchestration can be over-engineered for serving |
| `GraphQL` | 200-line schema for 3 fields, REST = 20 lines | 2023 | API layers can be over-engineered |
| `Microservices` | 12 services for CRUD, monolith is faster | 2023 | Architecture can be over-engineered |
| `Redis` | In-memory cache for 100-row table, `Map` = 1 line | 2023 | Caching can be over-engineered |
| `Prisma` | ORM for 3-table SQLite, raw SQL works | 2023 | ORMs can be over-engineered for simple schemas |
| `Jenkins` | Full CI for 3 shell scripts, GitHub Actions suffices | 2023 | CI can be over-provisioned |
| `Terraform` | IaC for single static site on S3, AWS CLI works | 2023 | IaC can be over-engineered for simple infra |

### Accessing

`simplicity-gate why-not <keyword>` | `--tier <N>` | `--year <YYYY>`

---

## One-Click Fix

**Every REJECT includes a one-click fix that automatically applies the simpler alternative.**

**Commands:** `simplicity-gate fix <file>` | `fix <dir> --recursive` | `fix --dry-run` | `fix --test` | `fix --commit "msg"`

| Fix Type | Description | Example |
|----------|-------------|---------|
| `replace-import` | Replace package with native | `moment` → `Date` |
| `replace-function` | Replace with simpler call | `_.get()` → `?.` |
| `remove-dependency` | Remove unused dep | Remove `left-pad` |
| `simplify-pattern` | Replace complex with simple | `Redux` → `useState` |
| `inline-function` | Inline small utility | `import { x }` → `const x = ...` |
| `remove-file` | Delete unnecessary file | Remove `Dockerfile` for native cron |

Safety: auto-backup, test-after-fix, max 10 files per fix, confirmation for 50+ line changes. Every fix logged for audit.

---

## Autonomous Mode

**The skill runs entirely without human intervention. Evaluates, blocks, fixes, and learns — all automatically.**

| Severity | Action | Human Needed? |
|----------|--------|:-------------:|
| 1 | Allow + log | No |
| 2 | Allow + warn | No |
| 3 | Auto-fix + notify | No |
| 4 | Block + require approval | Yes |
| 5 | Block + require redesign | Yes |

**Workflow:** Monitor → Evaluate → Decide → Act → Learn → Report. Decision speed <100ms. Fix application <1s.

**Safety rails:** Max 20 auto-fixes/session, max 50 lines/fix, test-pass requirement, severity threshold, override tracking, rollback via `simplicity-gate revert last`.

---

## The Rule (with Decision Flowchart)

Before writing code or adding a dependency, evaluate your proposal against
this hierarchy. Start at Tier 0. Stop at the first tier that works.

```
Tier 0 — Built-in APIs         fetch, URL, structuredClone, Intl, AbortController, crypto.randomUUID, File System Access, Web Streams
Tier 1 — Declarative Markup    HTML, CSS, JSON Schema, HTML forms, CSS animations
Tier 2 — Declarative Logic     CSS :has(), Jinja, YAML conditions, XPath, CSS selectors
Tier 3 — Standard Utilities    jq, grep, awk, sed, yq, curl, find, xargs, make, bash
Tier 4 — Query Languages       SQL, GraphQL, SQLite, Prisma
Tier 5 — High-level Scripting  Python, Ruby, Node.js, Perl, PHP
Tier 6 — Application Frameworks Express, React, Django, axios, lodash, jest, webpack, Vite
Tier 7 — Custom Infrastructure Kubernetes, Docker, Terraform, Nginx, Redis, Kafka
Tier 8 — External Services     Zapier, n8n, Make, Airtable, Twilio, Stripe, SendGrid, Auth0
```

**Flowchart:**
```
PROPOSAL → Context → Language Tiers → Dependency Graph
  → Tier 0 (built-in API)? → PASS
  → Tier 1 (declarative markup)? → PASS
  → Tier 2 (declarative logic)? → PASS
  → Tier 3 (standard utility)? → PASS
  → Tier 4 (query language)? → PASS
  → Tier 5 (high-level scripting)? → PASS
  → Tier 6 (application framework)? → PASS
  → Tier 7 (custom infrastructure)? → PASS
  → Tier 8 (external service)? → PASS
  → INSUFFICIENT → ESCALATE
```

**Start at Tier 0. Stop at the first tier that works. Never skip tiers without justification.**

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

**Severity = Proposed Tier - Lowest Viable Tier.** Examples: Node.js for grep → Severity 3 (REJECT). K8s for file watching → Severity 4 (REJECT). Microservice for HTML form → Severity 5 (REJECT).

---

## Project Context Awareness

Before evaluating, check: package manager, existing runtimes, existing frameworks, build system, CI/CD, team conventions.

**Rules:** Reusing installed runtime = NOT adding unnecessary runtime. Adding NEW runtime = violation if lower tier works. Framework lock-in = acknowledged, not penalized. Check dependency graph before adding packages.

---

## Cost Estimation

Every verdict includes estimated cost savings. Tokens: Tier 1-2=free, 3=50-200, 4=100-500, 5=500-2K, 6=1K-5K, 7=5K-50K. Format: `Cost Savings: ~<N> tokens saved by using <lower tier>`.

---

## Auto-Fix Templates

Every REJECT **must** include a copy-pasteable replacement. Format: `REJECT [Severity: N]` + Proposed/Use instead/Why/Command/Cost Savings/AUTO-FIX/MIGRATION PATH.

**Example:** `--- AUTO-FIX --- # Instead of Node.js script, use jq: jq '{name: .Name, age: .Age}' users.json > output.json`

---

## Dependency Graph Check

Before adding any dependency, verify: already in project? stdlib alternative? Unix tool alternative? new runtime? transitive deps > 10? known CVEs?

**Rules:** Already exists → use it. Stdlib can do it → don't add. Unix tools can do it → don't add. New runtime → REJECT. Transitive deps > 10 → WARN. Known CVEs → REJECT.

---

## Test Coverage for Escalations

If ESCALATING, provide: test coverage plan, why lower tier can't be tested, estimated test count, testing framework. No escalation without a test plan.

---

## Performance Benchmarks in REJECT

When REJECTing, include benchmark data when available: proposed solution ~Xms, recommended ~Yms, difference Z% faster/slower. If no benchmark: "No benchmark available — recommend measuring before proceeding."

---

## Migration Path Suggestions

Every REJECT includes: identify all files using proposed tool → replace with alternative → remove from dependencies → run tests → update documentation.

---

## Team-Specific Overrides

Teams can define overrides in a `.simplicity-gate.yml` file:

```yaml
# .simplicity-gate.yml
overrides:
  allow: [{tool: "react", tier: 6, reason: "Team standard"}, {tool: "express", tier: 7, reason: "API gateway"}]
  block: [{tool: "lodash", reason: "Use native Array methods"}, {tool: "moment", reason: "Use Temporal API"}]
  tier_adjustments: [{pattern: "database query", override_to: 4}]
  severity_threshold: 3
  auto_fix: true
  cost_estimation: true
```

**Override rules:**
- Overrides must be approved by tech lead or architect
- Overrides are reviewed quarterly
- Security-related blocks cannot be overridden
- All overrides are logged in the audit trail

---

## Language-Specific Tiers

Each language has different built-in capabilities. The table below shows what's available at each tier — use it to find the lowest viable tier for your language.

| Language | Tier 0 (Built-in) | Tier 3 (CLI/Shell) | Tier 7 (Frameworks) |
|----------|-------------------|-------------------|---------------------|
| **JavaScript** | fetch, URL, structuredClone, Intl, crypto | npx, child_process | Express, Fastify, NestJS |
| **TypeScript** | fetch, URL, structuredClone, Intl, crypto | npx, child_process | Express, Fastify, NestJS |
| **Python** | urllib, json, pathlib, dataclasses, typing | subprocess, os.system | Django, Flask, FastAPI |
| **Java** | HttpClient, Files, Path, Record, Switch | ProcessBuilder, Runtime.exec | Spring Boot, Micronaut |
| **C#** | HttpClient, System.Text.Json, LINQ, Records | Process.Start, Shell | ASP.NET Core, Minimal APIs |
| **PHP** | file_get_contents, json_encode, filter_var | exec, shell_exec, passthru | Laravel, Symfony, Slim |
| **Ruby** | Net::HTTP, JSON, Pathname, OpenURI | system, backticks, Open3 | Rails, Sinatra, Hanami |
| **Go** | net/http, encoding/json, html/template, os | os/exec | gRPC, Kubernetes operator |
| **Rust** | reqwest, serde, tokio, std::fs | std::process::Command | Actix, Axum, Tonic |
| **Swift** | URLSession, Codable, Combine, Foundation | Process, shell commands | Vapor, Kitura |
| **Kotlin** | kotlinx.serialization, coroutines, Flow | ProcessBuilder, Runtime.exec | Ktor, Spring Boot, Micronaut |
| **Scala** | scala.io, play-json, Cats | sys.process | Play Framework, Akka HTTP |
| **C** | libc, POSIX APIs, stdio, dirent | popen, system, exec | libmicrohttpd, nginx modules |
| **C++** | std::filesystem, std::optional, std::format | popen, std::system | Crow, Drogon, oat++ |
| **Dart** | dart:io, dart:convert, dart:async | Process.run, io | Shelf, Aqueduct, Dart Frog |
| **Elixir** | Enum, File, Path, Jason, Date | System.cmd, :os.cmd | Phoenix, Bandit |
| **Haskell** | base, bytestring, text, aeson, filepath | System.Process, Shell | Servant, Yesod, Warp |
| **Julia** | Base, JSON3, Downloads, HTTP | run, pipeline, read | Genie, Franklin, Oxygen |

> **Key insight:** Tier 0 = built-in stdlib. Always check here first — most languages have HTTP, JSON, filesystem, and process management built in.

---

## Metrics Tracking

Tracks per-session: total_evaluations, pass/reject/warn/escalate counts, severity distribution (1-5), total_tokens_saved, total_cost_saved, top_violations.

**Session end report:** `Evaluations: N | PASS: X | REJECT: Y | WARN: Z | Tokens Saved: ~N | Cost Saved: ~$X | Top Violation: <rule>`

---

## CI/CD Integration

### GitHub Action

```yaml
# .github/workflows/simplicity-gate.yml
name: Simplicity Gate
on: pull_request: [opened, synchronize]
jobs:
  gate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: |
          if git diff --name-only HEAD~1 | grep -q "package.json|Dockerfile"; then
            echo "Dependency change detected — running gate check"
          fi
```

---

## Quick-Reference Card

| Tier | Type | Examples |
|------|------|----------|
| 0 | Built-in APIs | fetch, structuredClone, Intl |
| 1 | Platform Features | CSS, HTML, Web APIs |
| 2 | Data Formats | JSON, YAML, TOML |
| 3 | Shell/CLI | grep, sed, awk, curl |
| 4 | Query Languages | SQL, GraphQL |
| 5 | Static Scripting | TypeScript, Go, Rust |
| 6 | Dynamic Languages | Python, Node.js, Ruby |
| 7 | Microservices | Kubernetes, Docker, Express |
| 8 | External Services | Zapier, IFTTT, n8n |

**Verdicts:** PASS (proceed) | REJECT (downgrade) | WARN (check) | ESCALATE (human)
**Severity:** 1=minor 2=moderate 3=serious 4=critical 5=absurd
**Quick-Check (<100ms):** Framework for one-liner? → REJECT. Runtime for shell? → REJECT. Database for file read? → REJECT.
**Autonomous:** severity ≤3 = auto-fix | ≥4 = block + ask
**Suppress:** `// simplicity-gate: ignore` or `// sg-ignore` (max 3/file)
**CLI:** `simplicity-gate eval <code>` | `fix <file>` | `scan <dir>` | `why-not <keyword>` | `bench` | `profile <file>`

---

## One-Page Cheatsheet

**The entire gate in one glance:**

```
TASK → Can Tier 0 (built-in) do it? → YES → PASS
       NO → Can Tier 1 (HTML/CSS) do it? → YES → PASS
       NO → Can Tier 2 (data formats) do it? → YES → PASS
       NO → Can Tier 3 (shell/cli) do it? → YES → PASS
       NO → Can Tier 4 (SQL) do it? → YES → PASS
       NO → Can Tier 5 (script) do it? → YES → PASS
       NO → Can Tier 6 (framework) do it? → YES → PASS
       NO → Can Tier 7 (infra) do it? → YES → PASS
       NO → Can Tier 8 (no-code) do it? → YES → PASS
       NO → ESCALATE
```

**Instant tier check for common tasks:**
| Task | Lowest Tier | Anti-Pattern (Too High) |
|------|-------------|-------------------------|
| HTTP request | 0 (`fetch`) | axios, node-fetch, request |
| JSON transform | 3 (`jq`) | Node.js script, lodash |
| Date format | 0 (`Intl.DateTimeFormat`) | moment, date-fns, dayjs |
| UUID | 0 (`crypto.randomUUID`) | uuid, nanoid |
| File read/write | 0 (File System Access) | fs-extra, fs, node fs |
| CSS toggle | 1+2 (`:has()` + checkbox) | React + useState, Zustand |
| API proxy | 3 (`curl`) | Express, Fastify, nginx |
| Scheduled task | 3 (`cron`) | Docker, K8s, bull, node-cron |
| Static site | 3 (`npx serve`) | Next.js, Vite, webpack |
| Simple DB | 4 (SQLite) | Prisma, MongoDB, Supabase |
| Form submit | 1 (`<form>`) | React + axios + validation lib |
| Email | 5 (sendmail) | nodemailer, SendGrid SDK |

**Verdict meanings:**
- **PASS** = Proceed (lowest viable tier chosen)
- **WARN** = Check first (lower tier *might* work)
- **REJECT** = Must downgrade (lower tier *does* work)
- **ESCALATE** = Human needed (justification + test plan)

**Severity = Proposed Tier - Lowest Viable Tier** (1-5, higher = worse)

**Quick-Check (50ms):** Framework for one-liner? Runtime for shell? Database for file? → REJECT

**Suppression:** `// simplicity-gate: ignore` | `// sg-ignore` (max 3/file)

**CLI:** `eval <file>` | `fix <file>` | `scan <dir>` | `why-not <term>` | `bench` | `tiers`

---

## Practical Decision Tree

**Common scenarios → immediate tier decision:**

```
IS IT A DATA TASK? (transform, filter, reformat, extract)
  → Tier 3: jq, awk, sed, grep
  → NOT: Node.js, Python, lodash

IS IT AN HTTP TASK? (fetch, proxy, webhook, API call)
  → Tier 0: fetch()
  → Tier 3: curl
  → NOT: axios, express, fastify

IS IT A UI TOGGLE/SHOW-HIDE? (tabs, dropdown, modal, accordion)
  → Tier 1+2: CSS :has() + hidden checkbox
  → NOT: React, Vue, Svelte, Zustand, Redux

IS IT A SCHEDULED TASK? (cron, daily, hourly, cleanup)
  → Tier 3: crontab, systemd timer
  → NOT: Docker, Kubernetes, bull, node-cron

IS IT A STATIC SITE? (blog, docs, landing page, portfolio)
  → Tier 3: npx serve, static hosting
  → NOT: Next.js, Gatsby, Astro, Remix

IS IT A SIMPLE DATABASE? (<10 tables, local, simple queries)
  → Tier 4: SQLite + raw SQL
  → NOT: Prisma, Supabase, MongoDB, PostgreSQL

IS IT A FORM SUBMISSION? (contact, signup, feedback)
  → Tier 1: <form action="/api"> + native validation
  → NOT: React Hook Form, Zod, Yup, axios

IS IT AUTHENTICATION? (login, signup, session)
  → Tier 5: Native crypto + httpOnly cookies
  → NOT: NextAuth, Auth.js, Clerk, Firebase Auth (unless SSO/OAuth)

IS IT FILE PROCESSING? (read, write, transform, convert)
  → Tier 0: File System Access API
  → Tier 3: jq, sed, awk, ImageMagick, ffmpeg
  → NOT: fs-extra, sharp, custom Node scripts

IS IT DATE/TIME? (format, parse, timezone, diff)
  → Tier 0: Intl.DateTimeFormat, Temporal API
  → NOT: moment, date-fns, dayjs, luxon

IS IT UNIQUE IDs?
  → Tier 0: crypto.randomUUID()
  → NOT: uuid, nanoid, shortid

IS IT TEXT SEARCH/REPLACE?
  → Tier 3: grep, sed, awk, ripgrep
  → NOT: Python scripts, Node.js, ripgrep-js

IS IT CACHING? (<1000 items, simple TTL)
  → Tier 5: Map/Object + setTimeout
  → NOT: Redis, Memcached, LRU cache libs

IS IT REAL-TIME? (WebSocket, SSE, live updates)
  → Tier 6: Native WebSocket / SSE
  → NOT: Socket.io, Pusher, Ably (unless scaling needed)

DEFAULT: Start at Tier 0, work up. If unsure → ESCALATE.
```

---

## When in Doubt — Heuristic Rules

**Quick mental shortcuts for edge cases:**

| Situation | Heuristic | Default Action |
|-----------|-----------|----------------|
| "But it's just one file" | One file ≠ one tier. Check the task, not the file count. | REJECT if lower tier works |
| "We might need it later" | YAGNI. Build for now, migrate when needed. | REJECT speculative complexity |
| "The team knows React" | Team familiarity ≠ tier justification. Document in overrides. | WARN → check `.simplicity-gate.yml` |
| "It's more readable" | Readability is not a tier. Simpler code is often more readable. | REJECT if lower tier works |
| "We need error handling" | `set -euo pipefail`, `jq --exit-status`, `|| exit 1` work in shell. | Check lower tier first |
| "Cross-platform" | Tier 5 (TypeScript) *may* be justified for Windows. Document in ESCALATE. | ESCALATE with reason |
| "Performance matters" | Only if measured. "Assumed fast" ≠ fast. Benchmark first. | ESCALATE with data |
| "Type safety" | JSDoc + TS compile-time = Tier 5. Runtime validation = Tier 6. | Tier 5 for prod, Tier 0/3 for scripts |
| "It's a one-off script" | One-offs still follow hierarchy. If `jq` works, use `jq`. | REJECT if lower tier works |
| "But it's an API integration" | Start with `curl`. Escalate only for pooling/persistent connections. | Tier 0/3 first |
| "Real-time updates" | WebSocket/SSE = Tier 6+. Don't assume you need real-time. Polling = Tier 3. | Check if polling works |
| "Shell is too slow" | Only if measured <1s. If shell <1s, keep shell. | Measure first |
| "Strict linting config" | Add override in `.simplicity-gate.yml`. Team conventions win. | Allow with override |
| "Browser + Node.js" | Evaluate each environment separately. Browser has fetch, Node has fs. | Split by environment |

**Meta-heuristic:** If you're arguing for a higher tier, you're probably over-engineering. The burden of proof is on the higher tier.

---

## Rules

**Non-negotiable. Violating them triggers REJECT.**

| # | Rule | Don't Use | Use Instead |
|:-:|------|-----------|-------------|
| 1 | **No Unnecessary Runtimes** | Node.js/Python/Ruby for simple tasks | `jq`, `grep`, `awk`, `curl`, `sed` |
| 2 | **No Unnecessary Dependencies** | lodash, moment, axios, uuid, express, nodemailer | Native APIs: Array methods, Intl, fetch, crypto, http, mail |
| 3 | **No Code for Data Problems** | Scripts to transform/filter/reformat | jq, sed, awk, CSS |
| 4 | **No Microservices for Single-Machine** | Docker/K8s for cron, static sites, CRUD | crontab, npx serve, monolith |
| 5 | **No Frameworks for Plain Solutions** | Express/Flask/Django for simple tasks | curl, HTML forms, static hosting, CSS |
| 6 | **Schema Before Code** | Custom validators, CSS-in-JS, TS for simple objects | JSON Schema, plain CSS, JSDoc |
| 7 | **Text Processing Before Programming** | Scripts for text manipulation | grep, sed, awk, jq pipeline |
| 8 | **Compile-Time Over Runtime** | Runtime type checking, linting, validation | TS compile-time, ESLint in CI, JSON Schema |

**Exception:** If the project already uses the runtime AND the task is complex enough to justify it. Document in `.simplicity-gate.yml`.

## Verdicts

| Verdict | Meaning | Action |
|---------|---------|--------|
| PASS | Lowest viable tier chosen | Proceed |
| REJECT | Lower tier works | Must downgrade |
| WARN | Lower tier may work | Check first |
| ESCALATE | Needs human judgment | Present justification + test plan |

**REJECT format:** `SIMPLICITY GATE — REJECT [Severity: N]` + Proposed/Use instead/Why/Command/Cost Savings/AUTO-FIX/MIGRATION PATH
**WARN format:** `SIMPLICITY GATE — WARN [Severity: N]` + Proposed/Note/Check/Savings
**ESCALATE format:** Reason/Evidence/Override/Test Plan/Cost Impact. Requires human approval.
**PASS format:** Tool/Tier/Why/Cost. Proceed.

## Skill Chaining

| Chain | Steps |
|-------|-------|
| Code Gen | simplicity-gate → build → quality-gate |
| Refactoring | simplicity-gate → refactor-agent → self-verify |
| Architecture | simplicity-gate → plan → build |
| Security | simplicity-gate → security-warden → build |
| Testing | simplicity-gate → test-strategist → self-verify |

Rule: Simplicity Gate runs FIRST — block over-engineering before code is written.
- If gate says REJECT, do not proceed to build/plan until resolved
- If gate says PASS, proceed with confidence
- If gate says ESCALATE, resolve with human before proceeding
- Security-warden always runs after dependency changes

---

## Decision Confidence

Every verdict includes a confidence score (0-100%) indicating how certain the gate is about its decision.

| Confidence | Level | Meaning |
|:----------:|-------|---------|
| 95-100% | Certain | Clear anti-pattern, well-established alternative |
| 80-94% | High | Strong evidence, minor edge cases possible |
| 60-79% | Medium | Reasonable judgment, context-dependent |
| 40-59% | Low | Insufficient data, human review recommended |
| <40% | Unknown | Cannot determine, escalate to human |

**How confidence is calculated:** Pattern match strength (0-30), Alternative availability (0-25), Historical data (0-20), Community verification (0-15), Language-specific knowledge (0-10).

**Confidence in verdicts:** `REJECT [Severity: 3] [Confidence: 92%]` — well-established pattern, exact alternative exists.

**Confidence rules:** Below 60% → add "RECOMMEND: Verify with team". Below 40% → auto-ESCALATE. Confidence improves over time. Community-verified patterns always 80%+.

---

## AI Agent Anti-Patterns

AI coding agents have specific over-engineering tendencies. This section addresses them directly.

### Common AI Over-Engineering Patterns

| Pattern | Why AI Does It | Gate Response |
|---------|---------------|---------------|
| "Let me create a full Express server" | Training data has many Express examples | REJECT: curl/http module simpler |
| "I'll add Redux for state management" | React ecosystem bias in training | REJECT: useState/useContext simpler |
| "Let me set up a Docker container" | Docker appears in many tutorials | REJECT: native cron/scripts simpler |
| "I'll use a microservices architecture" | Enterprise patterns in training data | REJECT: monolith for simple apps |
| "Let me add TypeScript for type safety" | Type safety is over-recommended | WARN: JS sufficient for small scripts |
| "I'll create a custom build pipeline" | Build tool examples are common | REJECT: make/npm scripts simpler |
| "Let me add a logging library" | Winston/Pino appear frequently | REJECT: console.log for simple needs |
| "I'll use an ORM for database access" | ORM examples dominate tutorials | REJECT: raw SQL/SQLite simpler |

### AI-Specific Evaluation Adjustments

When AI suggests a framework → apply stricter evaluation. When AI suggests a library → check if native exists first. When AI suggests architecture patterns → question necessity. When AI adds "just in case" code → reject it.

### AI Teaching Patterns

When the gate catches AI over-engineering: **Agent proposed X → Why AI thought this (training data bias) → Correct thinking (what's the simplest tool?) → Lesson (when to use each tier).** Example: Express for proxy → "Express appears in 40% of Node.js training data" → curl does HTTP in 1 command → "When AI suggests a framework, ask: Can a CLI tool do this?"

---

## Examples

### Node.js for JSON Reformatting → REJECT [Severity: 3]

| | |
|---|---|
| **Proposed** | Node.js script (Tier 6) |
| **Use instead** | jq (Tier 3) — single command, no runtime |
| **Command** | `jq '{new_key: .old_key}' input.json > output.json` |
| **Savings** | ~2,000 tokens |
| **Migration** | Save as rename.sh → replace script calls → remove Node.js deps |

### React State Machine → REJECT [Severity: 4]

| | |
|---|---|
| **Proposed** | React + useReducer + Zustand (Tier 6) |
| **Use instead** | CSS :has() + hidden checkboxes (Tier 1+2) |
| **Command** | `.panel:has(.toggle:checked) .content { display: block; }` |
| **Savings** | ~3,500 tokens |
| **Migration** | Create checkbox → add CSS :has() → remove React + state deps |

### Disk Monitor → REJECT [Severity: 3] (simple) / PASS (complex)

| | |
|---|---|
| **Proposed** | Python + psutil (Tier 6) |
| **Use instead** | df + awk + mail (Tier 3) |
| **Command** | `df -h \| awk 'NR>1 && int($5)>90' \| mail -s "Alert" admin@example.com` |
| **Savings** | ~1,500 tokens |
| **Migration** | Save as disk-monitor.sh → add to crontab → remove Python |
| **Complex** | PASS — retry logic, templates, multi-recipient justify Tier 6 |

### YAML Validation → WARN [Severity: 2]

| | |
|---|---|
| **Proposed** | Python + pyyaml (Tier 6) |
| **Note** | yq (Tier 3) can validate structure with fewer deps |
| **Auto-Fix** | `yq eval '.' config.yaml > /dev/null && echo "Valid"` |

### SQL for Analysis → PASS [Severity: 0]

SQL (Tier 4) is the lowest tier for GROUP BY, JOIN, aggregations. Already optimal.

### Make vs npm → WARN [Severity: 1]

Make (Tier 3) is simpler, but npm scripts work if Node.js is present. Check platform availability.

### Express Proxy → REJECT [Severity: 4]

| | |
|---|---|
| **Proposed** | Express.js API proxy (Tier 7) |
| **Use instead** | curl + cron (Tier 3) |
| **Savings** | ~2,000 tokens + $186/yr cloud costs |
| **Why-Not** | Express proxy = 47 lines. curl = 1 command. (Why-Not: Express 2023) |

## Edge Cases

| Situation | Guidance |
|-----------|----------|
| Project already uses Tier 6 | Gate evaluates *new additions*, not existing infrastructure |
| Shell version less readable | Readability is not a tier. Use it, document it |
| Need error handling | `set -euo pipefail`, `jq --exit-status` — check lower tier first |
| Cross-platform support | Tier 5/6 may be necessary for Windows. Document in ESCALATE |
| Performance matters | Only if measured/benchmarked. Gate blocks *assumed* needs |
| Team chose a framework | Check `.simplicity-gate.yml` overrides. Existing decisions are allowed |
| One-off script | Still follow hierarchy. If jq works, use jq |
| API integration | Start with curl. Escalate only for persistent connections/pooling |
| AI over-engineering | Gate exists because of this. Use AI Anti-Patterns section |
| Strict ESLint config | Add override in `.simplicity-gate.yml`. Team conventions win |
| Browser + Node.js | Evaluate each environment separately |
| Real-time updates | WebSocket/SSE justifies Tier 6+. Don't assume you need real-time |
| Shell too slow | Only if measured. Escalate with benchmark data |
| Linting config conflict | Override in config. Document team convention |

## Conflict Resolution

Priority order: **Security > Measured performance > Team convention > The Rule > Simplicity**

| Conflict | Resolution |
|----------|------------|
| Shell slow vs Node.js heavy | Measure first. If shell <1s, keep shell |
| Team uses Express vs curl works | Allow Express if documented in overrides |
| Performance needed vs no benchmarks | ESCALATE — requires measured evidence |
| Cross-platform vs shell commands | Tier 5 (TypeScript) may be justified |
| Type safety vs over-engineering | Tier 5 for production, Tier 6 for scripts |

## Troubleshooting

| Problem | Solution |
|---------|----------|
| Skill doesn't fire | Check `auto_trigger: true` in frontmatter. Verify triggers match your action. |
| False REJECT on valid code | Add `// simplicity-gate: ignore` with reason. Max 3 per file. |
| Slow evaluation | Enable Quick-Check mode. Check if cached evaluation is hitting. |
| Wrong tier for language | Check Language-Specific Tiers table. Override in `.simplicity-gate.yml`. |
| Auto-fix breaks code | Run `simplicity-gate revert last`. Use `--dry-run` first. |
| CLI not found | Run `npm install -g simplicity-gate` or `npx simplicity-gate`. |
| Agent ignores skill | Ensure skill is loaded (check agent config). Restart agent session. |
| Team disagrees on tiers | Use `.simplicity-gate.yml` overrides. Document team conventions. |

## Glossary

| Term | Definition |
|------|------------|
| **Tier** | A level in the 0-8 hierarchy. Lower = simpler. |
| **The Rule** | Start at Tier 1. Stop at first match. Lowest viable tier wins. |
| **REJECT** | Verdict: a lower tier works. Must downgrade. |
| **PASS** | Verdict: lowest viable tier already chosen. Proceed. |
| **WARN** | Verdict: lower tier may work. Check first. |
| **ESCALATE** | Verdict: needs human judgment. Present justification + test plan. |
| **Severity** | 1-5 score. 1=minor, 5=absurd. Calculated as Proposed Tier - Lowest Viable Tier. |
| **Quick-Check** | <100ms evaluation for obvious violations. |
| **Auto-Fix** | Automatic code replacement for severity 1-3. |
| **Autonomous Mode** | Skill runs without human intervention. Severity ≤3 auto-fix, ≥4 block. |
| **Pre-Write Hook** | Intercepts code writes BEFORE they happen. |
| **Why-Not Database** | Real-world incidents proving over-engineering fails. |
| **Community Patterns** | Shared anti-pattern → alternative mappings. |
| **Inline Suppression** | `// simplicity-gate: ignore` to skip evaluation. Max 3/file. |

## Performance

Simplicity Gate is designed for speed:

| Operation | Time | How |
|-----------|------|-----|
| Quick-Check | <100ms | Pattern match on known anti-patterns |
| Full evaluation | <500ms | Decision flowchart + tier lookup |
| Cached evaluation | <10ms | Lookup in evaluation cache |
| CLI scan | <2s | Directory scan + anti-pattern detection |
| Pre-write hook | <50ms | Severity-based interception |

**Optimization tips:**
- Enable Quick-Check for obvious violations
- Use cached evaluations for repeated patterns
- Set Early Termination to stop at first tier match
- Limit scan depth for large directories

## Changelog

| Version | Key Changes |
|---------|-------------|
| **v6.1.0** | Condensed Community Patterns & Language Tiers. Added Troubleshooting, Glossary, Performance sections. Removed duplicates. |
| **v6.0.0** | Real-Time Code Review, Why-Not Database, One-Click Fix, Autonomous Mode, Pre-Write Hooks, Quick-Reference Card, 7 new languages, Skill Chaining, AI Anti-Patterns, Conflict Resolution |
| **v5.0.0** | Proactive Write Prevention, Cost Calculator, Community Patterns, Agent Profiling, Teaching Mode, Gamification, Auto-Migration, Dependency Weight |
| **v4.1.0** | 7 language tiers, Quick-Check Mode, Cached Evaluations, AST Detection, Bundle Estimation, Security Audit, Performance Profiling, Dep Graph |
| **v4.0.0** | Tier 0 (Built-in APIs), Tier 8 (External Services), Inline Suppressions, Auto-Fix, Interactive/Learning Modes, Multi-File Scan, Dep Cost Calculator |
| **v3.0.0** | Auto-Trigger, Severity Scoring, Auto-Fix Templates, Project Context, Cost Estimation, CI/CD Integration, Metrics Tracking, Language Tiers |
| **v2.1.0** | Decision Flowchart, WARN/ESCALATE Verdicts, Edge Cases, Agent Integration (Roo Code, Amazon Q, Cline) |
| **v2.0.0** | Initial release: 7-tier hierarchy, 8 rules, PASS/REJECT verdicts |

See [CHANGELOG.md](CHANGELOG.md) for full version history.
