import { LineageView } from 'src/view/view';
import { getBranch } from 'src/stores/document/reducers/clipboard/cut-node/helpers/get-branch';
import { branchToText } from 'src/obsidian/commands/helpers/extract-branch/helpers/branch-to-text';
import { createNewFile } from 'src/obsidian/commands/helpers/create-new-file';
import invariant from 'tiny-invariant';
import { openFile } from 'src/obsidian/commands/helpers/open-file';

export const extractBranch = async (view: LineageView) => {
    const viewState = view.viewStore.getValue();
    const documentState = view.documentStore.getValue();
    const branch = getBranch(
        documentState.document.columns,
        documentState.document.content,
        viewState.document.activeNode,
        'copy',
    );

    const text = branchToText(branch);
    invariant(view.file?.parent);
    const newFile = await createNewFile(
        view.plugin,
        view.file?.parent,
        text,
        branch.content[branch.nodeId].content.substring(0, 100),
    );
    await openFile(view.plugin, newFile, 'split', 'lineage');
    view.documentStore.dispatch({
        type: 'DOCUMENT/EXTRACT_BRANCH',
        payload: {
            nodeId: branch.nodeId,
            documentName: newFile.basename,
        },
    });
};
