herhttps://github.com/cMD808/simplicity-gateopelis teh#!/usr/bin/env node

/**
 * Simplicity Gate CLI — Light, fast, zero-dependency
 * Evaluates code proposals against the Rule of Least Power hierarchy.
 *
 * Usage:
 *   simplicity-gate eval <file>          Evaluate a file's proposal
 *   simplicity-gate scan [dir]           Scan directory for over-engineering
 *   simplicity-gate tiers                Show the tier hierarchy
 *   simplicity-gate bench                Self-benchmark
 *   simplicity-gate help                 Show this help
 *
 * @version 6.1.0
 * @license MIT
 */

'use strict';

const fs = require('fs');
const path = require('path');

// ─── Tier Hierarchy ──────────────────────────────────────────────

const TIERS = [
  { tier: 0, name: 'Built-in APIs',        examples: ['fetch()', 'structuredClone()', 'URL', 'Intl'] },
  { tier: 1, name: 'Declarative markup',    examples: ['HTML', 'CSS', 'JSON Schema'] },
  { tier: 2, name: 'Declarative logic',     examples: ['CSS :has()', 'Jinja', 'YAML'] },
  { tier: 3, name: 'Standard utilities',    examples: ['jq', 'grep', 'awk', 'curl'] },
  { tier: 4, name: 'Query languages',       examples: ['SQL', 'GraphQL', 'SQLite'] },
  { tier: 5, name: 'High-level scripting',  examples: ['Python', 'Ruby', 'shell scripts'] },
  { tier: 6, name: 'Application frameworks', examples: ['Express', 'Rails', 'Django'] },
  { tier: 7, name: 'Custom infrastructure', examples: ['Kubernetes', 'service meshes'] },
  { tier: 8, name: 'External services',     examples: ['Zapier', 'IFTTT', 'n8n', 'Make'] },
];

// ─── Tool → Tier Mapping ────────────────────────────────────────

const TOOL_TIERS = {
  // Tier 0 — Built-in APIs
  'fetch': 0, 'structuredclone': 0, 'url': 0, 'intl': 0, 'promises': 0,
  'async/await': 0, 'arrow functions': 0, 'template literals': 0,

  // Tier 1 — Declarative markup
  'html': 1, 'html5': 1, 'css': 1, 'css3': 1, 'json schema': 1,
  'svg': 1, 'markdown': 1, 'yaml': 1, 'toml': 1,

  // Tier 2 — Declarative logic
  'css :has()': 2, 'css :checked': 2, 'css :invalid': 2, 'css :valid': 2,
  'css :is()': 2, 'css :where()': 2, 'jinja': 2, 'jinja2': 2,
  'mustache': 2, 'handlebars': 2, 'css variables': 2, 'data attributes': 2,
  'html5 validation': 2, 'html5 form validation': 2,

  // Tier 3 — Standard utilities
  'jq': 3, 'grep': 3, 'awk': 3, 'sed': 3, 'find': 3, 'sort': 3,
  'uniq': 3, 'wc': 3, 'head': 3, 'tail': 3, 'cut': 3, 'tr': 3,
  'curl': 3, 'wget': 3, 'socat': 3, 'xargs': 3, 'make': 3,
  'makefile': 3, 'cmake': 3, 'bash': 3, 'zsh': 3, 'shell': 3,
  'shell pipeline': 3, 'unix pipeline': 3, 'df': 3, 'du': 3,
  'ps': 3, 'top': 3, 'netstat': 3, 'ss': 3, 'tar': 3, 'gzip': 3,

  // Tier 4 — Query languages
  'sql': 4, 'postgresql': 4, 'mysql': 4, 'sqlite': 4, 'graphql': 4,
  'prisma': 4, 'typeorm': 4, 'sequelize': 4, 'knex': 4, 'drizzle': 4,
  'better-sqlite3': 4, 'swagger': 4, 'openapi': 4, 'graphql-codegen': 4,

  // Tier 5 — High-level scripting
  'python': 5, 'ruby': 5, 'perl': 5, 'php': 5, 'node.js': 5, 'nodejs': 5,
  'deno': 5, 'bun': 5, 'lua': 5, 'r': 5, 'matlab': 5,
  'zod': 5, 'valibot': 5, 'date-fns': 5, 'moment': 5, 'uuid': 5, 'nanoid': 5,
  'crypto': 5, 'temporal': 5,

  // Tier 6 — Application frameworks
  'express': 6, 'express.js': 6, 'fastify': 6, 'koa': 6, 'hapi': 6,
  'django': 6, 'flask': 6, 'fastapi': 6, 'rails': 6, 'sinatra': 6,
  'spring': 6, 'laravel': 6, 'symfony': 6, 'react': 6, 'vue': 6,
  'angular': 6, 'svelte': 6, 'next.js': 6, 'nextjs': 6, 'nuxt': 6,
  'gatsby': 6, 'remix': 6, 'astro': 6, 'zustand': 6, 'redux': 6,
  'mobx': 6, 'recoil': 6, 'jotai': 6, 'axios': 6, 'lodash': 6,
  'underscore': 6, 'day.js': 6, 'jest': 6, 'mocha': 6,
  'webpack': 6, 'vite': 6, 'esbuild': 6, 'rollup': 6, 'psutil': 6,
  'pandas': 6, 'numpy': 6, 'scipy': 6, 'matplotlib': 6, 'flask': 6,
  'bottle': 6, 'tornado': 6,
  'trpc': 6, 'nextauth': 6, 'authjs': 6, 'socket.io': 6, 'pusher': 6,
  'winston': 6, 'pino': 6, 'bunyan': 6, 'zod': 6, 'valibot': 6,
  'vitest': 6, 'playwright': 6, 'cypress': 6, 'tanstack-query': 6,
  'react-query': 6, 'apollo-client': 6, 'urql': 6, 'tanstack-router': 6,
  'remix': 6, 'astro': 6, 'solid': 6, 'preact': 6, 'qwik': 6,

  // Tier 7 — Custom infrastructure
  'kubernetes': 7, 'k8s': 7, 'docker': 7, 'docker compose': 7,
  'terraform': 7, 'ansible': 7, 'consul': 7, 'istio': 7,
  'envoy': 7, 'nginx': 7, 'haproxy': 7, 'traefik': 7,
  'rabbitmq': 7, 'kafka': 7, 'redis': 7, 'memcached': 7,
  'elasticsearch': 7, 'prometheus': 7, 'grafana': 7,
  'vercel': 7, 'netlify': 7, 'cloudflare': 7, 'aws': 7, 'gcp': 7, 'azure': 7,

  // Tier 8 — External services
  'zapier': 8, 'ifttt': 8, 'n8n': 8, 'make': 8, 'integromat': 8,
  'airtable': 8, 'notion api': 8, 'slack api': 8, 'twilio': 8,
  'sendgrid': 8, 'mailgun': 8, 'stripe': 8, 'auth0': 8,
  'supabase': 8, 'firebase': 8, 'planetscale': 8, 'neon': 8,
  'turso': 8, 'upstash': 8, 'pusher': 8, 'ably': 8,
  'sentry': 8, 'datadog': 8, 'newrelic': 8, 'logrocket': 8,
  'clerk': 8, 'auth0': 8, 'kinde': 8, 'stytch': 8,
};

