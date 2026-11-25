# SemrushGroupBuy — Astro + Pages CMS migration

Original source: `original-source/` (untouched ZIP). Target: `https://samrushgroupbuy.com`.

## What is migrated
- Original interactive React homepage components wrapped in Astro React islands; original styling retained.
- 35 source-defined SEO URLs migrated to JSON files in `content/articles/` (all source copy retained even when it is placeholder content).
- Original 3 plan prices ($5, $25, $35 monthly), features, FAQ, reviews, tool lists editable in `content/site.json`.
- Original static logos/images in `public/`; sitemap, canonical, robots, SEO tags, source-preserving author metadata.
- Payment CTAs intentionally updated from legacy `members.buyseo.org/cart/...` to `https://pay.samrushgroupbuy.com`, per owner requirements; verify this hostname is provisioned before production launch.

## Pages CMS editing
- `content/site.json`: site settings, metadata, 3 pricing plans, checkout URL, hero, tool cards and logos, favicon/OG image, author profiles/photos, article order.
- `content/ui.json`: homepage and header/footer copy, pricing labels, graph rows, cards, CTA URLs, tool descriptions, checklists, shared SEO article template text and sidebar.
- `content/articles/*.json`: 35 individually editable article titles, slugs, SEO metadata, summary and rich-text article content. Optional `customFullBody` replaces the full article layout for one article only, with optional `authorName`, `toc` and `heroSentenceCase`.
- `content/privacy.json`: Privacy Policy sections.
- `.pages.yml` exposes the corresponding Pages CMS editors, rich text and media pickers.
- CI tests `npm run verify:cms` to detect uneditable JSON fields and `node scripts/test-cms-edit.mjs` to prove edits propagate into generated pages. The test restores the original content afterward.

## Remaining quality gates
- Content-editability is validated in code and generated output, **not yet manually verified inside the signed-in Pages CMS web editor**.
- The original ZIP's 35 article bodies contain short boilerplate; source parity was intentionally preserved rather than inventing replacement copy.
- The `original-source/` folder is reference-only; its old hardcoded snippets do not power migrated pages.
- Layout/CSS, animations, artwork fallbacks and programming behavior naturally remain in source code, not in content CMS.
- Confirm actual Cloudflare Worker deployment after every main-branch push and verify the pay subdomain before production cutover.

## Build / Cloudflare Worker
`npm install`, `npm run verify`, `npm run build`, `npx wrangler deploy`.
Cloudflare Worker is configured as `https-samrushgroupbuy-com` (preview `https://https-samrushgroupbuy-com.pandastudioo70.workers.dev/`); build-before-deploy is configured in `wrangler.jsonc`. Branch `main`, root `/`. GitHub Actions build, CMS editing simulation, source-layout parity and Wrangler dry-run have passed.

## CMS
Connect GitHub repository to Pages CMS; config is `.pages.yml`.

## Repository import status
The complete 138-file migration package was imported to `main` from the user-provided ZIP. The source files are committed individually, not stored as a ZIP. Run CI before a production cutover.
