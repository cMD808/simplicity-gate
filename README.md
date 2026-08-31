<p align="center">
  <img src="assets/Gemini_Generated_Image_4d84p04d84p04d84.jpg" alt="Simplicity Gate" width="600">
</p>

<h1 align="center">Simplicity Gate</h1>

<p align="center">
  <em>The Rule of Least Power enforcer for AI coding agents. v3.0 — auto-trigger, severity scoring, auto-fix templates.</em>
</p>

<p align="center">
  <a href="#the-problem">The Problem</a> ·
  <a href="#before--after">Before & After</a> ·
  <a href="#installation">Installation</a> ·
  <a href="#how-it-works">How It Works</a> ·
  <a href="#examples">Examples</a> ·
  <a href="#contributing">Contributing</a>
</p>

---

## The Problem

AI coding agents are trained on patterns from large, production codebases. When you ask them to solve a problem, they instinctively reach for the most robust, most battle-tested tool available. That instinct is usually wrong for the task at hand.

| You ask for... | The agent builds... | But this works... |
|:---------------|:--------------------|:------------------|
| Rename a JSON key | Node.js script + lodash | `jq` one-liner |
| UI toggle state | React + Zustand + useReducer | CSS `:has()` selector |
| Disk monitoring | Python + psutil + cron | `df \| awk` pipeline |
| Config validation | Express middleware | JSON Schema |
| API proxy | Nginx + Docker Compose | `curl` + cron |
| Log filtering | Python script with regex | `grep` + `awk` |
| CSV processing | Pandas DataFrame | `cut` + `sort` + `uniq` |
| Form validation | JavaScript runtime check | HTML5 `required` + `pattern` |
| Static file server | Express.js application | `python -m http.server` |
| Dependency check | Custom Node.js script | `npm ls` or `pip check` |

**More power means more complexity.** More dependencies to install. More runtime to manage. More things that break at 3 AM.

Simplicity Gate forces agents to evaluate every proposal against a 7-tier power hierarchy *before* writing a single line of code.

---

## Before & After

These real-world scenarios show what changes when Simplicity Gate is active.

<details>
<summary><strong>Scenario 1: Rename JSON Keys</strong> — Node.js vs jq</summary>

<br>

**Without Simplicity Gate:**

The agent proposes a Node.js script. You get 40+ lines, two new dependencies, and a runtime you didn't need.

```bash
npm install lodash
cat > convert.js << 'EOF'
const fs = require('fs');
const _ = require('lodash');

const config = JSON.parse(fs.readFileSync('config.json', 'utf8'));
const converted = {};
_.forEach(config, (value, key) => {
  converted[key.replace('old_', 'new_')] = value;
});
delete converted.deprecated_field;
fs.writeFileSync('config.json', JSON.stringify(converted, null, 2));
EOF
node convert.js
```

| Metric | Value |
|:-------|:------|
| Lines of code | 40+ |
| Dependencies | `lodash`, `fs` |
| Runtime required | Node.js (100+ MB) |
| Install time | ~5 seconds |
| Execution time | ~200ms |

**With Simplicity Gate:**

The gate rejects Node.js and suggests `jq`. One command replaces the entire script.

```bash
jq '{new_database_host: .old_db_host, new_api_key: .old_api_key} | del(.deprecated)' \
  config.json > config-new.json && mv config-new.json config.json
```

| Metric | Value |
|:-------|:------|
| Lines of code | 1 |
| Dependencies | None |
| Runtime required | None (binary already present) |
| Install time | 0 |
| Execution time | ~10ms |

</details>

<details>
<summary><strong>Scenario 2: UI Toggle Component</strong> — React vs CSS</summary>

<br>

**Without Simplicity Gate:**

The agent scaffolds a full React component with state management, TypeScript interfaces, and a state management library.

