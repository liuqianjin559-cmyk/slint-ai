// Desktop-only build (no wasm / web extension artifacts)
const production = process.argv.includes("--production");

require("esbuild")
    .build({
        entryPoints: ["src/extension.ts"],
        bundle: true,
        external: ["vscode"],
        outfile: "out/extension.js",
        platform: "node",
        format: "cjs",
        minify: production,
        sourcemap: !production,
        sourcesContent: false,
    })
    .catch(() => process.exit(1));
