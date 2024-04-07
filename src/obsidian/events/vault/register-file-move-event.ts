import { TFile } from 'obsidian';
import Lineage from 'src/main';
import { fileViewTypeCache } from 'src/stores/settings/subscriptions/effects/update-file-view-type-cache';

export const registerFileRenameEvent = (plugin: Lineage) => {
    plugin.registerEvent(
        plugin.app.vault.on('rename', (file, oldPath) => {
            if (file instanceof TFile) {
                if (fileViewTypeCache[oldPath]) {
                    plugin.documents.dispatch({
                        type: 'DOCUMENTS/UPDATE_DOCUMENT_PATH',
                        payload: {
                            newPath: file.path,
                            oldPath,
                        },
                    });
                    plugin.settings.dispatch({
                        type: 'HISTORY/UPDATE_DOCUMENT_PATH',
                        payload: {
                            newPath: file.path,
                            oldPath,
                        },
                    });
                }
            }
        }),
    );
};
