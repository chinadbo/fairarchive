# 贡献指南 · 公平档案

感谢你有意为公平档案贡献内容!本项目是一个围绕 **阿根廷国家队 / 梅西相关争议事件** 的双语(中文 / English)静态档案。目标是克制、可追溯的记录,**不是定罪材料**。完整的项目定位与范围见 [README.zh-CN.md](./README.zh-CN.md)。

参与贡献有两种方式:

- **提交线索** —— 无需写代码,`/zh/submit` 页面会打开一个预填好的 GitHub Issue。
- **提交 Pull Request** —— 直接新增或完善事件条目。

---

## 方式 A:提交线索(无需写代码)

1. 打开 [提交线索](https://chinadbo.github.io/fairarchive/zh/submit) 页面(或英文站 `/submit`)。
2. 填写日期、类别、状态、标题、摘要,以及至少一个来源链接。
3. 提交后会自动在仓库打开一个预填好的 GitHub Issue。

Issue **不会**自动出现在网站上。维护者会核实来源与措辞,随后按方式 B 创建 Markdown 事件文件,提交到 `fairness` 分支,由 GitHub Pages 自动部署。

### Issue 标签

- `待核实` —— 待核实
- `待补来源` —— 需补充来源
- `可入库` —— 可入库
- `已入库` —— 已入库
- `不采纳` —— 不采纳
- `重复线索` —— 重复

---

## 方式 B:通过 Pull Request 新增或完善事件

### 1. 本地环境

```bash
npm ci            # 安装依赖
npm run dev       # 启动开发服务器
npm run build     # astro check + 构建(每次提 PR 前都跑一遍)
npm test          # schema / 过滤 / i18n 测试
```

### 2. 分支

从 `fairness`(默认与部署分支)切出新分支:

```bash
git checkout fairness
git pull
git checkout -b event/your-event-slug
```

### 3. 创建事件文件

在 `src/data/events/` 下新建一个 Markdown 文件。**文件名(去掉 `.md`)就是事件 `id` 与 URL**,请使用 kebab-case,例如 `2026-wc-final-arg-fra-penalties.md`。

### 4. 填写 frontmatter

必填字段:

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
  - { label: "媒体名称", url: "https://example.com", type: 媒体 }
```

选填字段(有就尽量补):

```yaml
response:
  who: "FIFA / 足协 / 相关方"
  text_zh: "中文回应"
  text_en: "English response"
  source: { label: "声明来源", url: "https://example.com", type: 官方 }

ruling:
  verdict_zh: "中文裁定"
  verdict_en: "English ruling"
  source: { label: "裁定来源", url: "https://example.com", type: 官方 }
```

允许的枚举值:

- `category`:`判罚争议` | `裁判执法` | `FIFA治理` | `种族歧视指控` | `其他`
- `status`:`报道争议` | `已被质疑` | `官方裁定`(默认 `报道争议`)
- `source.type`:`媒体` | `官方` | `视频`

### 5. 构建并测试

```bash
npm run build
npm test
```

构建会运行 `astro check`,校验内容 schema。缺少必填字段或枚举值非法时构建会失败,请先修好再继续。

### 6. 提交并开 PR

```bash
git add src/data/events/your-event-slug.md
git commit -m "add new event: <简短标题>"
git push -u origin event/your-event-slug
```

向 **`fairness`** 分支发起 PR。本仓库的提交信息约定使用 `feat:`、`docs:`、`chore:` 等前缀,或 `add new event: ...` 的写法。

---

## 编辑准则(精简版)

这是一条好贡献的核心。完整列表与措辞示例见 README 的 [编辑准则](./README.zh-CN.md) 章节。

1. **不要把指控写成既定事实。** 优先用"据报道""引发争议""受到质疑""尚无最终官方裁定"等措辞;避免"被操控""已被证明偏袒""明显是黑哨"等。只有在存在清晰可追溯的官方裁定时,才使用定性语言。
2. **至少一个来源。** 优先级:官方声明/裁定 → 路透、AP、BBC、卫报、ESPN、纽约时报、半岛电视台 → 其它可交叉印证的报道。尽量把聚合链接替换为原始发布方链接。
3. **保留回应。** 若当事方、足协、FIFA、裁判主管或俱乐部有回应,填入 `response` 字段。
4. **避免重复。** 一个事件拆成多条可以,但每条应有独立的争议角度与独立的报道价值。

---

## 双语要求

标题与摘要必须同时提供两种语言:`title_zh` / `title_en` 与 `summary_zh` / `summary_en`。界面以英文为默认,中文镜像在 `/zh/` 下。若你只有一种语言,请走方式 A 提交线索,由维护者补齐翻译。

## 界面 / 代码约定(简述)

- 新页面必须同时存在于 `src/pages/` 与 `src/pages/zh/`,共用同一份 `Base` 布局。
- 可见文案用内联 `t` 模式(`lang === 'zh' ? {...} : {...}`)本地化,参见 `Header.astro` / `Footer.astro`。
- 复用 `src/styles/tokens.css` 中的设计令牌(颜色、间距、圆角)。不使用图标字体,一律内联 SVG。
- 在代码注释、文案或数据里,都不要把指控写成既定事实。

## 语气

保持尊重。本项目记录的是争议,不是要给谁定罪。不诽谤、不人肉、不站队。对某条目的措辞有不同意见,欢迎到 Issue 列表讨论。
