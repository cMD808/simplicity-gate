<h1 align="center">🔨 Make vs npm Scripts for Build Automation</h1>

<p align="center">
  <em>npm scripts vs Make — context-dependent choice</em>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/verdict-WARN-orange" alt="Verdict: WARN">
  <img src="https://img.shields.io/badge/tier_gap-6→3-blue" alt="Tier Gap: 6→3">
  <img src="https://img.shields.io/badge/lines_saved-8+-brightgreen" alt="Lines Saved: 8+">
</p>

<br>

---

## 📋 The Task

Automate a build pipeline: lint, test, build, and deploy.

<br>

---

## ❌ Without Simplicity Gate

The agent creates a complex npm scripts configuration with multiple packages and a custom build script.

```json
{
  "scripts": {
    "lint": "eslint src/ --ext .js,.ts",
    "test": "jest --coverage",
    "build": "tsc && webpack --mode production",
    "deploy": "node scripts/deploy.js",
    "ci": "npm run lint && npm run test && npm run build && npm run deploy"
  },
  "devDependencies": {
    "eslint": "^8.0.0",
    "jest": "^29.0.0",
    "typescript": "^5.0.0",
    "webpack": "^5.0.0"
  }
}
```

<table>
  <tr>
    <th>Metric</th>
    <th>Value</th>
  </tr>
  <tr>
    <td>Lines of code</td>
    <td>20+ config + deploy script</td>
  </tr>
  <tr>
    <td>Dependencies</td>
    <td><code>eslint</code>, <code>jest</code>, <code>typescript</code>, <code>webpack</code></td>
  </tr>
  <tr>
    <td>Runtime required</td>
    <td>Node.js (100+ MB)</td>
  </tr>
  <tr>
    <td>Install time</td>
    <td>~30 seconds</td>
  </tr>
  <tr>
    <td>Cache invalidation</td>
    <td>Manual (npm cache)</td>
  </tr>
</table>

<br>

---

## ✅ With Simplicity Gate

Make is a Tier 3 build tool that's been standard on Unix for decades. It handles dependencies, caching, and parallel execution natively.

```makefile
.PHONY: lint test build deploy ci

lint:
	eslint src/ --ext .js,.ts

test:
	jest --coverage

build: lint test
	tsc && webpack --mode production

deploy: build
	./scripts/deploy.sh

ci: deploy
```

<table>
  <tr>
    <th>Metric</th>
    <th>Value</th>
  </tr>
  <tr>
    <td>Lines of code</td>
    <td>15</td>
  </tr>
  <tr>
    <td>Dependencies</td>
    <td><code>make</code> (already installed on Unix)</td>
  </tr>
  <tr>
    <td>Runtime required</td>
    <td>None (binary already present)</td>
  </tr>
  <tr>
    <td>Install time</td>
    <td>0</td>
  </tr>
  <tr>
    <td>Cache invalidation</td>
    <td>Automatic (file timestamps)</td>
  </tr>
</table>

<br>

---

## ⚖️ The Nuance

This is a **WARN**, not a REJECT, because:

<table>
  <tr>
    <th>Factor</th>
    <th>Details</th>
  </tr>
  <tr>
    <td><strong>npm is likely already installed</strong></td>
    <td>If your project uses Node.js, npm is present. Adding Make introduces a new tool.</td>
  </tr>
  <tr>
    <td><strong>Cross-platform</strong></td>
    <td>Make works on Unix/macOS but needs WSL or GNU Make on Windows. npm scripts work everywhere.</td>
  </tr>
  <tr>
    <td><strong>Existing ecosystem</strong></td>
    <td>If your team already knows npm, the switching cost may exceed the benefit.</td>
  </tr>
</table>

<br>

---

## 📋 Verdict

```
SIMPLICITY GATE — WARN
Proposed:  npm scripts with multiple devDependencies (Tier 6)
Note:      Make (Tier 3) can handle build pipelines with automatic caching.
Check:     Is npm already your project's runtime? If yes, npm scripts may be simpler.
           Is this a new project? If yes, Make is the lighter choice.
```

<br>

---

## 🏆 When npm Scripts WIN

- Project already uses Node.js (npm is present)
- Cross-platform support is required (Windows + macOS + Linux)
- Team is deeply invested in the npm ecosystem

<br>

## 🏆 When Make WINS

- Project doesn't need Node.js for anything else
- Build pipeline is complex with many interdependent steps
- You want automatic caching based on file timestamps
- You're on Unix/macOS only
