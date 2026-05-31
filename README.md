# Node Path Copier for Slint / Slint 节点路径拷贝器

[English](#english) · [中文](#中文)

---

<a id="english"></a>

## English

**Node Path Copier for Slint** is a community fork of the official [Slint](https://slint.dev) VS Code extension. It is built for developers who work with **AI coding assistants** (Cursor, GitHub Copilot, Claude, etc.) and need **precise, unambiguous references** to UI elements in `.slint` files.

> **Not affiliated with SixtyFPS.** This is **not** the official Slint extension. Official: [Slint.slint](https://marketplace.visualstudio.com/items?itemName=Slint.slint) by SixtyFPS GmbH.

### Why Node Path Copier?

When you ask an AI to *“move this button 10px left”* or *“change the label color in the login form”*, the hardest part is not the edit itself — it is **telling the AI exactly which element you mean**. Slint UIs are deeply nested: `Window` → `VerticalLayout` → `HorizontalLayout` → `Button` → …

**Node Path Copier solves this with Copy node hierarchy** — copy the full element path from the live preview and paste it straight into your AI chat.

### Copy node hierarchy — built for AI precision

In **interactive preview mode**, select any element and use **Copy node** (button or context menu in the selection popup). The clipboard receives a **structured hierarchy string**, for example:

```
MainWindow > VerticalLayout#root > LoginForm > HorizontalLayout > Button#submit
```

**What you get:**

| Benefit | Description |
|--------|-------------|
| **Unambiguous targeting** | The AI receives an exact path, not vague descriptions like “the blue button on the right”. |
| **Full ancestor chain** | Parent containers are included, so the model understands layout context and scope. |
| **Stable identifiers** | Element ids and types are preserved — fewer wrong-component edits. |
| **Faster iteration** | Select in preview → copy → paste into chat → AI edits the right `.slint` block immediately. |
| **Works with any AI tool** | Plain text on the clipboard — use Cursor, Copilot Chat, Claude, or any assistant. |

**Typical workflow**

1. Open **Node Path Copier: Show Preview** on your `.slint` file.
2. Switch to **interactive / selecting** mode and click the target widget.
3. Click **Copy node** in the selection popup.
4. Paste into your AI assistant: *“Change the text of `MainWindow > … > Button#submit` to ‘Sign in’.”*
5. The AI locates the correct element on the first try.

This is the core idea: **bridge the gap between visual UI and AI-readable structure**.

### Other features

- **Chinese live-preview UI** — `slint.preview.language`: `auto` / `en` / `zh-cn`
- Syntax highlighting, diagnostics, completion, go-to definition
- Live preview with on-the-fly updates
- Rust embedded-Slint grammar injection

### Installation

**Marketplace:** search **Node Path Copier for Slint** (`slint-ai.slint-ai`).

**Local VSIX:**

```sh
code --install-extension slint-ai-1.17.1.vsix
```

**Build from source:**

```sh
pnpm install
pnpm compile:desktop
# Copy slint-lsp.exe into bin/ (see docs in repo)
pnpm package:desktop
```

### Settings

| Key | Values | Description |
|-----|--------|-------------|
| `slint.preview.language` | `auto`, `en`, `zh-cn` | Preview UI language |
| `slint.lspBinaryPath` | path | Custom LSP binary (empty = bundled) |

### License & upstream

Based on [slint-ui/slint](https://github.com/slint-ui/slint) (`editors/vscode`). Licensed under **GPL-3.0** (see [LICENSE.txt](LICENSE.txt)).

### Source code

| Component | Location | Status |
|-----------|----------|--------|
| **VS Code extension** (TypeScript) | This repository | ✅ Public |
| **slint-lsp** (Rust, copy-node + zh-cn preview) | Separate fork — see [docs/SOURCE.md](docs/SOURCE.md) | 🚧 In progress |

The packaged VSIX includes a prebuilt `slint-lsp` binary for Windows x64. Corresponding Rust source will be published in a linked repository to comply with GPL and upstream requests.

**Issues for this fork:** [github.com/liuqianjin559-cmyk/slint-ai/issues](https://github.com/liuqianjin559-cmyk/slint-ai/issues)

---

<a id="中文"></a>

## 中文

**Node Path Copier for Slint**（Slint 节点路径拷贝器）是基于官方 [Slint](https://slint.dev) VS Code 扩展打造的**社区增强版**，面向使用 **AI 编程助手**（Cursor、GitHub Copilot、Claude 等）的 Slint 开发者，解决「**如何让 AI 精准定位 UI 元素**」这一核心痛点。

> **与 SixtyFPS 无关联，非官方扩展。** 官方版本：[Slint.slint](https://marketplace.visualstudio.com/items?itemName=Slint.slint)（SixtyFPS GmbH）。

### 为什么需要 Node Path Copier？

当你对 AI 说「把这个按钮往左移 10px」或「改登录表单里那个标签的颜色」时，最难的不是改代码，而是 **说清楚指的是哪个控件**。Slint 界面往往嵌套很深：`Window` → `VerticalLayout` → `HorizontalLayout` → `Button` → …

**核心能力：拷贝节点层级（Copy node）** —— 在实时预览里选中元素，一键复制完整层级路径，直接粘贴给 AI。

### 拷贝节点层级 —— 为 AI 精准定位而设计

在 **交互式预览 / 选择模式** 下，选中任意元素，在选区弹窗中点击 **「复制节点 / Copy node」**（按钮或右键菜单），剪贴板会得到 **结构化层级字符串**，例如：

```
MainWindow > VerticalLayout#root > LoginForm > HorizontalLayout > Button#submit
```

**带来的好处：**

| 优势 | 说明 |
|------|------|
| **消除歧义** | AI 拿到的是精确路径，而不是「右边蓝色按钮」这类模糊描述。 |
| **完整祖先链** | 包含父级容器，AI 能理解布局上下文，避免改错同级组件。 |
| **稳定标识** | 保留元素类型与 id，减少「改 A 却动了 B」的情况。 |
| **迭代更快** | 预览选中 → 复制 → 粘贴到对话 → AI 一次定位到正确的 `.slint` 代码块。 |
| **通用** | 纯文本剪贴板，适用于 Cursor、Copilot、Claude 等任意 AI 工具。 |

**推荐工作流**

1. 在 `.slint` 文件上执行 **Node Path Copier: Show Preview**。
2. 进入 **交互 / 选择** 模式，点击目标控件。
3. 在选区弹窗点击 **复制节点**。
4. 粘贴到 AI 对话：*「把 `MainWindow > … > Button#submit` 的文本改成「登录」。」*
5. AI 首次即可定位到正确元素并完成修改。

**目标：在可视化 UI 与 AI 可理解的结构描述之间架起桥梁。**

### 其他功能

- **预览界面中文** — 设置 `slint.preview.language`：`auto` / `en` / `zh-cn`
- 语法高亮、诊断、补全、跳转定义
- 实时预览，编辑即更新
- Rust 内嵌 Slint 语法注入

### 安装

**应用市场：** 搜索 **Node Path Copier for Slint**（`slint-ai.slint-ai`）。

**本地 VSIX：**

```sh
code --install-extension slint-ai-1.17.1.vsix
```

**源码构建：**

```sh
pnpm install
pnpm compile:desktop
# 将 slint-lsp.exe 放入 bin/ 目录
pnpm package:desktop
```

### 配置

| 配置项 | 可选值 | 说明 |
|--------|--------|------|
| `slint.preview.language` | `auto`、`en`、`zh-cn` | 预览界面语言 |
| `slint.lspBinaryPath` | 路径 | 自定义 LSP（留空使用内置） |

### 许可与上游

基于 [slint-ui/slint](https://github.com/slint-ui/slint)（`editors/vscode`）修改，遵循 **GPL-3.0**（见 [LICENSE.txt](LICENSE.txt)）。

### 源码说明

| 组件 | 位置 | 状态 |
|------|------|------|
| **VS Code 扩展**（TypeScript） | 本仓库 | ✅ 已公开 |
| **slint-lsp**（Rust，拷贝节点 + 中文预览） | 独立 fork — 见 [docs/SOURCE.md](docs/SOURCE.md) | 🚧 整理发布中 |

打包的 VSIX 内含 Windows x64 预编译 `slint-lsp`。对应 Rust 源码将在链接仓库中公开，以满足 GPL 与上游要求。

**本 fork 问题反馈：** [github.com/liuqianjin559-cmyk/slint-ai/issues](https://github.com/liuqianjin559-cmyk/slint-ai/issues)