```tsx
import React, { useReducer } from 'react';
import { create } from 'zustand';

interface ToggleState {
  isActive: boolean;
  isExpanded: boolean;
  theme: 'light' | 'dark';
}

type Action =
  | { type: 'TOGGLE_ACTIVE' }
  | { type: 'TOGGLE_EXPAND' }
  | { type: 'SET_THEME'; payload: 'light' | 'dark' };

const useStore = create<ToggleState>()((set) => ({
  isActive: false,
  isExpanded: false,
  theme: 'light',
  dispatch: (action: Action) => set((state) => {
    switch (action.type) {
      case 'TOGGLE_ACTIVE': return { isActive: !state.isActive };
      case 'TOGGLE_EXPAND': return { isExpanded: !state.isExpanded };
      case 'SET_THEME': return { theme: action.payload };
    }
  }),
}));

export const Toggle = () => {
  const { isActive, isExpanded, theme, dispatch } = useStore();
  return (
    <div className={theme}>
      <button onClick={() => dispatch({ type: 'TOGGLE_ACTIVE' })}>
        {isActive ? 'Active' : 'Inactive'}
      </button>
      {isExpanded && <div className="content">Content</div>}
    </div>
  );
};
```

| Metric | Value |
|:-------|:------|
| Lines of code | 120+ |
| Dependencies | `react`, `zustand`, `react-dom` |
| Runtime required | React (40+ KB gzipped) |
| Bundle impact | Significant |
| Re-renders on toggle | Yes |

**With Simplicity Gate:**

The gate rejects React and suggests CSS `:has()` with hidden checkboxes. Pure HTML and CSS — no JavaScript needed.

```html
<div class="panel">
  <input type="checkbox" class="toggle" id="expand-toggle">
  <label for="expand-toggle">Toggle Content</label>
  <div class="content">Expanded content here</div>
</div>

<style>
  .panel:has(.toggle:checked) .content { display: block; }
  .panel:has(.toggle:not(:checked)) .content { display: none; }
</style>
```

| Metric | Value |
|:-------|:------|
| Lines of code | 15 |
| Dependencies | None |
| Runtime required | Browser (already present) |
| Bundle impact | Zero |
| Re-renders on toggle | No (pure CSS) |

</details>

<details>
<summary><strong>Scenario 3: Disk Monitoring</strong> — Python vs Shell</summary>

<br>

**Without Simplicity Gate:**

The agent writes a Python script with `psutil` for disk checking and `smtplib` for email alerts.

```python
import psutil
import smtplib
from email.mime.text import MIMEText

def check_disk(threshold=90):
    alerts = []
    for partition in psutil.disk_partitions():
        try:
            usage = psutil.disk_usage(partition.mountpoint)
            if usage.percent > threshold:
                alerts.append(f"{partition.mountpoint}: {usage.percent}%")
        except PermissionError:
            continue
    return alerts

def send_alert(alerts):
    if not alerts:
        return
    body = "Disk usage alerts:\n" + "\n".join(alerts)
    msg = MIMEText(body)
    msg['Subject'] = 'Disk Alert'
    msg['From'] = 'monitor@example.com'
    msg['To'] = 'admin@example.com'
    with smtplib.SMTP('smtp.example.com', 587) as s:
        s.starttls()
        s.send_message(msg)

if __name__ == '__main__':
    send_alert(check_disk())
```

| Metric | Value |
|:-------|:------|
| Lines of code | 80+ |
| Dependencies | `psutil`, `smtplib` |
| Runtime required | Python 3.x (100+ MB) |
| Install time | ~10 seconds |
| Execution time | ~500ms |

**With Simplicity Gate:**

The gate rejects Python for simple threshold alerts. A shell pipeline handles it in one line.

```bash
THRESHOLD=90
df -h | awk 'NR>1 && int($5) > '"$THRESHOLD"' {print $6, $5}' | \
  xargs -I{} echo "HIGH DISK: {}" | mail -s "Disk Alert" admin@example.com
```

