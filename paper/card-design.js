// ===========================================
// CARD DESIGN MODULE
// ===========================================
// Encapsulates the visual design of document cards.
// Loads design presets from card-designs.json

const CardDesign = {
    // Current design config (loaded from JSON)
    config: null,

    // All available designs
    designs: null,

    // Load designs from JSON and initialize
    async init(designName = 'default') {
        const response = await fetch('card-designs.json');
        this.designs = await response.json();
        this.applyDesign(designName);
    },

    // Apply a design by name
    applyDesign(designName) {
        this.config = this.designs[designName] || this.designs['default'];
        this.injectStyles();
    },

    // Inject/update card styles in the document
    injectStyles() {
        let style = document.getElementById('card-design-styles');
        if (!style) {
            style = document.createElement('style');
            style.id = 'card-design-styles';
            document.head.appendChild(style);
        }
        style.textContent = this.getCSS();
    },

    // Generate the CSS for cards
    getCSS() {
        const c = this.config;
        const hasInnerBorder = c.innerBorderOffset !== '0';
        const hasCornerDots = c.cornerDotSize !== '0';
        const hasShadow = c.outerShadowWidth !== '0';

        return `
            .tile-card {
                position: relative;
                width: 100%;
                aspect-ratio: ${c.aspectRatio};
                background: var(--bg);
                border-radius: ${c.borderRadius};
                border: ${c.borderWidth} solid var(--fg);
                overflow: hidden;
                ${hasShadow ? `box-shadow: inset 0 0 0 ${c.outerShadowWidth} var(--bg), inset 0 0 0 ${c.innerShadowWidth} var(--fg);` : ''}
            }

            ${hasInnerBorder ? `
            .tile-card::before {
                content: '';
                position: absolute;
                top: ${c.innerBorderOffset};
                left: ${c.innerBorderOffset};
                right: ${c.innerBorderOffset};
                bottom: ${c.innerBorderOffset};
                border: 1px solid var(--fg);
                border-radius: 4px;
                pointer-events: none;
                z-index: 5;
            }
            ` : ''}

            ${hasCornerDots ? `
            .tile-card::after {
                content: '';
                position: absolute;
                top: 6px;
                left: 6px;
                right: 6px;
                bottom: 6px;
                background:
                    radial-gradient(circle at 0 0, var(--fg) ${c.cornerDotSize}, transparent ${c.cornerDotSize}),
                    radial-gradient(circle at 100% 0, var(--fg) ${c.cornerDotSize}, transparent ${c.cornerDotSize}),
                    radial-gradient(circle at 0 100%, var(--fg) ${c.cornerDotSize}, transparent ${c.cornerDotSize}),
                    radial-gradient(circle at 100% 100%, var(--fg) ${c.cornerDotSize}, transparent ${c.cornerDotSize});
                pointer-events: none;
                z-index: 5;
            }
            ` : ''}

            .tile:hover .tile-card {
                border-color: #666;
                ${hasShadow ? `box-shadow: inset 0 0 0 ${c.outerShadowWidth} var(--bg), inset 0 0 0 ${c.innerShadowWidth} #666;` : ''}
            }

            .tile-card iframe {
                width: 100%;
                height: 100%;
                border: none;
                pointer-events: none;
                transition: opacity 0.3s ease;
            }

            .tile-card iframe.fading {
                opacity: 0;
            }
        `;
    },

    // Create a card element
    createElement() {
        const card = document.createElement('div');
        card.className = 'tile-card';
        return card;
    },

    // Hook for future interactivity
    animate(cardElement, animation) {
        switch (animation) {
            case 'pulse':
                cardElement.style.animation = 'card-pulse 0.3s ease';
                setTimeout(() => cardElement.style.animation = '', 300);
                break;
            case 'shake':
                cardElement.style.animation = 'card-shake 0.3s ease';
                setTimeout(() => cardElement.style.animation = '', 300);
                break;
        }
    },

    // Get list of available design names
    getDesignNames() {
        return Object.keys(this.designs || {});
    }
};
