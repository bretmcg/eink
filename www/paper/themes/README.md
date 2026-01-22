# E-Ink Theme System

This directory contains the theme system for the e-ink markdown viewer.

## Architecture

The theme system uses a layered approach:

1. **`_base.css`** - Defines CSS custom properties (the "contract")
2. **`_styles.css`** - Uses those properties to style elements
3. **`[theme].css`** - Overrides properties and adds decorations

## Variable Reference

### Core Colors

| Variable | Default | Description |
|----------|---------|-------------|
| `--ink` | `#000000` | Primary text/border color |
| `--paper` | `#ffffff` | Background color |

### Typography

| Variable | Default | Description |
|----------|---------|-------------|
| `--font-body` | `Georgia, 'Times New Roman', serif` | Body text font |
| `--font-heading` | `system-ui, -apple-system, sans-serif` | Heading font |
| `--font-mono` | `'Courier New', Courier, monospace` | Code font |
| `--font-size-base` | `18px` | Base font size |
| `--font-size-h1` | `2.5em` | H1 size |
| `--font-size-h2` | `1.8em` | H2 size |
| `--font-size-h3` | `1.4em` | H3 size |
| `--font-size-code` | `0.9em` | Code size |
| `--line-height` | `1.6` | Body line height |
| `--line-height-heading` | `1.2` | Heading line height |

### Spacing

| Variable | Default | Description |
|----------|---------|-------------|
| `--spacing-xs` | `0.25rem` | Extra small spacing |
| `--spacing-sm` | `0.5rem` | Small spacing |
| `--spacing-md` | `1rem` | Medium spacing |
| `--spacing-lg` | `2rem` | Large spacing |
| `--spacing-xl` | `3rem` | Extra large spacing |
| `--max-width` | `700px` | Content max width |
| `--content-padding` | `var(--spacing-lg)` | Body padding |

### Borders

| Variable | Default | Description |
|----------|---------|-------------|
| `--border-thin` | `1px` | Thin border |
| `--border-medium` | `2px` | Medium border |
| `--border-thick` | `4px` | Thick border |
| `--border-heavy` | `6px` | Heavy border |

### Element-Specific

| Variable | Default | Description |
|----------|---------|-------------|
| `--blockquote-border` | `var(--border-thick)` | Blockquote left border |
| `--blockquote-padding` | `var(--spacing-md)` | Blockquote left padding |
| `--code-bg` | `var(--ink)` | Inline code background |
| `--code-fg` | `var(--paper)` | Inline code text color |
| `--code-padding` | `var(--spacing-xs) var(--spacing-sm)` | Code padding |
| `--table-border` | `var(--border-medium)` | Table border width |
| `--table-padding` | `var(--spacing-sm)` | Table cell padding |
| `--hr-style` | `var(--border-medium) solid var(--ink)` | Horizontal rule style |

## Creating a Theme

### Minimum Viable Theme

A theme only needs to override the variables it wants to change:

```css
/* mytheme.css - Minimal example */

:root {
  --font-body: Helvetica, sans-serif;
  --font-size-base: 20px;
  --max-width: 800px;
}
```

### Theme with Decorations

For more complex themes, override variables first, then add custom styles:

```css
/* mytheme.css - With decorations */

/* Variable overrides */
:root {
  --font-heading: 'Playfair Display', serif;
  --font-size-h1: 3rem;
  --border-thick: 5px;
}

/* Theme-specific decorations */
h1 {
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

h2::before,
h2::after {
  content: '—';
  margin: 0 0.5em;
}

p:first-of-type::first-letter {
  font-size: 4em;
  float: left;
  line-height: 0.8;
}
```

## E-Ink Design Constraints

When creating themes for e-ink displays, follow these guidelines:

### Do
- Use pure black (`#000000`) and white (`#ffffff`)
- Use solid borders (no gradients or shadows that rely on gray)
- Use high-contrast text
- Use `filter: grayscale(100%) contrast(1.1)` on images
- Test on actual e-ink hardware if possible

### Avoid
- Gradients (they render as banding on e-ink)
- Transparency/opacity (unpredictable results)
- Anti-aliased shadows (appear as gray smudges)
- Animations (e-ink has slow refresh rates)
- Fine hairlines (may not render)

### Halftone Patterns

For textures that work on e-ink, use dot patterns instead of gray:

```css
/* E-ink friendly "gray" using dots */
.textured {
  background-image: radial-gradient(var(--ink) 15%, transparent 16%);
  background-size: 4px 4px;
}
```

## Testing Themes

1. Open `www/paper/index.html` in a browser
2. Select a document from the dropdown
3. Select your theme from the theme dropdown
4. Click "Open" to view in fullscreen reader
5. Use the "T" button to switch themes while reading
6. Test all markdown elements:
   - Headings (h1-h6)
   - Paragraphs and emphasis
   - Code blocks and inline code
   - Blockquotes
   - Tables
   - Lists (ordered and unordered)
   - Horizontal rules
   - Images
   - Links

## Adding a Theme to the Picker

Edit `index.html` and add your theme to the `THEMES` array:

```javascript
const THEMES = [
    { file: 'themes/broadsheet.css', name: 'Broadsheet' },
    // ... other themes
    { file: 'themes/mytheme.css', name: 'My Theme' },
];
```
