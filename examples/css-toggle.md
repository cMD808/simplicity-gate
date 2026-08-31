# Example: UI Toggle System — React vs CSS

## Scenario

An agent proposes building a React component with Zustand for state management
to handle UI toggle states (active/inactive, expanded/collapsed, dark/light).

## Proposal

```yaml
proposal:
  description: "Build a toggle system for UI component states"
  proposed_tier: 6
  proposed_tool: "React + useReducer + Zustand"
  language: "TypeScript/JSX"
  dependencies: ["react", "zustand", "react-dom"]
  functional_requirements:
    - "Toggle between active/inactive states"
    - "Expand/collapse content sections"
    - "Switch between dark/light themes"
    - "Persist state across page reloads"
```

## Proposed Solution (Tier 6 — REJECTED)

```tsx
// ToggleSystem.tsx — 120+ lines, requires React runtime
import React, { useReducer } from 'react';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ToggleState {
  isActive: boolean;
  isExpanded: boolean;
  theme: 'light' | 'dark';
}

type ToggleAction = 
  | { type: 'TOGGLE_ACTIVE' }
  | { type: 'TOGGLE_EXPAND' }
  | { type: 'SET_THEME'; payload: 'light' | 'dark' };

const useStore = create<ToggleState & { dispatch: (action: ToggleAction) => void }>()(
  persist(
    (set) => ({
      isActive: false,
      isExpanded: false,
      theme: 'light',
      dispatch: (action) => set((state) => {
        switch (action.type) {
          case 'TOGGLE_ACTIVE':
            return { isActive: !state.isActive };
          case 'TOGGLE_EXPAND':
            return { isExpanded: !state.isExpanded };
          case 'SET_THEME':
            return { theme: action.payload };
        }
      }),
    }),
    { name: 'toggle-storage' }
  )
);

export const ToggleSystem = () => {
  const { isActive, isExpanded, theme, dispatch } = useStore();
  
  return (
    <div className={theme === 'dark' ? 'dark' : 'light'}>
      <button onClick={() => dispatch({ type: 'TOGGLE_ACTIVE' })}>
        {isActive ? 'Active' : 'Inactive'}
      </button>
      <button onClick={() => dispatch({ type: 'TOGGLE_EXPAND' })}>
        {isExpanded ? 'Collapse' : 'Expand'}
      </button>
      <button onClick={() => dispatch({ 
        type: 'SET_THEME', 
        payload: theme === 'light' ? 'dark' : 'light' 
      })}>
        Toggle Theme
      </button>
      {isExpanded && <div className="content">Expanded content here</div>}
    </div>
  );
};
```

**Problems:**
- Requires React runtime (40+ KB gzipped)
- Requires Zustand + middleware
- 120+ lines of TypeScript/JSX
- React re-renders on every state change
- Bundle size impact on page load

## Recommended Solution (Tier 1+2 — PASS)

```html
<!-- index.html — Zero dependencies, zero runtime -->
<html data-theme="light">
<body>
  <div class="panel">
    <input type="checkbox" class="toggle" id="expand-toggle">
    <label for="expand-toggle">Toggle Content</label>
    <div class="content">Expanded content here</div>
  </div>
  
  <button id="theme-toggle">Toggle Theme</button>
  
  <script>
    // 10 lines — persisted via built-in sessionStorage
    const toggle = document.getElementById('theme-toggle');
    const html = document.documentElement;
    
    // Restore persisted theme
    html.dataset.theme = sessionStorage.getItem('theme') || 'light';
    
    toggle.addEventListener('click', () => {
      html.dataset.theme = html.dataset.theme === 'light' ? 'dark' : 'light';
      sessionStorage.setItem('theme', html.dataset.theme);
    });
  </script>
</body>
</html>
```

```css
/* styles.css — Pure CSS state management */
.panel:has(.toggle:checked) .content {
  display: block;
}

.panel:has(.toggle:not(:checked)) .content {
  display: none;
}

html[data-theme="light"] {
  background: #ffffff;
  color: #000000;
}

html[data-theme="dark"] {
  background: #1a1a1a;
  color: #ffffff;
}
```

**Benefits:**
- Zero React, zero dependencies
- 3 lines of CSS for toggle logic
- 10 lines of JS for theme persistence
- No re-renders — pure CSS state changes
- Browser-native `sessionStorage` for persistence
- Works without JavaScript for basic toggles

## Verdict

```
⚠️  SIMPLICITY GATE — DOWNGRADE RECOMMENDED
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

PROPOSED:
  Tool:       React + useReducer + Zustand
  Tier:       6 — Dynamic Language / Runtime
  Runtime:    React runtime, Zustand store
  Dependencies: react, zustand, react-dom

RECOMMENDED:
  Tool:       CSS :has() + data-* attributes + sessionStorage
  Tier:       1+2 — Static Asset / Declarative Data
  Runtime:    Browser (already present)
  Dependencies: None

WHY:
  CSS :has() and :checked selectors can manage toggle state without
  JavaScript. data-* attributes in HTML provide the declarative state.
  sessionStorage (built-in) persists state across reloads. No React,
  no state management library, no component re-renders.

WHAT TO DO:
  1. Use hidden checkboxes + labels for toggle triggers
  2. Use CSS :has() to style parent based on child state
  3. Use data-theme attribute on <html> for dark/light
  4. Use sessionStorage.setItem() in a <script> tag (10 lines)

FUNCTIONAL REQUIREMENTS MET:
  ☑ Toggle between active/inactive states
  ☑ Expand/collapse content sections
  ☑ Switch between dark/light themes
  ☑ Persist state across page reloads
```

## When React IS Justified

React becomes the correct choice when:
- The UI has **complex conditional rendering** (10+ branches)
- Components need **server-side rendering** with hydration
- State requires **cross-component synchronization** via context
- The component is part of a **larger React application**
- **Accessibility** requires complex ARIA state management

For simple toggle states, always prefer CSS selectors and HTML attributes.
