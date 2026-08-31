herhttps://github.com/cMD808/simplicity-gateopelis teher#!/usr/bin/env node

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
 * @version 5.0.0
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

  // Tier 5 — High-level scripting
  'python': 5, 'ruby': 5, 'perl': 5, 'php': 5, 'node.js': 5, 'nodejs': 5,
  'deno': 5, 'bun': 5, 'lua': 5, 'r': 5, 'matlab': 5,

  // Tier 6 — Application frameworks
  'express': 6, 'express.js': 6, 'fastify': 6, 'koa': 6, 'hapi': 6,
  'django': 6, 'flask': 6, 'fastapi': 6, 'rails': 6, 'sinatra': 6,
  'spring': 6, 'laravel': 6, 'symfony': 6, 'react': 6, 'vue': 6,
  'angular': 6, 'svelte': 6, 'next.js': 6, 'nextjs': 6, 'nuxt': 6,
  'gatsby': 6, 'remix': 6, 'astro': 6, 'zustand': 6, 'redux': 6,
  'mobx': 6, 'recoil': 6, 'jotai': 6, 'axios': 6, 'lodash': 6,
  'underscore': 6, 'moment.js': 6, 'day.js': 6, 'jest': 6, 'mocha': 6,
  'webpack': 6, 'vite': 6, 'esbuild': 6, 'rollup': 6, 'psutil': 6,
  'pandas': 6, 'numpy': 6, 'scipy': 6, 'matplotlib': 6, 'flask': 6,
  'bottle': 6, 'tornado': 6,

  // Tier 7 — Custom infrastructure
  'kubernetes': 7, 'k8s': 7, 'docker': 7, 'docker compose': 7,
  'terraform': 7, 'ansible': 7, 'consul': 7, 'istio': 7,
  'envoy': 7, 'nginx': 7, 'haproxy': 7, 'traefik': 7,
  'rabbitmq': 7, 'kafka': 7, 'redis': 7, 'memcached': 7,
  'elasticsearch': 7, 'prometheus': 7, 'grafana': 7,

  // Tier 8 — External services
  'zapier': 8, 'ifttt': 8, 'n8n': 8, 'make': 8, 'integromat': 8,
  'airtable': 8, 'notion api': 8, 'slack api': 8, 'twilio': 8,
  'sendgrid': 8, 'mailgun': 8, 'stripe': 8, 'auth0': 8,
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
  console.log(`${C.bold}${C.cyan}⚡ SIMPLICITY GATE${C.reset} ${C.dim}v6.0.0${C.reset}`);
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
  console.log(`${C.bold}${C.cyan}⚡ SIMPLICITY GATE — SCAN${C.reset} ${C.dim}v6.0.0${C.reset}`);
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
  console.log(`${C.bold}${C.cyan}⚡ SIMPLICITY GATE — TIER HIERARCHY${C.reset} ${C.dim}v6.0.0${C.reset}`);
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
  console.log(`${C.bold}${C.cyan}⚡ SIMPLICITY GATE — BENCHMARK${C.reset} ${C.dim}v6.0.0${C.reset}`);
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

// ─── Help Command ───────────────────────────────────────────────

function showHelp() {
  console.log('');
  console.log(`${C.bold}${C.cyan}⚡ Simplicity Gate CLI${C.reset} ${C.dim}v6.0.0${C.reset}`);
  console.log(`${C.dim}The Rule of Least Power enforcer for AI coding agents.${C.reset}`);
  console.log('');
  console.log(`${C.bold}Usage:${C.reset}`);
  console.log(`  ${C.green}simplicity-gate eval <file>${C.reset}    Evaluate a file's proposal`);
  console.log(`  ${C.green}simplicity-gate scan [dir]${C.reset}     Scan directory for over-engineering`);
  console.log(`  ${C.green}simplicity-gate tiers${C.reset}          Show the tier hierarchy`);
  console.log(`  ${C.green}simplicity-gate bench${C.reset}          Self-benchmark`);
  console.log(`  ${C.green}simplicity-gate help${C.reset}           Show this help`);
  console.log('');
  console.log(`${C.bold}Examples:${C.reset}`);
  console.log(`  ${C.dim}simplicity-gate eval examples/reformat-json.md${C.reset}`);
  console.log(`  ${C.dim}simplicity-gate scan ./src${C.reset}`);
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
