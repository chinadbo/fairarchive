# Contributing to Fair Archive

Thanks for your interest in contributing! This is a bilingual (English / 简体中文) archive of publicly reported football controversies involving Argentina and Messi. The goal is a restrained, traceable record — **not a conviction record**. For the full project scope and mission, see [README.md](./README.md).

There are two ways to contribute:

- **Submit a lead** — no coding required; the `/submit` page opens a pre-filled GitHub issue.
- **Open a pull request** — add or improve an event entry directly.

---

## Path A: Submit a lead (no coding)

1. Open the [Submit a Lead](https://chinadbo.github.io/fairarchive/submit) page (or `/zh/submit`).
2. Fill in date, category, status, title(s), summary, and at least one source URL.
3. Submitting opens a pre-filled GitHub Issue on the repo.

The issue does **not** appear on the site automatically. A maintainer reviews sources and wording, then creates a Markdown event file (see Path B), commits to `fairness`, and GitHub Pages deploys it.

### Issue labels

- `待核实` — pending verification
- `待补来源` — needs sources
- `可入库` — ready for archive
- `已入库` — archived
- `不采纳` — rejected
- `重复线索` — duplicate

---

## Path B: Add or edit an event via pull request

### 1. Local setup

```bash
npm ci            # install dependencies
npm run dev       # start the dev server
npm run build     # astro check + build (run before every PR)
npm test          # schema / filters / i18n tests
```

### 2. Branch

Branch off `fairness` (the default and deploy branch):

```bash
git checkout fairness
git pull
git checkout -b event/your-event-slug
```

### 3. Create the event file

Create a new Markdown file in `src/data/events/`. The **filename (without `.md`) becomes the event `id`** and the URL slug, so use kebab-case, e.g. `2026-wc-final-arg-fra-penalties.md`.

### 4. Fill the frontmatter

Required fields:

```yaml
date: 2026-07-09
category: 判罚争议
status: 报道争议
title_zh: "中文标题"
title_en: "English title"
summary_zh: "中文摘要"
summary_en: "English summary"
tags: [2026世界杯, Messi, Argentina]
sources:
  - { label: "Media name", url: "https://example.com", type: 媒体 }
```

Optional fields (include whenever available):

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

Allowed enum values:

- `category`: `判罚争议` | `裁判执法` | `FIFA治理` | `种族歧视指控` | `其他`
- `status`: `报道争议` | `已被质疑` | `官方裁定` (default `报道争议`)
- `source.type`: `媒体` | `官方` | `视频`

### 5. Build and test

```bash
npm run build
npm test
```

The build runs `astro check`, which validates the content schema. If a required field is missing or an enum is invalid, the build fails — fix it before continuing.

### 6. Commit and open the PR

```bash
git add src/data/events/your-event-slug.md
git commit -m "add new event: <short title>"
git push -u origin event/your-event-slug
```

Open a PR against the **`fairness`** branch. Commit messages in this repo use prefixes like `feat:`, `docs:`, `chore:`, or the plain `add new event: ...` form.

---

## Editorial rules (condensed)

These are the heart of a good contribution. For the full list with phrasing examples, see the [Editorial Rules](./README.md#editorial-rules) section of the README.

1. **Do not write allegations as settled fact.** Prefer "according to reports", "sparked controversy", "was questioned", "no final official ruling has been seen yet". Avoid "was rigged", "favoritism was proven", "it was clearly corrupt". Use definitive language only when there is a clear, traceable official ruling.
2. **At least one source is required.** Priority: official statements/rulings → Reuters, AP, BBC, Guardian, ESPN, NYT, Al Jazeera → other cross-verifiable reporting. Replace aggregator links with the original publisher where possible.
3. **Preserve responses.** If the accused party, federation, FIFA, referee chief, or club responded, add it in the `response` field.
4. **Avoid duplication.** Splitting one incident into multiple entries is fine, but each should have a distinct controversy angle and independent reporting value.

---

## Bilingual requirement

Titles and summaries must be provided in **both** languages: `title_zh` / `title_en` and `summary_zh` / `summary_en`. The interface is English-default with a Chinese mirror under `/zh/`. If you only have one language, submit a lead (Path A) and a maintainer will complete the translation.

## UI / code conventions (brief)

- New pages must exist in **both** `src/pages/` and `src/pages/zh/`, sharing one `Base` layout.
- Localize visible strings via the inline `t` pattern (`lang === 'zh' ? {...} : {...}`); see `Header.astro` / `Footer.astro`.
- Reuse design tokens from `src/styles/tokens.css` (colors, spacing, radius). No icon fonts — inline SVG only.
- Never write an allegation as a confirmed fact in code comments, copy, or data.

## Tone

Be respectful. This project documents disputes, not people to be condemned. No defamation, no doxxing, no partisan framing. Disagreements about an entry's wording are welcome in the issue tracker.
