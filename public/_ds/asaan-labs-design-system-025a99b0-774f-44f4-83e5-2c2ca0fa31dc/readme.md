# Asaan Labs Design System

Asaan Labs is an AI and design studio. It works on AI and product design, builds products from user research and market analysis, and works to the idea "Simplifying Life with AI." This design system is built from one source: the Asaan Labs Brand Guide (v1, October 2026, "For the asaanlabs.tech redesign").

## Sources

- `uploads/Asaan-Labs-Brand-Guide.pdf`: logo, colour, discarded colours, typography, type scale. The only source provided.
- Not provided: Figma files, GitHub repositories, codebase paths, product screens, icon sets, font binaries. The guide names the website asaanlabs.tech as the target of its redesign. No website code or screens were available to read.

## Products

- **Website (asaanlabs.tech)**: the redesign the brand guide was written for. No UI kit yet; no screens were provided.
- **Studio services**: AI and product design. No product UI or copy beyond the guide was provided.

## Index

- `styles.css`: global entry point. Imports the tokens below.
- `tokens/colors.css`: colour variables on `:root`.
- `tokens/typography.css`: font families, type scale, weights, leading and tracking. Loads Plus Jakarta Sans and Inter from Google Fonts.
- `tokens/shape.css`: corner radius.
- `assets/logo-primary.png`: primary logo, white wordmark with gradient mark. Extracted from the PDF. Dark backgrounds only.
- `assets/logo-mark.png`: mark on its own. Extracted from the PDF.
- `guidelines/`: foundation cards (colours, type, brand).
- `components/buttons/Button.jsx`: button, variants primary, secondary, ghost.
- `components/forms/Input.jsx`: outlined text input with label and helper.
- `thumbnail.html`: project tile.
- `SKILL.md`: agent-skill wrapper for this system.

## Components

- Button
- Input

No component families were in the source. These two are standard primitives built only from the guide's rules (see Intentional additions).

Intentional additions: Button and Input. The guide describes outlined forms and a teal-on-navy primary action, so these were built to those rules. Corner radius (6px) is not in the guide; it is a placeholder.

## Content fundamentals

- Sentence case everywhere. No all-caps labels above headings.
- British spelling: "analyse", "colour".
- Short declarative headlines: "Simplifying life." "We start with the need, not the want."
- Process copy in plain statements: "We study the problem, understand the people experiencing it, and identify the underlying need before deciding what to build."
- Italics only for titles of works or a quoted phrase, never for emphasis.
- Headlines never colour individual words. Emphasis comes from size and weight.
- No emoji appear in the guide.

## Visual foundations

- **Colour**: navy ground (#0B1120) takes about 85% of a screen. Text is about 10%. Teal (#28B0A7) is under 5% and reserved for the one accent. Anything set on teal uses navy text, because white on teal fails AA.
- **Logo gradient**: teal to cyan (#28B0A7 to #4DC2E5) appears inside the logo artwork only, never on UI.
- **Type**: Plus Jakarta Sans for headings (700 and 800), Inter for body and interface (400, 500, 600). Display headlines scale fluidly, for example `clamp(56px, 7.6vw, 96px)`.
- **Logo rules**: dark backgrounds only. Show the primary logo at 120px tall or larger; below that, use the mark. No recolouring, outlining, stretching, rotation, shadows, glows or animation. Keep clear space at least the height of the wordmark's capitals.
- **Cards**: removed from the system. Forms are outlined.
- **Not specified in the guide**: imagery, illustration, textures, corner radii beyond the placeholder, shadows, animation and easing, hover and press behaviour beyond the colour changes shown in the components, spacing scale, icon system. These are left out rather than invented.

## Iconography

The guide has no icon set, icon font or icon files, and no unicode or emoji icons. The only brand graphic is the logo mark. No icons are included.

## Logo absence

The guide's logo files were extracted from the PDF. No separate SVG or light-background version exists; the guide states none has been made.

## Font substitution

Plus Jakarta Sans and Inter are not in the upload. The guide says its own specimens use stand-in typefaces. The system loads the named fonts from Google Fonts. Font files should be supplied to ship them with the system.