| Metric | Value |
|:-------|:------|
| Lines of code | 1 |
| Dependencies | None |
| Runtime required | bash (already present) |
| Install time | 0 |
| Execution time | ~50ms |

</details>

<details>
<summary><strong>Scenario 4: Log Analysis</strong> — Python vs awk</summary>

<br>

**Without Simplicity Gate:**

The agent writes a Python script with regex to parse access logs.

```python
import re
from collections import Counter

with open('access.log') as f:
    lines = f.readlines()

ip_pattern = re.compile(r'^(\d+\.\d+\.\d+\.\d+)')
status_pattern = re.compile(r'" (\d{3}) ')

ips = Counter(ip_pattern.match(l).group(1) for l in lines if ip_pattern.match(l))
statuses = Counter(status_pattern.search(l).group(1) for l in lines if status_pattern.search(l))

print("Top IPs:", ips.most_common(10))
print("Status codes:", statuses.most_common())
```

**With Simplicity Gate:**

```bash
# Top 10 IPs
awk '{print $1}' access.log | sort | uniq -c | sort -rn | head -10

# Status code distribution
awk '{print $9}' access.log | sort | uniq -c | sort -rn
```

| Metric | Without Gate | With Gate |
|:-------|:-------------|:----------|
| Lines of code | 50+ | 2 |
| Dependencies | `re`, `collections` | None |
| Runtime | Python | bash |
| Execution time | ~1s | ~50ms |

</details>

<details>
<summary><strong>Scenario 5: When Higher Tiers PASS</strong> — Complex requirements</summary>

<br>

**Proposal:** Python script with retry logic, template rendering, and multi-recipient email routing.

The gate evaluates the requirements:
- Retry logic with exponential backoff — exceeds shell capabilities
- Template rendering for email bodies — exceeds shell capabilities
- Multi-recipient routing with per-user config — exceeds shell capabilities

**Verdict:**

```
SIMPLICITY GATE — PASS
Tool:     Python script (Tier 6)
Why:      Requires retry logic, template rendering, and multi-recipient
          routing — features that exceed shell pipeline expressiveness.
```

**The gate is not anti-complexity — it's anti-unnecessary-complexity.**

</details>

---

## The Hierarchy

Every proposal is evaluated against this 7-tier power hierarchy. Start at Tier 1. Stop at the first tier that works.

```
Tier 1 — Platform Features     HTTP headers, CDN, CSS animations, HTML forms
Tier 2 — Data Formats          JSON, YAML, TOML, XML, CSS, Markdown
Tier 3 — Shell / CLI           grep, sed, awk, jq, yq, curl, find, xargs
Tier 4 — Query Languages       SQL, GraphQL, XPath, CSS selectors
Tier 5 — Static Scripting      TypeScript, Go, Rust (compiled, typed)
Tier 6 — Dynamic Languages     Python, Node.js, Ruby (interpreted, mutable)
Tier 7 — Microservices         Kubernetes, Docker, Express, Django
```

### Tier Descriptions

| Tier | Category | Examples | When to Use |
|:-----|:---------|:---------|:------------|
| **1** | Platform Features | HTTP headers, CDN, CSS animations, HTML forms | The browser/platform already does this |
| **2** | Data Formats | JSON, YAML, TOML, XML, CSS, Markdown | The structure itself is the solution |
| **3** | Shell / CLI | `grep`, `sed`, `awk`, `jq`, `yq`, `curl` | Text transformation, file operations, API calls |
| **4** | Query Languages | SQL, GraphQL, XPath, CSS selectors | Structured data retrieval and filtering |
| **5** | Static Scripting | TypeScript, Go, Rust | Type safety, performance, compilation required |
| **6** | Dynamic Languages | Python, Node.js, Ruby | Complex logic, API integration, existing runtime |
| **7** | Microservices | Kubernetes, Docker, Express, Django | Multi-service orchestration, independent scaling |

---

## Installation

### Quick Reference

