---
name: simplicity-gate
version: "6.1.0"
description: >
  Evaluates tool/code proposals against the Rule of Least Power.
  Forces selection of the simplest viable tier. Blocks over-engineering.
  Auto-triggers on every code generation, dependency addition, and architecture decision.
  v6.1: Structural improvements, expanded databases, tightened rules.
  v6.0: Real-time code review integration, "Why Not" database of real-world incidents,
  one-click auto-fix CLI, fully autonomous mode. Plus all v5.0 features:
  proactive write prevention, real-world cost calculator, community pattern library,
  agent behavior profiling, interactive teaching mode, team gamification, auto-migration,
  dependency weight reporter. 11 language tiers, quick-check mode, AST detection.
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
  - write_operation
  - file_edit
  - shell_command
  - pre_write_hook
  - code_review
  - pull_request
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

# Simplicity Gate v6.0

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

## Game-Changing Features (v5.0)

### 1. Proactive Write Prevention

**The gate BLOCKS over-engineered code before it's written, not after.**

When the agent attempts to write code that violates the hierarchy, the gate intercepts the write operation and prevents it from happening.

```
SIMPLICITY GATE — WRITE BLOCKED
Operation:  File write (server.js)
Violation:  Express.js (Tier 7) for simple HTTP proxy
Blocker:    curl (Tier 3) can handle this task
Status:     WRITE PREVENTED — agent must choose simpler alternative

Agent attempted:
  const express = require('express');
  const app = express();
  app.get('/proxy', (req, res) => { ... });

Gate says:
  STOP. Use curl instead.
  curl -s -H "Authorization: Bearer $TOKEN" https://api.example.com/data
```

**Prevention rules:**

| Trigger                        | Action                              |
| ------------------------------ | ----------------------------------- |
| `npm install <high-tier>`        | Block install, suggest alternative  |
| `require('express')`             | Block import, suggest curl/http     |
| `import React` for simple toggle | Block import, suggest CSS           |
| `from django` for API endpoint   | Block import, suggest Flask or curl |
| `docker run` for cron job        | Block, suggest native cron          |

**Prevention modes:**

```yaml
proactive_prevention:
  mode: strict  # strict | warn | off
  # strict: BLOCK the write, require alternative
  # warn:   SHOW warning, allow override with reason
  # off:    Log only, never block
  
  # Allow specific patterns to bypass prevention
  exemptions:
    - pattern: "existing-project-stack"
      reason: "Reusing installed runtime"
    - pattern: "team-approved-override"
      reason: "Approved in .simplicity-gate.yml"
```

**How it works:**

1. Agent attempts a write operation (file edit, package install, import)
2. Gate intercepts BEFORE the operation executes
3. Gate evaluates against the tier hierarchy
4. If violation detected → BLOCK the operation
5. Gate provides the simpler alternative with auto-fix
6. Agent must choose the alternative or ESCALATE with justification

---

### 2. Real-World Cost Calculator

**Ties tier violations to actual cloud costs, bandwidth, and maintenance burden.**

Every verdict includes real-world cost impact, not just token estimates.

```
REAL-WORLD COST ANALYSIS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Proposed: Express.js (Tier 7) for API proxy

Monthly Costs:
├── AWS EC2 (t3.micro):        $8.47/mo
├── Load balancer:             $16.20/mo
├── CloudWatch logs:           $2.50/mo
├── Bandwidth (10GB):          $9.00/mo
├── SSL certificate:           $0 (Let's Encrypt)
├── Maintenance (2hr/mo):      $150.00/mo
└── Total:                     $186.17/mo

Alternative: curl + cron (Tier 3)
├── Existing server:           $0 (already running)
├── Bandwidth:                 $0 (same server)
├── Maintenance:               $0 (set and forget)
└── Total:                     $0/mo

Annual Savings:               $2,234.04
```

**Cost database:**

```yaml
real_world_costs:
  cloud:
    aws_ec2_t3_micro: 8.47
    aws_ec2_t3_small: 15.42
    aws_lambda_per_1m: 0.20
    aws_s3_per_gb: 0.023
    aws_rds_mysql: 12.41
    gcp_e2_micro: 7.67
    azure_b1s: 7.59
  
  bandwidth:
    aws_per_gb: 0.09
    cloudflare: 0  # free tier
    heroku_per_gb: 10.00
  
  maintenance:
    per_hour: 75.00  # avg engineer hourly rate
  
  dependencies:
    npm_per_package: 0.002  # avg install time cost
    pip_per_package: 0.001
    docker_per_image: 0.05  # storage cost
```

**Cost calculation rules:**

- Always show monthly and annual costs
- Compare proposed vs alternative
- Include maintenance burden (hours × rate)
- Include bandwidth costs for APIs
- Include storage costs for data
- Show total savings in bold

---

### 3. Community Pattern Library

**Growing database of anti-patterns → simpler alternatives, contributed by the community.**

