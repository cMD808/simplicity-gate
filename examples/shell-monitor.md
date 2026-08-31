<h1 align="center">💾 Example: Disk Monitor</h1>

<p align="center">
  <em>Python vs Shell — 80+ lines reduced to 15 lines</em>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/verdict-REJECT-red" alt="Verdict: REJECT">
  <img src="https://img.shields.io/badge/tier_gap-6→3-blue" alt="Tier Gap: 6→3">
  <img src="https://img.shields.io/badge/lines_saved-79+-brightgreen" alt="Lines Saved: 79+">
</p>

<br>

---

## 📋 Scenario

An agent proposes writing a Python script with `psutil` to monitor disk usage
and send email alerts when usage exceeds 90%.

<br>

## 📝 Proposal

```yaml
proposal:
  description: "Monitor disk usage and alert at 90% threshold"
  proposed_tier: 6
  proposed_tool: "Python script with psutil + smtplib"
  language: "Python"
  dependencies: ["psutil", "smtplib"]
  functional_requirements:
    - "Check disk usage percentage"
    - "Compare against threshold"
    - "Send email alert if exceeded"
    - "Run on cron schedule"
```

<br>

---

## ❌ Proposed Solution (Tier 6 — CONDITIONAL)

```python
#!/usr/bin/env python3
# disk_monitor.py — 80+ lines, requires Python runtime
import psutil
import smtplib
from email.mime.text import MIMEText
from datetime import datetime

def check_disk_usage(threshold=90):
    alerts = []
    for partition in psutil.disk_partitions():
        try:
            usage = psutil.disk_usage(partition.mountpoint)
            if usage.percent > threshold:
                alerts.append({
                    'mount': partition.mountpoint,
                    'percent': usage.percent,
                    'free': usage.free // (1024 * 1024 * 1024)
                })
        except PermissionError:
            continue
    return alerts

def send_email(alerts):
    if not alerts:
        return
    
    body = f"Disk usage alerts at {datetime.now()}:\n\n"
    for alert in alerts:
        body += f"Mount: {alert['mount']}\n"
        body += f"Usage: {alert['percent']}%\n"
        body += f"Free: {alert['free']} GB\n\n"
    
    msg = MIMEText(body)
    msg['Subject'] = 'Disk Usage Alert'
    msg['From'] = 'monitor@example.com'
    msg['To'] = 'admin@example.com'
    
    with smtplib.SMTP('smtp.example.com', 587) as server:
        server.starttls()
        server.login('user', 'password')
        server.send_message(msg)

if __name__ == '__main__':
    alerts = check_disk_usage(threshold=90)
    send_email(alerts)
```

### ⚠️ Problems

<table>
  <tr>
    <th>Issue</th>
    <th>Impact</th>
  </tr>
  <tr>
    <td>Requires Python runtime</td>
    <td>100+ MB installed</td>
  </tr>
  <tr>
    <td>Requires psutil dependency</td>
    <td>Additional install step</td>
  </tr>
  <tr>
    <td>80+ lines of Python code</td>
    <td>High maintenance burden</td>
  </tr>
  <tr>
    <td>Runtime errors possible</td>
    <td>Network, permissions issues</td>
  </tr>
</table>

<br>

---

## ✅ Recommended Solution (Tier 3 — RECOMMENDED)

```bash
#!/bin/bash
# disk_monitor.sh — 15 lines, zero dependencies
THRESHOLD=90
ALERT_EMAIL="admin@example.com"

df -h | awk 'NR>1 && int($5) > '"$THRESHOLD"' {print $6, $5}' | while read mount usage; do
    echo "HIGH DISK USAGE: $mount is at $usage" | \
        mail -s "Disk Alert: $mount" "$ALERT_EMAIL"
done
```

**Or for webhook alerts (Slack, Teams, etc.):**