| Agent | Config File | Platform |
|:------|:------------|:---------|
| **Claude Code** | `CLAUDE.md` | All |
| **OpenCode** | `.opencode/skills/simplicity-gate.md` | All |
| **Codex** | `CODEX.md` | All |
| **Aider** | `--read SKILL.md` or `.aider.conf.yml` | All |
| **Cursor** | `.cursorrules` | All |
| **Windsurf** | `.windsurfrules` | All |
| **Cline** | `.clinerules` | All |
| **Continue** | `.continue/config.json` | All |
| **GitHub Copilot** | `.github/copilot-instructions.md` | All |
| **Roo Code** | `.roo/rules/simplicity-gate.md` | All |
| **Amazon Q** | `.amazonq/rules/simplicity-gate.md` | All |

### Quick Copy

One command per agent. Pick yours:

```bash
# Claude Code
cat SKILL.md > CLAUDE.md

# OpenCode
mkdir -p .opencode/skills && cp SKILL.md .opencode/skills/simplicity-gate.md

# Codex
cat SKILL.md > CODEX.md

# Aider
aider --read SKILL.md

# Cursor (skip frontmatter)
tail -n +25 SKILL.md > .cursorrules

# Windsurf (skip frontmatter)
tail -n +25 SKILL.md > .windsurfrules

# Cline (skip frontmatter)
tail -n +25 SKILL.md > .clinerules

# GitHub Copilot
mkdir -p .github && cat SKILL.md > .github/copilot-instructions.md

# Roo Code
mkdir -p .roo/rules && cp SKILL.md .roo/rules/simplicity-gate.md

# Amazon Q
mkdir -p .amazonq/rules && cp SKILL.md .amazonq/rules/simplicity-gate.md
```

<details>
<summary><strong>Claude Code</strong></summary>

<br>

Claude Code reads `CLAUDE.md` from your project root for instructions.

```bash
# Step 1: Navigate to your project
cd your-project/

# Step 2: Copy the skill (macOS/Linux)
cat path/to/simplicity-gate/SKILL.md > CLAUDE.md

# Step 2: Copy the skill (Windows PowerShell)
Get-Content path\to\simplicity-gate\SKILL.md | Set-Content CLAUDE.md

# Step 3: Verify
head -5 CLAUDE.md
```

**What this does:** Claude Code will read `CLAUDE.md` at the start of every session and follow the Simplicity Gate rules.

</details>

<details>
<summary><strong>OpenCode</strong></summary>

<br>

OpenCode has a native skills system. Place the file in the skills directory.

```bash
# Step 1: Create the skills directory (macOS/Linux)
mkdir -p .opencode/skills/

# Step 1: Create the skills directory (Windows PowerShell)
New-Item -ItemType Directory -Path ".opencode\skills" -Force

# Step 2: Copy the skill (macOS/Linux)
cp path/to/simplicity-gate/SKILL.md .opencode/skills/simplicity-gate.md

# Step 2: Copy the skill (Windows PowerShell)
Copy-Item path\to\simplicity-gate\SKILL.md .opencode\skills\simplicity-gate.md

# Step 3: Verify
ls .opencode/skills/
```

**What this does:** OpenCode automatically loads skills from `.opencode/skills/` and applies them to your session.

</details>

<details>
<summary><strong>Codex (OpenAI)</strong></summary>

<br>

Codex reads `CODEX.md` from your project root.

```bash
# Step 1: Navigate to your project
cd your-project/

# Step 2: Copy the skill (macOS/Linux)
cat path/to/simplicity-gate/SKILL.md > CODEX.md

# Step 2: Copy the skill (Windows PowerShell)
Get-Content path\to\simplicity-gate\SKILL.md | Set-Content CODEX.md
```

</details>

<details>
<summary><strong>Aider</strong></summary>

<br>

Aider can read instruction files via command-line flag or config.

**Option A: Command-line flag**
```bash
aider --read path/to/simplicity-gate/SKILL.md
```