```yaml
# .simplicity-gate/patterns.yml
community_patterns:
  - id: "react-toggle-css"
    name: "React Toggle → CSS :has()"
    anti_pattern: "React + useState for show/hide"
    alternative: "CSS :has() + checkbox"
    tier_gap: 6
    tokens_saved: 3500
    contributed_by: "simplicity-gate-community"
    verified: true
    examples:
      before: |
        const [show, setShow] = useState(false);
        return (
          <div>
            <button onClick={() => setShow(!show)}>Toggle</button>
            {show && <Content />}
          </div>
        );
      after: |
        <input type="checkbox" id="toggle" class="toggle-input">
        <label for="toggle">Toggle</label>
        <div class="content">Content</div>
        
        .toggle-input:checked ~ .content { display: block; }
        .content { display: none; }
  
  - id: "express-proxy-curl"
    name: "Express Proxy → curl"
    anti_pattern: "Express.js app for API proxy"
    alternative: "curl + cron"
    tier_gap: 4
    tokens_saved: 2000
    contributed_by: "simplicity-gate-community"
    verified: true
    examples:
      before: |
        const express = require('express');
        const axios = require('axios');
        const app = express();
        app.get('/proxy', async (req, res) => {
          const data = await axios.get('https://api.example.com');
          res.json(data);
        });
      after: |
        curl -s -H "Authorization: Bearer $TOKEN" https://api.example.com > data.json
  
  - id: "lodash-native"
    name: "lodash → Native Methods"
    anti_pattern: "lodash for cloneDeep, map, filter"
    alternative: "structuredClone, Array methods"
    tier_gap: 6
    tokens_saved: 1500
    contributed_by: "simplicity-gate-community"
    verified: true
    examples:
      before: |
        const _ = require('lodash');
        const clone = _.cloneDeep(obj);
        const mapped = _.map(arr, x => x * 2);
        const filtered = _.filter(arr, x => x > 10);
      after: |
        const clone = structuredClone(obj);
        const mapped = arr.map(x => x * 2);
        const filtered = arr.filter(x => x > 10);
  
  - id: "moment-intl"
    name: "moment → Intl.DateTimeFormat"
    anti_pattern: "moment.js for date formatting"
    alternative: "Intl.DateTimeFormat"
    tier_gap: 6
    tokens_saved: 2000
    contributed_by: "simplicity-gate-community"
    verified: true
    examples:
      before: |
        const moment = require('moment');
        const formatted = moment().format('YYYY-MM-DD');
      after: |
        const formatted = new Intl.DateTimeFormat('en-CA').format(new Date());
  
  - id: "axios-fetch"
    name: "axios → fetch"
    anti_pattern: "axios for HTTP requests"
    alternative: "fetch() API"
    tier_gap: 6
    tokens_saved: 1000
    contributed_by: "simplicity-gate-community"
    verified: true
    examples:
      before: |
        const axios = require('axios');
        const data = await axios.get('https://api.example.com');
      after: |
        const data = await fetch('https://api.example.com').then(r => r.json());
  
  - id: "docker-cron"
    name: "Docker Cron → System Cron"
    anti_pattern: "Docker container for scheduled tasks"
    alternative: "System crontab"
    tier_gap: 4
    tokens_saved: 5000
    contributed_by: "simplicity-gate-community"
    verified: true
    examples:
      before: |
        FROM alpine:latest
        COPY script.sh /script.sh
        RUN chmod +x /script.sh
        CMD ["/script.sh"]
      after: |
        0 * * * * /path/to/script.sh

  - id: "webpack-vite"
    name: "Webpack → Vite"
    anti_pattern: "Webpack for bundling modern JS"
    alternative: "Vite (25x faster)"
    tier_gap: 1
    tokens_saved: 2000
    contributed_by: "simplicity-gate-community"
    verified: true
    examples:
      before: |
        // webpack.config.js (50+ lines)
        module.exports = {
          entry: './src/index.js',
          output: { filename: 'bundle.js' },
          module: { rules: [{ test: /\.js$/, use: 'babel-loader' }] },
          plugins: [new HtmlWebpackPlugin({ template: './src/index.html' })],
          devServer: { port: 3000 }
        }
      after: |
        // vite.config.js (3 lines)
        import { defineConfig } from 'vite'
        export default defineConfig({ server: { port: 3000 } })

  - id: "jest-assert"
    name: "Jest → Node assert"
    anti_pattern: "Jest for simple utility testing"
    alternative: "node:assert"
    tier_gap: 6
    tokens_saved: 1500
    contributed_by: "simplicity-gate-community"
    verified: true
    examples:
      before: |
        const assert = require('assert');
        test('adds', () => { expect(1 + 1).toBe(2); });
        // Requires: jest, babel-jest, 200MB+ node_modules
      after: |
        const assert = require('node:assert');
        assert.strictEqual(1 + 1, 2, 'adds');
        // Zero dependencies

  - id: "eslint-custom-prettier"
    name: "Custom ESLint Rules → Prettier"
    anti_pattern: "500-line ESLint config for formatting"
    alternative: "Prettier"
    tier_gap: 1
    tokens_saved: 3000
    contributed_by: "simplicity-gate-community"
    verified: true
    examples:
      before: |
        // .eslintrc.js (500+ lines)
        module.exports = {
          rules: {
            'indent': ['error', 2],
            'quotes': ['error', 'single'],
            'semi': ['error', 'always'],
            'max-len': ['error', { code: 100 }],
            // ... 200 more formatting rules
          }
        }
      after: |
        // .prettierrc (4 lines)
        { "semi": true, "singleQuote": true, "tabWidth": 2 }

  - id: "prisma-raw-sql"
    name: "Prisma → Raw SQL"
    anti_pattern: "Prisma ORM for simple SQLite"
    alternative: "better-sqlite3 or raw SQL"
    tier_gap: 3
    tokens_saved: 2500
    contributed_by: "simplicity-gate-community"
    verified: true
    examples:
      before: |
        // schema.prisma
        model User { id Int @id; name String; email String }
        // migration.sql
        // seed.ts
        // Generated client (10MB+)
      after: |
        const db = require('better-sqlite3')('app.db');
        db.exec('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, name TEXT, email TEXT)');

  - id: "redux-zustand"
    name: "Redux → useState/useContext"
    anti_pattern: "Redux for a simple todo app"
    alternative: "React useState + useContext"
    tier_gap: 2
    tokens_saved: 4000
    contributed_by: "simplicity-gate-community"
    verified: true
    examples:
      before: |
        // store.js, reducers.js, actions.js, types.js, selectors.js
        import { createSlice, configureStore } from '@reduxjs/toolkit';
        // 47 files for a todo app
      after: |
        const [todos, setTodos] = useState([]);
        // 1 file, 5 lines

  - id: "docker-dev-environment"
    name: "Docker Dev → Native Tools"
    anti_pattern: "Docker Compose for local development"
    alternative: "Native package manager + docker for prod only"
    tier_gap: 4
    tokens_saved: 3000
    contributed_by: "simplicity-gate-community"
    verified: true
    examples:
      before: |
        # docker-compose.yml (50+ lines)
        version: '3'
        services:
          app: { build: ., ports: ["3000:3000"], volumes: [...] }
          db: { image: postgres, environment: [...] }
          redis: { image: redis }
      after: |
        # Install locally:
        brew install postgresql redis
        # Or: apt install postgresql redis-server
```

**Pattern library rules:**

- Community contributes via pull request
- Patterns must include before/after code
- Patterns must include token savings
- Patterns are verified by maintainers
- Top patterns are featured in Quick-Check
- Patterns are searchable by anti-pattern name

### Pattern Submission Format

To contribute a pattern, use this template:

```yaml
- id: "descriptive-kebab-case-id"
  name: "Short Name: Anti-Pattern → Alternative"
  anti_pattern: "Exact description of what to avoid"
  alternative: "Exact description of what to use instead"
  tier_gap: <number>           # Proposed tier - Alternative tier
  tokens_saved: <number>       # Estimated token savings
  contributed_by: "your-github-handle"
  verified: false              # Set true after maintainer review
  language: "javascript"       # optional: language-specific pattern
  context: "when this applies" # optional: specific context
  examples:
    before: |
      # Code showing the anti-pattern
    after: |
      # Code showing the simpler alternative
  why_not: |
    # Optional: real-world incident that proves this pattern
```

### Pattern Verification

```
PATTERN SUBMISSION REVIEW:
├── ID uniqueness?          ✓ unique
├── Before code valid?      ✓ valid syntax
├── After code valid?       ✓ valid syntax
├── Tier gap accurate?      ✓ gap of 4 confirmed
├── Token savings realistic? ✓ estimated 2,500 tokens
├── No duplicates?          ✓ no matching patterns
└── VERDICT: ACCEPTED — added to community library
```

**Pattern matching:**

```
PATTERN MATCH FOUND:
├── Anti-pattern: "React + useState for toggle"
├── Matched: "react-toggle-css" (98% confidence)
├── Alternative: CSS :has() + checkbox
├── Token savings: ~3,500
└── Auto-applied: YES
```

---

### 4. Agent Behavior Profiling

**Tracks which AI agents over-engineer most and creates a simplicity leaderboard.**

```yaml
# .simplicity-gate/agent-profiles.yml
agent_profiles:
  - agent: "claude-3.5-sonnet"
    evaluations: 156
    pass_rate: 0.72
    reject_rate: 0.18
    warn_rate: 0.08
    escalate_rate: 0.02
    avg_severity: 2.3
    top_violations:
      - "Adding Express for simple APIs"
      - "Using lodash instead of native"
    simplicity_score: 72
    trend: "improving"
  
  - agent: "gpt-4-turbo"
    evaluations: 134
    pass_rate: 0.65
    reject_rate: 0.24
    warn_rate: 0.08
    escalate_rate: 0.03
    avg_severity: 2.8
    top_violations:
      - "React for CSS-only tasks"
      - "Docker for cron jobs"
      - "Python for grep tasks"
    simplicity_score: 65
    trend: "stable"
  
  - agent: "codestral"
    evaluations: 89
    pass_rate: 0.81
    reject_rate: 0.12
    warn_rate: 0.05
    escalate_rate: 0.02
    avg_severity: 1.9
    top_violations:
      - "Using moment.js"
    simplicity_score: 81
    trend: "improving"
```

**Profile metrics:**

