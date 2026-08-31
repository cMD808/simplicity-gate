# Make vs npm Scripts for Build Automation

> **Verdict: WARN** — Make (Tier 3) may replace npm scripts (Tier 6), but npm is often already present.

## The Task

Automate a build pipeline: lint, test, build, and deploy.

## Without Simplicity Gate

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

| Metric | Value |
|:-------|:------|
| Lines of code | 20+ config + deploy script |
| Dependencies | `eslint`, `jest`, `typescript`, `webpack` |
| Runtime required | Node.js (100+ MB) |
| Install time | ~30 seconds |
| Cache invalidation | Manual (npm cache) |

## With Simplicity Gate

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

| Metric | Value |
|:-------|:------|
| Lines of code | 15 |
| Dependencies | `make` (already installed on Unix) |
| Runtime required | None (binary already present) |
| Install time | 0 |
| Cache invalidation | Automatic (file timestamps) |

## The Nuance

This is a WARN, not a REJECT, because:

1. **npm is likely already installed** — if your project uses Node.js, npm is present. Adding Make introduces a new tool.
2. **Cross-platform** — Make works on Unix/macOS but needs WSL or GNU Make on Windows. npm scripts work everywhere.
3. **Existing ecosystem** — if your team already knows npm, the switching cost may exceed the benefit.

## Verdict

```
SIMPLICITY GATE — WARN
Proposed:  npm scripts with multiple devDependencies (Tier 6)
Note:      Make (Tier 3) can handle build pipelines with automatic caching.
Check:     Is npm already your project's runtime? If yes, npm scripts may be simpler.
           Is this a new project? If yes, Make is the lighter choice.
```

## When npm Scripts WIN

- Project already uses Node.js (npm is present)
- Cross-platform support is required (Windows + macOS + Linux)
- Team is deeply invested in the npm ecosystem

## When Make WINS

- Project doesn't need Node.js for anything else
- Build pipeline is complex with many interdependent steps
- You want automatic caching based on file timestamps
- You're on Unix/macOS only