**Option B: Config file**
```bash
# Add to .aider.conf.yml in your project root
cat > .aider.conf.yml << 'EOF'
read:
  - SKILL.md
EOF
```

</details>

<details>
<summary><strong>Cursor</strong></summary>

<br>

Cursor reads `.cursorrules` from your project root. Skip the YAML frontmatter (first 24 lines).

```bash
# Step 1: Navigate to your project
cd your-project/

# Step 2: Copy the skill, skipping frontmatter (macOS/Linux)
tail -n +25 path/to/simplicity-gate/SKILL.md > .cursorrules

# Step 2: Copy the skill, skipping frontmatter (Windows PowerShell)
Get-Content path\to\simplicity-gate\SKILL.md | Select-Object -Skip 24 | Set-Content .cursorrules

# Step 3: Restart Cursor to load the new rules
```

</details>

<details>
<summary><strong>Windsurf</strong></summary>

<br>

Windsurf reads `.windsurfrules` from your project root.

```bash
# Step 1: Navigate to your project
cd your-project/

# Step 2: Copy the skill, skipping frontmatter (macOS/Linux)
tail -n +25 path/to/simplicity-gate/SKILL.md > .windsurfrules

# Step 2: Copy the skill, skipping frontmatter (Windows PowerShell)
Get-Content path\to\simplicity-gate\SKILL.md | Select-Object -Skip 24 | Set-Content .windsurfrules

# Step 3: Restart Windsurf
```

</details>

<details>
<summary><strong>Cline (VS Code Extension)</strong></summary>

<br>

Cline reads `.clinerules` from your project root.

```bash
# Step 1: Navigate to your project
cd your-project/

# Step 2: Copy the skill, skipping frontmatter (macOS/Linux)
tail -n +25 path/to/simplicity-gate/SKILL.md > .clinerules

# Step 2: Copy the skill, skipping frontmatter (Windows PowerShell)
Get-Content path\to\simplicity-gate\SKILL.md | Select-Object -Skip 24 | Set-Content .clinerules

# Step 3: Reload VS Code window (Ctrl+Shift+P → "Reload Window")
```

</details>

<details>
<summary><strong>Continue</strong></summary>

<br>

Continue reads rules from its config file.

```bash
# Step 1: Open your Continue config (macOS/Linux)
open ~/.continue/config.json

# Step 1: Open your Continue config (Windows PowerShell)
Start-Process "$env:USERPROFILE\.continue\config.json"
```

```json
{
  "system_message": "...your existing config...",
  "rules": [
    "...paste the contents of SKILL.md here..."
  ]
}
```

</details>

<details>
<summary><strong>GitHub Copilot</strong></summary>

<br>

Copilot reads `.github/copilot-instructions.md` from your repository.

```bash
# Step 1: Create the directory (macOS/Linux)
mkdir -p .github/

# Step 1: Create the directory (Windows PowerShell)
New-Item -ItemType Directory -Path ".github" -Force

# Step 2: Copy the skill (macOS/Linux)
cat path/to/simplicity-gate/SKILL.md > .github/copilot-instructions.md

# Step 2: Copy the skill (Windows PowerShell)
Get-Content path\to\simplicity-gate\SKILL.md | Set-Content .github\copilot-instructions.md
```

</details>

<details>
<summary><strong>Roo Code</strong></summary>

<br>

Roo Code reads rules from `.roo/rules/`.

```bash
# Step 1: Create the rules directory (macOS/Linux)
mkdir -p .roo/rules/

# Step 1: Create the rules directory (Windows PowerShell)
New-Item -ItemType Directory -Path ".roo\rules" -Force

# Step 2: Copy the skill (macOS/Linux)
cp path/to/simplicity-gate/SKILL.md .roo/rules/simplicity-gate.md

# Step 2: Copy the skill (Windows PowerShell)
Copy-Item path\to\simplicity-gate\SKILL.md .roo\rules\simplicity-gate.md
```

