# qinematos.github.io
# Qinematos Website

The official website for [Qinematos](https://kinematos.io) - The Deterministic Data Base Plane for Agentic AI.

## Overview

This is a static website hosted on GitHub Pages. It provides documentation, API reference, and getting started guides for the Qinematos project.

## Structure

```
Qinematos/
├── index.html              # Landing page
├── docs/
│   ├── index.html          # Documentation hub
│   ├── architecture.html   # System architecture
│   ├── api-reference.html  # REST, gRPC, MCP APIs
│   └── quick-start.html    # Getting started guide
├── css/
│   └── style.css           # Stylesheet
├── js/
│   └── main.js             # Navigation and interactions
├── images/                 # Static assets
├── CNAME                   # Custom domain config
└── README.md               # This file
```

## Local Development

Simply open `index.html` in a browser, or use a local server:

```bash
# Python 3
python -m http.server 8000

# Node.js
npx serve
```

Then visit `http://localhost:8000`.

## Deployment

The site is automatically deployed to GitHub Pages when changes are pushed to the `main` branch.

### Custom Domain Setup

1. The `CNAME` file contains `kinematos.io`
2. Configure DNS at your registrar (one.com):
   - A records pointing to GitHub Pages IPs:
     - 185.199.108.153
     - 185.199.109.153
     - 185.199.110.153
     - 185.199.111.153
   - CNAME for www: `your-username.github.io`

3. Enable "Enforce HTTPS" in repo Settings > Pages after certificate provisioning (~15-60 min)

## Design

- **Theme**: Dark with gold/yellow accents (#FFD700)
- **Font**: Inter (system-ui fallback)
- **Code Font**: JetBrains Mono
- **Responsive**: Mobile-first design

## License

Apache 2.0 - See the main Qinematos repository for license details.

---

**Reliability - Verifiability - Performance**
