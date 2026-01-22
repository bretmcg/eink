This file is designed to be your "Golden Image" for the Slate. It acts as both a manifest for the aesthetic and the literal technical instructions to achieve it.

I have structured this as a **survey/guide document** with a wide right-hand margin layout (imagined) so you can check off the steps with your stylus.

---

# marked2-readonly-vibes-on-boox.md

# The "Mark2" Protocol: Zen Read-Only MVP

**Target Device:** Boox Go 10.3 (The Slate)

**Objective:** Eliminate "Android Tablet" friction; achieve reMarkable-style "Digital Paper" immersion.

---

## 1. The Visual Foundation (The "Canvas")

To get the **Ink on Mark2** vibe, we must treat the E-ink screen as a static substrate, not a dynamic display.

- **[ ] Refresh Mode:** Set to **"Regal"** (or HD). Never use A2 or X-mode for reading documents. You want zero ghosting and maximum stroke clarity.
    
- **[ ] Contrast Setting:** Set to **"System Default"** but ensure "Dark Color Enhancement" is at 0. We want the greys to look like pencil and the blacks to look like ink, not crushed digital blocks.
    
- **[ ] The Font:** Install **"EB Garamond"** or **"Bitter"**.
    
    - _Action:_ Drop the `.ttf` files into the `/fonts` folder on your Slate.
        
    - _Why:_ These fonts have "ink traps" designed for paper-like rendering.
        

---

## 2. The UX Strip-Down (The "Silence")

The reMarkable feels superior because it lacks a "Status Bar." On your Slate, we must kill the UI chrome.

- **[ ] The Status Bar:** `Settings > System Display > Status Bar`. Toggle **OFF**.
    
- **[ ] The Navigation Ball:** Disable it entirely. Use **Gestures** (Swipe up from bottom) for "Back" and "Home."
    
- **[ ] The Home Screen:** Use the **"Library"** as your default home, not the "Apps" drawer. Set the Library view to "List" or "Scan" for a cleaner, bookish feel.
    

---

## 3. The "Read-Only" Ceremony

How to move files into the "Zen State" without the friction of cables.

Code snippet

```
graph LR
    A[Markdown File] -- "CSS 'Pressing'" --> B(Zen PDF)
    B -- "Syncthing / Drive" --> C{The Slate}
    C --> D[NeoReader: V2 Engine]
    D --> E[Scribble Layer: Active]
```

### The "Press" Settings:

When exporting your `magic-party.md` or `tier_3_artifacts.md` to PDF for the Slate, use these "Zen Specs":

- **Margins:** Top: 1in, Bottom: 1in, Left: 0.7in, **Right: 2.5in** (The Stylus Margin).
    
- **Text Alignment:** Justified (Full).
    
- **Background:** Pure White (#FFFFFF).
    

---

## 4. Interaction Hierarchy: The "Wand" vs. The "Slate"

On the Slate, the stylus isn't a mouse; it's a "Marker."

|**Action**|**Slate Interaction**|**Aesthetic Goal**|
|---|---|---|
|**Reading**|Swipe (Right to Left)|Mechanical Page Turn|
|**Annotating**|Charcoal/Pencil Brush|Permanent Record|
|**Highlighting**|Grey Marker (30% Opacity)|Transparent Thought|
|**Navigation**|Physical Side Buttons (if any) or Gestures|Low-latency flow|

---

## 5. The "Party Mode" Survey (Stylus-Friendly)

_Use your stylus to circle your preference for the "Magic Quinceañera" launch:_

A. Should the "Toast" be recorded?

( Yes, for the memory ) / ( No, keep it ephemeral )

B. The "Three Device" Minimum:

( Strict - 3 wands only ) / ( Loose - 1 wand + 2 phones )

C. Visual Trigger for the "Ascension":

[ ] Screen Shatter

[ ] Ink Bloom

[ ] Geometric Fractal

---

> **Zen Note:** > The moment you pick up the Slate, the world should disappear. If you see a notification or a battery percentage, the spell is broken. **The goal of the Mark2 vibe is to make the device invisible so the ideas can be heavy.**

---

**Would you like me to generate a "Markdown-to-Zen-PDF" template (HTML/CSS) that you can paste into a converter to produce this exact look for your next artifact?**
