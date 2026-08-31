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

## 📋 Scenario

Automate a build pipeline: lint, test, build, and deploy.

<br>

## 📝 Proposal

```yaml
proposal:
  description: "Automate build pipeline with lint, test, build, deploy"
  proposed_tier: 6
  proposed_tool: "npm scripts with multiple devDependencies"
  language: "JSON/Shell"
  dependencies: ["eslint", "jest", "typescript", "webpack"]
  functional_requirements:
    - "Lint source code"
    - "Run tests with coverage"
    - "Build TypeScript + bundle"
    - "Deploy to production"
    - "Run all steps in sequence"
```

<br>

---

## ❌ Proposed Solution (Tier 6 — WARN)

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

### ⚠️ Problems

<table>
  <tr>
    <th>Issue</th>
    <th>Impact</th>
  </tr>
  <tr>
    <td>20+ lines of config</td>
    <td>Verbose configuration</td>
  </tr>
  <tr>
    <td>4 devDependencies</td>
    <td>~30s install time</td>
  </tr>
  <tr>
    <td>Manual cache invalidation</td>
    <td>Rebuilds unchanged files</td>
  </tr>
  <tr>
    <td>Linear execution</td>
    <td>No parallel builds</td>
  </tr>
</table>

<br>

---

## ✅ Recommended Solution (Tier 3 — WARN)

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

### ✨ Benefits

<table>
  <tr>
    <th>Benefit</th>
    <th>Details</th>
  </tr>
  <tr>
    <td>15 lines</td>
    <td>25% fewer lines</td>
  </tr>
  <tr>
    <td>Automatic caching</td>
    <td>File timestamps determine rebuilds</td>
  </tr>
  <tr>
    <td>Dependency tracking</td>
    <td>Make knows build order</td>
  </tr>
  <tr>
    <td>Parallel execution</td>
    <td>Independent targets run concurrently</td>
  </tr>
  <tr>
    <td>Zero install</td>
    <td>Already on Unix/macOS</td>
  </tr>
</table>

<br>

---

## ⚖️ Verdict

```
SIMPLICITY GATE — WARN
Proposed:  npm scripts with multiple devDependencies (Tier 6)
Note:      Make (Tier 3) can handle build pipelines with automatic caching.
Check:     Is npm already your project's runtime? If yes, npm scripts may be simpler.
           Is this a new project? If yes, Make is the lighter choice.
```

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

<br>

---

## 📊 Comparison

<table>
  <tr>
    <th>Aspect</th>
    <th>npm Scripts</th>
    <th>Make</th>
  </tr>
  <tr>
    <td>Lines of Code</td>
    <td>20+ config + deploy script</td>
    <td>15</td>
  </tr>
  <tr>
    <td>Runtime Required</td>
    <td>Node.js (100+ MB)</td>
    <td>None (binary)</td>
  </tr>
  <tr>
    <td>Dependencies</td>
    <td>eslint, jest, typescript, webpack</td>
    <td>make (pre-installed)</td>
  </tr>
  <tr>
    <td>Install Time</td>
    <td>~30 seconds</td>
    <td>0</td>
  </tr>
  <tr>
    <td>Cache Invalidation</td>
    <td>Manual</td>
    <td>Automatic (timestamps)</td>
  </tr>
  <tr>
    <td>Parallel Builds</td>
    <td>No</td>
    <td>Yes</td>
  </tr>
  <tr>
    <td>Cross-platform</td>
    <td>Yes</td>
    <td>Unix/macOS (WSL on Windows)</td>
  </tr>
</table>

<br>

---

<p align="center">
  <a href="../README.md">← Back to README</a>
</p>
