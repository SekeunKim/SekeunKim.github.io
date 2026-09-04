# Sekeun Kim — Academic Homepage

Static site (no build step, no dependencies). Open `index.html`, or run `python3 -m http.server 8765`.

```
index.html          Biography, research interests, metrics, appointments, contact, news
publications.html   Journal / Conference / Preprints / Patents  (53 items)
talks.html          Teaching, invited talks, editorial & review service
honors.html         Honors and awards
assets/css/style.css
assets/img/profile.jpg   <- ADD YOUR PHOTO HERE (falls back to "SK" initials if missing)
```

## To do
1. **Profile photo** — drop a square photo at `assets/img/profile.jpg`.
2. **LinkedIn** — the sidebar link still points to linkedin.com; replace with your profile URL.

## Deploying to GitHub Pages
```bash
git init && git add -A && git commit -m "Initial homepage"
git branch -M main
git remote add origin https://github.com/SekeunKim/SekeunKim.github.io.git
git push -u origin main
```
Then enable Pages (Settings → Pages → Deploy from branch → `main` / root).
`.nojekyll` keeps GitHub from running Jekyll over the plain HTML.