// ─── Anti-Patterns (common over-engineering) ────────────────────

const ANTI_PATTERNS = [
  { pattern: /require\s*\(\s*['"]lodash['"]\)|from\s+['"]lodash['"]/, tier: 6, alt: 'Use native JS methods (Object.keys, Array.filter, etc.) or jq for data transforms', altTier: 0 },
  { pattern: /require\s*\(\s*['"]express['"]\)|from\s+['"]express['"]/, tier: 6, alt: 'Use curl + cron for simple forwarding, or built-in http module', altTier: 3 },
  { pattern: /require\s*\(\s*['"]axios['"]\)|from\s+['"]axios['"]/, tier: 6, alt: 'Use fetch() (built-in) or curl', altTier: 0 },
  { pattern: /import.*from\s+['"]react['"]/, tier: 6, alt: 'Use HTML + CSS for simple UIs', altTier: 1 },
  { pattern: /import.*from\s+['"]zustand['"]/, tier: 6, alt: 'Use CSS :has() + data attributes for state', altTier: 2 },
  { pattern: /import.*from\s+['"]redux['"]/, tier: 6, alt: 'Use CSS or URL state for simple state', altTier: 2 },
  { pattern: /import\s+pandas|from\s+pandas/, tier: 6, alt: 'Use SQL for data queries', altTier: 4 },
  { pattern: /import\s+psycopg2|from\s+psycopg2/, tier: 6, alt: 'Run SQL directly against the database', altTier: 4 },
  { pattern: /import\s+psutil/, tier: 6, alt: 'Use df, du, ps shell commands', altTier: 3 },
  { pattern: /function\s+validateForm|validate.*input.*match/, tier: 6, alt: 'Use HTML5 required/minlength/pattern attributes', altTier: 1 },
  { pattern: /\.addEventListener\s*\(\s*['"]submit['"]/, tier: 5, alt: 'Use HTML5 form validation attributes', altTier: 1 },
  { pattern: /JSON\.parse\s*\(\s*fs\.readFileSync/, tier: 5, alt: 'Use jq for JSON transformations', altTier: 3 },
  { pattern: /JSON\.stringify\s*\(.*null\s*,\s*2\s*\)/, tier: 5, alt: 'Use jq . for pretty-printing', altTier: 3 },
  // Modern anti-patterns (v6.1+)
  { pattern: /require\s*\(\s*['"]next['"]\)|from\s+['"]next['"]|import.*from\s+['"]next['"]/, tier: 6, alt: 'Use npx serve for static sites, Vite for SPA', altTier: 3 },
  { pattern: /require\s*\(\s*['"]@supabase\/supabase-js['"]\)|from\s+['"]@supabase\/supabase-js['"]|createClient.*supabase/, tier: 8, alt: 'Use SQLite + raw SQL for simple local DB', altTier: 4 },
  { pattern: /require\s*\(\s*['"]tailwindcss['"]\)|from\s+['"]tailwindcss['"]|@tailwind/, tier: 6, alt: 'Use native CSS variables + CSS modules', altTier: 1 },
  { pattern: /require\s*\(\s*['"]@trpc\/server['"]\)|from\s+['"]@trpc\/server['"]|createTRPCRouter/, tier: 6, alt: 'Use REST + fetch for simple APIs', altTier: 3 },
  { pattern: /require\s*\(\s*['"]next-auth['"]\)|from\s+['"]next-auth['"]|from\s+['"]@auth\/core['"]|import.*from\s+['"]next-auth['"]/, tier: 6, alt: 'Use native crypto + httpOnly cookies for simple auth', altTier: 5 },
  { pattern: /require\s*\(\s*['"]socket\.io['"]\)|from\s+['"]socket\.io['"]|import.*from\s+['"]socket\.io['"]/, tier: 6, alt: 'Use native WebSocket / SSE for real-time', altTier: 6 },
  { pattern: /require\s*\(\s*['"]pusher['"]\)|from\s+['"]pusher['"]|import.*from\s+['"]pusher['"]/, tier: 8, alt: 'Use native WebSocket or Server-Sent Events', altTier: 6 },
  { pattern: /require\s*\(\s*['"]winston['"]\)|from\s+['"]winston['"]|createLogger.*winston/, tier: 6, alt: 'Use console.log / console.error for simple logging', altTier: 0 },
  { pattern: /require\s*\(\s*['"]pino['"]\)|from\s+['"]pino['"]|import.*from\s+['"]pino['"]/, tier: 6, alt: 'Use console.log with structured JSON output', altTier: 0 },
  { pattern: /require\s*\(\s*['"]bunyan['"]\)|from\s+['"]bunyan['"]|import.*from\s+['"]bunyan['"]/, tier: 6, alt: 'Use console.log with JSON format', altTier: 0 },
  { pattern: /require\s*\(\s*['"]zod['"]\)|from\s+['"]zod['"]|z\.object\(|z\.string\(\)/, tier: 6, alt: 'Use JSDoc + TypeScript compile-time validation', altTier: 5 },
  { pattern: /require\s*\(\s*['"]valibot['"]\)|from\s+['"]valibot['"]|v\.object\(|v\.string\(\)/, tier: 6, alt: 'Use JSDoc + TypeScript compile-time validation', altTier: 5 },
  { pattern: /require\s*\(\s*['"]vitest['"]\)|from\s+['"]vitest['"]|import.*from\s+['"]vitest['"]/, tier: 6, alt: 'Use node:test (built-in) for simple tests', altTier: 0 },
  { pattern: /require\s*\(\s*['"]playwright['"]\)|from\s+['"]playwright['"]|import.*from\s+['"]@playwright\/test['"]/, tier: 6, alt: 'Use native fetch + assert for API testing', altTier: 0 },
  { pattern: /require\s*\(\s*['"]@tanstack\/react-query['"]\)|from\s+['"]@tanstack\/react-query['"]|useQuery.*react-query|useQuery.*tanstack/, tier: 6, alt: 'Use native fetch + useState for simple data fetching', altTier: 0 },
  { pattern: /require\s*\(\s*['"]@apollo\/client['"]\)|from\s+['"]@apollo\/client['"]|useQuery.*apollo|ApolloClient/, tier: 6, alt: 'Use fetch + GraphQL string for simple queries', altTier: 3 },
  { pattern: /require\s*\(\s*['"]urql['"]\)|from\s+['"]urql['"]|import.*from\s+['"]urql['"]/, tier: 6, alt: 'Use fetch + GraphQL string for simple queries', altTier: 3 },
];

// ─── Colors (ANSI) ──────────────────────────────────────────────

const C = {
  reset:   '\x1b[0m',
  bold:    '\x1b[1m',
  dim:     '\x1b[2m',
  red:     '\x1b[31m',
  green:   '\x1b[32m',
  yellow:  '\x1b[33m',
  blue:    '\x1b[34m',
  magenta: '\x1b[35m',
  cyan:    '\x1b[36m',
  white:   '\x1b[37m',
  bgRed:   '\x1b[41m',
  bgGreen: '\x1b[42m',
  bgYellow:'\x1b[43m',
};

// ─── Helpers ────────────────────────────────────────────────────

function stripAnsi(str) {
  return str.replace(/\x1b\[[0-9;]*m/g, '');
}

function lookupTier(toolName) {
  const key = toolName.toLowerCase().trim();
  if (key in TOOL_TIERS) return TOOL_TIERS[key];
  // Partial match
  for (const [k, v] of Object.entries(TOOL_TIERS)) {
    if (key.includes(k) || k.includes(key)) return v;
  }
  return null;
}

function severityLabel(gap) {
  if (gap >= 4) return { label: 'CRITICAL', color: C.red };
  if (gap >= 3) return { label: 'HIGH', color: C.red };
  if (gap >= 2) return { label: 'MEDIUM', color: C.yellow };
  return { label: 'LOW', color: C.green };
}

function formatTier(tier) {
  const t = TIERS[tier];
  if (!t) return `Tier ${tier}`;
  return `Tier ${tier} — ${t.name}`;
}

// ─── Eval Command ───────────────────────────────────────────────

function evalFile(filePath) {
  const start = process.hrtime.bigint();

  let content;
  try {
    content = fs.readFileSync(filePath, 'utf8');
  } catch (err) {
    console.error(`${C.red}Error:${C.reset} Cannot read file: ${filePath}`);
    process.exit(1);
  }

  // Extract YAML proposal block
  const yamlMatch = content.match(/```ya?ml\s*\n([\s\S]*?)```/);
  let proposedTool = null;
  let proposedTier = null;

  if (yamlMatch) {
    const yaml = yamlMatch[1];
    const toolMatch = yaml.match(/proposed_tool:\s*["']?([^"'\n]+)["']?/);
    const tierMatch = yaml.match(/proposed_tier:\s*(\d+)/);
    if (toolMatch) proposedTool = toolMatch[1].trim();
    if (tierMatch) proposedTier = parseInt(tierMatch[1], 10);
  }

  // Fallback: scan for tool names in content
  if (!proposedTool) {
    const lower = content.toLowerCase();
    for (const [tool, tier] of Object.entries(TOOL_TIERS)) {
      if (lower.includes(tool)) {
        proposedTool = tool;
        proposedTier = tier;
        break;
      }
    }
  }

  // Scan for anti-patterns
  const violations = [];
  for (const ap of ANTI_PATTERNS) {
    if (ap.pattern.test(content)) {
      violations.push(ap);
    }
  }

  const elapsed = Number(process.hrtime.bigint() - start) / 1e6; // ms

  // Output
  console.log('');
  console.log(`${C.bold}${C.cyan}⚡ SIMPLICITY GATE${C.reset} ${C.dim}v6.1.0${C.reset}`);
  console.log(`${C.dim}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${C.reset}`);
  console.log('');

  if (proposedTool) {
    const toolTier = proposedTier !== null ? proposedTier : lookupTier(proposedTool);
    console.log(`${C.bold}File:${C.reset}      ${filePath}`);
    console.log(`${C.bold}Tool detected:${C.reset} ${C.magenta}${proposedTool}${C.reset}`);
    console.log(`${C.bold}Tier:${C.reset}        ${formatTier(toolTier)}`);
    console.log('');
  }

  if (violations.length > 0) {
    console.log(`${C.bold}${C.red}⚠  ANTI-PATTERNS DETECTED: ${violations.length}${C.reset}`);
    console.log('');
    for (const v of violations) {
      const gap = v.tier - v.altTier;
      const sev = severityLabel(gap);
      console.log(`  ${sev.color}${C.bold}[${sev.label}]${C.reset} Tier ${v.tier} → use ${C.green}Tier ${v.altTier}${C.reset}`);
      console.log(`    ${C.dim}${v.alt}${C.reset}`);
      console.log('');
    }
  } else if (proposedTool) {
    const toolTier = proposedTier !== null ? proposedTier : lookupTier(proposedTool);
    if (toolTier !== null && toolTier <= 3) {
      console.log(`${C.bold}${C.green}✓  PASS${C.reset} — ${proposedTool} is an appropriate choice (${formatTier(toolTier)})`);
    } else if (toolTier !== null && toolTier <= 5) {
      console.log(`${C.bold}${C.yellow}⚠  WARN${C.reset} — ${proposedTool} (${formatTier(toolTier)}) may be overkill for simple tasks`);
      console.log(`  ${C.dim}Consider lower-tier alternatives if they fit the requirement.${C.reset}`);
    } else {
      console.log(`${C.bold}${C.yellow}⚠  WARN${C.reset} — ${proposedTool} (${formatTier(toolTier)}) is high-tier`);
      console.log(`  ${C.dim}Verify that simpler alternatives have been considered.${C.reset}`);
    }
  } else {
    console.log(`${C.dim}No proposal block or known tools detected.${C.reset}`);
    console.log(`${C.dim}Add a YAML proposal block to enable evaluation:${C.reset}`);
    console.log(`${C.dim}`);
    console.log(`${C.dim}  \`\`\`yaml${C.reset}`);
    console.log(`${C.dim}  proposal:${C.reset}`);
    console.log(`${C.dim}    tool: "express"${C.reset}`);
    console.log(`${C.dim}    tier: 6${C.reset}`);
    console.log(`${C.dim}  \`\`\`${C.reset}`);
  }

  console.log('');
  console.log(`${C.dim}Evaluated in ${elapsed.toFixed(1)}ms${C.reset}`);
  console.log('');
}

// ─── Scan Command ───────────────────────────────────────────────

function scanDir(dir) {
  const start = process.hrtime.bigint();
  const exts = new Set(['.js', '.ts', '.jsx', '.tsx', '.py', '.rb', '.go', '.rs', '.php']);
  let filesScanned = 0;
  let totalViolations = 0;
  const results = [];

  function walk(d) {
    let entries;
    try { entries = fs.readdirSync(d, { withFileTypes: true }); } catch { return; }
    for (const entry of entries) {
      const full = path.join(d, entry.name);
      if (entry.isDirectory()) {
        if (entry.name === 'node_modules' || entry.name === '.git' || entry.name === 'dist' || entry.name === 'build') continue;
        walk(full);
      } else if (entry.isFile() && exts.has(path.extname(entry.name).toLowerCase())) {
        filesScanned++;
        let content;
        try { content = fs.readFileSync(full, 'utf8'); } catch { continue; }
        const fileViolations = [];
        for (const ap of ANTI_PATTERNS) {
          if (ap.pattern.test(content)) {
            fileViolations.push(ap);
            totalViolations++;
          }
        }
        if (fileViolations.length > 0) {
          results.push({ file: full, violations: fileViolations });
        }
      }
    }
  }

  walk(dir);
  const elapsed = Number(process.hrtime.bigint() - start) / 1e6;

  console.log('');
  console.log(`${C.bold}${C.cyan}⚡ SIMPLICITY GATE — SCAN${C.reset} ${C.dim}v6.1.0${C.reset}`);
  console.log(`${C.dim}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${C.reset}`);
  console.log('');
  console.log(`${C.bold}Directory:${C.reset} ${dir}`);
  console.log(`${C.bold}Files scanned:${C.reset} ${filesScanned}`);
  console.log(`${C.bold}Violations found:${C.reset} ${totalViolations > 0 ? C.red + totalViolations : C.green + '0'}${C.reset}`);
  console.log('');

  if (results.length > 0) {
    for (const r of results) {
      const rel = path.relative(dir, r.file);
      console.log(`${C.bold}${C.yellow}📄 ${rel}${C.reset}`);
      for (const v of r.violations) {
        const gap = v.tier - v.altTier;
        const sev = severityLabel(gap);
        console.log(`   ${sev.color}[${sev.label}]${C.reset} Tier ${v.tier} → ${C.green}Tier ${v.altTier}${C.reset}: ${C.dim}${v.alt}${C.reset}`);
      }
      console.log('');
    }
  } else {
    console.log(`${C.green}No over-engineering patterns detected.${C.reset}`);
    console.log('');
  }

  console.log(`${C.dim}Scan completed in ${elapsed.toFixed(1)}ms${C.reset}`);
  console.log('');
}

// ─── Tiers Command ──────────────────────────────────────────────

function showTiers() {
  console.log('');
  console.log(`${C.bold}${C.cyan}⚡ SIMPLICITY GATE — TIER HIERARCHY${C.reset} ${C.dim}v6.1.0${C.reset}`);
  console.log(`${C.dim}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${C.reset}`);
  console.log('');

  const colors = [C.green, C.green, C.green, C.cyan, C.cyan, C.yellow, C.yellow, C.red, C.red];

  for (const t of TIERS) {
    const color = colors[t.tier] || C.white;
    const examples = t.examples.join(', ');
    console.log(`  ${color}${C.bold}Tier ${t.tier}${C.reset}  ${color}${t.name.padEnd(24)}${C.reset} ${C.dim}${examples}${C.reset}`);
  }

  console.log('');
  console.log(`${C.dim}Prefer lower tiers. Simpler = fewer dependencies, less breakage.${C.reset}`);
  console.log('');
}

// ─── Bench Command ──────────────────────────────────────────────

function bench() {
  console.log('');
  console.log(`${C.bold}${C.cyan}⚡ SIMPLICITY GATE — BENCHMARK${C.reset} ${C.dim}v6.1.0${C.reset}`);
  console.log(`${C.dim}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${C.reset}`);
  console.log('');

  const iterations = 1000;
  const sampleYaml = '```yaml\nproposal:\n  tool: "express"\n  tier: 6\n```';
  const sampleCode = `const express = require('express');
const axios = require('axios');
const _ = require('lodash');
import React from 'react';
import { create } from 'zustand';
import pandas as pd;
import psutil`;

  // Benchmark: tier lookup
  let start = process.hrtime.bigint();
  for (let i = 0; i < iterations; i++) {
    lookupTier('express');
    lookupTier('jq');
    lookupTier('react');
    lookupTier('python');
  }
  const tierLookupMs = Number(process.hrtime.bigint() - start) / 1e6;

  // Benchmark: anti-pattern scan
  start = process.hrtime.bigint();
  for (let i = 0; i < iterations; i++) {
    for (const ap of ANTI_PATTERNS) {
      ap.pattern.test(sampleCode);
    }
  }
  const antiPatternMs = Number(process.hrtime.bigint() - start) / 1e6;

  // Benchmark: YAML parse
  start = process.hrtime.bigint();
  for (let i = 0; i < iterations; i++) {
    sampleYaml.match(/proposed_tool:\s*["']?([^"'\n]+)["']?/);
    sampleYaml.match(/proposed_tier:\s*(\d+)/);
  }
  const yamlParseMs = Number(process.hrtime.bigint() - start) / 1e6;

  // Benchmark: full eval (simulated)
  start = process.hrtime.bigint();
  for (let i = 0; i < iterations; i++) {
    const toolMatch = sampleYaml.match(/proposed_tool:\s*["']?([^"'\n]+)["']?/);
    const tierMatch = sampleYaml.match(/proposed_tier:\s*(\d+)/);
    const tool = toolMatch ? toolMatch[1].trim() : null;
    const tier = tierMatch ? parseInt(tierMatch[1], 10) : null;
    const violations = [];
    for (const ap of ANTI_PATTERNS) {
      if (ap.pattern.test(sampleCode)) violations.push(ap);
    }
  }
  const fullEvalMs = Number(process.hrtime.bigint() - start) / 1e6;

  console.log(`  ${C.bold}Operation${C.reset}                    ${C.bold}Time${C.reset}         ${C.bold}Per Call${C.reset}`);
  console.log(`  ${C.dim}──────────────────────────────────────────────────${C.reset}`);
  console.log(`  Tier lookup (${iterations}x)         ${tierLookupMs.toFixed(1).padStart(8)}ms   ${(tierLookupMs / iterations * 1000).toFixed(1).padStart(8)}μs`);
  console.log(`  Anti-pattern scan (${iterations}x)  ${antiPatternMs.toFixed(1).padStart(8)}ms   ${(antiPatternMs / iterations * 1000).toFixed(1).padStart(8)}μs`);
  console.log(`  YAML parse (${iterations}x)         ${yamlParseMs.toFixed(1).padStart(8)}ms   ${(yamlParseMs / iterations * 1000).toFixed(1).padStart(8)}μs`);
  console.log(`  Full eval (${iterations}x)          ${fullEvalMs.toFixed(1).padStart(8)}ms   ${(fullEvalMs / iterations * 1000).toFixed(1).padStart(8)}μs`);
  console.log('');

  const avgPerEval = fullEvalMs / iterations;
  const evalsPerSec = Math.round(1000 / avgPerEval);
  console.log(`  ${C.bold}${C.green}Average eval: ${avgPerEval.toFixed(2)}ms | ${evalsPerSec} evals/sec${C.reset}`);
  console.log('');
}

// ─── Why-Not Command ──────────────────────────────────────────────

const WHY_NOT_DB = {
  'left-pad': { incident: '11 chars broke thousands of npm packages', year: 2016, lesson: 'Tiny deps cause cascading failures' },
  'event-stream': { incident: 'Malicious code in unused dep, stole crypto', year: 2018, lesson: 'Every unused dep is an attack vector' },
  'log4j': { incident: 'RCE via logging, affected millions of servers', year: 2021, lesson: '"Simple" deps can have catastrophic CVEs' },
  'colors.js': { incident: 'Maintainer intentionally broke packages in protest', year: 2022, lesson: 'Single-point-of-failure in dep chain' },
  'faker.js': { incident: 'Same maintainer destroyed his own library', year: 2022, lesson: 'Trusted deps can become untrusted overnight' },
  'ua-parser-js': { incident: 'Cryptominer injected, 7M+ weekly downloads', year: 2021, lesson: 'Popular ≠ safe' },
  'coa': { incident: 'Malicious injection, 10M+ weekly downloads', year: 2021, lesson: 'Supply chain attacks increasing' },
  'rc': { incident: 'Malicious injection, 10M+ weekly downloads', year: 2021, lesson: 'Supply chain attacks increasing' },
  'node-ipc': { incident: 'Protestware targeting specific countries', year: 2022, lesson: 'Deps can have political motives' },
  'moment.js': { incident: 'Deprecated, 68KB for what Date does natively', year: 2020, lesson: 'Deprecated = security liability' },
  'request': { incident: 'Deprecated, no security patches since 2019', year: 2019, lesson: 'Deprecated = vulnerable' },
  'webpack': { incident: '5s cold starts, Vite does it in 200ms', year: 2023, lesson: 'Build tools can be over-engineered' },
  'redux': { incident: '47 files for todo app, React state = 1 line', year: 2023, lesson: 'State management can be massively over-engineered' },
  'express': { incident: '47-line proxy for what curl does in 1 command', year: 2023, lesson: 'HTTP clients can be over-engineered' },
  'docker': { incident: 'Container for cron, native cron = 2 lines', year: 2023, lesson: 'Containers can be over-engineered for scheduling' },
  'kubernetes': { incident: '15 YAML files for static site, npx serve works', year: 2023, lesson: 'Orchestration can be over-engineered for serving' },
  'graphql': { incident: '200-line schema for 3 fields, REST = 20 lines', year: 2023, lesson: 'API layers can be over-engineered' },
  'microservices': { incident: '12 services for CRUD, monolith is faster', year: 2023, lesson: 'Architecture can be over-engineered' },
  'redis': { incident: 'In-memory cache for 100-row table, Map = 1 line', year: 2023, lesson: 'Caching can be over-engineered' },
  'prisma': { incident: 'ORM for 3-table SQLite, raw SQL works', year: 2023, lesson: 'ORMs can be over-engineered for simple schemas' },
  'jenkins': { incident: 'Full CI for 3 shell scripts, GitHub Actions suffices', year: 2023, lesson: 'CI can be over-provisioned' },
  'terraform': { incident: 'IaC for single static site on S3, AWS CLI works', year: 2023, lesson: 'IaC can be over-engineered for simple infra' },
  'next.js': { incident: 'Full framework for static blog, npx serve works', year: 2023, lesson: 'Frameworks can be over-engineered for static sites' },
  'supabase': { incident: 'Full backend for 3-table app, SQLite + raw SQL works', year: 2023, lesson: 'Backend-as-a-service can be over-engineered' },
  'tailwind': { incident: 'Utility framework for 5 CSS rules, CSS variables work', year: 2023, lesson: 'CSS frameworks can be over-engineered' },
  'trpc': { incident: 'Type-safe RPC for 3 endpoints, REST + fetch works', year: 2023, lesson: 'RPC frameworks can be over-engineered' },
  'nextauth': { incident: 'Full auth framework for email/password, native crypto works', year: 2023, lesson: 'Auth frameworks can be over-engineered' },
  'socket.io': { incident: 'WebSocket lib for simple polling, native WebSocket works', year: 2023, lesson: 'Real-time libs can be over-engineered' },
  'pusher': { incident: 'External service for WebSocket, native WebSocket works', year: 2023, lesson: 'External services add cost and latency' },
  'winston': { incident: 'Logging library for console.log, native console works', year: 2023, lesson: 'Logging libs can be over-engineered' },
  'pino': { incident: 'Fast logger for simple apps, console.log is faster', year: 2023, lesson: 'Logging libs add overhead' },
  'zod': { incident: 'Runtime validation for compile-time types, TypeScript does it', year: 2023, lesson: 'Runtime validation often duplicates compile-time' },
  'vitest': { incident: 'Test framework for simple utils, node:test built-in', year: 2023, lesson: 'Test frameworks add complexity for simple tests' },
  'playwright': { incident: 'E2E framework for API tests, fetch + assert works', year: 2023, lesson: 'E2E tools overkill for API testing' },
  'tanstack-query': { incident: 'Data fetching lib for 3 endpoints, fetch + useState works', year: 2023, lesson: 'Data fetching libs overkill for simple fetching' },
  'apollo-client': { incident: 'GraphQL client for 5 fields, fetch + string works', year: 2023, lesson: 'GraphQL clients add bundle size for simple queries' },
};

function whyNot(keyword, options = {}) {
  console.log('');
  console.log(`${C.bold}${C.cyan}⚡ SIMPLICITY GATE — WHY NOT${C.reset} ${C.dim}v6.1.0${C.reset}`);
  console.log(`${C.dim}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${C.reset}`);
  console.log('');

  if (!keyword) {
    console.log(`${C.bold}Usage:${C.reset} simplicity-gate why-not <keyword> [--tier N] [--year YYYY]`);
    console.log('');
    console.log(`${C.bold}Available entries:${C.reset}`);
    const entries = Object.entries(WHY_NOT_DB);
    for (let i = 0; i < entries.length; i += 3) {
      const row = entries.slice(i, i + 3).map(([k]) => `  ${C.cyan}${k}${C.reset}`).join('  ');
      console.log(row);
    }
    console.log('');
    return;
  }

  const key = keyword.toLowerCase();
  const entry = WHY_NOT_DB[key];

  if (!entry) {
    console.log(`${C.yellow}No entry found for "${keyword}".${C.reset}`);
    console.log(`${C.dim}Try: simplicity-gate why-not (lists all entries)${C.reset}`);
    console.log('');
    return;
  }

  console.log(`${C.bold}Anti-Pattern:${C.reset} ${C.cyan}${keyword}${C.reset}`);
  console.log(`${C.bold}Incident:${C.reset} ${entry.incident}`);
  console.log(`${C.bold}Year:${C.reset} ${entry.year}`);
  console.log(`${C.bold}Lesson:${C.reset} ${entry.lesson}`);
  console.log('');

  // Suggest alternative based on keyword
  const alternatives = {
    'express': 'curl + cron (Tier 3) or native http module (Tier 0)',
    'next.js': 'npx serve (Tier 3) or Vite (Tier 5)',
    'supabase': 'SQLite + raw SQL (Tier 4)',
    'tailwind': 'CSS variables + native CSS (Tier 1)',
    'trpc': 'REST + fetch (Tier 3)',
    'nextauth': 'Native crypto + httpOnly cookies (Tier 5)',
    'socket.io': 'Native WebSocket / SSE (Tier 6)',
    'pusher': 'Native WebSocket (Tier 6)',
    'winston': 'console.log (Tier 0)',
    'pino': 'console.log (Tier 0)',
    'zod': 'TypeScript + JSDoc (Tier 5)',
    'vitest': 'node:test (Tier 0)',
    'playwright': 'fetch + assert (Tier 0)',
    'tanstack-query': 'fetch + useState (Tier 0)',
    'apollo-client': 'fetch + GraphQL string (Tier 3)',
    'docker': 'crontab / systemd timer (Tier 3)',
    'kubernetes': 'Static hosting (Tier 3)',
    'redis': 'Map + setTimeout (Tier 5)',
    'prisma': 'better-sqlite3 / raw SQL (Tier 4)',
    'redux': 'useState + useContext (Tier 6)',
    'moment.js': 'Intl.DateTimeFormat / Temporal (Tier 0)',
  };

  const alt = alternatives[key];
  if (alt) {
    console.log(`${C.bold}Recommended alternative:${C.reset} ${C.green}${alt}${C.reset}`);
  }
  console.log('');
}

// ─── Fix Command ──────────────────────────────────────────────────

const FIX_TEMPLATES = {
  'moment': { from: /require\s*\(\s*['"]moment['"]\)|from\s+['"]moment['"]|import.*from\s+['"]moment['"]/, to: "console.log(new Date().toLocaleDateString('en-CA'));" },
  'lodash': { from: /require\s*\(\s*['"]lodash['"]\)|from\s+['"]lodash['"]|import.*from\s+['"]lodash['"]/, to: "const result = structuredClone(obj);" },
  'axios': { from: /require\s*\(\s*['"]axios['"]\)|from\s+['"]axios['"]|import.*from\s+['"]axios['"]/, to: "await fetch(url).then(r => r.json());" },
  'uuid': { from: /require\s*\(\s*['"]uuid['"]\)|from\s+['"]uuid['"]|import.*from\s+['"]uuid['"]/, to: "console.log(crypto.randomUUID());" },
  'express': { from: /require\s*\(\s*['"]express['"]\)|from\s+['"]express['"]|import.*from\s+['"]express['"]/, to: "# Use curl + cron instead\ncurl -s https://api.example.com/data" },
  'next.js': { from: /require\s*\(\s*['"]next['"]\)|from\s+['"]next['"]|import.*from\s+['"]next['"]/, to: "# Use npx serve for static sites\nnpx serve out" },
  'supabase': { from: /require\s*\(\s*['"]@supabase\/supabase-js['"]\)|from\s+['"]@supabase\/supabase-js['"]|createClient.*supabase/, to: "# Use better-sqlite3 for local SQLite\nconst db = require('better-sqlite3')('app.db');" },
  'tailwind': { from: /@tailwind|require\s*\(\s*['"]tailwindcss['"]\)|from\s+['"]tailwindcss['"]/, to: "<div style={{background: 'var(--color-primary)', color: 'white', padding: '1rem'}}>Hello</div>" },
  'socket.io': { from: /require\s*\(\s*['"]socket\.io['"]\)|from\s+['"]socket\.io['"]|import.*from\s+['"]socket\.io['"]/, to: "const wss = new WebSocket.Server({ server });\nwss.on('connection', ws => { /* ... */ });" },
  'zod': { from: /require\s*\(\s*['"]zod['"]\)|from\s+['"]zod['"]|import\s+\{\s*z\s*\}\s+from\s+['"]zod['"]/, to: "/** @type {{name: string}} */\nconst schema = { name: '' };" },
  'vitest': { from: /require\s*\(\s*['"]vitest['"]\)|from\s+['"]vitest['"]|import.*from\s+['"]vitest['"]/, to: "const test = require('node:test');\nconst assert = require('node:assert');\ntest('works', () => { assert.strictEqual(1+1, 2); });" },
};

function fixCommand(filePath, options = {}) {
  console.log('');
  console.log(`${C.bold}${C.cyan}⚡ SIMPLICITY GATE — AUTO-FIX${C.reset} ${C.dim}v6.1.0${C.reset}`);
  console.log(`${C.dim}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${C.reset}`);
  console.log('');

  if (!filePath) {
    console.log(`${C.bold}Usage:${C.reset} simplicity-gate fix <file> [--dry-run] [--test] [--commit "msg"]`);
    console.log('');
    console.log(`${C.bold}Available fix templates:${C.reset}`);
    for (const [k, v] of Object.entries(FIX_TEMPLATES)) {
      console.log(`  ${C.cyan}${k}${C.reset}`);
    }
    console.log('');
    return;
  }

  let content;
  try {
    content = fs.readFileSync(filePath, 'utf8');
  } catch (err) {
    console.error(`${C.red}Error:${C.reset} Cannot read file: ${filePath}`);
    process.exit(1);
  }

  const dryRun = options.dryRun || args.includes('--dry-run');
  const runTest = options.test || args.includes('--test');

  let fixed = false;
  let newContent = content;

  for (const [key, template] of Object.entries(FIX_TEMPLATES)) {
    const regex = template.from instanceof RegExp ? template.from : new RegExp(template.from, 'g');
    if (regex.test(content)) {
      newContent = newContent.replace(regex, template.to);
      fixed = true;
      console.log(`${C.green}✓ Fixed:${C.reset} ${key} → simpler alternative`);
    }
  }

  if (!fixed) {
    console.log(`${C.yellow}No known fix patterns found in file.${C.reset}`);
    console.log(`${C.dim}Add --dry-run to see what would change.${C.reset}`);
    return;
  }

  if (dryRun) {
    console.log('');
    console.log(`${C.bold}--- DRY RUN ---${C.reset}`);
    console.log(`${C.dim}Would change ${filePath}${C.reset}`);
    return;
  }

  // Backup
  const backupPath = filePath + '.bak.' + Date.now();
  fs.writeFileSync(backupPath, content);
  console.log(`${C.dim}Backup saved to ${backupPath}${C.reset}`);

  // Apply fix
  fs.writeFileSync(filePath, newContent);
  console.log(`${C.green}✓ Fixed applied to ${filePath}${C.reset}`);

  if (runTest) {
    console.log(`${C.dim}Running tests...${C.reset}`);
    try {
      const { execSync } = require('child_process');
      execSync('npm test', { stdio: 'inherit', cwd: process.cwd() });
      console.log(`${C.green}✓ Tests passed${C.reset}`);
    } catch (e) {
      console.log(`${C.red}✗ Tests failed — reverting${C.reset}`);
      fs.writeFileSync(filePath, content);
      fs.unlinkSync(backupPath);
    }
  }
  console.log('');
}

// ─── Profile Command ──────────────────────────────────────────────

function profileCommand(filePath) {
  console.log('');
  console.log(`${C.bold}${C.cyan}⚡ SIMPLICITY GATE — AGENT PROFILE${C.reset} ${C.dim}v6.1.0${C.reset}`);
  console.log(`${C.dim}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${C.reset}`);
  console.log('');

  if (!filePath) {
    console.log(`${C.bold}Usage:${C.reset} simplicity-gate profile <file|dir>`);
    console.log(`${C.dim}Analyzes code for agent over-engineering patterns.${C.reset}`);
    console.log('');
    return;
  }

  let content;
  let isDir = false;
  try {
    const stat = fs.statSync(filePath);
    isDir = stat.isDirectory();
  } catch (err) {
    console.error(`${C.red}Error:${C.reset} Cannot access: ${filePath}`);
    process.exit(1);
  }

  if (isDir) {
    const exts = new Set(['.js', '.ts', '.jsx', '.tsx', '.py', '.rb', '.go', '.rs', '.php']);
    const files = [];
    function walk(d) {
      let entries;
      try { entries = fs.readdirSync(d, { withFileTypes: true }); } catch { return; }
      for (const entry of entries) {
        const full = path.join(d, entry.name);
        if (entry.isDirectory()) {
          if (entry.name === 'node_modules' || entry.name === '.git' || entry.name === 'dist' || entry.name === 'build') continue;
          walk(full);
        } else if (entry.isFile() && exts.has(path.extname(entry.name).toLowerCase())) {
          files.push(full);
        }
      }
    }
    walk(filePath);

    const violations = {};
    for (const f of files) {
      let c;
      try { c = fs.readFileSync(f, 'utf8'); } catch { continue; }
      for (const ap of ANTI_PATTERNS) {
        if (ap.pattern.test(c)) {
          const tool = ap.pattern.toString().match(/['"]([^'"]+)['"]/)?.[1] || 'unknown';
          violations[tool] = (violations[tool] || 0) + 1;
        }
      }
    }

    if (Object.keys(violations).length === 0) {
      console.log(`${C.green}No over-engineering patterns detected in ${files.length} files.${C.reset}`);
      return;
    }

    console.log(`${C.bold}Directory:${C.reset} ${filePath}`);
    console.log(`${C.bold}Files analyzed:${C.reset} ${files.length}`);
    console.log('');
    console.log(`${C.bold}Top violations:${C.reset}`);
    for (const [tool, count] of Object.entries(violations).sort((a,b) => b[1]-a[1])) {
      const tier = TOOL_TIERS[tool.toLowerCase()] || '?';
      console.log(`  ${C.cyan}${tool}${C.reset} (Tier ${tier}): ${count} occurrences`);
    }
    console.log('');
  } else {
    try {
      content = fs.readFileSync(filePath, 'utf8');
    } catch (err) {
      console.error(`${C.red}Error:${C.reset} Cannot read file: ${filePath}`);
      process.exit(1);
    }

    const found = [];
    for (const ap of ANTI_PATTERNS) {
      if (ap.pattern.test(content)) {
        const tool = ap.pattern.toString().match(/['"]([^'"]+)['"]/)?.[1] || 'unknown';
        found.push({ tool, tier: ap.tier, alt: ap.alt, altTier: ap.altTier });
      }
    }

    if (found.length === 0) {
      console.log(`${C.green}No over-engineering patterns detected.${C.reset}`);
      return;
    }

    console.log(`${C.bold}File:${C.reset} ${filePath}`);
    console.log('');
    for (const v of found) {
      const gap = v.tier - v.altTier;
      const sev = severityLabel(gap);
      console.log(`  ${sev.color}${C.bold}[${sev.label}]${C.reset} ${C.cyan}${v.tool}${C.reset} (Tier ${v.tier}) → ${C.green}Tier ${v.altTier}${C.reset}`);
      console.log(`    ${C.dim}${v.alt}${C.reset}`);
    }
    console.log('');
  }
}

// ─── Help Command ───────────────────────────────────────────────

function showHelp() {
  console.log('');
  console.log(`${C.bold}${C.cyan}⚡ Simplicity Gate CLI${C.reset} ${C.dim}v6.1.0${C.reset}`);
  console.log(`${C.dim}The Rule of Least Power enforcer for AI coding agents.${C.reset}`);
  console.log('');
  console.log(`${C.bold}Usage:${C.reset}`);
  console.log(`  ${C.green}simplicity-gate eval <file>${C.reset}     Evaluate a file's proposal`);
  console.log(`  ${C.green}simplicity-gate scan [dir]${C.reset}      Scan directory for over-engineering`);
  console.log(`  ${C.green}simplicity-gate tiers${C.reset}           Show the tier hierarchy`);
  console.log(`  ${C.green}simplicity-gate bench${C.reset}           Self-benchmark`);
  console.log(`  ${C.green}simplicity-gate why-not <term>${C.reset}    Look up why-not database entry`);
  console.log(`  ${C.green}simplicity-gate fix <file>${C.reset}        Auto-fix over-engineering in file`);
  console.log(`  ${C.green}simplicity-gate profile <file|dir>${C.reset}  Analyze agent over-engineering patterns`);
  console.log(`  ${C.green}simplicity-gate help${C.reset}            Show this help`);
  console.log('');
  console.log(`${C.bold}Examples:${C.reset}`);
  console.log(`  ${C.dim}simplicity-gate eval examples/reformat-json.md${C.reset}`);
  console.log(`  ${C.dim}simplicity-gate scan ./src${C.reset}`);
  console.log(`  ${C.dim}simplicity-gate why-not express${C.reset}`);
  console.log(`  ${C.dim}simplicity-gate fix app.js --dry-run${C.reset}`);
  console.log(`  ${C.dim}simplicity-gate profile ./src${C.reset}`);
  console.log(`  ${C.dim}cat proposal.md | simplicity-gate eval -${C.reset}`);
  console.log('');
  console.log(`${C.bold}Links:${C.reset}`);
  console.log(`  ${C.dim}https://github.com/cMD808/simplicity-gate${C.reset}`);
  console.log('');
}

// ─── Main ───────────────────────────────────────────────────────

const args = process.argv.slice(2);
const cmd = (args[0] || 'help').toLowerCase();

switch (cmd) {
  case 'eval':
    if (!args[1]) {
      console.error(`${C.red}Error:${C.reset} No file specified. Usage: simplicity-gate eval <file>`);
      process.exit(1);
    }
    evalFile(args[1]);
    break;

  case 'scan':
    scanDir(args[1] || process.cwd());
    break;

  case 'tiers':
    showTiers();
    break;

  case 'bench':
    bench();
    break;

  case 'why-not':
    whyNot(args[1], { tier: args[2], year: args[3] });
    break;

  case 'fix':
    fixCommand(args[1]);
    break;

  case 'profile':
    profileCommand(args[1]);
    break;

  case 'help':
  case '--help':
  case '-h':
    showHelp();
    break;

  default:
    console.error(`${C.red}Unknown command:${C.reset} ${cmd}`);
    showHelp();
    process.exit(1);
}
