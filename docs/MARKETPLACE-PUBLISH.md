# Marketplace 发布指南（只需做一次）

网页上传若遇到 **ReCaptcha token is invalid**，请用命令行发布。

## 第一步：创建 Token（只需一次）

1. 打开 https://dev.azure.com
2. 右上角用户图标 → **Personal access tokens**
3. **+ New Token**
   - Name: `vsce-publish`
   - Organization: **All accessible organizations**
   - Expiration: 按你需要
   - Scopes: **Marketplace** → **Manage**
4. 创建后 **复制 Token**（只显示一次）

## 第二步：登录 vsce（只需一次）

在项目目录打开终端：

```powershell
cd G:\Desktop\slintPervie\vscode
pnpm dlx @vscode/vsce login slint-ai
```

提示时粘贴 Token。

## 第三步：发布

```powershell
pnpm dlx @vscode/vsce publish --no-dependencies
```

若网络需要代理：

```powershell
$env:HTTP_PROXY="http://127.0.0.1:10808"
$env:HTTPS_PROXY="http://127.0.0.1:10808"
pnpm dlx @vscode/vsce publish --no-dependencies
```

## 注意

- 必须在 **已有扩展** 上更新，扩展 ID 保持 `slint-ai.slint-ai`
- 发布前先编译：`pnpm package:desktop`
- 版本号需在 `package.json` 中递增（当前 1.17.1）
