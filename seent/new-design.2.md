# Creating "Elf of Diamonds" Card Design

## Files to Create

### 1. Overlay Image
`paper/assets/elf-of-diamonds.png`

A 312x500px PNG with transparency. The image should have:
- Transparent center area where document content shows through
- Diamond suit decorations in corners
- Elf character artwork integrated into the frame
- Playing card aesthetic matching the rascal-of-diamonds style

### 2. Overlay Definition
`paper/overlays/elf-of-diamonds.json`

```json
{
  "image": "assets/elf-of-diamonds.png",
  "size": { "width": 312, "height": 500 },
  "elements": []
}
```

## Files to Modify

### 1. Card Designs Registry
`paper/card-designs.json`

Add new entry:

```json
{
  "elf-of-diamonds": {
    "name": "Elf of Diamonds",
    "description": "Playing card style with E diamond corner pips",
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
    "overlay": "overlays/elf-of-diamonds.json",
    "cornerPip": {
      "symbol": "♦",
      "letter": "E",
      "color": "var(--fg)"
    }
  }
}
```

## To Use

In `gallery.js`, change the init call:

```js
CardDesign.init('elf-of-diamonds')
```

Or dynamically switch:

```js
await CardDesign.applyDesign('elf-of-diamonds')
```

## Future: Adding UI Elements

Once Phase 2 is implemented, the overlay file can include positioned text elements:

```json
{
  "image": "assets/elf-of-diamonds.png",
  "size": { "width": 312, "height": 500 },
  "elements": [
    {
      "id": "title",
      "type": "text",
      "bounds": { "x": 20, "y": 450, "width": 272, "height": 30 },
      "bind": "doc.name",
      "style": { "font": "Georgia", "size": 12, "align": "center" }
    },
    {
      "id": "date",
      "type": "text",
      "bounds": { "x": 230, "y": 12, "width": 60, "height": 16 },
      "bind": "doc.creationDate",
      "format": "MMM D"
    }
  ]
}
```
