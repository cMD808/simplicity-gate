# Simplicity Gate

<p align="center">
  <strong>The Rule of Least Power enforcer for AI agents.</strong><br>
  Stop over-engineering. Start at the lowest tier. Ship less code.
</p>

<p align="center">
  <a href="LICENSE"><img src="https://img.shields.io/badge/License-MIT-blue.svg" alt="License"></a>
  <a href="CONTRIBUTING.md"><img src="https://img.shields.io/badge/PRs-Welcome-brightgreen.svg" alt="PRs Welcome"></a>
  <a href="SKILL.md"><img src="https://img.shields.io/badge/Skill-v2.1.0-orange.svg" alt="Skill Version"></a>
</p>

---

## The Problem

AI agents are trained on best practices from large codebases. Their instinct is to reach for the most robust, most powerful tool available. That instinct is usually wrong.

| You ask for... | The agent builds... | But this works... |
|----------------|--------------------|--------------------|
| Rename a JSON key | Node.js script + lodash | `jq` one-liner |
| UI toggle state | React + Zustand + useReducer | CSS `:has()` selector |
| Disk monitoring | Python + psutil + cron | `df \| awk` pipeline |
| Config validation | Express middleware | JSON Schema |
| API proxy | Nginx + Docker | `curl` + cron |
| Log filtering | Python script with regex | `grep` + `awk` |
| CSV processing | Pandas DataFrame | `cut` + `sort` + `uniq` |

**More power means more complexity.** More dependencies to install. More runtime to manage. More things that break at 3 AM.

## Before vs After Simplicity Gate

### Scenario 1: Rename JSON Keys

**Without Simplicity Gate:**
```bash
# Agent proposes: Node.js script (40+ lines, 2 dependencies)
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

# Result: 40+ lines, Node.js runtime (100+ MB), lodash (400+ KB)
```

**With Simplicity Gate:**
```bash
# Gate says: REJECT — use jq (Tier 3), not Node.js (Tier 6)
jq '{new_database_host: .old_db_host, new_api_key: .old_api_key} | del(.deprecated)' \
  config.json > config-new.json && mv config-new.json config.json

# Result: 1 line, zero dependencies, zero runtime
```

### Scenario 2: UI Toggle Component

**Without Simplicity Gate:**
```tsx
// Agent proposes: React component (120+ lines, 3 dependencies)
import React, { useReducer } from 'react';
import { create } from 'zustand';

interface ToggleState { isActive: boolean; isExpanded: boolean; theme: 'light' | 'dark'; }
type Action = 
  | { type: 'TOGGLE_ACTIVE' }
  | { type: 'TOGGLE_EXPAND' }
  | { type: 'SET_THEME'; payload: 'light' | 'dark' };

const useStore = create<ToggleState>()((set) => ({
  isActive: false, isExpanded: false, theme: 'light',
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

// Result: 120+ lines, React runtime (40+ KB gzipped), Zustand, TypeScript
```

**With Simplicity Gate:**
```html
<!-- Gate says: REJECT — use CSS :has() (Tier 1+2), not React (Tier 6) -->
<div class="panel">
  <input type="checkbox" class="toggle" id="expand-toggle">
  <label for="expand-toggle">Toggle Content</label>
  <div class="content">Expanded content here</div>
</div>

<style>
.panel:has(.toggle:checked) .content { display: block; }
.panel:has(.toggle:not(:checked)) .content { display: none; }
</style>

<!-- Result: 15 lines, zero dependencies, zero runtime -->
```

### Scenario 3: Disk Monitoring

**Without Simplicity Gate:**
```python
# Agent proposes: Python script (80+ lines, 1 dependency)
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

# Result: 80+ lines, Python runtime (100+ MB), psutil dependency
```

**With Simplicity Gate:**
```bash
# Gate says: REJECT — use df + awk (Tier 3), not Python (Tier 6)
# (for simple threshold alerts)
THRESHOLD=90
df -h | awk 'NR>1 && int($5) > '"$THRESHOLD"' {print $6, $5}' | \
  xargs -I{} echo "HIGH DISK: {}" | mail -s "Disk Alert" admin@example.com

# Result: 1 line, zero dependencies, runs in milliseconds
```

### Scenario 4: Log Analysis

**Without Simplicity Gate:**
```python
# Agent proposes: Python script (50+ lines)
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

# Result: 50+ lines, Python runtime, regex complexity
```

