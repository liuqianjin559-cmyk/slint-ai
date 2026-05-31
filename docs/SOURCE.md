# Source code layout / 源码结构

## English

This project has **two parts**:

### 1. VS Code extension (this repo) ✅

- **Repository:** https://github.com/liuqianjin559-cmyk/slint-ai
- **Language:** TypeScript
- **Includes:** extension UI, LSP client, clipboard handler for `slint/set_clipboard`

### 2. Forked `slint-lsp` (Rust) 🚧

The VSIX bundles a modified `slint-lsp` binary with:

- **Copy node hierarchy** — preview UI sends element path via `slint/set_clipboard`
- **Chinese preview UI** — `slint.preview.language` support

The Rust changes live in a fork of [slint-ui/slint](https://github.com/slint-ui/slint), typically under `tools/lsp` and live-preview crates.

**Status:** A dedicated public repository for the LSP fork is being prepared. Once published, this file will link to it with build instructions and version tags matching each extension release (e.g. `v1.17.1`).

**Build extension only (no LSP rebuild):**

```sh
pnpm install
pnpm compile:desktop
pnpm package:desktop   # uses existing bin/slint-lsp.exe if present
```

---

## 中文

本项目分 **两部分**：

### 1. VS Code 扩展（本仓库）✅

- **仓库：** https://github.com/liuqianjin559-cmyk/slint-ai
- **语言：** TypeScript

### 2. 修改版 `slint-lsp`（Rust）🚧

VSIX 内打包的 `slint-lsp` 包含「拷贝节点层级」和「预览中文」等改动，源码来自 [slint-ui/slint](https://github.com/slint-ui/slint) 的 fork。

**状态：** 独立 LSP 源码仓库正在整理并即将公开；发布后此处会附上链接及与扩展版本对应的 tag（如 `v1.17.1`）。
