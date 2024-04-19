import { LineageView } from 'src/view/view';
import { derived } from 'src/helpers/store/derived';
import { Content } from 'src/stores/document/document-state-type';

export const contentStore = (view: LineageView, nodeId: string) => {
    let nodeContent: Content[string];
    let documentContent: Content;
    return derived(view.documentStore, (state) => {
        if (
            !nodeContent ||
            documentContent !== state.document.content ||
            nodeContent !== documentContent[nodeId]
        ) {
            documentContent = state.document.content;
            nodeContent = documentContent[nodeId];
            if (!nodeContent) return '';
        }

        return nodeContent.content;
    });
};