**With Simplicity Gate:**
```bash
# Gate says: REJECT — use awk (Tier 3), not Python (Tier 6)
awk '{print $1}' access.log | sort | uniq -c | sort -rn | head -10
# Top IPs: shows top 10 IPs

awk '{print $9}' access.log | sort | uniq -c | sort -rn
# Status codes: shows status code distribution

# Result: 2 lines, zero dependencies, faster execution
```

### Scenario 5: When Higher Tiers PASS

**Proposal:** Python script with retry logic, template rendering, and multi-recipient email routing.

**Without Simplicity Gate:** Agent might still over-simplify and try to do this in bash.

**With Simplicity Gate:**
```
SIMPLICITY GATE — PASS
Tool:     Python script (Tier 6)
Why:      Requires retry logic, template rendering, and multi-recipient
          routing — features that exceed shell pipeline expressiveness.
```

**The gate is not anti-complexity — it's anti-unnecessary-complexity.**

## The Hierarchy

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

## Installation

### Claude Code

**Step 1:** Navigate to your project root
```bash
cd your-project/
```

**Step 2:** Create or open `CLAUDE.md`
```bash
# macOS/Linux
touch CLAUDE.md

# Windows (PowerShell)
New-Item -ItemType File -Name "CLAUDE.md" -Force
```

**Step 3:** Copy the skill contents
```bash
# macOS/Linux
cat path/to/simplicity-gate/SKILL.md > CLAUDE.md

# Windows (PowerShell)
Get-Content path\to\simplicity-gate\SKILL.md | Set-Content CLAUDE.md
```

**Step 4:** Verify
```bash
head -20 CLAUDE.md
# Should show "Simplicity Gate" at the top
```

---

### OpenCode

**Step 1:** Create the skills directory
```bash
# macOS/Linux
mkdir -p .opencode/skills/

# Windows (PowerShell)
New-Item -ItemType Directory -Path ".opencode\skills" -Force
```

**Step 2:** Copy the skill file
```bash
# macOS/Linux
cp path/to/simplicity-gate/SKILL.md .opencode/skills/simplicity-gate.md

# Windows (PowerShell)
Copy-Item path\to\simplicity-gate\SKILL.md .opencode\skills\simplicity-gate.md
```

**Step 3:** Verify
```bash
ls .opencode/skills/
# Should show: simplicity-gate.md
```

---

### Codex (OpenAI)

**Step 1:** Navigate to your project root
```bash
cd your-project/
```

**Step 2:** Create `CODEX.md`
```bash
# macOS/Linux
touch CODEX.md

# Windows (PowerShell)
New-Item -ItemType File -Name "CODEX.md" -Force
```

**Step 3:** Copy the skill contents
```bash
# macOS/Linux
cat path/to/simplicity-gate/SKILL.md > CODEX.md

# Windows (PowerShell)
Get-Content path\to\simplicity-gate\SKILL.md | Set-Content CODEX.md
```

---

### Aider

**Option A: Command-line flag**
```bash
aider --read path/to/simplicity-gate/SKILL.md
```

**Option B: Config file**
```bash
# Create or edit .aider.conf.yml
echo "read:
  - SKILL.md" > .aider.conf.yml
```

---

### Cursor

**Step 1:** Navigate to your project root
```bash
cd your-project/
```

**Step 2:** Create `.cursorrules`
```bash
# macOS/Linux
touch .cursorrules

# Windows (PowerShell)
New-Item -ItemType File -Name ".cursorrules" -Force
```

**Step 3:** Copy the skill contents (skip YAML frontmatter)
```bash
# macOS/Linux — skip the first 14 lines (YAML frontmatter)
tail -n +15 path/to/simplicity-gate/SKILL.md > .cursorrules

# Windows (PowerShell)
Get-Content path\to\simplicity-gate\SKILL.md | Select-Object -Skip 14 | Set-Content .cursorrules
```

**Step 4:** Restart Cursor to load the rules

---

### Windsurf

**Step 1:** Navigate to your project root
```bash
cd your-project/
```

**Step 2:** Create `.windsurfrules`
```bash
# macOS/Linux
touch .windsurfrules

# Windows (PowerShell)
New-Item -ItemType File -Name ".windsurfrules" -Force
```

**Step 3:** Copy the skill contents (skip YAML frontmatter)
```bash
# macOS/Linux
tail -n +15 path/to/simplicity-gate/SKILL.md > .windsurfrules

# Windows (PowerShell)
Get-Content path\to\simplicity-gate\SKILL.md | Select-Object -Skip 14 | Set-Content .windsurfrules
```

**Step 4:** Restart Windsurf to load the rules

---

### Cline (VS Code Extension)

**Step 1:** Navigate to your project root
```bash
cd your-project/
```

