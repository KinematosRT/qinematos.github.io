# Qinematos Website - Copilot Instructions

## Project Overview

This is a **static website** for Qinematos (pronounced "kih-NEM-uh-tohs") - The Deterministic Data Base Plane for Agentic AI. The site is hosted on GitHub Pages and built using vanilla HTML, CSS, and JavaScript with no build tools or frameworks.

**Technology Stack:**
- Pure HTML5, CSS3, and vanilla JavaScript
- No build process, bundlers, or transpilation
- No package.json or node_modules
- Static site deployment via GitHub Pages
- Custom domain: kinematos.io

## Repository Structure

```
/
├── .github/
│   └── instructions/         # Path-specific instructions (e.g., CSS guidelines)
├── index.html               # Landing page (454 lines)
├── docs/
│   ├── index.html          # Documentation hub (169 lines)
│   ├── architecture.html   # System architecture (263 lines)
│   ├── api-reference.html  # REST, gRPC, MCP APIs (556 lines)
│   └── quick-start.html    # Getting started guide (360 lines)
├── css/
│   └── style.css           # Single stylesheet (1449 lines)
├── js/
│   └── main.js             # All JavaScript (329 lines)
├── images/                 # Static assets including favicon.svg
├── CNAME                   # Custom domain config (kinematos.io)
├── AGENTS.md              # Agent onboarding document
└── README.md              # Developer documentation
```

## Development & Testing

### Local Development

**No build step is required.** Simply open files in a browser or use a local server:

```bash
# Option 1: Python 3 (recommended)
python -m http.server 8000

# Option 2: Node.js
npx serve
```

Then visit `http://localhost:8000`.

### Testing Changes

1. **Manual Testing**: Open `index.html` or any page in a browser
2. **Visual Inspection**: Check responsive design at mobile (375px), tablet (768px), and desktop (1200px+) breakpoints
3. **Navigation**: Test all links, especially:
   - Internal anchor links (smooth scroll)
   - Documentation navigation
   - Mobile menu toggle
4. **Accessibility**: Verify keyboard navigation, focus states, and screen reader compatibility

### No CI/CD Pipeline

**There are no automated tests, linters, or GitHub workflows.** All validation is manual. The site auto-deploys when pushing to the `main` branch via GitHub Pages.

## Design System & Conventions

### CSS Architecture

The design system is entirely defined in `/css/style.css` using CSS variables. **Never use magic numbers or hardcoded values** - always reference variables.

#### Fibonacci Spacing Scale

All spacing uses Fibonacci-inspired values:
```css
--space-quantum: 5px
--space-atom: 8px
--space-molecule: 13px
--space-cell: 21px
--space-tissue: 34px
--space-organ: 55px
--space-system: 89px
--space-organism: 144px
```

#### Type Scale (√2 Ratio = 1.414)

Typography uses a square root of 2 ratio for mathematical harmony:
```css
--type-micro: 0.707rem
--type-small: 0.841rem
--type-body: 1rem
--type-emphasis: 1.189rem
--type-subtitle: 1.414rem
--type-heading: 1.681rem
--type-subheader: 2.378rem
--type-header: 3.363rem
--type-display: 4.756rem
```

#### Layout Variables

```css
--sidebar-width-min: 16rem
--sidebar-width-fluid: 22vw
--sidebar-width-max: 20rem
--content-width-narrow: 46rem
--content-width-medium: 74rem
--content-width-prose: 72ch
--grid-card-min: 16rem
--grid-card-max: 22rem
```

#### Color Palette

Dark theme with gold accents:
```css
--bg-primary: #0a0a0a
--bg-surface: #141414
--bg-elevated: #1a1a1a
--accent-primary: #FFD700 (gold)
--accent-secondary: #FFC107
--text-primary: #f5f5f5
--text-secondary: #a3a3a3
--border-color: #262626
```

### Key Design Principles

1. **Use CSS Variables**: Always use `var(--space-*)`, `var(--type-*)`, etc. Never use literal pixel values except for 1px borders.

