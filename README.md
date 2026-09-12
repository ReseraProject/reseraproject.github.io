# RESERA

RESERA is a worldwide community of 1,230+ student researchers working across 12+ academic disciplines, with 25+ papers in progress and 2+ completed and published. The public site is a Nuxt 4 application generated as SEO-ready HTML and hydrated into an interactive Vue experience in the browser. The repository also contains the future Django account and opportunity service.

## Architecture

- `app/` — TypeScript, Vue, and Nuxt 4 frontend
- `content/opportunities.json` — reviewed public opportunity records
- `public/` — RESERA imagery, social preview, robots, and sitemap
- `backend/` — Django session authentication, opportunity submissions, and staff moderation retained for future use
- `.github/workflows/deploy-pages.yml` — Nuxt static generation and GitHub Pages deployment

GitHub Pages serves generated static files and cannot execute Python. The public marketplace reads only reviewed records committed to `content/opportunities.json`; unreviewed submissions remain private and arrive through the structured email link.

## Opportunity publishing

Add only approved public information to `content/opportunities.json`, following `content/opportunities.schema.json`. Every record receives a shareable route at `/opportunities/<slug>/`. Invalid records, duplicate slugs, unsafe source URLs, and unsupported fields block deployment.

```powershell
bun run validate:content
bun test
```

Expired records remain available at their direct URL with a closed status but are hidden from the default active marketplace.

## Frontend

```powershell
bun install
bun run dev
```

The local app is available at the site root, matching the `ReseraProject.github.io` organization Pages repository.

## Validation

```powershell
bun run typecheck
bun run generate
bun test
.\.venv\Scripts\python.exe backend\manage.py test core
```

## Backend

See [`backend/README.md`](backend/README.md) for Django setup. The public Nuxt release intentionally does not expose authentication controls until that service is hosted.
