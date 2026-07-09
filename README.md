# 公平档案 / Fair Archive

一个围绕 **阿根廷国家队 / 梅西相关争议事件** 的静态档案站点。  
A static archive site focused on **controversies involving Argentina, Messi, and related football fairness debates**.

项目目标不是“定罪”，而是以更克制、可追溯的方式记录公共争议。  
The goal is not to "convict" anyone, but to document public controversies in a restrained, traceable way.

---

## 项目定位 / Project Scope

本项目主要收录以下几类内容：

- 判罚争议
- 裁判执法问题
- FIFA / 足协治理争议
- 种族歧视相关指控
- 其他已被广泛报道、具有公共讨论价值的事件

This project mainly records:

- officiating and decision controversies
- refereeing disputes
- FIFA / federation governance disputes
- racism-related allegations
- other broadly reported incidents with clear public-interest value

站点强调三点：

1. **区分“争议”与“已证实”**
2. **每条事件必须带来源**
3. **尽量保留当事方回应或后续裁定**

The archive follows three core rules:

1. **Separate controversy from verified fact**
2. **Every entry must include sources**
3. **Include responses or later rulings whenever possible**

---

## 在线地址 / Live URLs

- GitHub Pages: <https://chinadbo.github.io/fairarchive/>
- 自定义域名 / Custom domain: <https://i.ioodu.com/fairarchive/>

> 注 / Note: 自定义域名可能受到 CDN 或浏览器缓存影响，代码已更新但页面暂未刷新时，可尝试强制刷新或稍等数分钟。  
> The custom domain may be affected by CDN or browser caching. If code has been updated but the page looks stale, try a hard refresh or wait a few minutes.

---

## 技术栈 / Tech Stack