| Metric                 | Description                                  |
| ---------------------- | -------------------------------------------- |
| `simplicity_score`       | 0-100, higher = simpler suggestions         |
| `pass_rate`              | % of suggestions that pass the gate         |
| `reject_rate`            | % of suggestions that get rejected          |
| `avg_severity`           | Average severity of violations              |
| `top_violations`         | Most common over-engineering patterns       |
| `trend`                  | improving / stable / declining              |
| `evaluations`            | Total number of gate evaluations            |

**Leaderboard output:**

```
SIMPLICITY GATE — AGENT LEADERBOARD
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Rank  Agent              Score   Pass Rate   Trend
 1    codestral          81      81%         ↑ improving
 2    claude-3.5-sonnet  72      72%         ↑ improving
 3    gpt-4-turbo        65      65%         → stable
 4    gemini-pro         58      58%         ↓ declining

Insights:
├── codestral rarely suggests frameworks for simple tasks
├── gpt-4-turbo over-engineers React components 24% of the time
├── gemini-pro tends to add unnecessary dependencies
└── All agents improved after teaching mode enabled
```

**Profiling rules:**

- Track every evaluation per agent
- Calculate rolling scores (last 100 evaluations)
- Update profiles at session end
- Share profiles across sessions (with consent)
- Leaderboard is optional (gamification)

---

### 5. Interactive Teaching Mode

**Don't just fix it — teach the agent WHY simpler is better.**

When a REJECT happens, the gate explains the thinking pattern that led to over-engineering and teaches the correct mental model.

```
SIMPLICITY GATE — TEACHING MOMENT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

You proposed: Express.js (Tier 7) for API proxy

YOUR THINKING PATTERN:
"You need to make HTTP requests, so you need a server framework."

THIS IS WRONG BECAUSE:
Express is designed for building web applications with routing,
middleware, and complex request handling. You're using a web
framework as a proxy — that's like using a truck to carry a letter.

THE CORRECT THINKING PATTERN:
"What's the simplest tool that makes HTTP requests?"
→ curl (Tier 3) does exactly this. One command. No runtime.

LESSON LEARNED:
When you need to make HTTP requests, start with curl.
Only escalate if you need:
├── Persistent connections → Node.js http module (Tier 5)
├── Complex routing → Express (Tier 7)
├── Middleware pipeline → Express (Tier 7)
└── WebSocket handling → ws library (Tier 6)

YOUR SIMPLICITY SCORE: 65/100
Keep learning! You're improving.
```

**Teaching modes:**

```yaml
teaching_mode:
  enabled: true
  
  # When to teach
  triggers:
    - severity_above: 3  # Teach on serious violations
    - repeat_offense: true  # Teach when same mistake repeated
    - new_pattern: true  # Teach when encountering new anti-pattern
  
  # What to teach
  lessons:
    - "Think in utilities, not frameworks"
    - "Start at Tier 1, stop at first match"
    - "Dependencies have real costs"
    - "Shell commands are composable"
    - "Built-in APIs are free"
  
  # How to teach
  style: socratic  # socratic | direct | example-based
  # socratic: Ask questions to guide thinking
  # direct: Tell the agent what to do
  # example-based: Show before/after examples
```

**Teaching examples:**

```
TEACHING — SOCRATIC STYLE:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Agent: "I'll use React to toggle a panel."
Gate: "What does the toggle need to do?"
Agent: "Show/hide content when clicked."
Gate: "Can CSS handle show/hide?"
Agent: "Yes, with display: none/block."
Gate: "Then why do you need React?"
Agent: "..."
Gate: "CSS :has() + checkbox can do this. Here's how..."

TEACHING — EXAMPLE-BASED:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

WRONG (you proposed):
const [show, setShow] = useState(false);
return <div>{show && <Content />}</div>;

RIGHT (simpler):
<input type="checkbox" id="toggle">
<label for="toggle">Show</label>
<div class="content">Content</div>
<style>.content { display: none; }
.toggle:checked ~ .content { display: block; }</style>

WHY: CSS handles state without JavaScript runtime.
```

---

### 6. Team Gamification

**Gamifies simplicity — teams compete for the highest simplicity scores.**

```yaml
# .simplicity-gate/gamification.yml
gamification:
  enabled: true
  
  # Team definitions
  teams:
    - name: "Alpha"
      members: ["alice", "bob", "charlie"]
      simplicity_score: 87
      streak: 12  # consecutive sessions without REJECT
    
    - name: "Beta"
      members: ["dave", "eve", "frank"]
      simplicity_score: 72
      streak: 5
    
    - name: "Gamma"
      members: ["grace", "henry"]
      simplicity_score: 91
      streak: 20
  
  # Achievements
  achievements:
    - id: "first-pass"
      name: "First PASS"
      description: "First suggestion that passes the gate"
      icon: "✓"
    
    - id: "streak-5"
      name: "On Fire"
      description: "5 consecutive sessions without REJECT"
      icon: "🔥"
    
    - id: "streak-10"
      name: "Unstoppable"
      description: "10 consecutive sessions without REJECT"
      icon: "⚡"
    
    - id: "streak-20"
      name: "Simplicity Master"
      description: "20 consecutive sessions without REJECT"
      icon: "👑"
    
    - id: "zero-react"
      name: "CSS Champion"
      description: "Entire session with zero React for simple tasks"
      icon: "🎨"
    
    - id: "zero-lodash"
      name: "Native Ninja"
      description: "Entire session with zero lodash imports"
      icon: "🥷"
    
    - id: "cost-saver"
      name: "Cost Cutter"
      description: "Saved $100+ in cloud costs in one session"
      icon: "💰"
  
  # Leaderboard display
  leaderboard:
    show: true
    refresh: "after_each_session"
    format: "table"
```

**Leaderboard output:**

```
SIMPLICITY GATE — TEAM LEADERBOARD
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Rank  Team     Score   Streak   Members          Achievements
 1    Gamma    91      20       grace, henry     👑 ⚡ 🔥 ✓
 2    Alpha    87      12       alice, bob, charlie  ⚡ 🔥 ✓
 3    Beta     72      5        dave, eve, frank 🔥 ✓

Recent Achievements:
├── grace earned "Simplicity Master" (20 streak)
├── alice earned "Cost Cutter" (saved $150 this session)
├── bob earned "CSS Champion" (zero React violations)
└── dave earned "On Fire" (5 streak)

This Week:
├── Total evaluations: 234
├── Total tokens saved: ~45,000
├── Total cost saved: ~$312
└── Team Alpha reduced React usage by 40%
```

**Gamification rules:**

- Scores update after each session
- Achievements unlock automatically
- Leaderboard refreshes after each session
- Monthly resets with all-time records preserved
- Team leads can customize achievements

---

### 7. Auto-Migration

**Scans codebase for old over-engineering and suggests migration to simpler alternatives.**

```
SIMPLICITY GATE — AUTO-MIGRATION SCAN
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Scanning: /path/to/project
Files analyzed: 147
Over-engineering found: 12 instances

MIGRATION OPPORTUNITIES:
├── src/utils/parse.js (Node.js + lodash)
│   └── Migrate to: jq script (save ~2,000 tokens)
│
├── src/api/proxy.js (Express.js)
│   └── Migrate to: curl + cron (save ~3,500 tokens)
│
├── src/components/Toggle.jsx (React + useState)
│   └── Migrate to: CSS :has() (save ~1,500 tokens)
│
├── scripts/monitor.py (Python + psutil)
│   └── Migrate to: df + awk (save ~1,200 tokens)
│
└── config/validate.js (Node.js + ajv)
    └── Migrate to: JSON Schema CLI (save ~800 tokens)

TOTAL POTENTIAL SAVINGS: ~9,000 tokens
ESTIMATED ANNUAL COST SAVINGS: ~$180

Migrate all? [y/N/select]:
```

**Migration modes:**

