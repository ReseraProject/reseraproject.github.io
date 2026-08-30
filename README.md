# RESERA

RESERA is a student-led research collective with 1,200+ members and growing. The public site is a Nuxt 4 application generated as SEO-ready HTML and hydrated into an interactive Vue experience in the browser. The repository also contains the future Django account and opportunity service.

## Architecture

- `app/` — TypeScript, Vue, and Nuxt 4 frontend
- `public/` — RESERA imagery, social preview, robots, and sitemap
- `backend/` — Django session authentication, opportunity submissions, and staff moderation retained for future use
- `.github/workflows/deploy-pages.yml` — Nuxt static generation and GitHub Pages deployment

GitHub Pages serves generated static files and cannot execute Python. The frontend displays approved opportunities after hydration only when `NUXT_PUBLIC_API_BASE` points to a deployed Django service.

## Frontend

```powershell
bun install
bun run dev
```

The local app is available under `/Resera/`, matching its GitHub Pages project path.

## Validation

```powershell
bun run typecheck
bun run generate
.\.venv\Scripts\python.exe backend\manage.py test core
```

## Backend

See [`backend/README.md`](backend/README.md) for Django setup. The public Nuxt release intentionally does not expose authentication controls until that service is hosted.
