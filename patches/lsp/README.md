# slint-lsp overlay (community changes)

These files are **complete replacements** for the corresponding paths in [slint-ui/slint](https://github.com/slint-ui/slint) at tag **`v1.15.0`**.

They are **not** a full Slint fork — only the files we changed for **Node Path Copier for Slint**.

## License

Contributions are offered under **[MIT-0](https://opensource.org/license/mit-0)** for upstreaming into Slint, consistent with [Slint's contribution guidelines](https://github.com/slint-ui/slint/blob/master/CONTRIBUTING.md).

## Apply locally

From the extension repo root:

```powershell
# 1. Clone upstream Slint (once)
git clone --depth 1 --branch v1.15.0 https://github.com/slint-ui/slint.git ../slint

# 2. Copy overlay files onto the checkout
pnpm apply:lsp-patches

# 3. Build slint-lsp into bin/
pnpm build:lsp-local
```

Set `SLINT_DIR` if your Slint tree is not at `../slint`.

## File list

See [`MANIFEST.json`](MANIFEST.json) for the authoritative list and feature grouping.

| Feature | Summary |
|---------|---------|
| **copy-node-hierarchy** | Copy structured element path from live preview to clipboard (for AI-assisted editing) |
| **preview-i18n** | Preview UI language menu (auto / en / zh-cn), bundled translations |

## Upstreaming

Slint `master` (1.17+) has refactored the LSP layout. These files **do not apply cleanly** to current master — see [`docs/UPSTREAM.md`](../../docs/UPSTREAM.md) for porting notes for Slint maintainers.

## 中文

这是基于 **Slint v1.15.0** 的 `tools/lsp/` 改动 overlay，不是完整 Slint 仓库。

```powershell
git clone --depth 1 --branch v1.15.0 https://github.com/slint-ui/slint.git ../slint
pnpm apply:lsp-patches
pnpm build:lsp-local
```

上游合并说明见 [`docs/UPSTREAM.md`](../../docs/UPSTREAM.md)。