```yaml
auto_migration:
  enabled: true
  
  # Scan settings
  scan:
    include: ["*.js", "*.ts", "*.py", "*.jsx", "*.tsx"]
    exclude: ["node_modules", "dist", "build", ".git"]
    max_files: 1000
  
  # Migration strategies
  strategies:
    - name: "safe"
      description: "Migrate one file at a time, run tests between"
      risk: "low"
      speed: "slow"
    
    - name: "batch"
      description: "Migrate all similar patterns at once"
      risk: "medium"
      speed: "fast"
    
    - name: "aggressive"
      description: "Migrate everything, fix issues as they arise"
      risk: "high"
      speed: "fastest"
  
  # Auto-fix settings
  auto_fix:
    enabled: true
    create_backup: true
    backup_dir: ".simplicity-gate/backups/"
    run_tests: true
    test_command: "npm test"
```

**Migration process:**

1. **Scan** — Find all over-engineering instances
2. **Prioritize** — Sort by token savings (highest first)
3. **Plan** — Create migration plan with dependencies
4. **Backup** — Save current state for rollback
5. **Migrate** — Apply changes in order
6. **Verify** — Run tests after each migration
7. **Report** — Show before/after comparison

**Migration output:**

```
SIMPLICITY GATE — MIGRATION COMPLETE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Migrated: 12 files
├── 4 Node.js scripts → shell scripts
├── 3 React components → CSS solutions
├── 2 Python scripts → shell pipelines
├── 2 Express apps → curl + cron
└── 1 lodash utility → native methods

Results:
├── Files modified: 12
├── Files deleted: 5
├── Dependencies removed: 8 (lodash, moment, axios, express, react, psutil, ajv, cors)
├── Tokens saved: ~9,000
├── Bundle size reduced: ~420 KB
├── Tests passing: ✓
└── Time taken: 3m 42s

Before: 147 files, 12,450 lines, 18 dependencies
After:  142 files, 8,200 lines, 10 dependencies
```

---

### 8. Dependency Weight Reporter

**Shows real dependency costs before adding packages — size, transitive deps, CVEs, maintenance burden.**

```
DEPENDENCY WEIGHT REPORT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Package: express@4.18.2

Size Impact:
├── Direct size:        1.2 MB
├── Gzipped:           230 KB
├── Transitive deps:   68 packages
├── Total tree size:   4.2 MB
└── Install time:      ~3.5s

Security:
├── Known CVEs:        2
│   ├── CVE-2024-29041: Open redirect (Medium)
│   └── CVE-2024-29042: XSS (Low)
├── Last patched:      2024-03-25
└── Maintenance:       Active (weekly commits)

Maintenance Burden:
├── Updates per year:  ~12
├── Breaking changes:  ~2 per year
├── Migration effort:  ~4 hours per breaking change
└── Annual cost:      ~$600 (at $75/hr)

Alternatives:
├── curl (Tier 3)
│   ├── Size: 0 KB
│   ├── Deps: 0
│   ├── CVEs: 0
│   └── Annual cost: $0
│
├── Node.js http module (Tier 5)
│   ├── Size: 0 KB (built-in)
│   ├── Deps: 0
│   ├── CVEs: 0
│   └── Annual cost: $0
│
└── Fastify (Tier 7)
    ├── Size: 850 KB
    ├── Deps: 32
    ├── CVEs: 0
    └── Annual cost: ~$400

RECOMMENDATION: Use curl (Tier 3) or Node.js http module (Tier 5)
```

**Weight database:**

```yaml
dependency_weight:
  # Common packages with real costs
  packages:
    express:
      size: "1.2 MB"
      gzipped: "230 KB"
      transitive_deps: 68
      cves: 2
      updates_per_year: 12
      breaking_per_year: 2
    
    lodash:
      size: "4.2 MB"
      gzipped: "73.8 KB"
      transitive_deps: 0
      cves: 2
      updates_per_year: 0  # unmaintained
      breaking_per_year: 0
    
    moment:
      size: "2.9 MB"
      gzipped: "72 KB"
      transitive_deps: 0
      cves: 1
      updates_per_year: 0  # deprecated
      breaking_per_year: 0
    
    axios:
      size: "1.1 MB"
      gzipped: "5.3 KB"
      transitive_deps: 12
      cves: 0
      updates_per_year: 8
      breaking_per_year: 1
    
    react:
      size: "210 KB"
      gzipped: "42 KB"
      transitive_deps: 4
      cves: 0
      updates_per_year: 6
      breaking_per_year: 1
  
  # Cost multipliers
  costs:
    per_mb_per_month: 0.023  # S3 storage
    per_cve_risk: 500  # avg remediation cost
    per_breaking_change_hours: 4
    hourly_rate: 75
```

**Weight rules:**

- Always show before adding a dependency
- Compare to alternatives (Tier 0-3)
- Include annual cost projection
- Highlight CVEs and maintenance burden
- Show transitive dependency tree
- Recommend simplest alternative

---

## Real-Time Code Review Integration

**The gate evaluates code BEFORE it's written, not after. Every write, edit, and import is intercepted and evaluated in real-time.**

### How It Works

```
AGENT ATTEMPTS WRITE
        │
        ▼
┌──────────────────────────────┐
│ 1. INTERCEPT the write       │
│    Capture: file, content,   │
│    operation type            │
└──────────────┬───────────────┘
               │
               ▼
┌──────────────────────────────┐
│ 2. EVALUATE against gate     │
│    - Tier check              │
│    - Severity score          │
│    - Pattern detection       │
│    - Dependency weight       │
│    - Security audit          │
└──────────────┬───────────────┘
               │
        ┌──────┴──────┐
        │             │
    SEVERITY      SEVERITY
     ≤ 2            ≥ 3
        │             │
        ▼             ▼
   ┌─────────┐  ┌──────────┐
   │  ALLOW  │  │  BLOCK   │
   │ + log   │  │ + auto-  │
   │         │  │   fix    │
   └─────────┘  └──────────┘
```

### Pre-Write Hook Triggers

The gate intercepts these operations BEFORE they execute:

| Operation | Interception Point | Action |
|-----------|-------------------|--------|
| `write(filePath, content)` | Before file write | Evaluate content for over-engineering |
| `edit(filePath, ...)` | Before edit applied | Check if edit introduces higher tier |
| `npm install <pkg>` | Before install | Block if package is unnecessary tier |
| `import/require` | Before import | Check if built-in alternative exists |
| `docker run` | Before container start | Check if native solution works |
| `new Endpoint()` | Before creation | Evaluate if simpler pattern works |
| `git commit` | Before commit | Scan staged files for violations |

### Real-Time Evaluation Output

```
┌─────────────────────────────────────────────────────────────┐
│ SIMPLICITY GATE — REAL-TIME REVIEW                          │
├─────────────────────────────────────────────────────────────┤
│ Operation:  File write → src/api/proxy.js                   │
│ Content:    Express.js proxy server (47 lines)              │
│ Detected:   HTTP proxy pattern                              │
│                                                         │
│ EVALUATION:                                                 │
│   Tier 7 (Express) vs Tier 3 (curl)                        │
│   Severity: 4/5 — CRITICAL                                  │
│   Pattern:  Over-engineered HTTP proxy                      │
│   CVEs:     0 (but 14 transitive deps)                      │
│                                                         │
│ VERDICT: ❌ BLOCKED                                         │
│                                                         │
│ WHY: curl can handle this exact use case.                   │
│ This adds 14 dependencies for what a single                │
│ command can do:                                             │
│   curl -s -H "Authorization: Bearer $TOKEN" \             │
│        https://api.example.com/data                         │
│                                                         │
│ HISTORY: Left-pad (2016) — 11 chars of code broke npm.     │
│ event-stream (2018) — supply chain attack via unused dep.   │
│                                                         │
│ COST: ~2,400 tokens wasted | ~14 deps added                 │
│ FIX: [APPLY] [OVERRIDE] [IGNORE]                           │
└─────────────────────────────────────────────────────────────┘
```

