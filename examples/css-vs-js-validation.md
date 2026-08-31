# CSS vs JavaScript for Form Validation

> **Verdict: REJECT** — HTML5 + CSS (Tier 1+2) replaces JavaScript validation (Tier 6).

## The Task

Validate a registration form: email format, password minimum 8 characters, and required fields.

## Without Simplicity Gate

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

| Metric | Value |
|:-------|:------|
| Lines of code | 30+ |
| Dependencies | None (but adds JS runtime) |
| Runtime required | Browser JS engine (already present) |
| Validation timing | After submission (late) |
| Accessible by default | No (custom error messages) |

## With Simplicity Gate

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

| Metric | Value |
|:-------|:------|
| Lines of code | 15 |
| Dependencies | None |
| Runtime required | Browser (already present) |
| Validation timing | Real-time (instant feedback) |
| Accessible by default | Yes (browser-native error messages) |

## Why This Works

HTML5 form validation is a Tier 1 platform feature — the browser handles it natively. JavaScript validation is Tier 6 — reimplementing what the browser already does. The HTML5 version is also more accessible: screen readers announce native error messages, and the browser handles localization.

## Verdict

```
SIMPLICITY GATE — REJECT
Proposed:    JavaScript validation function (Tier 6)
Use instead: HTML5 required/minlength/pattern + CSS :invalid (Tier 1+2)
Why:         Browser-native validation is real-time, accessible, and requires no code.
Command:     Add validation attributes to your HTML form elements.
```
