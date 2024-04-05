import { ClipboardBranch } from 'src/stores/document/document-state-type';
import { DocumentStore } from 'src/view/view';

export type DocumentsStoreAction =
    | SetClipboard
    | DeleteDocument
    | UpdateDocumentPath
    | AddDocument;

export type SetClipboard = {
    type: 'DOCUMENTS/SET_CLIPBOARD';
    payload: {
        branch: ClipboardBranch;
    };
};
export type AddDocument = {
    type: 'DOCUMENTS/ADD_DOCUMENT';
    payload: {
        path: string;
        documentStore: DocumentStore;
    };
};
export type DeleteDocument = {
    type: 'DOCUMENTS/DELETE_DOCUMENT';
    payload: {
        path: string;
    };
};

export type UpdateDocumentPath = {
    type: 'DOCUMENTS/UPDATE_DOCUMENT_PATH';
    payload: {
        oldPath: string;
        newPath: string;
    };
};
