# Example: Disk Monitor — Python vs Shell

## Scenario

An agent proposes writing a Python script with `psutil` to monitor disk usage
and send email alerts when usage exceeds 90%.

## Proposal

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

## Proposed Solution (Tier 6 — CONDITIONAL)

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

**Problems:**
- Requires Python runtime (100+ MB installed)
- Requires psutil dependency
- 80+ lines of Python code
- Runtime errors possible (network, permissions)

## Recommended Solution (Tier 3 — RECOMMENDED)

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

**Benefits:**
- `df` and `awk` are pre-installed on all Unix systems
- 15 lines vs. 80+
- No Python runtime needed
- No dependencies to install
- Runs in milliseconds
- Cron-ready out of the box

## Verdict

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

## When Python IS Justified

Python becomes the correct choice when:
- The monitoring requires **complex alerting logic** (multiple channels, escalation)
- You need **historical tracking** with database writes
- The script requires **template rendering** for email bodies
- You need **retry logic** with exponential backoff
- The monitoring is part of a **larger Python application**
- Cross-platform support (Windows) is required

For simple threshold-based alerts, always prefer shell pipelines.

## Comparison Table

| Aspect | Python Script | Shell Pipeline |
|--------|---------------|----------------|
| Lines of Code | 80+ | 15 |
| Runtime Required | Python 3.x | bash |
| Dependencies | psutil, smtplib | None |
| Install Size | 100+ MB | 0 |
| Execution Time | ~500ms | ~50ms |
| Error Handling | Manual | Pipefail |
| Cron-ready | Needs wrapper | Direct |
| Cross-platform | Yes | Unix only |

**Recommendation:** Use shell for Unix-only, simple monitoring. Use Python
when you need cross-platform, complex logic, or integration with larger systems.
