# Source code layout / 源码结构

## English

This repository is **self-contained** for the VS Code extension and documents all **slint-lsp** changes needed to build the bundled binary.

### 1. VS Code extension (this repo root)

- **Repository:** https://github.com/liuqianjin559-cmyk/slint-ai
- **Language:** TypeScript
- **Includes:** LSP client, `slint/set_clipboard`, `slint/set_preview_language`, preview language settings

### 2. slint-lsp changes (overlay, not a full Slint fork)

- **Location:** [`patches/lsp/overlay/`](patches/lsp/overlay/)
- **Upstream base:** [slint-ui/slint](https://github.com/slint-ui/slint) tag **`v1.15.0`**
- **Manifest:** [`patches/lsp/MANIFEST.json`](patches/lsp/MANIFEST.json)
- **Upstreaming guide:** [`docs/UPSTREAM.md`](UPSTREAM.md)

**Features:**

| Feature | Key files |
|---------|-----------|
| Copy node hierarchy | `preview/element_selection.rs`, `selection-popup.slint`, `SetClipboard` in `common.rs` |
| Preview i18n | `preview.rs`, `lang/zh-cn/`, `ui/main.slint` language menu |

### Build from source

```powershell
# One-time: clone upstream Slint
git clone --depth 1 --branch v1.15.0 https://github.com/slint-ui/slint.git ../slint

cd slint-ai   # this repo
pnpm install
pnpm apply:lsp-patches   # copy overlay onto ../slint
pnpm build:lsp-local     # cargo build + copy to bin/
pnpm compile:desktop
pnpm package:desktop
```

Set `SLINT_DIR` if Slint is not at `../slint`.

### Debug in VS Code

1. Open this folder in VS Code
2. `pnpm apply:lsp-patches && pnpm build:lsp-local && pnpm compile:desktop`
3. Press **F5** — uses `bin/slint-lsp.exe` via workspace settings

---

## 中文

### 1. VS Code 扩展（本仓库根目录）

- TypeScript 源码在 `src/`

### 2. slint-lsp 改动（overlay）

- **不是**完整 Slint 仓库，只有改过的文件：`patches/lsp/overlay/`
- 基于官方 **v1.15.0**，给 Slint 维护者看的说明在 [`docs/UPSTREAM.md`](UPSTREAM.md)

### 构建

```powershell
git clone --depth 1 --branch v1.15.0 https://github.com/slint-ui/slint.git ../slint
pnpm install
pnpm apply:lsp-patches
pnpm build:lsp-local
pnpm compile:desktop
```

然后 **F5** 调试扩展。
