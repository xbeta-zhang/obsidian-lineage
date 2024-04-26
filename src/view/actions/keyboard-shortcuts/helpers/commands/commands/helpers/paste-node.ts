import { LineageView } from 'src/view/view';

export const pasteNode = async (view: LineageView) => {
    const viewState = view.viewStore.getValue();
    const text = await navigator.clipboard.readText();
    view.documentStore.dispatch({
        type: 'DOCUMENT/PASTE_NODE',
        payload: {
            targetNodeId: viewState.document.activeNode,
            text,
        },
    });
};
