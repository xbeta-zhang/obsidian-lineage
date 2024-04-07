import LabeledAnnotations from '../../../main';
import { TFile } from 'obsidian';
import { fileViewTypeCache } from 'src/stores/settings/subscriptions/effects/update-file-view-type-cache';

export const registerFileDeleteEvent = (plugin: LabeledAnnotations) => {
    plugin.registerEvent(
        plugin.app.vault.on('delete', (file) => {
            if (file instanceof TFile) {
                if (fileViewTypeCache[file.path]) {
                    plugin.documents.dispatch({
                        type: 'DOCUMENTS/DELETE_DOCUMENT',
                        payload: {
                            path: file.path,
                        },
                    });
                    plugin.settings.dispatch({
                        type: 'SET_DOCUMENT_TYPE_TO_MARKDOWN',
                        payload: {
                            path: file.path,
                        },
                    });
                }
            }
        }),
    );
};
