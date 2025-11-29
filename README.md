# Autoflux Landing

This repository contains the static landing page for the Autoflux AI automation agency. It is built with vanilla HTML/CSS/JS so it can be hosted anywhere (GitHub Pages, Netlify, S3, etc.) with virtually no build step.

## Project structure

```
Landing/
├── index.html          # Main page markup
├── styles/main.css     # Styling + responsive rules
├── scripts/main.js     # Small interactions / smooth scroll / fake submissions
├── CNAME               # Custom domain placeholder for GitHub Pages
└── README.md
```

You can open `index.html` directly in a browser or run any static server (for example `npx serve .`) if you want live reloads.

## Custom domain & GitHub Pages

1. Create a new GitHub repository (e.g. `autoflux-landing`) and push this folder there (see Git instructions below).
2. In your repo settings → *Pages*, pick the `main` branch and root folder. GitHub will deploy to `https://<username>.github.io/<repo>/`.
3. Update the `CNAME` file in this project with your real domain (e.g. `autoflux.ai`) before pushing. GitHub Pages reads this file automatically.
4. In your DNS provider, create:
   - `A` records for `@` pointing to `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - (Optional but recommended) `CNAME` record for `www` pointing to `<username>.github.io.`
5. Back in GitHub Pages settings, enter the same domain under *Custom domain* and enforce HTTPS. Propagation can take a while; having the entry in place now lets it cook while you finish the content.

## Git & deployment workflow

```bash
git init
git add .
git commit -m "feat: bootstrap Autoflux landing page"
git branch -M main
git remote add origin git@github.com:<username>/<repo>.git
git push -u origin main
```

After pushing, every change merged into `main` will automatically redeploy via Pages. If you prefer another host, simply upload the contents of this folder.
