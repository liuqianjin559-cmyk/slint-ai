# Source code layout / 源码结构

## English

This project has **two parts**:

### 1. VS Code extension (this repo) ✅

- **Repository:** https://github.com/liuqianjin559-cmyk/slint-ai
- **Path:** `vscode/`
- **Language:** TypeScript
- **Includes:** LSP client, `slint/set_clipboard` handler, preview language settings

### 2. Forked `slint-lsp` (Rust) ✅

- **Path:** [`../slint/`](../slint/) (junction to local Slint tree)
- **Upstream base:** [slint-ui/slint](https://github.com/slint-ui/slint)
- **Changes:** `tools/lsp/` — copy node hierarchy, `SetClipboard` LSP notification

**Key modified files:**

| File | Change |
|------|--------|
| `tools/lsp/common.rs` | `PreviewToLspMessage::SetClipboard`, `slint/set_clipboard` notification |
| `tools/lsp/preview/element_selection.rs` | Build hierarchy string, `copy_node_hierarchy()` |
| `tools/lsp/preview/ui.rs` | Wire `copy-node-hierarchy` callback |
| `tools/lsp/ui/api.slint` | `copy-node-hierarchy` callback |
| `tools/lsp/ui/components/selection-popup.slint` | **Copy node** button |

### Build LSP + extension

```powershell
cd vscode
pnpm install
pnpm build:lsp-local    # cargo build slint-lsp + copy to bin/
pnpm compile:desktop
pnpm package:desktop
```

### Debug in VS Code

1. Open the `vscode` folder in VS Code
2. Run **Terminal → Run Build Task** or `pnpm build:lsp-local && pnpm compile:desktop`
3. Press **F5** (Run Extension) — uses `bin/slint-lsp.exe` via workspace settings

---

## 中文

### 1. VS Code 扩展（本仓库）✅

- **仓库：** https://github.com/liuqianjin559-cmyk/slint-ai
- **目录：** `vscode/`

### 2. 修改版 slint-lsp（Rust）✅

- **目录：** [`../slint/`](../slint/)
- **改动位置：** `tools/lsp/`（拷贝节点层级 + 剪贴板通知）

### 构建与调试

```powershell
cd vscode
pnpm build:lsp-local
pnpm compile:desktop
```

然后按 **F5** 启动扩展调试。
