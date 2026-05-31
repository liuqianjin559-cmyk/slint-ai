// Verify that a Slint checkout exists before building slint-lsp.
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const slintDir = process.env.SLINT_DIR || path.join(root, "..", "slint");
const cargoToml = path.join(slintDir, "Cargo.toml");
const manifestPath = path.join(root, "patches", "lsp", "MANIFEST.json");

if (!fs.existsSync(cargoToml)) {
    console.error(
        [
            "Slint source tree not found.",
            "",
            `Expected: ${slintDir}`,
            "",
            "This extension ships LSP changes as an overlay in patches/lsp/.",
            "You need a clean Slint checkout to apply them onto:",
            "",
            "  git clone --depth 1 --branch v1.15.0 https://github.com/slint-ui/slint.git ../slint",
            "",
            "Then build:",
            "",
            "  pnpm apply:lsp-patches",
            "  pnpm build:lsp-local",
            "",
            "Or set SLINT_DIR to point at an existing Slint tree.",
        ].join("\n"),
    );
    process.exit(1);
}

if (fs.existsSync(manifestPath)) {
    const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
    console.log(`Slint checkout: ${slintDir} (overlay base: ${manifest.baseTag})`);
} else {
    console.log(`Slint checkout: ${slintDir}`);
}
