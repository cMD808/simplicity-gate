<p align="center">
  <img src="assets/Gemini_Generated_Image_4d84p04d84p04d84-removebg-preview.png" alt="Simplicity Gate" width="200">
</p>

<h1 align="center">🔒 Security Policy</h1>

<p align="center">
  <em>Simplicity Gate is a markdown-based instruction set for AI agents.</em><br>
  <em>It does not execute code, access networks, or handle user data.</em><br>
  <em>The security surface is minimal.</em>
</p>

<br>

---

## 📋 Scope

<table>
  <tr>
    <th>Contains</th>
    <th>Does NOT Contain</th>
  </tr>
  <tr>
    <td>✅ Markdown files (SKILL.md, README.md, examples)</td>
    <td>❌ Executable code — no scripts, no binaries, no runtime</td>
  </tr>
  <tr>
    <td>✅ Agent instructions</td>
    <td>❌ Dependencies — no npm, pip, or package managers</td>
  </tr>
  <tr>
    <td>✅ Configuration templates</td>
    <td>❌ Network access — no API calls, no telemetry</td>
  </tr>
</table>

<br>

---

## ⚡ What Simplicity Gate Does

It tells AI agents to prefer simpler tools. When an agent reads the skill, it evaluates proposals against the tier hierarchy. The agent itself handles execution.

<br>

## 🚫 What Simplicity Gate Does NOT Do

<table>
  <tr>
    <th>Action</th>
    <th>Status</th>
  </tr>
  <tr>
    <td>Execute code on your machine</td>
    <td>🚫 Never</td>
  </tr>
  <tr>
    <td>Send data to external servers</td>
    <td>🚫 Never</td>
  </tr>
  <tr>
    <td>Modify files without your explicit instruction</td>
    <td>🚫 Never</td>
  </tr>
  <tr>
    <td>Access credentials, tokens, or secrets</td>
    <td>🚫 Never</td>
  </tr>
  <tr>
    <td>Install packages or runtimes</td>
    <td>🚫 Never</td>
  </tr>
</table>

<br>

---

## 🔗 Supply Chain

> **This project has zero dependencies.** There is no `package.json`, `requirements.txt`, or equivalent. The only external artifact is the MIT license file.

<br>

---

## 🛡️ Threat Model

<table>
  <tr>
    <th>Threat</th>
    <th>Risk</th>
    <th>Mitigation</th>
  </tr>
  <tr>
    <td>Malicious markdown injection</td>
    <td>🟢 Low</td>
    <td>Agents read markdown as instructions, not code. Standard markdown cannot execute.</td>
  </tr>
  <tr>
    <td>Social engineering via examples</td>
    <td>🟢 Low</td>
    <td>Examples show rejected (bad) patterns alongside recommended (good) patterns.</td>
  </tr>
  <tr>
    <td>Agent misuse of tier advice</td>
    <td>🟢 Low</td>
    <td>The gate restricts what agents do — it never enables new capabilities.</td>
  </tr>
  <tr>
    <td>Typo-squatting on repo name</td>
    <td>🟢 Low</td>
    <td>Users must explicitly copy SKILL.md into their agent config.</td>
  </tr>
</table>

<br>

---

## 📨 Reporting a Vulnerability

If you find a security issue:

<br>

> ⚠️ **Do NOT open a public issue.**

<br>

1. Create an issue with `[SECURITY]` prefix: [New Issue](https://github.com/cMD808/simplicity-gate/issues/new?labels=security&title=%5BSECURITY%5D)
2. Include:
   - Description of the issue
   - Steps to reproduce
   - Potential impact
   - Suggested fix (if any)

**Response time:** Within 7 days.

<br>

---

## 🤖 Agent Security Note

When using Simplicity Gate with an agent:

<table>
  <tr>
    <th>Consideration</th>
    <th>Details</th>
  </tr>
  <tr>
    <td>Filesystem access</td>
    <td>The agent still has access to your filesystem and tools</td>
  </tr>
  <tr>
    <td>Scope of gate</td>
    <td>Simplicity Gate only constrains <em>which</em> tools the agent reaches for</td>
  </tr>
  <tr>
    <td>Permission system</td>
    <td>It does not replace your agent's existing permission system</td>
  </tr>
  <tr>
    <td>Full coverage</td>
    <td>Review the agent's own security documentation for full threat coverage</td>
  </tr>
</table>

<br>

---

<p align="center">
  <em>✨ <strong>Simplicity is the ultimate sophistication.</strong> ✨</em><br>
  <sub>— Leonardo da Vinci</sub>
</p>

<br>

<p align="center">
  <a href="README.md">← Back to README</a> · <a href="CONTRIBUTING.md">Contributing</a> · <a href="CHANGELOG.md">Changelog</a> · <a href="LICENSE">License (MIT)</a>
</p>
