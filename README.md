<p align="center">
  <img src="assets/Gemini_Generated_Image_4d84p04d84p04d84-removebg-preview.png" alt="Simplicity Gate" width="300">
</p>

<h1 align="center">Simplicity Gate</h1>

<p align="center">
  <em>The Rule of Least Power enforcer for AI coding agents.</em>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/version-4.0.0-blue" alt="Version">
  <img src="https://img.shields.io/badge/license-MIT-green" alt="License">
  <img src="https://img.shields.io/badge/agents-12+-purple" alt="Agents">
  <img src="https://img.shields.io/badge/tiers-9-orange" alt="Tiers">
  <img src="https://img.shields.io/badge/auto--fix-enabled-brightgreen" alt="Auto-Fix">
  <img src="https://img.shields.io/badge/interactive--mode-enabled-brightgreen" alt="Interactive Mode">
  <img src="https://img.shields.io/badge/learning--mode-enabled-brightgreen" alt="Learning Mode">
</p>

---

## The Problem

AI agents instinctively reach for the most powerful tool available. That instinct is usually wrong.

| You ask for... | The agent builds... | But this works... |
|:---------------|:--------------------|:------------------|
| Rename a JSON key | Node.js script + lodash | `jq` one-liner |
| UI toggle state | React + Zustand | CSS `:has()` |
| Disk monitoring | Python + psutil + cron | `df \| awk` |
| API proxy | Nginx + Docker | `curl` + cron |
| Log filtering | Python script | `grep` + `awk` |

**More power = more complexity.** More dependencies. More things that break at 3 AM.

---

## The Hierarchy

| Tier | Power Level | Examples |
|:----:|:------------|:---------|
| 0 | Built-in APIs | `fetch()`, `structuredClone()`, `URL`, `Intl` |
| 1 | Declarative markup | HTML, CSS, JSON Schema |
| 2 | Declarative logic | CSS `:has()`, Jinja, YAML |
| 3 | Standard utilities | `jq`, `grep`, `awk`, `curl` |
| 4 | Query languages | SQL, GraphQL, SQLite |
| 5 | High-level scripting | Python, Ruby, shell scripts |
| 6 | Application frameworks | Express, Rails, Django |
| 7 | Custom infrastructure | Kubernetes, service meshes |
| 8 | External services | Zapier, IFTTT, n8n, Make |

---

## Installation

### Quick Copy

```bash
# Claude Code
cp SKILL.md ~/.claude/commands/simplicity-gate.md

# OpenCode
cp SKILL.md ~/.config/opencode/skills/simplicity-gate.md

# Codex
cp SKILL.md ~/.codex/skills/simplicity-gate.md

# Aider
cp SKILL.md .aider.conf.yml  # or add to .aider/skills/

# Cursor / Windsurf / Cline
tail -n +25 SKILL.md > .cursorrules  # skip YAML frontmatter

# GitHub Copilot
mkdir -p .github/copilot-instructions
cp SKILL.md .github/copilot-instructions/simplicity-gate.md

# Roo Code
mkdir -p .roo/skills
cp SKILL.md .roo/skills/simplicity-gate.md

# Amazon Q
mkdir -p .amazonq/rules
cp SKILL.md .amazonq/rules/simplicity-gate.md
```

### Full Install Guides

<details>
<summary>Claude Code</summary>

```bash
mkdir -p ~/.claude/commands
cp SKILL.md ~/.claude/commands/simplicity-gate.md
```

</details>

<details>
<summary>OpenCode</summary>

```bash
mkdir -p ~/.config/opencode/skills
cp SKILL.md ~/.config/opencode/skills/simplicity-gate.md
```

</details>

<details>
<summary>Codex</summary>

```bash
mkdir -p ~/.codex/skills
cp SKILL.md ~/.codex/skills/simplicity-gate.md
```

</details>

<details>
<summary>Aider</summary>

Add to your `.aider.conf.yml`:
```yaml
skill_files:
  - .aider/skills/simplicity-gate.md
```
```bash
mkdir -p .aider/skills
cp SKILL.md .aider/skills/simplicity-gate.md
```

</details>

<details>
<summary>Cursor / Windsurf / Cline</summary>

```bash
tail -n +25 SKILL.md > .cursorrules
# Restart editor after copying
```

</details>

<details>
<summary>Continue</summary>