### Severity-Based Actions

| Severity | Action | Agent Response |
|----------|--------|----------------|
| 1 (Minor) | Allow with note | Continue, log for review |
| 2 (Moderate) | Allow with warning | Continue, show warning |
| 3 (Serious) | Block, suggest fix | Must apply fix or override |
| 4 (Critical) | Block, require approval | Cannot proceed without human approval |
| 5 (Absurd) | Block, require redesign | Must redesign approach entirely |

### Integration Points

The real-time review integrates with:

- **VS Code / Zed** — Shows inline warnings on hover
- **JetBrains IDEs** — Inspection badges in gutter
- **Terminal agents** — Blocks before write completes
- **Git hooks** — Pre-commit scan blocks commits with violations
- **CI/CD** — GitHub Action blocks PRs with violations

---

## "Why Not" Database

**Every REJECT includes a real-world incident that proves why the rejected approach is dangerous. Humans remember stories, not rules.**

### The Database

| Anti-Pattern | Incident | Year | Impact | Lesson |
|-------------|----------|------|--------|--------|
| `left-pad` | 11 chars of code removed from npm, broke thousands of packages | 2016 | Global npm outage | Tiny deps can cause massive cascading failures |
| `event-stream` | Malicious code injected via unused dependency, stole cryptocurrency | 2018 | $2M+ stolen | Every unused dep is a potential attack vector |
| `log4j` | Remote code execution via logging library, affected millions of servers | 2021 | CVE-2021-44228 | Even "simple" deps can have catastrophic vulnerabilities |
| `colors.js` | Maintainer intentionally broke millions of packages in protest | 2022 | Global CI failures | Single-point-of-failure in dependency chain |
| `faker.js` | Same maintainer destroyed his own library, broke thousands of projects | 2022 | Global CI failures | Trusted deps can become untrusted overnight |
| `ua-parser-js` | hijacked npm package installed cryptominer on 7M+ weekly downloads | 2021 | 7M+ affected | Popular ≠ safe |
| `coa` / `rc` | Malicious code injection in popular packages, 10M+ weekly downloads | 2021 | 10M+ affected | Supply chain attacks are increasing |
| `node-ipc` | Maintainer added protestware targeting specific countries | 2022 | Political controversy | Deps can have political motives |
| `moment.js` | Officially deprecated, 68KB for what `Date` does natively | 2020 | 68KB wasted | Deprecated deps are security liabilities |
| `request` | Officially deprecated, no security patches since 2019 | 2019 | Unpatched vulns | Deprecated = vulnerable |
| `webpack` | 5-second cold starts for simple SPAs, Vite does it in 200ms | 2023 | 25x slower DX | Build tools can be over-engineered |
| `Redux` | 47 files for a todo app, React state does it in 1 line | 2023 | 46 extra files | State management can be massively over-engineered |
| `Mongoose` | Schema for a simple key-value store, SQLite does it natively | 2023 | 200KB+ added | ORMs can be over-engineered for simple data |
| `Express` | 47-line proxy server for what curl does in 1 command | 2023 | 14 deps added | HTTP clients can be over-engineered |
| `Docker` | Container for a cron job, native cron does it in 2 lines | 2023 | 200MB+ image | Containers can be over-engineered for simple scheduling |
| `Kubernetes` | 15 YAML files for a static site, `npx serve` works | 2023 | 1000+ lines config | Orchestration can be over-engineered for simple serving |
| `GraphQL` | 200-line schema for 3 fields, REST does it in 20 lines | 2023 | 180 extra lines | API layers can be over-engineered for simple data |
| `Microservices` | 12 services for a CRUD app, monolith does it faster | 2023 | 12x complexity | Architecture can be over-engineered for simple apps |
| `Redis` | In-memory cache for a 100-row table, `Map` does it in 1 line | 2023 | 200MB+ added | Caching can be over-engineered for small data |
| `MongoDB` | Document DB for a relational dataset, SQLite does it natively | 2023 | 200MB+ added | Databases can be over-engineered for simple data |
| `Babel` | Transpiling modern JS for browsers that support it natively | 2023 | 30s build time | Transpilation can be unnecessary |
| `ESLint (custom rules)` | 500-line ESLint config for basic style, Prettier does it | 2023 | 500 lines config | Linting can be over-configured |
| `Jenkins` | Full CI server for running 3 shell scripts, GitHub Actions suffices | 2023 | $500/mo server | CI can be over-provisioned |
| `Terraform` | IaC for a single static site on S3, AWS CLI works | 2023 | 200 lines HCL | IaC can be over-engineered for simple infra |
| `Kafka` | Event streaming for a notification system, webhooks work | 2023 | 3-node cluster | Messaging can be over-provisioned |
| `Elasticsearch` | Full-text search for 1000 documents, `grep -r` works | 2023 | 1GB+ cluster | Search can be over-engineered for small datasets |
| `Jest` | Full test framework for 50 lines of utility code, assert works | 2023 | 200MB node_modules | Testing can be over-frameworked |
| `Webpack` | Bundler for a 3-file static site, no bundler needed | 2023 | 5s cold start | Build tools can be unnecessary for simple projects |
| `Prisma` | ORM for a 3-table SQLite database, raw SQL works | 2023 | 10MB+ added | ORMs can be over-engineered for simple schemas |
| `Storybook` | Component gallery for a 10-component app, README works | 2023 | 500MB+ added | Documentation tools can be over-engineered |

### How It Works

```
SIMPLICITY GATE — REJECT [Severity: 4]
Proposed: Express.js (Tier 7) for API proxy

WHY NOT?
┌─────────────────────────────────────────────────────────────┐
│ HISTORY: In 2023, a team built an Express.js proxy for      │
│ a simple API proxy. It added 14 dependencies, 2,400 tokens    │
│ of code, and a 200MB Docker image. A curl command does      │
│ the same thing in 1 command with 0 dependencies.            │
│                                                             │
│ The Express approach required:                              │
│ - 47 lines of JavaScript                                    │
│ - 14 npm packages                                           │
│ - A Docker container (200MB)                                │
│ - SSL certificate management                                │
│ - Process monitoring (PM2)                                  │
│                                                             │
│ The curl approach requires:                                 │
│ - 1 command                                                 │
│ - 0 dependencies                                            │
│ - 0 Docker                                                  │
│ - 0 process management                                      │
└─────────────────────────────────────────────────────────────┘

RECOMMENDED: curl (Tier 3)
  curl -s -H "Authorization: Bearer $TOKEN" https://api.example.com/data
```

### Database Updates

The "Why Not" database grows over time:

- **Community contributions** — Teams add their own over-engineering incidents
- **CVE tracking** — New vulnerabilities added automatically
- **Deprecation alerts** — Deprecated packages flagged with their replacement
- **Migration stories** — Successful simplifications documented

### Accessing the Database

```bash
# Search incidents by keyword
simplicity-gate why-not express

# Search by tier
simplicity-gate why-not --tier 7

# Search by year
simplicity-gate why-not --year 2023

# Add your own incident
simplicity-gate why-not add \
  --pattern "Redux for todo app" \
  --incident "Team spent 2 weeks on Redux, React state took 2 hours" \
  --lesson "State management scales with complexity, not with features"
```

---

## One-Click Fix

**Every REJECT includes a one-click fix that automatically applies the simpler alternative.**

### How It Works

