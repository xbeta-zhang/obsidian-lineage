import { LineageView } from 'src/view/view';
import { copyActiveBranchToClipboard } from 'src/view/actions/keyboard-shortcuts/helpers/commands/commands/helpers/clipboard/copy-active-branch-to-clipboard';

export const copyNode = async (view: LineageView) => {
    await copyActiveBranchToClipboard(view);
    view.documentStore.dispatch({
        type: 'DOCUMENT/COPY_NODE',
        payload: {
            nodeId: view.viewStore.getValue().document.activeNode,
        },
    });
};