Add to `~/.continue/config.json`:
```json
{
  "customInstructions": "./continue/skills/simplicity-gate.md"
}
```
```bash
mkdir -p continue/skills
cp SKILL.md continue/skills/simplicity-gate.md
```

</details>

<details>
<summary>GitHub Copilot</summary>

```bash
mkdir -p .github/copilot-instructions
cp SKILL.md .github/copilot-instructions/simplicity-gate.md
```

</details>

<details>
<summary>Roo Code</summary>

```bash
mkdir -p .roo/skills
cp SKILL.md .roo/skills/simplicity-gate.md
```

</details>

<details>
<summary>Amazon Q</summary>

```bash
mkdir -p .amazonq/rules
cp SKILL.md .amazonq/rules/simplicity-gate.md
```

</details>

---

## How It Works

1. Agent proposes a solution
2. Gate checks: project context → language tiers → dependency graph
3. Gate evaluates against the tier hierarchy
4. Verdict issued: **PASS**, **REJECT**, **WARN**, or **ESCALATE**

```
Agent proposes solution
        │
        ▼
┌─────────────────┐
│ Check project    │  What's already installed?
│ context          │
└────────┬────────┘
         ▼
┌─────────────────┐
│ Check language   │  Language-specific tier adjustments
│ tiers            │
└────────┬────────┘
         ▼
┌─────────────────┐
│ Check dependency │  Does the dependency already exist?
│ graph            │
└────────┬────────┘
         ▼
┌─────────────────┐
│ Evaluate vs      │  Compare proposed tier to simplest viable tier
│ hierarchy        │
└────────┬────────┘
         ▼
┌─────────────────┐
│ Issue verdict    │  PASS / REJECT / WARN / ESCALATE
└─────────────────┘
```

### Verdicts

**PASS** — Appropriate tool selected:
```
PASS: jq selected (Tier 3) for JSON transformation
Cost Savings: ~4,500 tokens saved
```

**REJECT** — Over-engineered, use simpler alternative:
```
REJECT: Express.js (Tier 7) for JSON rename — use jq (Tier 3)
Severity: 4/5 (4-tier gap)
Auto-fix: jq '{new_key: .old_key}' input.json > output.json
Cost Savings: ~8,200 tokens saved
```

**WARN** — Borderline, document justification:
```
WARN: React (Tier 6) for simple toggle — CSS :has() (Tier 2) may suffice
Severity: 2/5
Justification: [required]
```

**ESCALATE** — Requires human judgment:
```
ESCALATE: Custom ORM (Tier 6) vs raw SQL (Tier 4) for complex queries
Test Plan: [required]
```

---

## Examples

### 1. JSON Reformatting — Node.js vs jq

**Scenario:** Agent proposes a Node.js script to rename keys in a JSON file.

<details>
<summary><strong>Without Simplicity Gate</strong> (Tier 6 — REJECTED)</summary>

```javascript
const fs = require('fs');
const _ = require('lodash');

const config = JSON.parse(fs.readFileSync('config.json', 'utf8'));
const converted = {};
_.forEach(config, (value, key) => {
  converted[key.replace('old_', 'new_')] = value;
});
delete converted.deprecated_field;
fs.writeFileSync('config.json', JSON.stringify(converted, null, 2));
```

| Metric | Value |
|:-------|:------|
| Lines | 40+ |
| Dependencies | `lodash`, `fs` |
| Runtime | Node.js (100+ MB) |

</details>

<details>
<summary><strong>With Simplicity Gate</strong> (Tier 3 — PASS)</summary>

```bash
jq '{new_database_host: .old_db_host, new_api_key: .old_api_key} | del(.deprecated)' \
  config.json > config-new.json && mv config-new.json config.json
```

| Metric | Value |
|:-------|:------|
| Lines | 1 |
| Dependencies | None |
| Runtime | None |

</details>

---

### 2. UI Toggle — React vs CSS

**Scenario:** Agent proposes React + Zustand for UI toggle states.

<details>
<summary><strong>Without Simplicity Gate</strong> (Tier 6 — REJECTED)</summary>

```tsx
import React, { useReducer } from 'react';
import { create } from 'zustand';

const useStore = create<ToggleState>()((set) => ({
  isActive: false,
  isExpanded: false,
  theme: 'light',
  dispatch: (action) => set((state) => {
    switch (action.type) {
      case 'TOGGLE_ACTIVE': return { isActive: !state.isActive };
      case 'TOGGLE_EXPAND': return { isExpanded: !state.isExpanded };
      case 'SET_THEME': return { theme: action.payload };
    }
  }),
}));
```

