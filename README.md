# SemrushGroupBuy — Astro + Pages CMS migration

Target domain: https://samrushgroupbuy.com

## Current upload status
The repository is being initialized for the migration from the source ZIP. A prepared migration bundle is available in the ChatGPT conversation, but the complete application files have not yet been uploaded to this repository. **Do not deploy or switch DNS from this initial commit.**

The prepared source package contains: Astro + React homepage, 35 content JSON articles, Pages CMS settings, 3 pricing plans, FAQ, reviews, media, sitemap, robots, and Cloudflare Workers config.

## Required before launch
1. Upload the complete prepared migration archive contents (including src/, content/, public/, scripts/, .pages.yml).
2. Run `npm install && npm run verify && npm run build`.
3. Verify all CMS fields, 35 original URLs, pricing, images, layout, redirect behavior and payment buttons on a preview Worker.
4. Point the production domain only after live parity tests pass.

Original payment paths intentionally migrate to https://pay.samrushgroupbuy.com — verify that host before allowing checkout.
