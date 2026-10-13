# Smarter Growth

Static site packaged from the supplied HTML. Images, fonts, CSS, and JavaScript are self-hosted in `public/assets/`.

Live site: https://smarter-growth-motion.spaceedu-planet-earth.workers.dev/

## Files

- `public/index.html` — page markup
- `public/assets/` — all page assets
- `wrangler.jsonc` — Cloudflare Workers Static Assets configuration

## Deploy

From this folder, run `npx wrangler@latest deploy`. Pushing to GitHub alone does not redeploy the site.