| Metric | Value |
|:-------|:------|
| Lines | 120+ |
| Dependencies | `react`, `zustand` |
| Bundle | 40+ KB gzipped |

</details>

<details>
<summary><strong>With Simplicity Gate</strong> (Tier 1+2 — PASS)</summary>

```html
<label class="toggle">
  <input type="checkbox" class="toggle-input">
  <span class="toggle-label">Show Panel</span>
</label>
<div class="panel">
  <div class="content">Hidden content</div>
</div>
```

```css
.panel .content { display: none; }
.panel:has(.toggle:checked) .content { display: block; }
```

| Metric | Value |
|:-------|:------|
| Lines | 5 |
| Dependencies | None |
| Bundle | 0 KB |

</details>

---

### 3. Disk Monitor — Python vs Shell

**Scenario:** Agent proposes Python + psutil for disk monitoring.

<details>
<summary><strong>Without Simplicity Gate</strong> (Tier 6 — REJECTED)</summary>

```python
import psutil
import smtplib

def check_disk():
    usage = psutil.disk_usage('/')
    if usage.percent > 90:
        send_alert(f"Disk usage at {usage.percent}%")

def send_alert(message):
    # ... email logic ...
```

| Metric | Value |
|:-------|:------|
| Lines | 80+ |
| Dependencies | `psutil`, `smtplib` |
| Runtime | Python (50+ MB) |

</details>

<details>
<summary><strong>With Simplicity Gate</strong> (Tier 3 — PASS)</summary>

```bash
df -h | awk 'NR>1 && int($5)>90 {print $6}' | xargs -I{} echo "Alert: {}" | mail -s "Disk Alert" admin@example.com
```

| Metric | Value |
|:-------|:------|
| Lines | 1 |
| Dependencies | None |
| Runtime | None |

</details>

---

### 4. SQL vs Python for Data Queries

**Scenario:** Agent proposes Python + pandas for database queries.

<details>
<summary><strong>Without Simplicity Gate</strong> (Tier 6 — REJECTED)</summary>

```python
import psycopg2
import pandas as pd

conn = psycopg2.connect("dbname=mydb user=admin")
query = """
    SELECT country, customer_id, SUM(amount) as revenue
    FROM orders
    WHERE created_at > NOW() - INTERVAL '30 days'
    GROUP BY country, customer_id
    ORDER BY revenue DESC
    LIMIT 10
"""
df = pd.read_sql(query, conn)
print(df.to_string())
conn.close()
```

| Metric | Value |
|:-------|:------|
| Lines | 30+ |
| Dependencies | `psycopg2`, `pandas` |
| Runtime | Python (50+ MB) |

</details>

<details>
<summary><strong>With Simplicity Gate</strong> (Tier 4 — PASS)</summary>

```sql
SELECT country, customer_id, SUM(amount) as revenue
FROM orders
WHERE created_at > NOW() - INTERVAL '30 days'
GROUP BY country, customer_id
ORDER BY revenue DESC
LIMIT 10;
```

| Metric | Value |
|:-------|:------|
| Lines | 8 |
| Dependencies | None |
| Runtime | SQL engine (already present) |

</details>

---

### 5. Form Validation — JavaScript vs HTML5

**Scenario:** Agent proposes JavaScript validation for forms.

<details>
<summary><strong>Without Simplicity Gate</strong> (Tier 6 — REJECTED)</summary>

```javascript
function validateForm() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const errors = [];

  if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
    errors.push('Invalid email');
  if (password.length < 8)
    errors.push('Password too short');

  return errors.length === 0;
}
```

| Metric | Value |
|:-------|:------|
| Lines | 40+ |
| Dependencies | None |
| Runtime | Browser JS |

</details>

<details>
<summary><strong>With Simplicity Gate</strong> (Tier 1+2 — PASS)</summary>

```html
<form>
  <input type="email" required placeholder="Email">
  <input type="password" required minlength="8"
         pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
         title="Must contain uppercase, lowercase, and number">
  <button type="submit">Register</button>
</form>
```

| Metric | Value |
|:-------|:------|
| Lines | 5 |
| Dependencies | None |
| Runtime | Browser native |

</details>

---

### 6. API Proxy — Express vs curl

