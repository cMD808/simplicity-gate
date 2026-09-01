#!/usr/bin/env node

'use strict';

const { C } = require('../lib/colors');
const { evalFile } = require('../lib/commands/eval');
const { scanDir } = require('../lib/commands/scan');
const { showTiers } = require('../lib/commands/tiers');
const { bench } = require('../lib/commands/bench');
const { whyNot } = require('../lib/why-not');
const { fixCommand } = require('../lib/fix');
const { profileCommand } = require('../lib/commands/profile');
const { showHelp } = require('../lib/commands/help');

// ─── Error Handler ─────────────────────────────────────────────

process.on('uncaughtException', (err) => {
  console.error(`${C.red}Fatal error:${C.reset} ${err.message}`);
  if (process.env.DEBUG) console.error(err.stack);
  process.exit(1);
});

process.on('unhandledRejection', (err) => {
  console.error(`${C.red}Unhandled rejection:${C.reset} ${err.message || err}`);
  if (process.env.DEBUG) console.error(err.stack);
  process.exit(1);
});

// ─── Input Validation ──────────────────────────────────────────

const args = process.argv.slice(2);
const cmd = (args[0] || 'help').toLowerCase();

// ─── Version flag ──────────────────────────────────────────────
if (cmd === '--version' || cmd === '-v') {
  console.log('6.1.0');
  process.exit(0);
}

// ─── Command Dispatch ──────────────────────────────────────────

try {
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
      fixCommand(args[1], {
        dryRun: args.includes('--dry-run'),
        test: args.includes('--test'),
      });
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
} catch (err) {
  console.error(`${C.red}Error:${C.reset} ${err.message}`);
  if (process.env.DEBUG) console.error(err.stack);
  process.exit(1);
}
