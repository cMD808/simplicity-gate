# SQL vs Python for Data Queries

> **Verdict: REJECT** — SQL (Tier 4) replaces Python + pandas (Tier 6).

## The Task

Query a PostgreSQL database to find the top 10 customers by revenue in the last 30 days, grouped by country.

## Without Simplicity Gate

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

| Metric | Value |
|:-------|:------|
| Lines of code | 25+ |
| Dependencies | `psycopg2`, `pandas` |
| Runtime required | Python 3.x (100+ MB) |
| Install time | ~15 seconds |
| Execution time | ~2s (pandas overhead) |

## With Simplicity Gate

The gate rejects Python. SQL is designed for exactly this — querying structured data.

```sql
SELECT country, customer_id, SUM(amount) AS revenue
FROM orders
WHERE created_at > NOW() - INTERVAL '30 days'
GROUP BY country, customer_id
ORDER BY revenue DESC
LIMIT 10;
```

| Metric | Value |
|:-------|:------|
| Lines of code | 6 |
| Dependencies | None (database driver already exists) |
| Runtime required | PostgreSQL (already running) |
| Install time | 0 |
| Execution time | ~50ms (optimized by DB engine) |

## Why This Works

SQL is a Tier 4 query language — purpose-built for data retrieval and aggregation. Python + pandas is Tier 6 — a general-purpose language doing what SQL was designed to do. The database engine already has indexes, query planners, and optimized join algorithms. Pandas reimplements all of that in Python.

## Verdict

```
SIMPLICITY GATE — REJECT
Proposed:    Python + pandas + psycopg2 (Tier 6)
Use instead: SQL query (Tier 4)
Why:         SQL is a query language designed for exactly this task.
             The database engine optimizes execution automatically.
Command:     Run the SQL directly against your database.
```
