let DOCUMENTS = [];
let THEMES = [];

// Reader elements
const gallery = document.getElementById('gallery');
const readerControls = document.getElementById('reader-controls');
const minimizeBtn = document.getElementById('minimize-btn');
const optionsBtn = document.getElementById('options-btn');
const closeBtn = document.getElementById('close-btn');
const docBtn = document.getElementById('doc-btn');
const docPanel = document.getElementById('doc-panel');
const themeBtn = document.getElementById('theme-btn');
const themePanel = document.getElementById('theme-panel');
const reader = document.getElementById('reader');
const readerContent = reader.querySelector('article');
const baseVarsCss = document.getElementById('base-vars-css');
const baseStylesCss = document.getElementById('base-styles-css');
const themeCss = document.getElementById('theme-css');

let selectedDoc = null;
let selectedTheme = null;
const tileData = new Map(); // Store per-tile state

async function loadDocument(file) {
    const response = await fetch(file);
    if (!response.ok) throw new Error('Document not found');
    const markdown = await response.text();
    readerContent.innerHTML = marked.parse(markdown);
    reader.scrollTop = 0;
}

function createGallery() {
    DOCUMENTS.forEach((doc, docIndex) => {
        const tile = document.createElement('div');
        tile.className = 'tile';
        tile.dataset.doc = doc.file;

        // Pick a random starting theme for variety
        const startThemeIndex = Math.floor(Math.random() * THEMES.length);
        const startTheme = THEMES[startThemeIndex];
        tile.dataset.currentTheme = startTheme.file;
        tile.dataset.themeIndex = startThemeIndex;

        // Card frame (from card-design.js)
        const card = CardDesign.createElement();

        const iframe = document.createElement('iframe');
        iframe.src = `preview.html?doc=${encodeURIComponent(doc.file)}&theme=${encodeURIComponent(startTheme.file)}`;

        card.appendChild(iframe);
        tile.appendChild(card);

        // Title below card - use filename
        const title = document.createElement('div');
        title.className = 'tile-title';
        const filename = doc.file.split('/').pop().replace('.md', '');
        title.textContent = filename;
        tile.appendChild(title);

        // Click opens reader with current theme
        tile.addEventListener('click', () => {
            openReader(doc, THEMES.find(t => t.file === tile.dataset.currentTheme));
        });

        gallery.appendChild(tile);

        // Store tile data
        tileData.set(tile, {
            doc: doc,
            themeIndex: startThemeIndex
        });
    });

    startThemeCycling();
}

// ===========================================
// ANIMATION CONFIG - tweak these values
// ===========================================
const animation = {
    fadeDuration: 300,      // ms for fade out/in
    cycleDuration: 10000,   // ms between theme changes per tile
    staggerDelay: 800,      // ms between each tile starting
};

// ===========================================
// ANIMATION PATTERNS - swap these functions
// ===========================================

// Pattern: Staggered - each tile starts at a delay
function patternStaggered(tiles) {
    tiles.forEach((tile, i) => {
        setTimeout(() => {
            setInterval(() => cycleTheme(tile), animation.cycleDuration);
        }, i * animation.staggerDelay);
    });
}

// Pattern: Wave - tiles cycle left to right, then repeat
function patternWave(tiles) {
    let currentIndex = 0;
    setInterval(() => {
        cycleTheme(tiles[currentIndex]);
        currentIndex = (currentIndex + 1) % tiles.length;
    }, animation.staggerDelay);
}

// Pattern: Random - random tile cycles at random intervals (popcorn style)
function patternRandom(tiles) {
    function pop() {
        const randomTile = tiles[Math.floor(Math.random() * tiles.length)];
        cycleTheme(randomTile);
        // Random delay between 0.5-2 seconds for next pop
        const nextDelay = 500 + Math.random() * 1500;
        setTimeout(pop, nextDelay);
    }
    pop();
}

// Pattern: All at once - every tile changes together
function patternSync(tiles) {
    setInterval(() => {
        tiles.forEach(tile => cycleTheme(tile));
    }, animation.cycleDuration);
}

// ===========================================
// CORE ANIMATION - don't need to touch this
// ===========================================

function startThemeCycling() {
    const tiles = Array.from(gallery.querySelectorAll('.tile'));
    // Change this line to use a different pattern:
    patternRandom(tiles);
}

