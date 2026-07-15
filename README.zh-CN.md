# 公平档案

[English](./README.md)

一个围绕 **阿根廷国家队 / 梅西相关争议事件** 的静态档案站点。

项目目标不是“定罪”，而是以更克制、可追溯的方式记录公共争议。

---

## 项目定位

本项目主要收录以下几类内容：

- 判罚争议
- 裁判执法问题
- FIFA / 足协治理争议
- 种族歧视相关指控
- 其他已被广泛报道、具有公共讨论价值的事件

站点强调三点：

1. **区分“争议”与“已证实”**
2. **每条事件必须带来源**
3. **尽量保留当事方回应或后续裁定**

---

## 在线地址

- GitHub Pages: <https://chinadbo.github.io/fairarchive/>
- 自定义域名: <https://i.ioodu.com/fairarchive/>

> 注：自定义域名可能受到 CDN 或浏览器缓存影响，代码已更新但页面暂未刷新时，可尝试强制刷新或稍等数分钟。

---

## README 多语言支持

- 英文：`README.md`
- 简体中文：`README.zh-CN.md`

后续如果需要，也可以继续增加：

- `README.ja.md`
- `README.fr.md`
- `README.es.md`

---

## 参与贡献

参与贡献请见 [CONTRIBUTING.zh-CN.md](./CONTRIBUTING.zh-CN.md)。

---

## 技术栈

- [Astro](https://astro.build/)
- TypeScript
- 通过 `@tailwindcss/vite` 使用 Tailwind CSS
- Vitest
- GitHub Pages 自动部署

---

## 本地开发

### 安装依赖

```bash
npm ci
```

### 启动开发环境

```bash
npm run dev
```

### 构建站点

```bash
npm run build
```

### 运行测试

```bash
npm run test
```

---

## 项目结构

```text
.
├── public/
│   └── favicon.svg
├── src/
│   ├── components/        # 组件
│   ├── data/events/       # 事件 Markdown 数据
│   ├── layouts/           # 页面布局
│   ├── lib/               # 过滤、i18n、路径等工具函数
│   ├── pages/             # 路由页面
│   ├── content.config.ts  # 内容 schema
│   └── content.ts         # 内容读取封装
├── tests/                 # schema / filters / i18n 测试
├── astro.config.mjs
├── package.json
└── .github/workflows/deploy.yml
```

当前事件内容位于：

- `src/data/events/*.md`

---

## 内容模型

每条事件是一个 Markdown 文件，文件名会自动成为事件 `id`。

### 必填字段

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

### 可选字段

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

### category 枚举

- `判罚争议`
- `裁判执法`
- `FIFA治理`
- `种族歧视指控`
- `其他`

### status 枚举

- `报道争议`
- `已被质疑`
- `官方裁定`

### source.type 枚举

- `媒体`
- `官方`
- `视频`

---

## 编写原则

### 1. 不把争议写成定论

建议使用下列表达：

- “据报道”
- “引发争议”
- “被质疑”
- “尚未见到最终官方裁定”

避免直接写成：

- “被操纵”
- “已证实偏袒”
- “就是黑哨”
- “已经坐实”

除非存在明确、可追溯的官方裁定。

### 2. 至少有 1 条来源

每条事件必须可追溯。推荐优先级：

1. 官方声明 / 官方裁定
2. Reuters / AP / BBC / Guardian / ESPN / NYT / Al Jazeera 等主流媒体
3. 其他可交叉验证媒体

### 3. 尽量保留回应

如果存在当事方、足协、FIFA、裁判负责人、俱乐部或球员回应，优先写入 `response` 字段。

### 4. 热点优先，但避免重复堆砌

可拆分独立事件，但应尽量做到：

- 有独立的争议焦点
- 有单独媒体报道价值
- 不只是同一事件的标题改写

---

## 多语言内容支持

站点当前支持：

- 中文（默认）
- 英文

标题与摘要均要求同时提供中英文：

- `title_zh` / `title_en`
- `summary_zh` / `summary_en`

---

## 线索提交与复核流程

当前站点的“提交线索”页面会把内容引导到 GitHub Issue。

但 **Issue 不会自动显示到首页**。

当前流程是：

1. 用户提交线索到 GitHub Issue
2. 人工复核来源与表述
3. 在 `src/data/events/` 中创建正式 Markdown 事件文件
4. 提交并推送到 `fairness`
5. GitHub Pages 自动部署
6. 首页与详情页自动显示该事件

推荐 Issue 标签：

- `待核实`
- `待补来源`
- `可入库`
- `已入库`
- `不采纳`
- `重复线索`

---

## 部署说明

项目通过 GitHub Actions 自动部署到 GitHub Pages。

工作流文件：

- `.github/workflows/deploy.yml`

触发方式：

- push 到 `fairness`
- 手动触发 `workflow_dispatch`

部署流程：

1. `npm ci`
2. `npm run build`
3. 上传 `dist/`
4. 发布到 GitHub Pages

### Astro 站点配置

当前配置位于 `astro.config.mjs`：

- `site`: `https://chinadbo.github.io`
- `base`: `/fairarchive`

因此所有静态资源和内部链接都需要兼容子路径部署。

---

## 更新内容的建议流程

### 新增事件

1. 在 `src/data/events/` 新建一个 `.md` 文件
2. 按 schema 填写 frontmatter
3. 保持文字克制、来源可追溯
4. 运行构建检查
5. 检查页面是否正确生成
6. 提交并推送到 `fairness`

### 推荐命令

```bash
git add .
git commit -m "add new event entries"
git push origin fairness
```

---

## 测试覆盖

当前测试主要覆盖：

- 内容 schema 校验
- 过滤逻辑
- 日期排序
- 多语言字段读取

测试目录：

- `tests/schema.test.ts`
- `tests/filters.test.ts`
- `tests/i18n.test.ts`

---

## 当前状态

截至目前，站内已收录 **40+ 条** 事件，覆盖：

- 1986–2026 的代表性争议节点
- 2025–2026 的近期热点
- 世界杯 / 美洲杯 / 世预赛 / AFA 治理相关内容

---

## 贡献建议

欢迎继续补充以下方向：

- 2026 世界杯阿根廷各场比赛争议细分
- 梅西个人相关非判罚类公共争议
- AFA / FIFA 治理类事件补档
- 用原始媒体链接替换 Google News 聚合链接
- 补充事件后续官方回应 / 裁定

---

## License

当前仓库未单独声明许可证；如需开源分发，建议补充 LICENSE 文件。