```
SIMPLICITY GATE — REJECT [Severity: 3]
Proposed: moment.js (Tier 6) for date formatting
Found in: src/utils/date.js (line 42)

ONE-CLICK FIX AVAILABLE
┌─────────────────────────────────────────────────────────────┐
│ REplacing: moment().format('YYYY-MM-DD')                    │
│ WITH:      new Date().toISOString().split('T')[0]          │
│                                                         │
│ Files affected: 3                                          │
│ Lines changed: 3                                           │
│ Dependencies removed: 1 (moment.js, 68KB)                  │
│ Time to apply: < 1 second                                  │
│                                                         │
│ [APPLY FIX]  [PREVIEW]  [SKIP]                           │
└─────────────────────────────────────────────────────────────┘
```

### Fix Commands

```bash
# Apply the recommended fix for a specific file
simplicity-gate fix src/utils/date.js

# Apply all fixes in a directory
simplicity-gate fix src/ --recursive

# Preview fixes without applying
simplicity-gate fix src/ --dry-run

# Apply fixes and run tests
simplicity-gate fix src/ --test

# Apply fixes and commit
simplicity-gate fix src/ --commit "refactor: simplify date handling"
```

### Fix Types

| Fix Type | Description | Example |
|----------|-------------|---------|
| `replace-import` | Replace imported package with native | `moment` → `Date` |
| `replace-function` | Replace function call with simpler | `_.get()` → `?.` |
| `remove-dependency` | Remove unused dependency | Remove `left-pad` |
| `simplify-pattern` | Replace complex pattern with simple | `Redux` → `useState` |
| `inline-function` | Inline small utility function | `import { x } from 'lib'` → `const x = ...` |
| `remove-file` | Delete unnecessary file | Remove `Dockerfile` for native cron |

### Fix Safety

```yaml
# .simplicity-gate.yml
fix_safety:
  # Never auto-fix these patterns
  never_fix:
    - pattern: "production-database"
      reason: "Requires manual review"
    - pattern: "authentication-logic"
      reason: "Security-sensitive"
  
  # Always create backup before fix
  backup: true
  
  # Run tests after fix
  test_after_fix: true
  
  # Max files to fix at once
  max_files_per_fix: 10
  
  # Require confirmation for large fixes
  confirm_above_lines: 50
```

### Fix History

Every fix is logged for audit and learning:

```json
{
  "fix_id": "fix-2024-01-15-001",
  "timestamp": "2024-01-15T10:30:00Z",
  "file": "src/utils/date.js",
  "original": "moment().format('YYYY-MM-DD')",
  "replacement": "new Date().toISOString().split('T')[0]",
  "tier_change": "Tier 6 → Tier 0",
  "severity": 3,
  "tokens_saved": 1200,
  "deps_removed": 1,
  "auto_applied": true,
  "tests_passed": true
}
```

---

## Autonomous Mode

**The skill runs entirely without human intervention. It evaluates, blocks, fixes, and learns — all automatically.**

### How It Works

```
┌─────────────────────────────────────────────────────────────┐
│ AUTONOMOUS MODE ACTIVE                                      │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ 1. MONITOR    → Watch all agent operations                  │
│ 2. EVALUATE   → Check every write against the gate          │
│ 3. DECIDE     → Block/allow/fix automatically               │
│ 4. ACT        → Apply fixes, prevent violations             │
│ 5. LEARN      → Update patterns from decisions              │
│ 6. REPORT     → Generate session summary                    │
│                                                             │
│ Human involvement: NONE (unless severity ≥ 4)               │
│ Decision speed: < 100ms per evaluation                      │
│ Fix application: < 1 second                                 │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Autonomous Decision Matrix

| Severity | Action | Human Needed? |
|----------|--------|:-------------:|
| 1 | Allow + log | ❌ No |
| 2 | Allow + warn | ❌ No |
| 3 | Auto-fix + notify | ❌ No |
| 4 | Block + require approval | ✅ Yes |
| 5 | Block + require redesign | ✅ Yes |

### Autonomous Workflow

```
AGENT STARTS WORK
       │
       ▼
┌──────────────────┐
│ EVALUATE proposal│ ◄──────────────────────┐
└────────┬─────────┘                        │
         │                                  │
    ┌────┴────┐                             │
    │         │                             │
 SEVERITY  SEVERITY                         │
  ≤ 3        ≥ 4                           │
    │         │                             │
    ▼         ▼                             │
┌────────┐ ┌────────┐                      │
│ AUTO   │ │ BLOCK  │                      │
│ FIX    │ │ + ASK  │                      │
└───┬────┘ └───┬────┘                      │
    │          │                            │
    │     ┌────┴────┐                       │
    │     │         │                       │
    │   APPROVED  DENIED                    │
    │     │         │                       │
    │     ▼         ▼                       │
    │  ┌───────┐ ┌───────┐                 │
    │  │ APPLY │ │ REJECT│                 │
    │  └───┬───┘ └───────┘                 │
    │      │                               │
    ▼      ▼                               │
┌──────────────────┐                       │
│ CONTINUE WORK    │ ──────────────────────┘
└──────────────────┘
```

### Autonomous Settings

```yaml
# .simplicity-gate.yml
autonomous_mode:
  enabled: true
  
  # Decision thresholds
  auto_fix_threshold: 3      # Severity ≤ 3 = auto-fix
  block_threshold: 4         # Severity ≥ 4 = block
  
  # Timeouts
  evaluation_timeout_ms: 100
  fix_timeout_ms: 1000
  
  # Safety rails
  max_auto_fixes_per_session: 20
  max_lines_changed_per_fix: 50
  require_test_pass: true
  
  # Notifications
  notify_on_fix: true
  notify_on_block: true
  notify_on_session_end: true
  
  # Learning
  learn_from_overrides: true
  update_patterns: true
  suggest_custom_tiers: true
  
  # Reporting
  session_summary: true
  metrics_tracking: true
  leaderboards: true
```

### Session Summary

At the end of each autonomous session:

```
┌─────────────────────────────────────────────────────────────┐
│ AUTONOMOUS SESSION SUMMARY                                  │
├─────────────────────────────────────────────────────────────┤
│ Duration:        45 minutes                                 │
│ Evaluations:     127                                        │
│ Auto-fixes:      12 (severity 3)                            │
│ Blocks:          2 (severity 4, human approved)             │
│ Allowed:         113 (severity 1-2)                         │
│                                                             │
│ Tokens saved:    ~8,400                                     │
│ Deps prevented:  14                                         │
│ Lines prevented: ~340                                       │
│                                                             │
│ Top violations:                                             │
│   1. lodash → native (5 times)                              │
│   2. moment → Date (3 times)                                │
│   3. Express → curl (2 times)                               │
│                                                             │
│ Agent performance:                                          │
│   - build: 92% compliance (↑ from 78%)                     │
│   - plan: 98% compliance                                   │
│   - general: 85% compliance (↑ from 71%)                   │
│                                                             │
│ Patterns learned:                                           │
│   - "JSON transform" always Tier 3 (jq)                    │
│   - "Date format" always Tier 0 (native)                   │
│   - "HTTP proxy" always Tier 3 (curl)                      │
│                                                             │
│ [EXPORT] [SHARE] [SETTINGS]                                │
└─────────────────────────────────────────────────────────────┘
```

### Safety Rails

Autonomous mode has built-in safety rails:

1. **Max fixes per session** — Prevents runaway auto-fixing
2. **Max lines per fix** — Prevents large rewrites without approval
3. **Test requirement** — Fixes only apply if tests pass
4. **Severity threshold** — High-severity issues always require human
5. **Override tracking** — Every human override is logged and learned from
6. **Rollback capability** — Any fix can be reverted with one command

```bash
# Revert the last autonomous fix
simplicity-gate revert last

# Revert all fixes in a session
simplicity-gate revert session