```bash
#!/bin/bash
# disk_monitor_webhook.sh — 10 lines, uses curl
THRESHOLD=90
WEBHOOK_URL="https://hooks.slack.com/services/xxx/yyy/zzz"

df -h | awk 'NR>1 && int($5) > '"$THRESHOLD"' {print $6 " is at " $5}' | \
    xargs -I{} curl -s -X POST -H 'Content-type: application/json' \
    --data "{\"text\":\"Disk Alert: {}\"}" "$WEBHOOK_URL"
```

### ✨ Benefits

<table>
  <tr>
    <th>Benefit</th>
    <th>Details</th>
  </tr>
  <tr>
    <td>Pre-installed on all Unix systems</td>
    <td><code>df</code> and <code>awk</code> are always available</td>
  </tr>
  <tr>
    <td>15 lines vs 80+</td>
    <td>83% code reduction</td>
  </tr>
  <tr>
    <td>No Python runtime needed</td>
    <td>Zero install required</td>
  </tr>
  <tr>
    <td>No dependencies to install</td>
    <td>Zero external packages</td>
  </tr>
  <tr>
    <td>Runs in milliseconds</td>
    <td>~50ms execution time</td>
  </tr>
  <tr>
    <td>Cron-ready out of the box</td>
    <td>Direct shell execution</td>
  </tr>
</table>

<br>

---

## ⚖️ Verdict

```
⚠️  SIMPLICITY GATE — DOWNGRADE RECOMMENDED
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

PROPOSED:
  Tool:       Python script (psutil + smtplib)
  Tier:       6 — Dynamic Language / Runtime
  Runtime:    Python 3.x
  Dependencies: psutil, smtplib

RECOMMENDED:
  Tool:       df + awk + mail (shell pipeline)
  Tier:       3 — Shell Commands
  Runtime:    bash (already present)
  Dependencies: None

WHY:
  df provides disk usage, awk filters the threshold, and mail sends
  the alert. This is a textbook Unix pipeline with no interpreter
  overhead.

WHAT TO DO:
  Replace the Python script with:
    df -h | awk 'NR>1 && int($5)>90 {print $6}' | \
      xargs -I{} echo "High disk usage on {}" | mail -s "Disk Alert" admin@example.com

FUNCTIONAL REQUIREMENTS MET:
  ☑ Check disk usage percentage
  ☑ Compare against threshold
  ☑ Send email alert if exceeded
  ☑ Run on cron schedule
```

<br>

---

## 🤔 When Python IS Justified

Python becomes the correct choice when:

- The monitoring requires **complex alerting logic** (multiple channels, escalation)
- You need **historical tracking** with database writes
- The script requires **template rendering** for email bodies
- You need **retry logic** with exponential backoff
- The monitoring is part of a **larger Python application**
- Cross-platform support (Windows) is required

> **For simple threshold-based alerts, always prefer shell pipelines.**

<br>

---

## 📊 Comparison

<table>
  <tr>
    <th>Aspect</th>
    <th>Python Script</th>
    <th>Shell Pipeline</th>
  </tr>
  <tr>
    <td>Lines of Code</td>
    <td>80+</td>
    <td>15</td>
  </tr>
  <tr>
    <td>Runtime Required</td>
    <td>Python 3.x</td>
    <td>bash</td>
  </tr>
  <tr>
    <td>Dependencies</td>
    <td>psutil, smtplib</td>
    <td>None</td>
  </tr>
  <tr>
    <td>Install Size</td>
    <td>100+ MB</td>
    <td>0</td>
  </tr>
  <tr>
    <td>Execution Time</td>
    <td>~500ms</td>
    <td>~50ms</td>
  </tr>
  <tr>
    <td>Error Handling</td>
    <td>Manual</td>
    <td>Pipefail</td>
  </tr>
  <tr>
    <td>Cron-ready</td>
    <td>Needs wrapper</td>
    <td>Direct</td>
  </tr>
  <tr>
    <td>Cross-platform</td>
    <td>Yes</td>
    <td>Unix only</td>
  </tr>
</table>

> **Recommendation:** Use shell for Unix-only, simple monitoring. Use Python when you need cross-platform, complex logic, or integration with larger systems.