**Step 2:** Create `.clinerules`
```bash
# macOS/Linux
touch .clinerules

# Windows (PowerShell)
New-Item -ItemType File -Name ".clinerules" -Force
```

**Step 3:** Copy the skill contents (skip YAML frontmatter)
```bash
# macOS/Linux
tail -n +15 path/to/simplicity-gate/SKILL.md > .clinerules

# Windows (PowerShell)
Get-Content path\to\simplicity-gate\SKILL.md | Select-Object -Skip 14 | Set-Content .clinerules
```

**Step 4:** Reload VS Code window

---

### Continue

**Step 1:** Open your Continue config
```bash
# macOS/Linux
open ~/.continue/config.json

# Windows (PowerShell)
Start-Process "$env:USERPROFILE\.continue\config.json"
```

**Step 2:** Add the rules to your config
```json
{
  "system_message": "...existing config...",
  "rules": [
    "...paste the contents of SKILL.md here..."
  ]
}
```

---

### GitHub Copilot

**Step 1:** Create the directory
```bash
# macOS/Linux
mkdir -p .github/

# Windows (PowerShell)
New-Item -ItemType Directory -Path ".github" -Force
```

**Step 2:** Create the instructions file
```bash
# macOS/Linux
touch .github/copilot-instructions.md

# Windows (PowerShell)
New-Item -ItemType File -Path ".github\copilot-instructions.md" -Force
```

**Step 3:** Copy the skill contents
```bash
# macOS/Linux
cat path/to/simplicity-gate/SKILL.md > .github/copilot-instructions.md

# Windows (PowerShell)
Get-Content path\to\simplicity-gate\SKILL.md | Set-Content .github\copilot-instructions.md
```

---

### Roo Code

**Step 1:** Create the rules directory
```bash
# macOS/Linux
mkdir -p .roo/rules/

# Windows (PowerShell)
New-Item -ItemType Directory -Path ".roo\rules" -Force
```

**Step 2:** Copy the skill file
```bash
# macOS/Linux
cp path/to/simplicity-gate/SKILL.md .roo/rules/simplicity-gate.md

# Windows (PowerShell)
Copy-Item path\to\simplicity-gate\SKILL.md .roo\rules\simplicity-gate.md
```

---

### Amazon Q Developer

**Step 1:** Create the rules directory
```bash
# macOS/Linux
mkdir -p .amazonq/rules/

# Windows (PowerShell)
New-Item -ItemType Directory -Path ".amazonq\rules" -Force
```

**Step 2:** Copy the skill file
```bash
# macOS/Linux
cp path/to/simplicity-gate/SKILL.md .amazonq/rules/simplicity-gate.md

# Windows (PowerShell)
Copy-Item path\to\simplicity-gate\SKILL.md .amazonq\rules\simplicity-gate.md
```

---

## How It Works

When your agent proposes a solution, Simplicity Gate evaluates it:

```
PROPOSAL: "Write a Node.js script to rename JSON keys"

Simplicity Gate checks:
  Tier 1 — Can HTTP/HTML handle this?          → No
  Tier 2 — Can a data format express this?     → No
  Tier 3 — Can a shell command transform this? → Yes

VERDICT: REJECT
  Proposed:  Node.js script (Tier 6)
  Use instead: jq (Tier 3)
  Command:   jq '{new_key: .old_key}' input.json > output.json
```

## Verdicts

| Verdict | Meaning | Action Required |
|---------|---------|-----------------|
| `PASS` | Lowest viable tier chosen | Proceed with implementation |
| `REJECT` | A lower tier works | Must downgrade before proceeding |
| `WARN` | Lower tier may work | Check if simpler option suffices |
| `ESCALATE` | Needs human judgment | Present justification for review |

### PASS

```
SIMPLICITY GATE — PASS
Tool:     Python script (Tier 6)
Why:      Requires retry logic, template rendering, and multi-recipient
          routing — features that exceed shell pipeline expressiveness.
```

### REJECT

```
SIMPLICITY GATE — REJECT
Proposed:  Node.js script (Tier 6)
Use instead: jq (Tier 3)
Why:       jq renames keys and removes fields in one pipeline.
Command:   jq '{new_key: .old_key} | del(.deprecated)' input.json > output.json
```

### WARN

```
SIMPLICITY GATE — WARN
Proposed:  Python + pyyaml (Tier 6)
Note:      yq (Tier 3) can validate structure with fewer dependencies.
Check:     Does the validation require logic beyond structural checks?
```

### ESCALATE

