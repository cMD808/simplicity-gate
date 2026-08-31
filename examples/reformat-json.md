<h1 align="center">📄 Example: JSON Reformatting</h1>

<p align="center">
  <em>Node.js vs jq — 40+ lines reduced to 1 line</em>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/verdict-REJECT-red" alt="Verdict: REJECT">
  <img src="https://img.shields.io/badge/tier_gap-6→3-blue" alt="Tier Gap: 6→3">
  <img src="https://img.shields.io/badge/lines_saved-39+-brightgreen" alt="Lines Saved: 39+">
</p>

<br>

---

## 📋 Scenario

An agent proposes writing a Node.js script to convert a `config.json` file
from v1 schema to v2 schema.

<br>

## 📝 Proposal

```yaml
proposal:
  description: "Convert config.json from v1 schema to v2 schema"
  proposed_tier: 6
  proposed_tool: "Node.js script"
  language: "JavaScript"
  dependencies: ["lodash", "fs"]
  functional_requirements:
    - "Read JSON file"
    - "Rename keys according to mapping"
    - "Remove deprecated fields"
    - "Write updated JSON file"
```

<br>

---

## ❌ Proposed Solution (Tier 6 — REJECTED)

```javascript
// convert-config.js — 40+ lines, requires Node.js runtime
const fs = require('fs');
const _ = require('lodash');

const config = JSON.parse(fs.readFileSync('config.json', 'utf8'));

const converted = {
  new_database_host: config.db_host,
  new_database_port: config.db_port,
  new_api_key: config.api_key,
  // ... more key mappings
};

// Remove deprecated fields
delete converted.deprecated_field_1;
delete converted.deprecated_field_2;

fs.writeFileSync('config-v2.json', JSON.stringify(converted, null, 2));
```

### ⚠️ Problems

<table>
  <tr>
    <th>Issue</th>
    <th>Impact</th>
  </tr>
  <tr>
    <td>Requires Node.js runtime</td>
    <td>100+ MB installed</td>
  </tr>
  <tr>
    <td>Requires lodash dependency</td>
    <td>400+ KB</td>
  </tr>
  <tr>
    <td>40+ lines of imperative code</td>
    <td>High maintenance burden</td>
  </tr>
  <tr>
    <td>Runtime errors possible</td>
    <td>Missing keys, type issues</td>
  </tr>
</table>

<br>

---

## ✅ Recommended Solution (Tier 3 — PASS)

```bash
# Single pipeline, zero runtime, zero dependencies
jq '{
  new_database_host: .db_host,
  new_database_port: .db_port,
  new_api_key: .api_key
} | del(.deprecated_field_1, .deprecated_field_2)' config.json > config-v2.json
```

### ✨ Benefits

<table>
  <tr>
    <th>Benefit</th>
    <th>Details</th>
  </tr>
  <tr>
    <td>Single binary</td>
    <td><code>jq</code> is often pre-installed</td>
  </tr>
  <tr>
    <td>1 line of code</td>
    <td>Read, transform, write in one pipeline</td>
  </tr>
  <tr>
    <td>No runtime dependencies</td>
    <td>No Node.js, no lodash</td>
  </tr>
  <tr>
    <td>Schema validation built-in</td>
    <td>Automatic type checking</td>
  </tr>
  <tr>
    <td>Deterministic output</td>
    <td>Same input = same output, always</td>
  </tr>
</table>

<br>

---

## ⚖️ Verdict

```
⚠️  SIMPLICITY GATE — DOWNGRADE RECOMMENDED
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

PROPOSED:
  Tool:       Node.js script
  Tier:       6 — Dynamic Language / Runtime
  Runtime:    Node.js v20+
  Dependencies: lodash, fs

RECOMMENDED:
  Tool:       jq
  Tier:       3 — Regex / Shell Commands
  Runtime:    None (binary)
  Dependencies: None

WHY:
  jq is a purpose-built JSON processor that handles key renaming,
  field removal, and output writing in a single pipeline with no
  runtime or dependency overhead.

WHAT TO DO:
  Replace the Node.js script with:
    jq '{
      new_key: .old_key,
      another_key: .another_old_key
    } | del(.deprecated_field)' config.json > config-v2.json

  This eliminates Node.js, lodash, and 40+ lines of code.

FUNCTIONAL REQUIREMENTS MET:
  ☑ Read JSON file
  ☑ Rename keys according to mapping
  ☑ Remove deprecated fields
  ☑ Write updated JSON file
```

<br>

---

## 🤔 When Node.js IS Justified

Node.js becomes the correct choice when:

- The transformation requires **external API calls** during conversion
- The logic involves **complex conditional branching** (10+ branches)
- The output requires **templating** with user-provided data
- The process needs **error retry** with exponential backoff
- The script is part of a **larger Node.js application**

> **For pure data transformation, always prefer `jq`.**

<br>

---

<p align="center">
  <a href="../README.md">← Back to README</a>
</p>
