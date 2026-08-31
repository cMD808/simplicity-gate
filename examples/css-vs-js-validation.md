<h1 align="center">✅ CSS vs JavaScript for Form Validation</h1>

<p align="center">
  <em>JavaScript validation vs HTML5 + CSS — 30+ lines reduced to 15 lines</em>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/verdict-REJECT-red" alt="Verdict: REJECT">
  <img src="https://img.shields.io/badge/tier_gap-6→1-blue" alt="Tier Gap: 6→1">
  <img src="https://img.shields.io/badge/lines_saved-35+-brightgreen" alt="Lines Saved: 35+">
</p>

<br>

---

## 📋 The Task

Validate a registration form: email format, password minimum 8 characters, and required fields.

<br>

---

## ❌ Without Simplicity Gate

The agent writes a JavaScript validation function with regex patterns and DOM manipulation.

```javascript
function validateForm() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const name = document.getElementById('name').value;
  const errors = [];

  if (!name.trim()) errors.push('Name is required');
  if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
    errors.push('Invalid email format');
  if (password.length < 8)
    errors.push('Password must be at least 8 characters');
  if (!password.match(/[A-Z]/))
    errors.push('Password must contain an uppercase letter');
  if (!password.match(/[0-9]/))
    errors.push('Password must contain a number');

  if (errors.length > 0) {
    alert(errors.join('\n'));
    return false;
  }
  return true;
}
```

<table>
  <tr>
    <th>Metric</th>
    <th>Value</th>
  </tr>
  <tr>
    <td>Lines of code</td>
    <td>30+</td>
  </tr>
  <tr>
    <td>Dependencies</td>
    <td>None (but adds JS runtime)</td>
  </tr>
  <tr>
    <td>Runtime required</td>
    <td>Browser JS engine (already present)</td>
  </tr>
  <tr>
    <td>Validation timing</td>
    <td>After submission (late)</td>
  </tr>
  <tr>
    <td>Accessible by default</td>
    <td>No (custom error messages)</td>
  </tr>
</table>

<br>

---

## ✅ With Simplicity Gate

HTML5 has built-in validation attributes. CSS handles the visual feedback. No JavaScript needed.

```html
<form>
  <input type="text" name="name" required minlength="1">

  <input type="email" name="email" required>

  <input type="password" name="password" required
         minlength="8"
         pattern="(?=.*[A-Z])(?=.*[0-9]).*"
         title="Must contain an uppercase letter and a number">

  <button type="submit">Register</button>
</form>

<style>
  input:invalid:not(:placeholder-shown) {
    border-color: red;
  }
  input:valid:not(:placeholder-shown) {
    border-color: green;
  }
</style>
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
    <td>None</td>
  </tr>
  <tr>
    <td>Runtime required</td>
    <td>Browser (already present)</td>
  </tr>
  <tr>
    <td>Validation timing</td>
    <td>Real-time (instant feedback)</td>
  </tr>
  <tr>
    <td>Accessible by default</td>
    <td>Yes (browser-native error messages)</td>
  </tr>
</table>

<br>

---

## 💡 Why This Works

HTML5 form validation is a Tier 1 platform feature — the browser handles it natively. JavaScript validation is Tier 6 — reimplementing what the browser already does. The HTML5 version is also more accessible: screen readers announce native error messages, and the browser handles localization.

<br>

---

## ⚖️ Verdict

```
SIMPLICITY GATE — REJECT
Proposed:    JavaScript validation function (Tier 6)
Use instead: HTML5 required/minlength/pattern + CSS :invalid (Tier 1+2)
Why:         Browser-native validation is real-time, accessible, and requires no code.
Command:     Add validation attributes to your HTML form elements.
```
