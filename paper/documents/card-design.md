# Card Design System

Documentation for creating custom card designs for the gallery tiles.

## Card Dimensions

**Aspect Ratio**: `2.5 / 4` (0.625, or 5:8)

| Element | Dimensions | Notes |
|---------|------------|-------|
| **Outer card** | 312 × 500 px | Full card boundary |
| **Inner border** | 288 × 476 px | 12px inset from edges |
| **Content area** | ~286 × 474 px | Inside the 1px inner border |

Cards are responsive (`width: 100%`) and maintain aspect ratio via CSS `aspect-ratio`.

## Card Anatomy

```
┌──────────────────────────────────┐  ← 2px border
│  ┌────────────────────────────┐  │  ← 6px outer shadow
│  │  ┌──────────────────────┐  │  │  ← 8px inner shadow
│  │  │ •                  • │  │  │  ← corner dots (2px)
│  │  │                      │  │  │
│  │  │     CONTENT AREA     │  │  │  ← inner border (12px offset)
│  │  │                      │  │  │
│  │  │ •                  • │  │  │
│  │  └──────────────────────┘  │  │
│  └────────────────────────────┘  │
└──────────────────────────────────┘
        borderRadius: 12px
```

## Design Properties

Add designs to `card-designs.json`. Each design supports:

```json
{
  "my-design": {
    "name": "Display Name",
    "description": "Short description",

    "aspectRatio": "2.5/4",
    "borderRadius": "12px",
    "borderWidth": "2px",

    "innerBorderOffset": "12px",
    "cornerDotSize": "2px",

    "outerShadowWidth": "6px",
    "innerShadowWidth": "8px",

    "borderColors": {
      "top": "#fff",
      "right": "#fff",
      "bottom": "#fff",
      "left": "#fff"
    },

    "backgroundImage": "assets/frame.png",

    "cornerPip": {
      "symbol": "♦",
      "letter": "J",
      "color": "var(--fg)"
    }
  }
}
```

### Required Properties

| Property | Example | Description |
|----------|---------|-------------|
| `aspectRatio` | `"2.5/4"` | CSS aspect-ratio value |
| `borderRadius` | `"12px"` | Corner rounding |
| `borderWidth` | `"2px"` | Outer border thickness |
| `innerBorderOffset` | `"12px"` | Distance from edge to inner border (`"0"` to disable) |
| `cornerDotSize` | `"2px"` | Size of corner dots (`"0"` to disable) |
| `outerShadowWidth` | `"6px"` | Outer shadow band (`"0"` to disable) |
| `innerShadowWidth` | `"8px"` | Inner shadow band (`"0"` to disable) |

### Optional Properties

| Property | Description |
|----------|-------------|
| `borderColors` | Object with `top`, `right`, `bottom`, `left` for individual border colors |
| `backgroundImage` | Path to overlay image (renders on top of content) |
| `cornerPip` | Playing card style corner pip with `symbol`, `letter`, `color` |

## Creating a New Design

1. Add entry to `card-designs.json`
2. If using a background image, add it to `assets/`
3. Apply via: `CardDesign.applyDesign('my-design')`

### Example: Minimal Card

```json
{
  "minimal": {
    "name": "Minimal",
    "description": "Clean simple rectangle",
    "borderRadius": "4px",
    "borderWidth": "2px",
    "innerBorderOffset": "0",
    "cornerDotSize": "0",
    "aspectRatio": "2.5/4",
    "outerShadowWidth": "0",
    "innerShadowWidth": "0"
  }
}
```

### Example: Playing Card with Frame Image

```json
{
  "rascal-of-diamonds": {
    "name": "Rascal of Diamonds",
    "description": "Playing card style with J♦ corner pips",
    "borderRadius": "12px",
    "borderWidth": "2px",
    "innerBorderOffset": "12px",
    "cornerDotSize": "0",
    "aspectRatio": "2.5/4",
    "outerShadowWidth": "6px",
    "innerShadowWidth": "8px",
    "borderColors": {
      "top": "#fff",
      "right": "#fff",
      "bottom": "#fff",
      "left": "#fff"
    },
    "backgroundImage": "assets/raccoon-of-diamonds.png"
  }
}
```

## Layer Stack (z-index)

1. Card background (`--bg`)
2. iframe content
3. Inner border pseudo-element (`::before`, z-index: 5)
4. Corner dots pseudo-element (`::after`, z-index: 5)
5. Corner pips (z-index: 6)
6. Frame overlay image (z-index: 10)