```
SIMPLICITY GATE — ESCALATE
Reason:     Cross-platform support required (Windows + Linux)
Evidence:   Tier 3 shell commands don't work on Windows
Override:   Use Node.js (Tier 6) for cross-platform compatibility
```

## The Rules

Non-negotiable. Violating them triggers REJECT.

| # | Rule | Violation Example | Correct Approach |
|---|------|-------------------|------------------|
| 1 | **No unnecessary runtimes** | Adding Node.js for JSON processing | Use `jq` |
| 2 | **No unnecessary dependencies** | Installing lodash for `_.get()` | Use native access |
| 3 | **No code for data problems** | Writing a script to filter CSV | Use `awk` or `cut` |
| 4 | **No microservices for single-machine** | Docker for a cron job | Use `crontab` |
| 5 | **No frameworks for plain solutions** | Express for a static file server | Use `python -m http.server` |
| 6 | **Schema before code** | JavaScript form validation | Use JSON Schema |
| 7 | **Text processing before programming** | Python for log parsing | Use `grep`/`sed`/`awk` |
| 8 | **Compile-time over runtime** | Runtime type checking | Use TypeScript or Go |

## When Higher Tiers Are Justified

| Tier | Justified When |
|------|----------------|
| **5** (Static) | Type safety is critical, performance is measured and documented, or logic is inherently complex |
| **6** (Dynamic) | External API calls during execution, retry logic, template rendering, or integration with existing runtime |
| **7** (Microservices) | Multi-service orchestration, independent scaling requirements, or polyglot team constraints |

## Impact Metrics

| Metric | Without Gate | With Gate | Improvement |
|--------|-------------|-----------|-------------|
| Lines of code (avg) | 50-120 | 1-15 | 90%+ reduction |
| Dependencies added | 2-5 | 0 | 100% reduction |
| Runtime required | Node.js/Python | None (or existing) | Often eliminated |
| Setup time | `npm install` / `pip install` | None | 100% reduction |
| Execution time | 500ms+ | 50ms | 10x faster |
| Things that can break | Many | Few | Significantly fewer |

## Examples

Full walkthroughs in [`examples/`](examples/):

| Example | Proposed | Recommended | Verdict | Files |
|---------|----------|-------------|---------|-------|
| JSON Reformatting | Node.js + lodash (T6) | `jq` (T3) | REJECT | [`reformat-json.md`](examples/reformat-json.md) |
| UI Toggle | React + Zustand (T6) | CSS `:has()` (T1+2) | REJECT | [`css-toggle.md`](examples/css-toggle.md) |
| Disk Monitor | Python + psutil (T6) | `df \| awk` (T3) | PASS* | [`shell-monitor.md`](examples/shell-monitor.md) |

*\*PASS when retry logic, templates, or multi-recipient routing are required.*

## FAQ

**Q: Does this mean I can never use React or Node.js?**
A: No. It means you should not use them *when a simpler tool works*. If your project already uses React, adding a toggle to an existing component is fine. The gate evaluates *new* additions, not existing infrastructure.

**Q: What if the shell version is less readable?**
A: Readability is not a tier. The gate optimizes for fewer dependencies and less runtime. If the shell version is correct, use it. Add comments to document it.

**Q: What about Windows compatibility?**
A: Tier 3 shell commands may not work on Windows. In that case, Tier 5 (compiled) or Tier 6 (interpreted) may be justified. Document this in the ESCALATE verdict.

**Q: Does this work with AI assistants that don't read files?**
A: No. Simplicity Gate is designed for agents that can read instruction files from your project. If your agent doesn't support this, you can paste the rules into your conversation manually.

**Q: Can I modify the rules?**
A: Yes. The rules are a starting point. If your team has different constraints, adjust them. The important thing is having *some* gate that forces tier evaluation.

## Project Structure

```
simplicity-gate/
├── SKILL.md              The skill definition — copy this to your agent
├── README.md             This file
├── CONTRIBUTING.md       Contribution guidelines
├── SECURITY.md           Security policy
├── LICENSE               MIT License
└── examples/
    ├── css-toggle.md     React vs CSS toggle implementation
    ├── reformat-json.md  Node.js vs jq JSON transformation
    └── shell-monitor.md  Python vs shell disk monitoring
```

## Contributing

Contributions welcome. See [CONTRIBUTING.md](CONTRIBUTING.md) for:

- Adding new examples
- Expanding agent compatibility
- Improving verdict logic
- Reporting false PASS/REJECT verdicts

## Security

Simplicity Gate is plain markdown. It does not execute code, access networks, or handle data. See [SECURITY.md](SECURITY.md) for details.

## License

MIT License. See [LICENSE](LICENSE).
