import { LineageView } from 'src/view/view';
import { copyActiveBranchToClipboard } from 'src/view/actions/keyboard-shortcuts/helpers/commands/commands/helpers/clipboard/copy-active-branch-to-clipboard';

export const cutNode = async (view: LineageView) => {
    await copyActiveBranchToClipboard(view);
    view.documentStore.dispatch({
        type: 'DOCUMENT/CUT_NODE',
        payload: {
            nodeId: view.viewStore.getValue().document.activeNode,
        },
    });
};
