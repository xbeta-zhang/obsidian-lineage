import Lineage from 'src/main';
import { processDocumentBackups } from 'src/stores/documents/subscriptions/effects/process-document-backups/process-document-backups';
import { removeObsoleteDocuments } from 'src/stores/documents/subscriptions/effects/remove-obsolete-documents';

export const documentsStoreSubscriptions = (plugin: Lineage) => {
    return plugin.documents.subscribe((_, action) => {
        if (action?.type === 'WORKSPACE/LAYOUT_READY') {
            processDocumentBackups(plugin);
            setTimeout(() => removeObsoleteDocuments(plugin), 1000 * 60 * 5);
        }
    });
};
