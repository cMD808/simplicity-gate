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

## 📋 The Task

Query a PostgreSQL database to find the top 10 customers by revenue in the last 30 days, grouped by country.

<br>

---

## ❌ Without Simplicity Gate

The agent writes a Python script using pandas and psycopg2.

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

<table>
  <tr>
    <th>Metric</th>
    <th>Value</th>
  </tr>
  <tr>
    <td>Lines of code</td>
    <td>25+</td>
  </tr>
  <tr>
    <td>Dependencies</td>
    <td><code>psycopg2</code>, <code>pandas</code></td>
  </tr>
  <tr>
    <td>Runtime required</td>
    <td>Python 3.x (100+ MB)</td>
  </tr>
  <tr>
    <td>Install time</td>
    <td>~15 seconds</td>
  </tr>
  <tr>
    <td>Execution time</td>
    <td>~2s (pandas overhead)</td>
  </tr>
</table>

<br>

---

## ✅ With Simplicity Gate

The gate rejects Python. SQL is designed for exactly this — querying structured data.

```sql
SELECT country, customer_id, SUM(amount) AS revenue
FROM orders
WHERE created_at > NOW() - INTERVAL '30 days'
GROUP BY country, customer_id
ORDER BY revenue DESC
LIMIT 10;
```

<table>
  <tr>
    <th>Metric</th>
    <th>Value</th>
  </tr>
  <tr>
    <td>Lines of code</td>
    <td>6</td>
  </tr>
  <tr>
    <td>Dependencies</td>
    <td>None (database driver already exists)</td>
  </tr>
  <tr>
    <td>Runtime required</td>
    <td>PostgreSQL (already running)</td>
  </tr>
  <tr>
    <td>Install time</td>
    <td>0</td>
  </tr>
  <tr>
    <td>Execution time</td>
    <td>~50ms (optimized by DB engine)</td>
  </tr>
</table>

<br>

---

## 💡 Why This Works

SQL is a Tier 4 query language — purpose-built for data retrieval and aggregation. Python + pandas is Tier 6 — a general-purpose language doing what SQL was designed to do. The database engine already has indexes, query planners, and optimized join algorithms. Pandas reimplements all of that in Python.

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
