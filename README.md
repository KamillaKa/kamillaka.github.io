# kamillaka.github.io

My personal portfolio, built with **Vite + TypeScript + HTML + CSS**, with no frameworks.
English and Finnish are both supported.

## Running it locally

```bash
npm install      # first time only
npm run dev      # starts a local dev server (open the URL it prints)
npm run build    # type-checks and builds the site into dist/
npm run preview  # previews the built site
```

## Project structure

```
index.html              Page structure (all sections)
src/
  main.ts               Starts everything: menu, header, hero card, animations
  translations.ts       ALL text in English and Finnish  ← edit text here
  i18n.ts               Language switching logic (EN / FI)
  projects.ts           Project list + card rendering    ← add projects here
  contact-form.ts       Contact form validation & sending
  style.css             All styles. Colors/fonts are CSS variables at the top
public/
  favicon.svg           Browser tab icon
  og-image.png          Image shown when the link is shared (1200 × 630)
  images/               Portrait and project screenshots
.github/workflows/      Automatic deployment to GitHub Pages
```

## ✏️ Things to replace

Search the project for `✏️` and `[Placeholder` to find everything. The main ones:

| What | Where |
| --- | --- |
| Email address | `index.html` (contact section, 2 places) |
| LinkedIn URL | `index.html` (contact section + footer) |
| GitHub URL | `index.html` and `src/projects.ts` (currently `github.com/kamillaka`) |
| About text, quick facts, study dates | `src/translations.ts` (`about.*`, `education.*`) |
| Projects | `src/projects.ts`. Screenshots go in `public/images/projects/` |
| Portrait | Add a photo to `public/images/` and update the `<img>` in the about section |
| Contact form | Set `FORM_ENDPOINT` in `src/contact-form.ts` (e.g. a Formspree URL), or delete the `<form>` |
| Social preview image | `public/og-image.png` |

### Editing text

All visible text lives in `src/translations.ts`. The English text in `index.html` is only
a fallback for visitors without JavaScript and for search engines, so it's good to keep it
roughly in sync, but `translations.ts` is what visitors see.

To add new text: add a key to `en`, then TypeScript will remind you to add it to `fi`,
and use it in HTML with `data-i18n="your.key"`. For attributes use `data-i18n-aria-label`
or `data-i18n-alt`.

### Adding a project

Copy one of the objects in the `projects` array in `src/projects.ts` and edit it.
`liveUrl` and `repoUrl` are optional. Set `featured: true` on (at most) one project to
give it a wide card. Screenshots look best at 1200 × 750 px (16:10).

### Changing the look

Edit the CSS variables at the top of `src/style.css` (`--color-accent`, `--font-display`
and so on). Check text contrast stays at least 4.5:1 if you change colors.

## Deploying to GitHub Pages

1. Push to the `main` branch on GitHub.
2. In the repo: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. Every push to `main` now builds and publishes the site to https://kamillaka.github.io/.
