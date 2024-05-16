import { Modal } from 'obsidian';
import Lineage from 'src/main';
import Buttons from './modal-buttons.svelte';
import Content from './modal-content.svelte';
import { DocumentBackup } from 'src/stores/settings/settings-type';

export class DocumentBackupModal extends Modal {
    resolve: (value: unknown) => void;
    constructor(
        private props: {
            plugin: Lineage;
            callbacks: {
                accept: () => void;
                reject: () => void;
            };
            path: string;
            backup: DocumentBackup;
        },
    ) {
        super(props.plugin.app);
    }
    open = () => {
        this.setTitle('Lineage - Document backup');
        const fragment = document.createDocumentFragment();
        fragment.append();
        new Buttons({
            target: this.contentEl.parentElement as HTMLElement,
            props: {
                callbacks: this.props.callbacks,
            },
        });
        new Content({
            target: this.contentEl,
            props: this.props,
        });

        const promise = new Promise((resolve) => {
            this.resolve = resolve;
        });
        super.open();

        return promise;
    };

    close = () => {
        this.resolve(undefined);
        super.close();
    };
}
