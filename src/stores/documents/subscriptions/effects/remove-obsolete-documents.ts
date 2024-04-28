import Lineage from 'src/main';
import { TFile } from 'obsidian';
import { logger } from 'src/helpers/logger';

export const removeObsoleteDocuments = (plugin: Lineage) => {
    const allFiles = plugin.app.vault.getAllLoadedFiles();

    const allPaths = new Set<string>();
    for (const maybeFile of allFiles) {
        if (maybeFile instanceof TFile) {
            allPaths.add(maybeFile.path);
        }
    }
    if (allPaths.size === 0) return;
    const settings = plugin.settings.getValue();
    const filteredDocuments: Record<string, true> = {};
    for (const path of Object.keys(settings.documents)) {
        if (allPaths.has(path)) {
            filteredDocuments[path] = true;
        }
    }
    const diff =
        Object.keys(settings.documents).length -
        Object.keys(filteredDocuments).length;
    if (diff === 0) return;

    logger.debug(`[lineage] removed ${diff} from settings.documents`);
    plugin.settings.dispatch({
        type: 'UPDATE_DOCUMENTS_DICTIONARY',
        payload: {
            documents: filteredDocuments,
        },
    });
};
