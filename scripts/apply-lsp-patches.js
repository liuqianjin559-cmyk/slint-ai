// Apply LSP overlay files from patches/lsp/overlay/ onto a Slint checkout.
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const overlayDir = path.join(root, "patches", "lsp", "overlay");
const manifestPath = path.join(root, "patches", "lsp", "MANIFEST.json");
const slintDir = process.env.SLINT_DIR || path.join(root, "..", "slint");

function fail(message) {
    console.error(message);
    process.exit(1);
}

if (!fs.existsSync(manifestPath)) {
    fail("Missing patches/lsp/MANIFEST.json");
}

if (!fs.existsSync(overlayDir)) {
    fail("Missing patches/lsp/overlay/");
}

if (!fs.existsSync(path.join(slintDir, "Cargo.toml"))) {
    fail(
        [
            `Slint checkout not found: ${slintDir}`,
            "",
            "Clone upstream Slint v1.15.0 first:",
            "  git clone --depth 1 --branch v1.15.0 https://github.com/slint-ui/slint.git ../slint",
            "",
            "Or set SLINT_DIR to your Slint tree.",
        ].join("\n"),
    );
}

const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
let applied = 0;

for (const relPath of manifest.files) {
    const src = path.join(overlayDir, relPath);
    const dest = path.join(slintDir, relPath);

    if (!fs.existsSync(src)) {
        fail(`Overlay file missing: ${relPath}`);
    }

    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.copyFileSync(src, dest);
    console.log(`Applied ${relPath}`);
    applied += 1;
}

console.log(
    `\nApplied ${applied} file(s) to ${slintDir} (base: ${manifest.baseTag}).`,
);
