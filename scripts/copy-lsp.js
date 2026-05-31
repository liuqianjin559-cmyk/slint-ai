// Copy freshly built slint-lsp into bin/ for packaging and local debug.
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const slintTarget = path.join(root, "..", "slint", "target", "release");
const binDir = path.join(root, "bin");

const candidates = [
    "slint-lsp.exe",
    "slint-lsp-x86_64-pc-windows-msvc.exe",
    "slint-lsp",
];

fs.mkdirSync(binDir, { recursive: true });

let copied = false;
for (const name of candidates) {
    const src = path.join(slintTarget, name);
    if (!fs.existsSync(src)) {
        continue;
    }
    const dest = path.join(binDir, "slint-lsp.exe");
    fs.copyFileSync(src, dest);
    console.log(`Copied ${src} -> ${dest}`);
    copied = true;
    break;
}

if (!copied) {
    console.error(
        "Could not find slint-lsp in ../slint/target/release/. Run: pnpm build:lsp-release",
    );
    process.exit(1);
}
