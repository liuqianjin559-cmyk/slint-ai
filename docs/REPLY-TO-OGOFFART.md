# Draft reply to ogoffart (copy & paste)

Hi ogoffart,

Thank you for the thoughtful feedback — and for offering to help get a pull request started.

I have completed the branding changes you requested:

- Renamed the extension to **Node Path Copier for Slint** (v1.17.1)
- Replaced the icon with an original design (no longer based on the Slint logo)
- Updated the description to clearly state that this is a community extension, not affiliated with SixtyFPS

**VS Code extension source:** https://github.com/liuqianjin559-cmyk/slint-ai

Regarding the forked **slint-lsp** binary: I am preparing a dedicated public repository with the corresponding Rust source and build instructions, and will link it from the extension README as soon as it is ready. The packaged VSIX currently includes a prebuilt Windows x64 binary built from our Slint fork (copy-node + Chinese preview UI).

I would very much like to upstream the **copy node hierarchy** feature into slint-ui/slint. The core changes are in the preview/LSP layer. I am happy to open a PR based on our fork, but I am not very experienced with Slint's internal codebase or the PR workflow. Your guidance on where to start and how to structure the changes would be greatly appreciated.

I am also happy to join the PR discussion to clarify the interaction design goals (precise element references for AI-assisted editing).

Thank you again for your help.

Best regards,  
liuqianjin
