# 本地调试指南

## 目录结构

```
slintPervie/
├── slint/          ← Slint 源码（含 LSP 拷贝节点改动）
└── vscode/         ← VS Code 扩展（本仓库）
```

## 第一次构建

```powershell
cd G:\Desktop\slintPervie\vscode
pnpm install
pnpm build:lsp-local      # 编译 slint-lsp 并复制到 bin/
pnpm compile:desktop      # 编译扩展 TS
```

## 调试扩展（F5）

1. 用 VS Code 打开 **`vscode`** 文件夹
2. 按 **F5**（Run Extension）
3. 在新窗口打开任意 `.slint` 文件 → **Show Preview**
4. 进入选择模式，点选控件 → 在弹窗点 **Copy node**
5. 剪贴板应出现类似：`MainWindow > VerticalLayout#root > Button#submit`

工作区已配置 `slint.lspBinaryPath` 指向 `bin/slint-lsp.exe`。

## 修改 LSP 后重新编译

```powershell
pnpm build:lsp-local
```

然后重新 F5 或 Reload Window。

## 修改扩展 TS 后

```powershell
pnpm compile:desktop
```

F5 会自动触发构建任务（含 LSP + 扩展）。
