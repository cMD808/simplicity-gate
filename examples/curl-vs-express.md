<h1 align="center">🌐 curl vs Express for API Probing</h1>

<p align="center">
  <em>Express.js proxy vs curl — 40+ lines reduced to 1 line</em>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/verdict-REJECT-red" alt="Verdict: REJECT">
  <img src="https://img.shields.io/badge/tier_gap-7→3-blue" alt="Tier Gap: 7→3">
  <img src="https://img.shields.io/badge/lines_saved-59+-brightgreen" alt="Lines Saved: 59+">
</p>

<br>

---

## 📋 The Task

Forward requests from an external API to your internal service, adding an authentication header.

<br>

---

## ❌ Without Simplicity Gate

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

<table>
  <tr>
    <th>Metric</th>
    <th>Value</th>
  </tr>
  <tr>
    <td>Lines of code</td>
    <td>40+</td>
  </tr>
  <tr>
    <td>Dependencies</td>
    <td><code>express</code>, <code>axios</code>, <code>cors</code></td>
  </tr>
  <tr>
    <td>Runtime required</td>
    <td>Node.js (100+ MB)</td>
  </tr>
  <tr>
    <td>Install time</td>
    <td>~10 seconds</td>
  </tr>
  <tr>
    <td>Things that can break</td>
    <td>CORS, middleware chain, port conflicts</td>
  </tr>
</table>

<br>

---

## ✅ With Simplicity Gate

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

<table>
  <tr>
    <th>Metric</th>
    <th>Value</th>
  </tr>
  <tr>
    <td>Lines of code</td>
    <td>1</td>
  </tr>
  <tr>
    <td>Dependencies</td>
    <td><code>curl</code> (already installed)</td>
  </tr>
  <tr>
    <td>Runtime required</td>
    <td>bash (already present)</td>
  </tr>
  <tr>
    <td>Install time</td>
    <td>0</td>
  </tr>
  <tr>
    <td>Things that can break</td>
    <td>Almost nothing</td>
  </tr>
</table>

<br>

---

## 🤔 When Express IS Justified

If you need:

- Complex request transformation (not just forwarding)
- Multiple routing rules with middleware chains
- WebSocket support
- Request/response caching with invalidation logic

> **Then Express (Tier 7) is the right choice. The gate evaluates the *actual requirements*, not the *assumed* complexity.**

<br>

---

## ⚖️ Verdict

```
SIMPLICITY GATE — REJECT
Proposed:    Express.js proxy with axios (Tier 7)
Use instead: curl + cron or socat (Tier 3)
Why:         Simple request forwarding doesn't need a web framework.
             curl handles HTTP natively with zero dependencies.
Command:     Use curl for scheduled syncs or socat for real-time proxying.
```