2. **Fluid Layouts with clamp()**: Use clamp() for responsive sizing:
   ```css
   grid-template-columns: repeat(auto-fit, 
     minmax(clamp(var(--grid-card-min), 25vw, var(--grid-card-max)), 1fr));
   ```

3. **Heading Spacing**: 
   - Add `margin-top: var(--space-organ)` to h2
   - Add `margin-top: var(--space-tissue)` to h3/h4
   - Add `margin-top: var(--space-molecule)` after headings

4. **List Styling**: Content lists use:
   ```css
   margin: var(--space-cell) 0;
   padding-left: var(--space-tissue);
   ```
   Each `li` gets `margin-bottom: var(--space-molecule)`

5. **External Links**: Always add `rel="noopener noreferrer"` to links with `target="_blank"` for security.

6. **Decorative Images**: Logo images within links that contain text should use `alt=""` and optionally `aria-hidden="true"` to avoid redundant screen reader announcements.

7. **Table Layout**: 
   - **Never use `display: block` on table elements** - it breaks column alignment
   - Use wrapper divs for scrolling: `<div class="table-wrapper"><table>...</table></div>`
   - Never use `::before` or `::after` pseudo-elements on table rows

8. **Overflow Handling**: Use `overflow-x: hidden` on body (already applied) and `max-width: 100vw` to prevent horizontal scrolling without clipping focus indicators.

### Accessibility Standards

- Use semantic HTML (nav, main, section, article)
- Include ARIA labels for icon-only buttons
- Ensure all interactive elements are keyboard accessible
- Provide sufficient color contrast (gold #FFD700 on dark backgrounds)
- Use `alt=""` for decorative images
- Logo structure: `<img>Q<span>inematos</span>` to preserve brand name for screen readers

### JavaScript Patterns

All JavaScript is in `/js/main.js` and uses vanilla ES6+:
- Mobile navigation toggle
- Smooth scrolling for anchor links
- Active navigation highlighting with IntersectionObserver
- Code syntax highlighting (custom tokenizer)
- Copy-to-clipboard for code blocks
- Fade-in animations
- Back-to-top button

**No external dependencies** - everything is self-contained.

## Common Tasks

### Adding a New Page

1. Create HTML file in root or `/docs/`
2. Copy header/nav structure from existing page
3. Use consistent class names (`.hero`, `.container`, `.section-title`)
4. Include `<script src="/js/main.js"></script>` before `</body>`
5. Link stylesheet: `<link rel="stylesheet" href="/css/style.css">` (or `../css/style.css` from `/docs/`)

### Modifying Styles

1. Check if a CSS variable exists for your use case
2. If adding new spacing/sizing, reuse existing Fibonacci variables
3. Test responsively at 375px, 768px, 1200px+ breakpoints
4. Refer to `.github/instructions/*.instructions.md` for CSS-specific guidance

### SVG Icons

- Use inline SVG instead of ASCII characters or icon fonts
- Optimize with `npx svgo` (can reduce file size by ~50%)
- Example: Arrow icons in architecture diagram

## File Navigation Quick Reference

- **Landing page content**: `/index.html`
- **All styles**: `/css/style.css` (single file, organized by sections)
- **All JavaScript**: `/js/main.js` (single file, no modules)
- **Documentation pages**: `/docs/*.html`
- **Static assets**: `/images/` (includes favicon.svg, logo, graphics)
- **Domain config**: `/CNAME` (contains "kinematos.io")
- **Agent context**: `/AGENTS.md` (detailed technical brief for AI agents)

## Deployment

**Automatic**: Pushing to `main` branch triggers GitHub Pages deployment. No manual steps required.

**Domain**: Custom domain `kinematos.io` configured via CNAME file and DNS A records pointing to GitHub Pages IPs.

## Important: Trust These Instructions

**If the information in these instructions is complete and accurate for your task, trust it and proceed without extensive exploration.** Only perform additional searches if:
- The instructions are incomplete for your specific task
- You encounter an error suggesting the instructions are outdated
- You're adding entirely new functionality not covered here

This repository has no hidden complexity. What you see is what you get: vanilla HTML/CSS/JS with a well-defined design system.
