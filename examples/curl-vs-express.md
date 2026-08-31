# curl vs Express for API Probing

> **Verdict: REJECT** — curl (Tier 3) replaces Express.js proxy (Tier 7).

## The Task

Forward requests from an external API to your internal service, adding an authentication header.

## Without Simplicity Gate

The agent scaffolds an Express.js application with middleware, CORS configuration, and request forwarding.

```javascript
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.all('/api/proxy/*', async (req, res) => {
  try {
    const target = req.path.replace('/api/proxy', '');
    const response = await axios({
      method: req.method,
      url: `https://external-api.com${target}`,
      headers: {
        ...req.headers,
        Authorization: `Bearer ${process.env.API_KEY}`
      },
      data: req.body
    });
    res.status(response.status).json(response.data);
  } catch (err) {
    res.status(err.response?.status || 500).json({ error: err.message });
  }
});

app.listen(3000, () => console.log('Proxy running on port 3000'));
```

| Metric | Value |
|:-------|:------|
| Lines of code | 40+ |
| Dependencies | `express`, `axios`, `cors` |
| Runtime required | Node.js (100+ MB) |
| Install time | ~10 seconds |
| Things that can break | CORS, middleware chain, port conflicts |

## With Simplicity Gate

The gate rejects the Express proxy. A cron job with curl handles the forwarding.

```bash
# Crontab entry: forward every 5 minutes
*/5 * * * * curl -s -X POST https://external-api.com/data \
  -H "Authorization: Bearer $API_KEY" \
  -H "Content-Type: application/json" \
  -d @/tmp/payload.json \
  -o /tmp/response.json 2>&1 | logger -t api-sync
```

Or for real-time proxying without a full framework:

```bash
# Simple one-liner proxy
socat TCP-LISTEN:8080,fork,reuseaddr EXEC:"curl -s -H 'Authorization: Bearer \$API_KEY' https://external-api.com"
```

| Metric | Value |
|:-------|:------|
| Lines of code | 1 |
| Dependencies | `curl` (already installed) |
| Runtime required | bash (already present) |
| Install time | 0 |
| Things that can break | Almost nothing |

## When Express IS Justified

If you need:
- Complex request transformation (not just forwarding)
- Multiple routing rules with middleware chains
- WebSocket support
- Request/response caching with invalidation logic

Then Express (Tier 7) is the right choice. The gate evaluates the *actual requirements*, not the *assumed* complexity.

## Verdict

```
SIMPLICITY GATE — REJECT
Proposed:    Express.js proxy with axios (Tier 7)
Use instead: curl + cron or socat (Tier 3)
Why:         Simple request forwarding doesn't need a web framework.
             curl handles HTTP natively with zero dependencies.
Command:     Use curl for scheduled syncs or socat for real-time proxying.
```
