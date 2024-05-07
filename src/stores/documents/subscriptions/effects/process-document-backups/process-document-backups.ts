import Lineage from 'src/main';
import { DocumentBackupModal } from 'src/stores/documents/subscriptions/effects/process-document-backups/modal/document-backup-modal';
import { restoreBackup } from 'src/stores/documents/subscriptions/effects/process-document-backups/helpers/restore-backup';
import { TFile } from 'obsidian';

export const processDocumentBackups = async (plugin: Lineage) => {
    const deleteBackup = (path: string) => {
        plugin.settings.dispatch({
            type: 'BACKUP/DELETE_FILE',
            payload: {
                path,
            },
        });
    };
    const backups = plugin.settings.getValue().backup;
    for (const [path, backup] of Object.entries(backups)) {
        const file = plugin.app.vault.getAbstractFileByPath(path);
        if (file && file instanceof TFile) {
            const content = await plugin.app.vault.read(file);
            // inlineEditor on its own does not override file.data with card.data
            // file.data is overridden only when a markdown view of _file_ is opened while inlineEditor is active
            if (content === backup.content) {
                deleteBackup(path);
                continue;
            }
        }
        if (!file) continue;
        const modal = new DocumentBackupModal({
            plugin,
            callbacks: {
                accept: () => {
                    restoreBackup(plugin, backup, path).then(() => {
                        deleteBackup(path);
                        modal.close();
                    });
                },
                reject: () => {
                    deleteBackup(path);
                    modal.close();
                },
            },
            path,
            backup,
        });
        await modal.open();
    }
    plugin.documents.dispatch({ type: 'BACKUPS/SET_PROCESSED' });
};