function cycleTheme(tile) {
    const iframe = tile.querySelector('.tile-card iframe');
    const data = tileData.get(tile);

    // Fade out
    iframe.classList.add('fading');

    setTimeout(() => {
        // Move to next theme
        data.themeIndex = (data.themeIndex + 1) % THEMES.length;
        const nextTheme = THEMES[data.themeIndex];
        tile.dataset.currentTheme = nextTheme.file;

        // Send message to iframe to change theme
        iframe.contentWindow.postMessage({ theme: nextTheme.file }, '*');

        // Fade in
        setTimeout(() => {
            iframe.classList.remove('fading');
        }, 50);
    }, animation.fadeDuration);
}

function openReader(doc, theme) {
    selectedDoc = doc;
    selectedTheme = theme;

    loadDocument(doc.file);

    baseVarsCss.href = 'themes/_base.css';
    baseStylesCss.href = 'themes/_styles.css';
    themeCss.href = theme.file;

    // Mark current selections in reader panels
    docPanel.querySelectorAll('.doc-option').forEach(btn => {
        btn.classList.toggle('current', btn.dataset.doc === doc.file);
    });
    themePanel.querySelectorAll('.theme-option').forEach(btn => {
        btn.classList.toggle('current', btn.dataset.theme === theme.file);
    });

    reader.classList.add('active');
    document.body.style.overflow = 'hidden';

    if (reader.requestFullscreen) {
        reader.requestFullscreen().catch(() => {});
    } else if (reader.webkitRequestFullscreen) {
        reader.webkitRequestFullscreen();
    }
}

function initializeReaderPanels() {
    // Populate document panel
    DOCUMENTS.forEach(doc => {
        const btn = document.createElement('button');
        btn.className = 'doc-option';
        btn.textContent = doc.name;
        btn.dataset.doc = doc.file;
        btn.addEventListener('click', async () => {
            try {
                await loadDocument(doc.file);
                selectedDoc = doc;
                docPanel.classList.remove('active');
                docPanel.querySelectorAll('.doc-option').forEach(b => b.classList.remove('current'));
                btn.classList.add('current');
            } catch (err) {
                alert('Error loading document: ' + err.message);
            }
        });
        docPanel.appendChild(btn);
    });

    // Populate theme panel
    THEMES.forEach(theme => {
        const btn = document.createElement('button');
        btn.className = 'theme-option';
        btn.textContent = theme.name;
        btn.dataset.theme = theme.file;
        btn.addEventListener('click', () => {
            themeCss.href = theme.file;
            selectedTheme = theme;
            themePanel.classList.remove('active');
            themePanel.querySelectorAll('.theme-option').forEach(b => b.classList.remove('current'));
            btn.classList.add('current');
        });
        themePanel.appendChild(btn);
    });
}

// Reader button handlers
optionsBtn.addEventListener('click', () => {
    readerControls.classList.toggle('collapsed');
    if (readerControls.classList.contains('collapsed')) {
        docPanel.classList.remove('active');
        themePanel.classList.remove('active');
    }
});

minimizeBtn.addEventListener('click', () => {
    if (document.fullscreenElement) {
        document.exitFullscreen();
    } else if (document.webkitFullscreenElement) {
        document.webkitExitFullscreen();
    }
});

docBtn.addEventListener('click', () => {
    docPanel.classList.toggle('active');
    themePanel.classList.remove('active');
});

themeBtn.addEventListener('click', () => {
    themePanel.classList.toggle('active');
    docPanel.classList.remove('active');
});

closeBtn.addEventListener('click', () => {
    reader.classList.remove('active');
    docPanel.classList.remove('active');
    themePanel.classList.remove('active');
    document.body.style.overflow = '';

    if (document.fullscreenElement) {
        document.exitFullscreen();
    } else if (document.webkitFullscreenElement) {
        document.webkitExitFullscreen();
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && reader.classList.contains('active')) {
        closeBtn.click();
    }
});

// Load configuration and initialize
Promise.all([
    fetch('documents.json').then(r => r.json()),
    fetch('themes.json').then(r => r.json())
]).then(([docs, themes]) => {
    DOCUMENTS = docs;
    THEMES = themes;
    initializeReaderPanels();
    createGallery();
}).catch(err => {
    console.error('Failed to load configuration:', err);
    alert('Failed to load configuration files');
});