</details>

<details>
<summary><strong>Amazon Q Developer</strong></summary>

<br>

Amazon Q reads rules from `.amazonq/rules/`.

```bash
# Step 1: Create the rules directory (macOS/Linux)
mkdir -p .amazonq/rules/

# Step 1: Create the rules directory (Windows PowerShell)
New-Item -ItemType Directory -Path ".amazonq\rules" -Force

# Step 2: Copy the skill (macOS/Linux)
cp path/to/simplicity-gate/SKILL.md .amazonq/rules/simplicity-gate.md

# Step 2: Copy the skill (Windows PowerShell)
Copy-Item path\to\simplicity-gate\SKILL.md .amazonq\rules\simplicity-gate.md
```

</details>

## How It Works

When your agent proposes a solution, Simplicity Gate evaluates it against the hierarchy:

```
PROPOSAL: "Write a Node.js script to rename JSON keys"

Simplicity Gate checks:
  Context — Node.js already in project?          → No (would be new runtime)
  Tier 1 — Can HTTP/HTML handle this?            → No
  Tier 2 — Can a data format express this?       → No
  Tier 3 — Can a shell command transform this?   → Yes

VERDICT: REJECT [Severity: 3]
  Proposed:    Node.js script (Tier 6)
  Use instead: jq (Tier 3)
  Command:     jq '{new_key: .old_key}' input.json > output.json
  Cost Savings: ~2,000 tokens saved

  --- AUTO-FIX ---
  jq '{new_key: .old_key} | del(.deprecated)' input.json > output.json
```

### Auto-Trigger

This skill fires automatically on every code generation, dependency addition, and architecture decision. No manual invocation needed.

### Decision Flowchart

```
PROPOSAL RECEIVED
       │
       ▼
┌─────────────────────────────┐
│ 1. CHECK PROJECT CONTEXT    │
│    What's already installed?│
└─────────────┬───────────────┘
              │
              ▼
┌─────────────────────────────┐
│ 2. CHECK LANGUAGE TIERS     │
│    Language-specific over-  │
│    rides?                   │
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

---

## Verdicts

| Verdict | Meaning | Action Required |
|:--------|:--------|:----------------|
| `PASS` | Lowest viable tier chosen | Proceed with implementation |
| `REJECT` | A lower tier works | Must downgrade before proceeding |
| `WARN` | Lower tier may work | Check if simpler option suffices |
| `ESCALATE` | Needs human judgment | Present justification + test plan for review |

Every REJECT and WARN includes a **severity score (1-5)** indicating how much over-engineering is proposed.

### PASS

```
SIMPLICITY GATE — PASS
Tool:     Python script (Tier 6)
Why:      Requires retry logic, template rendering, and multi-recipient
          routing — features that exceed shell pipeline expressiveness.
Cost:     ~1,500 tokens (already optimal)
```

### REJECT

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

### WARN

```
SIMPLICITY GATE — WARN [Severity: 2]
Proposed:  Python + pyyaml (Tier 6)
Note:      yq (Tier 3) can validate structure with fewer dependencies.
Check:     Does the validation require logic beyond structural checks?
Savings:   ~1,000 tokens if yq works