# Revert a specific fix by ID
simplicity-gate revert fix-2024-01-15-001
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

  c:
    tier_0: "libc, POSIX APIs, stdio, dirent"
    tier_1: "ncurses, GTK"
    tier_2: "JSON (cJSON), YAML (libyaml)"
    tier_3: "popen, system, exec"
    tier_4: "SQLite C API"
    tier_5: "C (compiled, manual memory)"
    tier_6: "C with FFI bindings"
    tier_7: "libmicrohttpd, nginx modules"

  cpp:
    tier_0: "std::filesystem, std::optional, std::format, ranges"
    tier_1: "Qt, wxWidgets"
    tier_2: "nlohmann/json, yaml-cpp"
    tier_3: "popen, std::system"
    tier_4: "SQLiteCpp, soci"
    tier_5: "C++ (compiled, typed)"
    tier_6: "C++ with scripting (ChaiScript)"
    tier_7: "Crow, Drogon, oat++"

  dart:
    tier_0: "dart:io, dart:convert, dart:async"
    tier_1: "Flutter widgets"
    tier_2: "JSON, YAML"
    tier_3: "Process.run, io"
    tier_4: "sqflite, drift queries"
    tier_5: "Dart (compiled, typed)"
    tier_6: "Dart scripting"
    tier_7: "Shelf, Aqueduct, Dart Frog"

  elixir:
    tier_0: "Enum, File, Path, Jason, Date"
    tier_1: "HEEx templates, LiveView"
    tier_2: "JSON, YAML, TOML"
    tier_3: "System.cmd, :os.cmd"
    tier_4: "Ecto queries"
    tier_5: "Elixir (compiled, typed via specs)"
    tier_6: "Elixir scripting"
    tier_7: "Phoenix, Bandit"

  haskell:
    tier_0: "base, bytestring, text, aeson, filepath"
    tier_1: "Lucid, Yesod templates"
    tier_2: "JSON (aeson), YAML, XML"
    tier_3: "System.Process, Shell commands"
    tier_4: "Persistent, Esqueleto queries"
    tier_5: "Haskell (compiled, strongly typed)"
    tier_6: "GHCi scripting"
    tier_7: "Servant, Yesod, Warp"

  julia:
    tier_0: "Base, JSON3, Downloads, HTTP"
    tier_1: "Genie templates, Pluto notebooks"
    tier_2: "JSON, YAML, TOML, CSV"
    tier_3: "run, pipeline, read"
    tier_4: "SQLite.jl, Query.jl"
    tier_5: "Julia (compiled, typed)"
    tier_6: "Julia scripting"
    tier_7: "Genie, Franklin, Oxygen"
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

## Quick-Reference Card

```
┌─────────────────────────────────────────────────────────────────┐
│ SIMPLICITY GATE — QUICK REFERENCE                                │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  THE RULE: Start at Tier 1. Stop at first match.                 │
│                                                                   │
│  Tier 0  Built-in APIs      fetch, structuredClone, Intl        │
│  Tier 1  Platform Features  CSS, HTML, Web APIs                 │
│  Tier 2  Data Formats       JSON, YAML, TOML, XML               │
│  Tier 3  Shell / CLI        grep, sed, awk, jq, curl            │
│  Tier 4  Query Languages    SQL, GraphQL, XPath                 │
│  Tier 5  Static Scripting   TypeScript, Go, Rust                 │
│  Tier 6  Dynamic Languages  Python, Node.js, Ruby                │
│  Tier 7  Microservices      Kubernetes, Docker, Express          │
│  Tier 8  External Services  Zapier, IFTTT, n8n, Make            │
│                                                                   │
│  VERDICTS:  PASS (proceed) | REJECT (downgrade)                  │
│             WARN (check) | ESCALATE (need human)                  │
│                                                                   │
│  SEVERITY:  1=minor  2=moderate  3=serious                       │
│             4=critical  5=absurd                                 │
│                                                                   │
│  QUICK-CHECK (< 100ms):                                          │
│    Framework for one-liner?     → REJECT                         │
│    Runtime for shell command?   → REJECT                         │
│    Database for file read?      → REJECT                         │
│    Microservice for script?     → REJECT                         │
│                                                                   │
│  AUTONOMOUS:  severity ≤ 3 = auto-fix | ≥ 4 = block + ask       │
│                                                                   │
│  SUPPRESS:   // simplicity-gate: ignore                          │
│              // sg-ignore                                         │
│              (max 3 per file)                                     │
│                                                                   │
│  CLI:        simplicity-gate eval <code>                          │
│              simplicity-gate fix <file>                           │
│              simplicity-gate scan <dir>                           │
│              simplicity-gate why-not <keyword>                    │
│              simplicity-gate tiers                                │
│              simplicity-gate bench                                │
└─────────────────────────────────────────────────────────────────┘
```

## Rules

These are non-negotiable. Violating them triggers REJECT.

### Rule 1: No Unnecessary Runtimes

Don't add Node.js/Python/Ruby when shell commands or data formats work.

| Task | Don't Use | Use Instead |
|------|-----------|-------------|
| Transform JSON | Node.js script | `jq` |
| Filter logs | Python script | `grep` + `awk` |
| Rename files | Node.js script | `mv` or `rename` |
| Monitor disk | Python + psutil | `df` + `awk` |
| Send email | Node.js + nodemailer | `mail` command |
| Parse CSV | Python + pandas | `awk -F','` |

**Exception:** If the project already uses the runtime AND the task is complex enough to justify it.

### Rule 2: No Unnecessary Dependencies

Don't add a package when stdlib, a Unix utility, or a platform feature works.

| Don't Use | Use Instead | Why |
|-----------|-------------|-----|
| `lodash` | Native Array methods | `.map()`, `.filter()`, `.reduce()` are built-in |
| `moment` | `Intl.DateTimeFormat` | Built into every modern runtime |
| `axios` | `fetch()` | Built into Node.js 18+ and all browsers |
| `uuid` | `crypto.randomUUID()` | Built into Node.js 19+ and all browsers |
| `express` for proxy | `curl` or `http` module | One command vs 14 dependencies |
| `nodemailer` | `mail` command | Built into Unix systems |

### Rule 3: No Code for Data Problems

Don't write scripts to transform/filter/reformat when jq, sed, awk, or CSS works.

| Data Problem | Don't Write | Use Instead |
|--------------|-------------|-------------|
| Rename JSON keys | Node.js script | `jq '{new: .old}'` |
| Filter CSV rows | Python script | `awk '$3 > 100'` |
| Extract values | JavaScript | `jq '.items[].name'` |
| Sort data | Script | `sort` or `jq 'sort_by(.date)'` |
| Validate JSON | Custom validator | `jq empty` |
| Show/hide UI | React component | CSS `:has()` + checkbox |

### Rule 4: No Microservices for Single-Machine Problems

Don't add containers/orchestration when a local process or cron job works.

| Don't Use | Use Instead |
|-----------|-------------|
| Docker for cron job | System `crontab` |
| Kubernetes for static site | `npx serve` or nginx |
| Docker Compose for dev | Native package manager |
| Microservices for CRUD | Monolith with modules |

### Rule 5: No Frameworks for Plain Solutions

Don't reach for Express/Flask/Django when a simple script or static file works.

| Don't Use | Use Instead |
|-----------|-------------|
| Express for API proxy | `curl` command |
| Flask for simple form | HTML `<form action="mailto:...">` |
| Django for blog | Static HTML + GitHub Pages |
| React for toggle | CSS `:has()` + checkbox |

### Rule 6: Schema Before Code

If a JSON Schema, YAML schema, or CSS can enforce it — write the schema, not code.

| Don't Use | Use Instead |
|-----------|-------------|
| Custom validation script | JSON Schema |
| CSS-in-JS for styling | Plain CSS |
| TypeScript types for simple objects | JSDoc comments |

### Rule 7: Text Processing Before Programming

