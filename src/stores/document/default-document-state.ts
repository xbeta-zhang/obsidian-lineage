import { DocumentState } from 'src/stores/document/document-state-type';

export const defaultDocumentState = (): DocumentState => ({
    document: {
        columns: [],
        content: {},
    },
    sections: {
        id_section: {},
        section_id: {},
    },
    file: {
        path: null,
        frontmatter: '',
    },
    history: {
        items: [],
        state: {
            activeIndex: -1,
            canGoBack: false,
            canGoForward: false,
        },
        context: {
            activeSection: '',
        },
    },
});
