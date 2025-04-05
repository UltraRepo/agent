# 📐 UltraRepo Agent UI Design Approach

This document outlines a unified **design-driven UI architecture** for the [UltraRepo/agent](https://github.com/UltraRepo/agent) project using **Syncfusion's officially supported design system**, including **Figma integration, design tokens, theme switching**, and scalable, reusable component templates for **vanilla JavaScript**.

---

## 🔗 Reference: Appearance Guide
For low-level appearance implementation and theming, see [`appearance.md`](./appearance.md).

That document includes:
- Theme loading and switching (Material 3, BS5, Tailwind)
- CSS variable overrides
- Responsive layout breakpoints
- Dark mode configuration

This document extends it with a **UI design system philosophy** and structure.

---

## 🎨 Modern Design-Driven Development Goals

| Goal | Description |
|------|-------------|
| **Theme-compatibility** | Full support for Syncfusion's Material, Bootstrap, Tailwind, Fluent 2 themes |
| **Figma → CSS support** | Leverage Figma token export → CSS variables in runtime builds |
| **Token-first styling** | Use design tokens for colors, spacing, fonts, shadows, and elevation |
| **Scoped templates** | UI templates scoped to component folders for maintainability |
| **Dark/light modes** | Token-based switching compatible with theme layers |
| **Vanilla JS compatible** | No frameworks required; 100% vanilla JavaScript compliant |

---

## 📁 Project Structure for UI Components and Tokens

```bash
src/
├── index.js
├── style.css
├── ui/
│   ├── components/
│   │   └── syncfusion/
│   │       ├── ChatTemplate.html     # ✅ Optional: override input/button layout
│   │       └── styles/chat.css       # Scoped styles for Chat UI
│   ├── themes/
│   │   ├── material3.css             # ✅ From CDN or Figma build
│   │   └── figma-tokens.css          # ✅ Future token output
│   ├── tokens/
│   │   └── figma-export.json         # ✅ Design token raw export
│   └── design.md
```

---

## 🧩 Design Tokens Workflow (Figma → CSS)

1. ✅ Design system built in **Figma** (using Syncfusion component libraries)
2. ✅ Export tokens using **Figma Tokens Plugin** or Syncfusion's design tools
3. ✅ Save exported tokens in `tokens/figma-export.json`
4. ✅ Use Syncfusion converter tool:

```bash
npx @syncfusion/figma-theme-token-generator \
  --input ./tokens/figma-export.json \
  --output ./themes/figma-tokens.css
```

5. ✅ Link `figma-tokens.css` in your app:
```html
<link rel="stylesheet" href="./themes/figma-tokens.css" />
```

---

## 🧠 Best Practices

| Area | Recommendation |
|------|----------------|
| **Templates** | Store in `/components/syncfusion/*.html` or inject via JS strings |
| **Styles** | Modularize into `/components/.../styles/*.css` and `themes/` layer files |
| **CSS variables** | Use `--token-name` structure for global overrides |
| **Dark mode** | Use media query or `.dark` wrapper + variable set |
| **Mobile design** | Test min-width = `190px`; avoid hardcoded px values |
| **Button/label overrides** | Prefer template injection over DOM patching |

---

## 🚀 Next Steps for Contributors

- [ ] Migrate inline styles to CSS variable-based tokens
- [ ] Extract reusable templates (e.g., chat layout, buttons)
- [ ] Convert dark/light mode to token-driven theming
- [ ] Add UI theme toggle with persistence (e.g., localStorage)
- [ ] Add starter `figma-export.json` with token presets

---

## 📚 Resources

- [Syncfusion Theming Docs](https://helpej2.syncfusion.com/documentation/appearance/theme)
- [Syncfusion Figma Integration](https://helpej2.syncfusion.com/documentation/appearance/figma)
- [Appearance Guide → appearance.md](./appearance.md)

---

**Maintained by the UltraRepo Agent team**  
PRs welcome for new token layers, themes, or template improvements.
