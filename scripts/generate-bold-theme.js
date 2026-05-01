const fs = require('fs');
const path = require('path');

const themePath = path.join(process.cwd(), 'themes/santi020k-dark-color-theme.json');
const outputPath = path.join(process.cwd(), 'themes/santi020k-dark-bold-color-theme.json');

const raw = fs.readFileSync(themePath, 'utf8');
const cleanRaw = raw
  .replace(/\/\*[\s\S]*?\*\//g, '')
  .replace(/^\s*\/\/.*$/gm, '');

const theme = JSON.parse(cleanRaw);

theme.name = "santi020k dark bold";

// Function to add bold to fontStyle string
function boldify(style) {
    if (!style) return "bold";
    if (style.includes("bold")) return style;
    return `bold ${style}`;
}

// Modify semanticTokenColors
if (theme.semanticTokenColors) {
    for (const key in theme.semanticTokenColors) {
        const val = theme.semanticTokenColors[key];
        if (typeof val === 'string') {
            theme.semanticTokenColors[key] = {
                foreground: val,
                bold: true
            };
        } else if (typeof val === 'object') {
            val.bold = true;
        }
    }
}

// Modify tokenColors
if (theme.tokenColors) {
    theme.tokenColors.forEach(token => {
        if (token.settings) {
            token.settings.fontStyle = boldify(token.settings.fontStyle);
        }
    });
}

fs.writeFileSync(outputPath, JSON.stringify(theme, null, 2));
console.log('Bold theme generated at:', outputPath);
