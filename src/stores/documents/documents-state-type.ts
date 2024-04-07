import { DocumentStore } from 'src/view/view';
import { Clipboard } from 'src/stores/document/document-state-type';

export type DocumentsState = {
    documents: {
        [path: string]: DocumentStore;
    };
    clipboard: Clipboard;
};
