# aiforla.org

The public website for a peer community helping Louisiana businesses learn to put AI to work.

## How this site publishes itself

This repo is also a working example of publishing a website with nothing but GitHub:

1. The site is plain HTML/CSS in [`/site`](site/). No framework, no build step.
2. Every push to `main` triggers [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml), which uploads `/site` to **GitHub Pages**.
3. GitHub serves it at the custom domain **aiforla.org** with automatic HTTPS.

That's the whole pipeline. Edit a file, push (or merge a PR), and the live site updates in about a minute. You can watch each deploy happen in the [Actions tab](../../actions).

## Editing the site

- Change pages in `/site` — `index.html` is the homepage.
- Anything in `/site` ships verbatim: images, CSS, extra pages (`site/learn/index.html` → `aiforla.org/learn/`).
- Preview locally by opening `site/index.html` in a browser — it's just files.

## Why GitHub Pages

Free, no bandwidth bill surprises, no vendor dashboard between you and your site, and the whole publishing process is inspectable right here in the repo — which fits a community whose point is learning in public.