- [Astro](https://astro.build/)
- TypeScript
- Tailwind CSS（通过 `@tailwindcss/vite` / via `@tailwindcss/vite`）
- Vitest
- GitHub Pages（自动部署 / automatic deployment）

---

## 本地开发 / Local Development

### 安装依赖 / Install dependencies

```bash
npm ci
```

### 启动开发环境 / Start dev server

```bash
npm run dev
```

### 构建站点 / Build site

```bash
npm run build
```

### 运行测试 / Run tests

```bash
npm run test
```

---

## 项目结构 / Project Structure

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

当前事件内容位于 / Event content lives in:

- `src/data/events/*.md`

---

## 内容模型 / Content Model

每条事件是一个 Markdown 文件，文件名会自动成为事件 `id`。  
Each event is a Markdown file, and its filename becomes the event `id`.

### 必填字段 / Required fields

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
  - { label: "媒体名", url: "https://example.com", type: 媒体 }
```

### 可选字段 / Optional fields

```yaml
response:
  who: "FIFA / 足协 / 当事人"
  text_zh: "中文回应"
  text_en: "English response"
  source: { label: "声明来源", url: "https://example.com", type: 官方 }

ruling:
  verdict_zh: "中文裁定"
  verdict_en: "English ruling"
  source: { label: "裁定来源", url: "https://example.com", type: 官方 }
```

### category 枚举 / Allowed `category` values

- `判罚争议`
- `裁判执法`
- `FIFA治理`
- `种族歧视指控`
- `其他`

### status 枚举 / Allowed `status` values

- `报道争议`
- `已被质疑`
- `官方裁定`

### source.type 枚举 / Allowed `source.type` values

- `媒体`
- `官方`
- `视频`

---

## 编写原则 / Editorial Rules

这是本项目最重要的部分。  
This is the most important part of the project.

### 1. 不把争议写成定论 / Do not write allegations as settled fact

建议使用下列表达 / Preferred phrasing:

- “据报道” / “according to reports”
- “引发争议” / “sparked controversy”
- “被质疑” / “was questioned”
- “尚未见到最终官方裁定” / “no final official ruling has been seen yet”

避免直接写成 / Avoid writing:

- “被操纵” / “was rigged”
- “已证实偏袒” / “favoritism was proven”
- “就是黑哨” / “it was clearly corrupt refereeing”
- “已经坐实” / “it has been conclusively established”

除非存在明确、可追溯的官方裁定。  
Only use definitive language when there is a clear, traceable official ruling.

### 2. 至少有 1 条来源 / At least one source is required

每条事件必须可追溯。推荐优先级：  
Every event must be traceable. Suggested source priority:

1. 官方声明 / 官方裁定
2. Reuters / AP / BBC / Guardian / ESPN / NYT / Al Jazeera 等主流媒体
3. 其他可交叉验证媒体

### 3. 尽量保留回应 / Preserve responses when available

如果存在当事方、足协、FIFA、裁判负责人、俱乐部或球员回应，优先写入 `response` 字段。  
If a player, federation, FIFA official, referee chief, club, or other party has responded, include it in the `response` field when possible.

### 4. 热点优先，但避免重复堆砌 / Prioritize current topics, but avoid duplication

可拆分独立事件，但应尽量做到：

- 有独立的争议焦点
- 有单独媒体报道价值
- 不只是同一事件的标题改写

An event can be split into separate entries, but each one should ideally have:

- a distinct controversy angle
- independent reporting value
- more than just a rewritten version of the same story

---

## 多语言说明 / Multilingual Support

项目支持：

- 中文（默认）
- 英文

The project currently supports:

- Chinese (default)
- English

标题与摘要均要求同时提供中英文：  
Titles and summaries should be provided in both languages:

- `title_zh` / `title_en`
- `summary_zh` / `summary_en`

---

## 线索提交与复核 / Clue Submission and Review Workflow

当前站点的“提交线索”页面会把内容引导到 GitHub Issue。  
The current "submit clue" page sends submissions to GitHub Issues.

但 **Issue 不会自动显示到首页**。  
However, **issues do not automatically appear on the homepage**.

当前流程是：

1. 用户提交线索到 GitHub Issue
2. 人工复核来源与表述
3. 在 `src/data/events/` 中创建正式 Markdown 事件文件
4. 提交并推送到 `fairness`
5. GitHub Pages 自动部署
6. 首页与详情页自动显示该事件

Current workflow:

1. A user submits a clue as a GitHub issue
2. Sources and wording are manually reviewed
3. A formal Markdown event file is created under `src/data/events/`
4. The change is committed and pushed to `fairness`
5. GitHub Pages deploys automatically
6. The event then appears on the homepage and detail pages

推荐 Issue 标签 / Suggested issue labels:

- `待核实` / pending verification
- `待补来源` / needs sources
- `可入库` / ready for archive
- `已入库` / archived
- `不采纳` / rejected
- `重复线索` / duplicate

---

## 部署说明 / Deployment

项目通过 GitHub Actions 自动部署到 GitHub Pages。  
The project is automatically deployed to GitHub Pages via GitHub Actions.

工作流文件 / Workflow file:

- `.github/workflows/deploy.yml`

触发方式 / Triggers:

- push 到 `fairness`
- 手动触发 `workflow_dispatch`

部署流程 / Deployment flow:

1. `npm ci`
2. `npm run build`
3. 上传 `dist/`
4. 发布到 GitHub Pages

### Astro 站点配置 / Astro site config

当前配置位于 `astro.config.mjs`：

- `site`: `https://chinadbo.github.io`
- `base`: `/fairarchive`

因此所有静态资源和内部链接都需要兼容子路径部署。  
Because of this, all static assets and internal links must work under a subpath deployment.

---

## 更新内容的建议流程 / Suggested Update Workflow

### 新增事件 / Add a new event

1. 在 `src/data/events/` 新建一个 `.md` 文件
2. 按 schema 填写 frontmatter
3. 保持文字克制、来源可追溯
4. 运行构建检查
5. 检查页面是否正确生成
6. 提交并推送到 `fairness`

1. Create a new `.md` file in `src/data/events/`
2. Fill out the frontmatter according to the schema
3. Keep wording restrained and sources traceable
4. Run the build
5. Confirm the page renders correctly
6. Commit and push to `fairness`

### 推荐命令 / Recommended commands

```bash
git add .
git commit -m "add new event entries"
git push origin fairness
```

---

## 测试覆盖 / Test Coverage

当前测试主要覆盖：

- 内容 schema 校验
- 过滤逻辑
- 日期排序
- 多语言字段读取

Current tests mainly cover:

- content schema validation
- filtering logic
- date ordering
- multilingual field fallback / lookup

测试目录 / Test files:

- `tests/schema.test.ts`
- `tests/filters.test.ts`
- `tests/i18n.test.ts`

---

## 当前状态 / Current Status

截至目前，站内已收录 **40+ 条** 事件，覆盖：

- 1986–2026 的代表性争议节点
- 2025–2026 的近期热点
- 世界杯 / 美洲杯 / 世预赛 / AFA 治理相关内容

At present, the archive contains **40+ entries**, covering:

- notable controversy points from 1986 to 2026
- recent hotspots from 2025 to 2026
- World Cup, Copa América, qualifiers, and AFA governance topics

---

## 贡献建议 / Contribution Ideas

欢迎继续补充以下方向：

- 2026 世界杯阿根廷各场比赛争议细分
- 梅西个人相关非判罚类公共争议
- AFA / FIFA 治理类事件补档
- 用原始媒体链接替换 Google News 聚合链接
- 补充事件后续官方回应 / 裁定

Good next directions to expand:

- match-by-match Argentina controversy entries for the 2026 World Cup
- Messi-related public controversies beyond officiating decisions
- more AFA / FIFA governance entries
- replacing Google News aggregator links with original publisher URLs
- adding later official responses or rulings to existing entries

---

## License

当前仓库未单独声明许可证；如需开源分发，建议补充 LICENSE 文件。  
This repository does not currently include a dedicated license. If broader open-source distribution is intended, adding a LICENSE file is recommended.
