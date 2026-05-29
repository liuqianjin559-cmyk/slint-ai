// Copyright © SixtyFPS GmbH <info@slint.dev>
// SPDX-License-Identifier: GPL-3.0-only OR LicenseRef-Slint-Royalty-free-2.0 OR LicenseRef-Slint-Software-3.0

import * as vscode from "vscode";

export const PREVIEW_LANGUAGE_AUTO = "auto";

/** Resolve the preview UI language from workspace settings and VS Code locale. */
export function effectivePreviewLanguage(): string {
    const setting = vscode.workspace
        .getConfiguration("slint")
        .get<string>("preview.language", PREVIEW_LANGUAGE_AUTO);
    if (setting && setting !== PREVIEW_LANGUAGE_AUTO) {
        return setting;
    }
    return vscode.env.language.toLowerCase().startsWith("zh") ? "zh-cn" : "en";
}
