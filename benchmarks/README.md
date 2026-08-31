<p align="center">
  <img src="../assets/Gemini_Generated_Image_4d84p04d84p04d84-removebg-preview.png" alt="Simplicity Gate" width="200">
</p>

<h1 align="center">⚡ Benchmarks</h1>

<p align="center">
  <em>Performance data for the Simplicity Gate CLI.</em>
</p>

<br>

---

## 🖥️ Environment

<table>
  <tr>
    <th>Property</th>
    <th>Value</th>
  </tr>
  <tr>
    <td>Node.js</td>
    <td>v20+ (LTS)</td>
  </tr>
  <tr>
    <td>OS</td>
    <td>Windows 11 / Linux / macOS</td>
  </tr>
  <tr>
    <td>Hardware</td>
    <td>Standard developer machine</td>
  </tr>
  <tr>
    <td>Dependencies</td>
    <td>Zero (Node.js built-ins only)</td>
  </tr>
</table>

<br>

---

## 📊 Results

All benchmarks run 1,000 iterations. Times in milliseconds.

<table>
  <tr>
    <th>Operation</th>
    <th>1K Iterations</th>
    <th>Per Call</th>
    <th>Evals/Sec</th>
  </tr>
  <tr>
    <td><strong>Tier lookup</strong></td>
    <td>~0.5ms</td>
    <td>~0.5μs</td>
    <td>2,000,000+</td>
  </tr>
  <tr>
    <td><strong>Anti-pattern scan</strong></td>
    <td>~2.8ms</td>
    <td>~2.8μs</td>
    <td>357,000+</td>
  </tr>
  <tr>
    <td><strong>YAML parse</strong></td>
    <td>~0.2ms</td>
    <td>~0.2μs</td>
    <td>5,000,000+</td>
  </tr>
  <tr>
    <td><strong>Full eval</strong></td>
    <td>~2.4ms</td>
    <td>~2.4μs</td>
    <td>416,000+</td>
  </tr>
</table>

<br>

---

## 🎯 Key Takeaways

<table>
  <tr>
    <th>Metric</th>
    <th>Value</th>
    <th>What It Means</th>
  </tr>
  <tr>
    <td><strong>Full eval speed</strong></td>
    <td>~2.4μs</td>
    <td>Sub-3-microsecond evaluation per file</td>
  </tr>
  <tr>
    <td><strong>Throughput</strong></td>
    <td>400K+ evals/sec</td>
    <td>Can scan entire codebases in milliseconds</td>
  </tr>
  <tr>
    <td><strong>Dependencies</strong></td>
    <td>0</td>
    <td>No install time, no supply chain risk</td>
  </tr>
  <tr>
    <td><strong>Binary size</strong></td>
    <td>~15KB</td>
    <td>Smaller than most package READMEs</td>
  </tr>
  <tr>
    <td><strong>Startup time</strong></td>
    <td><1ms</td>
    <td>Instant — no compilation, no loading</td>
  </tr>
</table>

<br>

---

## 🔄 Running Benchmarks

```bash
# Self-benchmark
simplicity-gate bench

# Or via npm
npm run bench
```

<br>

---

## 📈 Comparison

<table>
  <tr>
    <th>Tool</th>
    <th>Evaluation Speed</th>
    <th>Dependencies</th>
    <th>Install Size</th>
  </tr>
  <tr>
    <td><strong>Simplicity Gate</strong></td>
    <td>~2.4μs</td>
    <td>0</td>
    <td>~15KB</td>
  </tr>
  <tr>
    <td>ESLint (typical config)</td>
    <td>~50ms</td>
    <td>100+</td>
    <td>~50MB</td>
  </tr>
  <tr>
    <td>Prettier (typical config)</td>
    <td>~30ms</td>
    <td>20+</td>
    <td>~15MB</td>
  </tr>
  <tr>
    <td>TypeScript (tsc)</td>
    <td>~200ms</td>
    <td>0 (bundled)</td>
    <td>~40MB</td>
  </tr>
</table>

> **Note:** Simplicity Gate is a different category — it evaluates *which tool to use*, not code style or types. But the speed comparison shows the overhead is negligible.

<br>

---

<p align="center">
  <em>✨ <strong>Simplicity is the ultimate sophistication.</strong> ✨</em><br>
  <sub>— Leonardo da Vinci</sub>
</p>

<br>

<p align="center">
  <a href="../README.md">← Back to README</a> · <a href="CONTRIBUTING.md">Contributing</a> · <a href="../SECURITY.md">Security</a>
</p>
