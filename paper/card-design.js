// ===========================================
// CARD DESIGN MODULE
// ===========================================
// Encapsulates the visual design of document cards.
// Future: add interactivity, animations, variants, etc.

const CardDesign = {
    // Design configuration - tweak these values
    config: {
        borderRadius: '12px',
        borderWidth: '2px',
        innerBorderOffset: '12px',
        cornerDotSize: '2px',
        aspectRatio: '2.5/4',
    },

    // Inject card styles into the document
    injectStyles() {
        const style = document.createElement('style');
        style.id = 'card-design-styles';
        style.textContent = this.getCSS();
        document.head.appendChild(style);
    },

    // Generate the CSS for cards
    getCSS() {
        const c = this.config;
        return `
            .tile-card {
                position: relative;
                width: 100%;
                aspect-ratio: ${c.aspectRatio};
                background: var(--bg);
                border-radius: ${c.borderRadius};
                border: ${c.borderWidth} solid var(--fg);
                overflow: hidden;
                box-shadow: inset 0 0 0 6px var(--bg), inset 0 0 0 8px var(--fg);
            }

            /* Inner frame border */
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

            /* Corner ornaments */
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

            .tile:hover .tile-card {
                border-color: #666;
                box-shadow: inset 0 0 0 6px var(--bg), inset 0 0 0 8px #666;
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

    // Create a card element (for future dynamic card creation)
    createElement() {
        const card = document.createElement('div');
        card.className = 'tile-card';
        return card;
    },

    // Hook for future interactivity
    // e.g., flip animation, glow effect, shake, etc.
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
            // Add more animations as needed
        }
    },

    // Future: different card variants/themes
    variants: {
        default: {},
        ornate: {
            // More decorative borders, etc.
        },
        minimal: {
            // Simple clean look
        },
        tarot: {
            // Full tarot card styling
        }
    },

    // Apply a variant to a card
    applyVariant(cardElement, variantName) {
        // Future implementation
        cardElement.dataset.variant = variantName;
    }
};

// Auto-inject styles when script loads
CardDesign.injectStyles();
