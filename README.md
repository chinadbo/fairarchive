# Fair Archive

[中文说明](./README.zh-CN.md)

A static archive site focused on **controversies involving Argentina, Messi, and related football fairness debates**.

The goal is not to "convict" anyone, but to document public controversies in a restrained, traceable way.

---

## Project Scope

This project mainly records:

- officiating and decision controversies
- refereeing disputes
- FIFA / federation governance disputes
- racism-related allegations
- other broadly reported incidents with clear public-interest value

The archive follows three core rules:

1. **Separate controversy from verified fact**
2. **Every entry must include sources**
3. **Include responses or later rulings whenever possible**

---

## Live URLs

- GitHub Pages: <https://chinadbo.github.io/fairarchive/>
- Custom domain: <https://i.ioodu.com/fairarchive/>

> Note: The custom domain may be affected by CDN or browser caching. If code has been updated but the page looks stale, try a hard refresh or wait a few minutes.

---

## Available README Languages

- English: `README.md`
- Simplified Chinese: `README.zh-CN.md`

More localized README files can be added later, for example `README.ja.md` or `README.fr.md`.

---

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) to add events, submit leads, or edit entries.

---

## Tech Stack

- [Astro](https://astro.build/)
- TypeScript
- Tailwind CSS via `@tailwindcss/vite`
- Vitest
- GitHub Pages for automated deployment

---

## Local Development

### Install dependencies

```bash
npm ci
```

### Start the dev server

```bash
npm run dev
```

### Build the site

```bash
npm run build
```

### Run tests

```bash
npm run test
```

---

## Project Structure

```text
.
├── public/
│   └── favicon.svg
├── src/
│   ├── components/        # UI components
│   ├── data/events/       # Event markdown entries
│   ├── layouts/           # Page layouts
│   ├── lib/               # Filters, i18n, paths, helpers
│   ├── pages/             # Routes
│   ├── content.config.ts  # Content schema
│   └── content.ts         # Content loading helpers
├── tests/                 # Schema / filters / i18n tests
├── astro.config.mjs
├── package.json
└── .github/workflows/deploy.yml
```

Event content lives in:

- `src/data/events/*.md`

---

## Content Model

Each event is a Markdown file, and its filename becomes the event `id`.

### Required fields

```yaml
date: 2026-07-09
category: 判罚争议
status: 已被质疑
title_zh: "中文标题"
title_en: "English title"
summary_zh: "中文摘要"
summary_en: "English summary"
tags: [2026世界杯, Messi, Argentina]
sources:
  - { label: "Media name", url: "https://example.com", type: 媒体 }
```

### Optional fields

```yaml
response:
  who: "FIFA / federation / related party"
  text_zh: "中文回应"
  text_en: "English response"
  source: { label: "Statement source", url: "https://example.com", type: 官方 }

ruling:
  verdict_zh: "中文裁定"
  verdict_en: "English ruling"
  source: { label: "Ruling source", url: "https://example.com", type: 官方 }
```

### Allowed `category` values

- `判罚争议`
- `裁判执法`
- `FIFA治理`
- `种族歧视指控`
- `其他`

### Allowed `status` values

- `报道争议`
- `已被质疑`
- `官方裁定`

### Allowed `source.type` values

- `媒体`
- `官方`
- `视频`

---

## Editorial Rules

### 1. Do not write allegations as settled fact

Preferred phrasing includes:

- "according to reports"
- "sparked controversy"
- "was questioned"
- "no final official ruling has been seen yet"

Avoid writing things like:

- "was rigged"
- "favoritism was proven"
- "it was clearly corrupt refereeing"
- "it has been conclusively established"

Only use definitive language when there is a clear, traceable official ruling.

### 2. At least one source is required

Every event must be traceable. Suggested source priority:

1. official statements or rulings
2. Reuters, AP, BBC, Guardian, ESPN, NYT, Al Jazeera, and similar outlets
3. other cross-verifiable reporting

### 3. Preserve responses when available

If a player, federation, FIFA official, referee chief, club, or other party has responded, include it in the `response` field when possible.

### 4. Prioritize current topics, but avoid duplication

An event can be split into separate entries, but each one should ideally have:

- a distinct controversy angle
- independent reporting value
- more than just a rewritten version of the same story

---

## Multilingual Content Support

The site currently supports:

- Chinese as the default interface language
- English

Titles and summaries should be provided in both languages:

- `title_zh` / `title_en`
- `summary_zh` / `summary_en`

---

## Clue Submission and Review Workflow

The current "submit clue" page sends submissions to GitHub Issues.

However, **issues do not automatically appear on the homepage**.

Current workflow:

1. A user submits a clue as a GitHub issue
2. Sources and wording are manually reviewed
3. A formal Markdown event file is created under `src/data/events/`
4. The change is committed and pushed to `fairness`
5. GitHub Pages deploys automatically
6. The event then appears on the homepage and detail pages

Suggested issue labels:

- `待核实` / pending verification
- `待补来源` / needs sources
- `可入库` / ready for archive
- `已入库` / archived
- `不采纳` / rejected
- `重复线索` / duplicate

---

## Deployment

The project is automatically deployed to GitHub Pages via GitHub Actions.

Workflow file:

- `.github/workflows/deploy.yml`

Triggers:

- push to `fairness`
- manual `workflow_dispatch`

Deployment flow:

1. `npm ci`
2. `npm run build`
3. upload `dist/`
4. publish to GitHub Pages

### Astro site config

Current config in `astro.config.mjs`:

- `site`: `https://chinadbo.github.io`
- `base`: `/fairarchive`

Because of this, all static assets and internal links must work under a subpath deployment.

---

## Suggested Update Workflow

### Add a new event

1. Create a new `.md` file in `src/data/events/`
2. Fill out the frontmatter according to the schema
3. Keep wording restrained and sources traceable
4. Run the build
5. Confirm the page renders correctly
6. Commit and push to `fairness`

### Recommended commands

```bash
git add .
git commit -m "add new event entries"
git push origin fairness
```

---

## Test Coverage

Current tests mainly cover:

- content schema validation
- filtering logic
- date ordering
- multilingual field fallback and lookup

Test files:

- `tests/schema.test.ts`
- `tests/filters.test.ts`
- `tests/i18n.test.ts`

---

## Current Status

At present, the archive contains **40+ entries**, covering:

- notable controversy points from 1986 to 2026
- recent hotspots from 2025 to 2026
- World Cup, Copa América, qualifiers, and AFA governance topics

---

## Contribution Ideas

Good next directions to expand:

- match-by-match Argentina controversy entries for the 2026 World Cup
- Messi-related public controversies beyond officiating decisions
- more AFA / FIFA governance entries
- replacing Google News aggregator links with original publisher URLs
- adding later official responses or rulings to existing entries

---

## License

This repository does not currently include a dedicated license. If broader open-source distribution is intended, adding a LICENSE file is recommended.