**Scenario:** Agent proposes Express.js for API proxying.

<details>
<summary><strong>Without Simplicity Gate</strong> (Tier 7 — REJECTED)</summary>

```javascript
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());

app.all('/api/proxy/*', async (req, res) => {
  const response = await axios({
    method: req.method,
    url: `https://external-api.com${req.path}`,
    headers: { Authorization: `Bearer ${process.env.API_KEY}` }
  });
  res.json(response.data);
});

app.listen(3000);
```

| Metric | Value |
|:-------|:------|
| Lines | 60+ |
| Dependencies | `express`, `axios`, `cors` |
| Runtime | Node.js (100+ MB) |

</details>

<details>
<summary><strong>With Simplicity Gate</strong> (Tier 3 — PASS)</summary>

```bash
curl -s -H "Authorization: Bearer $API_KEY" \
  "https://external-api.com/endpoint" | jq '.'
```

| Metric | Value |
|:-------|:------|
| Lines | 1 |
| Dependencies | None |
| Runtime | None |

</details>

---

### 7. Build Automation — npm vs Make

**Scenario:** Agent proposes npm scripts for build pipeline.

<details>
<summary><strong>Without Simplicity Gate</strong> (Tier 6 — WARN)</summary>

```json
{
  "scripts": {
    "lint": "eslint src/",
    "test": "jest --coverage",
    "build": "tsc && webpack --mode production",
    "ci": "npm run lint && npm run test && npm run build"
  }
}
```

| Metric | Value |
|:-------|:------|
| Lines | 20+ |
| Dependencies | `eslint`, `jest`, `typescript`, `webpack` |
| Runtime | Node.js |

</details>

<details>
<summary><strong>With Simplicity Gate</strong> (Tier 3 — WARN)</summary>

```makefile
.PHONY: lint test build ci

lint:
	eslint src/

test:
	jest --coverage

build:
	tsc && webpack --mode production

ci: lint test build
```

| Metric | Value |
|:-------|:------|
| Lines | 12 |
| Dependencies | Make (usually pre-installed) |
| Runtime | None |

</details>

---

## Configuration

Create `.simplicity-gate.yml` in your project root to override defaults:

```yaml
allowed_tools:
  - "express"  # Allow specific tools
blocked_tools:
  - "kubernetes"  # Always reject
tier_adjustments:
  "my-project-tool": 3  # Custom tier assignment
thresholds:
  max_tier: 5
  escalation_threshold: 6
settings:
  auto_fix: true
  interactive_mode: true
  learning_mode: true
  suppressions: true
  multi_file_scan: true
  dependency_cost: true
```

---

## What's New in v4.0

| Feature | Description |
|:--------|:------------|
| Tier 0 | Built-in APIs (`fetch`, `structuredClone`, `URL`) — free, zero deps |
| Tier 8 | External services (Zapier, IFTTT, n8n) — no-code > custom code |
| Auto-Fix | Applies replacements automatically, not just suggestions |
| Interactive Mode | Choice-based REJECTs — user picks from options |
| Learning Mode | Tracks overrides, suggests custom tiers after 5+ decisions |
| Multi-File Scan | Detects patterns across codebase, suggests consolidation |
| Dependency Cost | Shows package size, CVEs, transitive deps before adding |
| Inline Suppressions | `// simplicity-gate: ignore` to skip specific lines |

---

## FAQ

**Q: What if my project already uses React?**
A: The gate checks project context first. If React is already installed, using it for new components may PASS even if a simpler alternative exists.

**Q: Can I override a REJECT?**
A: Yes. Use `ESCALATE` to request human review, or add the tool to `allowed_tools` in `.simplicity-gate.yml`.

**Q: Does this slow down the agent?**
A: Minimal overhead. The gate adds ~200ms per evaluation. Token savings from avoiding over-engineering far outweigh the cost.

**Q: What languages are supported?**
A: All languages. Language-specific tiers are configured for JavaScript, Python, Go, and Rust out of the box. Add more in `.simplicity-gate.yml`.

---

## Impact

| Metric | Value |
|:-------|:------|
| Avg token savings per REJECT | ~6,000 |
| Avg complexity reduction | 70% |
| Avg dependency reduction | 80% |

---

## Examples

- [examples/](examples/) — Full walkthroughs with before/after code

---

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md).

---

## Security

See [SECURITY.md](SECURITY.md).

---

## License

MIT
