# Quick Notes

## Meeting - Jan 21

- Discussed e-ink display optimization
- Need to test stylus latency on different refresh modes
- Follow up on theme system implementation

## Ideas

### Reading Mode Improvements

The current reading mode works well but could benefit from:

1. Adjustable margins
2. Font size override
3. Dark mode toggle (inverted for e-ink)

### Performance

> Premature optimization is the root of all evil.

But for e-ink, every unnecessary repaint matters. Consider:

- Debouncing scroll events
- Reducing DOM updates
- Using CSS transforms over layout changes

## Todo

- [ ] Test on Boox device
- [ ] Test on reMarkable
- [ ] Check Kindle browser compatibility
- [x] Create theme picker
- [x] Add document selector

## Links

- [E-ink Wikipedia](https://en.wikipedia.org/wiki/E_Ink)
- Project repo: `/Users/bret/src/eink`
