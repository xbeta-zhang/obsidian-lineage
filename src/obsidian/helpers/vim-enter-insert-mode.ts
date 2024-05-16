import { MarkdownView } from 'obsidian';
import Lineage from 'src/main';
import { logger } from 'src/helpers/logger';

export const vimEnterInsertMode = (plugin: Lineage, view: MarkdownView) => {
    // @ts-ignore
    const config = plugin.app.vault.config;
    if (config?.vimMode) {
        try {
            // @ts-ignore
            window.CodeMirrorAdapter?.Vim.enterInsertMode(
                // @ts-ignore
                view.editMode?.editor?.cm?.cm,
            );
        } catch {
            logger.warn('could not enter insert mode');
        }
    }
};