If grep/sed/awk/jq can transform it — use the pipeline, not a script.

| Don't Use | Use Instead |
|-----------|-------------|
| Python for log parsing | `grep` + `awk` + `sed` |
| Node.js for text replacement | `sed 's/old/new/g'` |
| Script for word count | `wc -l` |

### Rule 8: Compile-Time Over Runtime

If static analysis can catch the error — prefer it over runtime validation.

| Don't Use | Use Instead |
|-----------|-------------|
| Runtime type checking | TypeScript compile-time types |
| Runtime linting | ESLint in CI |
| Runtime schema validation | JSON Schema at build time |

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

## Skill Chaining

Simplicity Gate works alongside other skills. Chain them for maximum effectiveness:

```
CHAINS:

Code Generation:
  [1] simplicity-gate (evaluate) ──→ [2] build (write code) ──→ [3] quality-gate (verify)

Refactoring:
  [1] simplicity-gate (scan) ──→ [2] refactor-agent (apply) ──→ [3] self-verify (test)

Architecture:
  [1] simplicity-gate (evaluate) ──→ [2] plan (review) ──→ [3] build (implement)

Security:
  [1] simplicity-gate (check deps) ──→ [2] security-warden (scan) ──→ [3] build (fix)

Testing:
  [1] simplicity-gate (auto-fix) ──→ [2] test-strategist (add tests) ──→ [3] self-verify (run)
```

**Chaining rules:**
- Simplicity Gate runs FIRST — block over-engineering before any code is written
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

**How confidence is calculated:**

```
CONFIDENCE FACTORS:
├── Pattern match strength      (0-30 pts)  — known anti-pattern = 30
├── Alternative availability    (0-25 pts)  — exact alternative = 25
├── Historical data             (0-20 pts)  — many past evaluations = 20
├── Community verification      (0-15 pts)  — community pattern = 15
└── Language-specific knowledge (0-10 pts)  — language tier data = 10
```

**Confidence in verdicts:**

```
SIMPLICITY GATE — REJECT [Severity: 3] [Confidence: 92%]
Proposed:    Express.js (Tier 7) for API proxy
Use instead: curl (Tier 3)
Why:         curl handles HTTP requests without a runtime.
Confidence:  92% — well-established pattern, exact alternative exists
```

**Confidence rules:**
- Below 60%: Add "RECOMMEND: Verify with team" to verdict
- Below 40%: Auto-ESCALATE regardless of severity
- Confidence improves over time as more evaluations are recorded
- Community-verified patterns always score 80%+ confidence

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

```yaml
ai_agent_overrides:
  # When AI suggests a framework, apply stricter evaluation
  framework_stricter: true
  # When AI suggests a library, check if native exists first
  library_native_check: true
  # When AI suggests architecture patterns, question necessity
  architecture_question: true
  # When AI adds "just in case" code, reject it
  no_just_in_case: true
```

### AI Teaching Patterns

When the gate catches an AI over-engineering, include a specific lesson:

```
AI TEACHING MOMENT:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Agent: "I'll create an Express server to handle the API proxy."

WHY THE AI THOUGHT THIS:
AI agents are trained on code that includes many web frameworks.
Express appears in ~40% of Node.js projects in training data.
This creates a bias toward reaching for Express even when unnecessary.

THE CORRECT THINKING:
1. What does the task need? → Make HTTP requests
2. What's the simplest tool? → curl (one command)
3. Does curl satisfy all requirements? → Yes
4. Why would I use Express? → No valid reason

LESSON:
When an AI suggests a framework, ask: "Can a command-line tool do this?"
If yes, use the command-line tool. Frameworks are for complex routing,
middleware, and long-running servers — not for simple HTTP requests.
```

---

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

**"AI agents always over-engineer — should I disable the gate?"**
No. The gate exists precisely because AI agents over-engineer. Use the AI Agent Anti-Patterns section to apply stricter evaluation to AI suggestions. The gate is your safeguard, not your obstacle.

**"My project has a strict linting/eslint config that requires certain patterns"**
If your ESLint config enforces a pattern that the gate rejects, add an override in `.simplicity-gate.yml`. The gate defers to team-agreed conventions when documented.

**"I need to support both browser and Node.js"**
The gate evaluates each environment separately. A Tier 0 browser API (fetch) may coexist with a Tier 6 Node.js script. The gate blocks unnecessary additions, not cross-platform compatibility.

**"My task requires real-time updates (WebSocket, SSE)"**
WebSocket handling justifies Tier 6 (ws library) or Tier 7 (Socket.io). The gate does not block real-time requirements — it blocks assuming you need real-time when polling (Tier 3) would work.

**"The shell version is too slow for my data size"**
If you have measured data showing shell is too slow (not assumed), escalate with benchmark data. The gate respects measured performance over assumed performance.

## Conflict Resolution

When rules conflict, follow this priority order:

```
CONFLICT RESOLUTION:
1. Security  → Always wins. CVE = REJECT regardless of other factors.
2. Measured performance → If benchmarked, higher tier may be justified.
3. Team convention → If documented in .simplicity-gate.yml, defer to team.
4. The Rule   → Lowest tier that satisfies ALL functional requirements.
5. Simplicity → When in doubt, choose the simpler option.
```

**Common conflicts:**

| Conflict | Resolution |
|----------|------------|
| "Shell is slow" vs "Node.js is heavy" | Measure first. If shell is <1s, keep shell. |
| "Team uses Express" vs "curl works" | Allow Express if documented in overrides. |
| "Performance needed" vs "No benchmarks" | ESCALATE — requires measured evidence. |
| "Cross-platform" vs "Shell commands" | Tier 5 (TypeScript) may be justified for cross-platform. |
| "Type safety" vs "Over-engineering" | Tier 5 (TypeScript) for production code, Tier 6 (JS) for scripts. |

## Changelog

### v5.0.0
- Added Proactive Write Prevention — blocks over-engineered code before it's written
- Added Real-World Cost Calculator — ties tier violations to actual cloud costs
- Added Community Pattern Library — growing database of anti-patterns → alternatives
- Added Agent Behavior Profiling — tracks which agents over-engineer most
- Added Interactive Teaching Mode — explains WHY simpler is better
- Added Team Gamification — simplicity leaderboard and achievements
- Added Auto-Migration — scans codebase for old over-engineering
- Added Dependency Weight Reporter — real dependency costs before adding packages

### v6.0.0
- Added Real-Time Code Review Integration — intercepts writes BEFORE they happen
- Added "Why Not" Database — 20+ real-world incidents proving why over-engineering fails
- Added One-Click Fix — CLI command that auto-applies simpler alternatives
- Added Autonomous Mode — skill runs entirely without human intervention
- Added Pre-Write Hook Triggers — intercepts file writes, edits, imports, installs
- Added Severity-Based Actions — automatic response based on violation severity
- Added Fix Safety Rails — backups, test requirements, max changes per session
- Added Session Summaries — autonomous session reports with metrics and learnings
- Added Fix History — complete audit trail of all auto-applied fixes
- Added Rollback Capability — revert any fix with one command
- Removed duplicate "The Rule" and "How to Evaluate" sections
- Added Quick-Reference Card (single-page cheat sheet)
- Added 7 new languages: C, C++, Dart, Elixir, Haskell, Julia
- Added Skill Chaining (chains with build, plan, refactor-agent, security-warden, test-strategist)
- Added Decision Confidence scoring (0-100%)
- Added AI Agent Anti-Patterns section (8 patterns + adjustments)
- Added Conflict Resolution priority order
- Added 6 new edge cases
- Added Pattern Submission Format and Verification process
- Expanded "Why Not" database with 11 new incidents
- Expanded Community Pattern Library with 6 new patterns
- Tightened Rules section with tables and examples for each rule

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
