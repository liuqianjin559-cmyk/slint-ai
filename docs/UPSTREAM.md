# Upstreaming guide for Slint maintainers

This document is for [slint-ui/slint](https://github.com/slint-ui/slint) maintainers (and anyone porting these changes to current `master`).

**Author intent:** The feature ideas and usage requirements come from community use (AI-assisted Slint editing). Implementation was assisted by Cursor AI. The author welcomes Slint to upstream, port, or rewrite these changes and does not plan to open a PR themselves.

**License:** MIT-0 (see [CONTRIBUTING.md](https://github.com/slint-ui/slint/blob/master/CONTRIBUTING.md) in Slint).

---

## What this repo contains

| Part | Location | Description |
|------|----------|-------------|
| VS Code extension | `src/` | Community extension **Node Path Copier for Slint** |
| LSP overlay | `patches/lsp/overlay/` | Modified `tools/lsp/` files vs **Slint v1.15.0** |
| Manifest | `patches/lsp/MANIFEST.json` | File list and feature grouping |

The packaged VSIX includes a prebuilt `bin/slint-lsp.exe` built from: `v1.15.0` + this overlay.

---

## Features to upstream

### 1. Copy node hierarchy (primary — ogoffart feedback)

**Goal:** From live preview element selection, copy a structured path string to the clipboard so users can paste precise element references into AI chat.

**Example output:**

```
hello.slint->Hello@L3{title="..."}->VerticalBox@L8{alignment=center}->Rectangle@L14{background=#0066ff}->Text@L20{text="Click me"}
```

**Design choices:**

- Path from root component to selected node only (not full tree below selection)
- Format: `file->Type@L{line}{props}->...` with `->` separator
- Properties: only **locally bound** on that node (not inherited defaults)
- Implementation nodes filtered (`TouchArea`, `FocusScope`, etc.) unless selected

**LSP files:**

| File | Change |
|------|--------|
| `tools/lsp/preview/element_selection.rs` | `copy_hierarchy_string()`, property extraction, path filtering |
| `tools/lsp/ui/components/selection-popup.slint` | **Copy node** button + context menu entry |
| `tools/lsp/ui/api.slint` | `copy-node-hierarchy` callback |
| `tools/lsp/preview/ui.rs` | Wire callback → `copy_node_hierarchy()` |
| `tools/lsp/common.rs` | `PreviewToLspMessage::SetClipboard`, `SetClipboardNotification` |
| `tools/lsp/main.rs`, `wasm_main.rs` | Handle `SetClipboard` → notify editor |

**Extension side (official `editors/vscode/` — not in overlay):**

| File | Change |
|------|--------|
| `src/common.ts` | `onNotification("slint/set_clipboard")` → `vscode.env.clipboard.writeText` |

Compare with this repo's `src/common.ts` lines handling `slint/set_clipboard`.

---

### 2. Preview UI internationalization

**Goal:** Language menu in preview (Follow VS Code / English / 中文), bundled zh-cn translations.

**LSP files:**

| File | Change |
|------|--------|
| `tools/lsp/preview.rs` | `apply_preview_language`, `set_preview_language`, `config_changed` skips reload on language-only change |
| `tools/lsp/language.rs` | Parse `slint.preview.language` from workspace config |
| `tools/lsp/common.rs` | `PreviewConfig.language`, `client_locale`, `SetPreviewLanguage` message |
| `tools/lsp/build.rs` | `with_bundled_translations("lang")` |
| `tools/lsp/lang/zh-cn/LC_MESSAGES/slint-lsp.po` | Chinese strings |
| `tools/lsp/ui/main.slint` | Language menu (radio-style via `✓` prefix, not checkable toggles) |
| `tools/lsp/ui/api.slint` | `preview-language`, `set-preview-language` |
| `tools/lsp/main.rs`, `wasm_main.rs` | Handle `SetPreviewLanguage` |

**Extension side:**

| File | Change |
|------|--------|
| `package.json` | `slint.preview.language` setting (`auto` / `en` / `zh-cn`) |
| `src/common.ts` | `slint/set_preview_language` → update workspace config |
| `src/common.ts` | Only call `wasm_preview.update_configuration()` when `preview.providedByEditor` changes (avoids LSP crash on language switch) |

---

## Porting to Slint master (1.17+)

Our overlay targets **v1.15.0**. Current `master` has moved protocol types (e.g. toward `i_slint_live_preview::protocol`) and reorganized LSP modules.

**Suggested approach:**

1. Read overlay files in `patches/lsp/overlay/tools/lsp/` as reference implementation
2. Re-implement against current `master` APIs (do not expect `git apply` to work)
3. Split into 1–2 PRs if easier to review:
   - PR A: Copy node hierarchy + SetClipboard
   - PR B: Preview i18n + SetPreviewLanguage

**Bugfixes worth cherry-picking regardless:**

- `config_changed`: do not `load_preview(Reload)` when only `language` / `client_locale` changed
- Extension: do not send `PreviewTypeChanged` on every config change (only when WASM preview target may change)

---

## How to review the overlay

```powershell
git clone --depth 1 --branch v1.15.0 https://github.com/slint-ui/slint.git /tmp/slint
cd /path/to/slint-ai
SLINT_DIR=/tmp/slint node scripts/apply-lsp-patches.js
cd /tmp/slint && cargo build -p slint-lsp --release
```

Or diff each overlay file against v1.15.0:

```powershell
diff -u /tmp/slint/tools/lsp/common.rs patches/lsp/overlay/tools/lsp/common.rs
```

---

## Test plan

1. Open a `.slint` file, start live preview
2. Enter selection mode, pick an element, click **Copy node** — clipboard has hierarchy string
3. **Language** menu: switch auto / en / zh-cn — UI translates, LSP does not crash
4. VS Code setting `slint.preview.language` stays in sync with preview menu

---

## Contact

- Extension repo: https://github.com/liuqianjin559-cmyk/slint-ai
- Slint discussion / issue where ogoffart replied (link your thread when posting)

---

## 中文摘要

- LSP 改动在 `patches/lsp/overlay/`，基于 **v1.15.0**
- 主要功能：**拷贝节点路径**（AI 精确定位）、**预览界面中英文**
- 欢迎 Slint 官方 port 到 master 并合并；作者同意 **MIT-0** 授权
- 扩展侧配合改动见上文 `src/common.ts`、`package.json`（不在 overlay 里，需一并 port 到 `editors/vscode/`）
