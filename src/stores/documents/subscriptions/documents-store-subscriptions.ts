import Lineage from 'src/main';
import { processDocumentBackups } from 'src/stores/documents/subscriptions/effects/process-document-backups/process-document-backups';

export const documentsStoreSubscriptions = (plugin: Lineage) => {
    return plugin.documents.subscribe((_, action) => {
        if (action?.type === 'WORKSPACE/LAYOUT_READY') {
            processDocumentBackups(plugin);
        }
    });
};
