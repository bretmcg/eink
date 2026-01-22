# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

E-ink is a static web application for rendering and styling markdown documents optimized for e-ink displays. No build tools, package managers, or backend—pure HTML/CSS/JavaScript.

**Main app**: `www/paper/index.html` - Theme picker + fullscreen markdown reader

## Development

No build or install steps. Open HTML files directly in browser or serve with any static server:
```bash
python3 -m http.server 8000 --directory www
```

## Architecture

### CSS Theme System (www/paper/themes/)

Layered CSS architecture using `@scope (article)` for style isolation:

```
_base.css      → CSS variables only (the "contract")
_styles.css    → Base element styles using those variables
_eink.css      → E-ink device optimizations (via media query)
[theme].css    → Theme overrides (variables + custom styles)
```

**Key pattern**: Themes override `:root` variables, then add `@scope (article)` rules:
```css
:root {
  --font-body: Georgia, serif;
  --max-width: 750px;
}

@scope (article) {
  :scope { text-align: justify; }
  h1 { font-style: italic; }
}
```

### HTML Structure

```html
<div id="reader">
  <article>  <!-- @scope styles apply here -->
    <!-- Rendered markdown content -->
  </article>
</div>
```

The `<article>` element isolates theme styles from the picker UI.

### Adding Content

**Documents**: Add markdown files to `www/paper/markdown-files/`, then add to `DOCUMENTS` array in `index.html`

**Themes**: Create CSS file in `www/paper/themes/`, then add to `THEMES` array in `index.html`

## E-Ink Constraints

- Use pure black/white (`--ink`/`--paper` variables)
- No gradients, transparency, or anti-aliased shadows
- No animations (slow refresh)
- Use halftone dot patterns instead of gray values
- Solid borders only (hairlines may not render)
- `_eink.css` auto-applies via `@media (monochrome), (update: slow)`

## Other Entry Points

- `www/index.html` - Hub linking to all experiments
- `www/read1/` - Alternative "Zen Reader" implementation
- `www/labs/` - E-ink hardware tests (animation, latency, drawing, etc.)
