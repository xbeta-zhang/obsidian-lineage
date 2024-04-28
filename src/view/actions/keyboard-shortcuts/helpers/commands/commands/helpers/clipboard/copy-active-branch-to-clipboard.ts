import { LineageView } from 'src/view/view';
import { getBranch } from 'src/view/actions/keyboard-shortcuts/helpers/commands/commands/helpers/get-branch';
import { branchToText } from 'src/obsidian/commands/helpers/extract-branch/helpers/branch-to-text';

export const copyActiveBranchToClipboard = async (view: LineageView) => {
    const viewState = view.viewStore.getValue();
    const documentState = view.documentStore.getValue();
    const branch = getBranch(
        documentState.document.columns,
        documentState.document.content,
        viewState.document.activeNode,
        'copy',
    );

    const text = branchToText(branch);
    await navigator.clipboard.writeText(text);
};
