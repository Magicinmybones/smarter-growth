# Smarter Growth

Static site packaged from the supplied HTML. Images, fonts, CSS, and JavaScript are self-hosted in `public/assets/`.

Live site: https://smarter-growth-motion.spaceedu-planet-earth.workers.dev/

## Files

- `public/index.html` — page markup
- `public/assets/` — images, fonts, styles, interactions, and the one-time entrance
- `wrangler.jsonc` — Cloudflare Workers Static Assets configuration

The entrance runs once per page load, ends after about two seconds, and is skipped when reduced motion is preferred. The final frame matches the original static page.

## Deploy

From this folder, run `npx wrangler@latest deploy`. Pushing to GitHub alone does not redeploy the site.
