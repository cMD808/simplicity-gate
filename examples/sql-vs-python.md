<h1 align="center">🗃️ SQL vs Python for Data Queries</h1>

<p align="center">
  <em>Python + pandas vs SQL — 25+ lines reduced to 6 lines</em>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/verdict-REJECT-red" alt="Verdict: REJECT">
  <img src="https://img.shields.io/badge/tier_gap-6→4-blue" alt="Tier Gap: 6→4">
  <img src="https://img.shields.io/badge/lines_saved-22+-brightgreen" alt="Lines Saved: 22+">
</p>

<br>

---

## 📋 Scenario

Query a PostgreSQL database to find the top 10 customers by revenue in the last 30 days, grouped by country.

<br>

## 📝 Proposal

```yaml
proposal:
  description: "Find top 10 customers by revenue in last 30 days"
  proposed_tier: 6
  proposed_tool: "Python + pandas + psycopg2"
  language: "Python"
  dependencies: ["psycopg2", "pandas"]
  functional_requirements:
    - "Connect to PostgreSQL database"
    - "Query orders from last 30 days"
    - "Group by country and customer"
    - "Order by revenue descending"
    - "Limit to top 10"
```

<br>

---

## ❌ Proposed Solution (Tier 6 — REJECTED)

```python
import psycopg2
import pandas as pd
from datetime import datetime, timedelta

conn = psycopg2.connect("dbname=mydb user=admin")
query = """
    SELECT country, customer_id, SUM(amount) as revenue
    FROM orders
    WHERE created_at > %s
    GROUP BY country, customer_id
    ORDER BY revenue DESC
    LIMIT 10
"""
start_date = datetime.now() - timedelta(days=30)
df = pd.read_sql(query, conn, params=[start_date])
print(df.to_string())
conn.close()
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
    <td>Requires psycopg2 + pandas</td>
    <td>Heavy dependencies</td>
  </tr>
  <tr>
    <td>25+ lines of code</td>
    <td>High maintenance burden</td>
  </tr>
  <tr>
    <td>Pandas reimplements DB optimizations</td>
    <td>Slower than native SQL (~2s vs ~50ms)</td>
  </tr>
</table>

<br>

---

## ✅ Recommended Solution (Tier 4 — PASS)

```sql
SELECT country, customer_id, SUM(amount) AS revenue
FROM orders
WHERE created_at > NOW() - INTERVAL '30 days'
GROUP BY country, customer_id
ORDER BY revenue DESC
LIMIT 10;
```

### ✨ Benefits

<table>
  <tr>
    <th>Benefit</th>
    <th>Details</th>
  </tr>
  <tr>
    <td>Purpose-built for this task</td>
    <td>SQL is a Tier 4 query language</td>
  </tr>
  <tr>
    <td>6 lines of code</td>
    <td>76% reduction</td>
  </tr>
  <tr>
    <td>No extra dependencies</td>
    <td>Database driver already exists</td>
  </tr>
  <tr>
    <td>40x faster execution</td>
    <td>~50ms (DB engine optimized) vs ~2s (pandas)</td>
  </tr>
  <tr>
    <td>Zero install time</td>
    <td>PostgreSQL already running</td>
  </tr>
</table>

<br>

---

## ⚖️ Verdict

```
SIMPLICITY GATE — REJECT
Proposed:    Python + pandas + psycopg2 (Tier 6)
Use instead: SQL query (Tier 4)
Why:         SQL is a query language designed for exactly this task.
             The database engine optimizes execution automatically.
Command:     Run the SQL directly against your database.
```

<br>

---

## 🤔 When Python IS Justified

Python becomes the correct choice when:

- The transformation requires **complex logic** beyond SQL (ML, NLP, image processing)
- You need **multiple data sources** combined in Python
- The output requires **template rendering** or complex formatting
- The script is part of a **larger Python application**
- You need **retry logic** with exponential backoff

> **For pure data queries, always prefer SQL.**

<br>

---

## 📊 Comparison

<table>
  <tr>
    <th>Aspect</th>
    <th>Python + pandas</th>
    <th>SQL</th>
  </tr>
  <tr>
    <td>Lines of Code</td>
    <td>25+</td>
    <td>6</td>
  </tr>
  <tr>
    <td>Runtime Required</td>
    <td>Python 3.x (100+ MB)</td>
    <td>PostgreSQL (already running)</td>
  </tr>
  <tr>
    <td>Dependencies</td>
    <td>psycopg2, pandas</td>
    <td>None</td>
  </tr>
  <tr>
    <td>Install Time</td>
    <td>~15 seconds</td>
    <td>0</td>
  </tr>
  <tr>
    <td>Execution Time</td>
    <td>~2s</td>
    <td>~50ms</td>
  </tr>
  <tr>
    <td>Query Optimization</td>
    <td>Manual (pandas reindexes)</td>
    <td>Automatic (DB engine)</td>
  </tr>
</table>

<br>

---

<p align="center">
  <a href="../README.md">← Back to README</a>
</p>