--- AUTO-FIX ---
yq eval '.' config.yaml > /dev/null 2>&1 && echo "Valid" || echo "Invalid"
```

### ESCALATE

```
SIMPLICITY GATE — ESCALATE
Reason:      Cross-platform support required (Windows + Linux)
Evidence:    Tier 3 shell commands don't work on Windows
Override:    Use Node.js (Tier 6) for cross-platform compatibility
Test Plan:   Unit tests for each platform, CI matrix testing
Cost Impact: ~3,000 additional tokens for higher tier
```

Escalation requires human approval and a test plan.

---

## The Rules

These rules are non-negotiable. Violating them triggers REJECT.

| # | Rule | Violation | Correct Approach |
|:--|:-----|:----------|:-----------------|
| 1 | **No unnecessary runtimes** | Adding Node.js for JSON processing | Use `jq` |
| 2 | **No unnecessary dependencies** | Installing lodash for `_.get()` | Use native access |
| 3 | **No code for data problems** | Writing a script to filter CSV | Use `awk` or `cut` |
| 4 | **No microservices for single-machine** | Docker for a cron job | Use `crontab` |
| 5 | **No frameworks for plain solutions** | Express for a static file server | Use `python -m http.server` |
| 6 | **Schema before code** | JavaScript form validation | Use JSON Schema |
| 7 | **Text processing before programming** | Python for log parsing | Use `grep`/`sed`/`awk` |
| 8 | **Compile-time over runtime** | Runtime type checking | Use TypeScript or Go |

---

## When Higher Tiers Are Justified

This is not anti-complexity. It is anti-unnecessary-complexity. Higher tiers pass when the requirements genuinely exceed lower tiers.

| Tier | Justified When |
|:-----|:---------------|
| **5** (Static Scripting) | Type safety is critical, performance is measured and documented, or logic is inherently complex |
| **6** (Dynamic Languages) | External API calls during execution, retry logic, template rendering, or integration with existing runtime |
| **7** (Microservices) | Multi-service orchestration, independent scaling requirements, or polyglot team constraints |

### Common Justifications

| Scenario | Justified Tier | Why |
|:---------|:---------------|:----|
| Cross-platform CLI tool | 5 (Go, Rust) | Single binary, no runtime needed |
| Web scraping with JS rendering | 6 (Python/Node) | Needs browser engine |
| Multi-service auth system | 7 (Microservices) | Independent scaling, different languages |
| Complex data pipeline with retries | 6 (Python) | Error handling exceeds shell capabilities |
| Real-time WebSocket server | 6 (Node.js) | Event loop, persistent connections |

---

## Impact Metrics

Measured across typical agent-proposed solutions:

| Metric | Without Gate | With Gate | Improvement |
|:-------|:-------------|:----------|:------------|
| Lines of code (avg) | 50–120 | 1–15 | **90%+ reduction** |
| Dependencies added | 2–5 | 0 | **100% reduction** |
| Runtime required | Node.js / Python | None (or existing) | **Often eliminated** |
| Setup time | `npm install` / `pip install` | None | **100% reduction** |
| Execution time | 500ms+ | 50ms | **10x faster** |
| Things that can break | Many | Few | **Significantly fewer** |

---

## What's New in v3.0

| Feature | Description |
|:--------|:------------|
| **Auto-Trigger** | Skill fires automatically on every code generation, dependency addition, and architecture decision |
| **Severity Scoring** | Every REJECT/WARN includes a severity score (1-5) indicating over-engineering level |
| **Auto-Fix Templates** | Every REJECT includes copy-pasteable replacement code |
| **Project Context Awareness** | Checks what's already installed before evaluating |
| **Cost Estimation** | Token savings included in every verdict |
| **Test Coverage for Escalations** | Escalations require a test plan |
| **Dependency Graph Check** | Verifies dependencies before adding new ones |
| **Performance Benchmarks** | REJECT includes benchmark data when available |
| **Migration Path Suggestions** | REJECT includes steps to migrate from proposed solution |
| **Team-Specific Overrides** | `.simplicity-gate.yml` for team customization |
| **CI/CD Integration** | GitHub Action template included |
| **Metrics Tracking** | Session summaries and violation counts |
| **Language-Specific Tiers** | Adjusted tiers for JS, Python, Go, Rust |

---

## Examples

Full walkthroughs with code comparisons in [`examples/`](examples/):

| Example | Proposed | Recommended | Verdict |
|:--------|:---------|:------------|:--------|
| [JSON Reformatting](examples/reformat-json.md) | Node.js + lodash (T6) | `jq` (T3) | REJECT |
| [UI Toggle](examples/css-toggle.md) | React + Zustand (T6) | CSS `:has()` (T1+2) | REJECT |
| [Disk Monitor](examples/shell-monitor.md) | Python + psutil (T6) | `df \| awk` (T3) | PASS* |
| [SQL vs Python](examples/sql-vs-python.md) | Python + pandas (T6) | SQL query (T4) | REJECT |
| [CSS vs JS Validation](examples/css-vs-js-validation.md) | JavaScript validator (T6) | HTML5 + CSS (T1+2) | REJECT |
| [curl vs Express](examples/curl-vs-express.md) | Express.js proxy (T7) | `curl` + cron (T3) | REJECT |
| [Make vs npm Scripts](examples/make-vs-npm.md) | npm scripts (T6) | Make (Tier 3) | WARN |

*\*PASS when retry logic, templates, or multi-recipient routing are required.*
*\*\*WARN when npm is already your project's runtime.*

---

## FAQ

<details>
<summary><strong>Does this mean I can never use React or Node.js?</strong></summary>

<br>

No. It means you should not use them *when a simpler tool works*. If your project already uses React, adding a toggle to an existing component is fine. The gate evaluates *new* additions, not existing infrastructure.

</details>

<details>
<summary><strong>What if the shell version is less readable?</strong></summary>

<br>

Readability is not a tier. The gate optimizes for fewer dependencies and less runtime. If the shell version is correct, use it. Add comments to document it.

</details>

<details>
<summary><strong>What about Windows compatibility?</strong></summary>

<br>

Tier 3 shell commands may not work on Windows. In that case, Tier 5 (compiled) or Tier 6 (interpreted) may be justified. Document this in the ESCALATE verdict.

</details>

<details>
<summary><strong>Does this work with AI assistants that don't read files?</strong></summary>

<br>

No. Simplicity Gate is designed for agents that can read instruction files from your project. If your agent doesn't support this, you can paste the rules into your conversation manually.

</details>

<details>
<summary><strong>Can I modify the rules?</strong></summary>

<br>

Yes. The rules are a starting point. If your team has different constraints, adjust them. The important thing is having *some* gate that forces tier evaluation.

</details>

<details>
<summary><strong>What if I disagree with a REJECT verdict?</strong></summary>

<br>

Use the ESCALATE format to present your case. If you have evidence that a higher tier is required (cross-platform support, complex error handling, integration with existing systems), document it and request human approval.

</details>

---

## Project Structure

```
simplicity-gate/
├── SKILL.md              The skill definition — copy this to your agent
├── README.md             This file
├── CONTRIBUTING.md       Contribution guidelines
├── SECURITY.md           Security policy
├── LICENSE               MIT License
└── examples/
    ├── css-toggle.md         React vs CSS toggle implementation
    ├── reformat-json.md      Node.js vs jq JSON transformation
    ├── shell-monitor.md      Python vs shell disk monitoring
    ├── sql-vs-python.md      SQL vs pandas data queries
    ├── css-vs-js-validation.md  HTML5 vs JavaScript form validation
    ├── curl-vs-express.md    curl vs Express API proxying
    └── make-vs-npm.md        Make vs npm scripts build automation
```

---

## Contributing

Contributions welcome. See [CONTRIBUTING.md](CONTRIBUTING.md) for:

- Adding new examples
- Expanding agent compatibility
- Improving verdict logic
- Reporting false PASS/REJECT verdicts

### Quick Contribution Guide

1. Fork the repository
2. Create a feature branch (`git checkout -b add-example`)
3. Add your example or improvement
4. Submit a pull request

---

## Security

Simplicity Gate is plain markdown. It does not execute code, access networks, or handle data. See [SECURITY.md](SECURITY.md) for details.

---

## License

MIT License. See [LICENSE](LICENSE).

---

<p align="center">
  <sub>Built to help AI agents write less code and ship more value. Now with auto-trigger.</sub>
</p>
