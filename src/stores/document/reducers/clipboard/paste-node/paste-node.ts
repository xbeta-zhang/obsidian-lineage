import { insertNode } from 'src/stores/document/reducers/insert-node/insert-node';
import {
    ClipboardBranch,
    LineageDocument,
} from 'src/stores/document/document-state-type';
import { pastChildGroups } from 'src/stores/document/reducers/clipboard/paste-node/helpers/past-child-groups';
import { cleanAndSortColumns } from 'src/stores/document/reducers/move-node/helpers/clean-and-sort-columns';
import { SilentError } from 'src/stores/view/helpers/errors';
import { cloneBranch } from 'src/stores/document/reducers/clipboard/paste-node/helpers/clone-branch';

export type PasteNodeAction = {
    type: 'DOCUMENT/PASTE_NODE';
    payload: {
        targetNodeId: string;
        branch?: ClipboardBranch | null;
    };
};

export const pasteNode = (
    document: LineageDocument,
    action: Pick<PasteNodeAction, 'payload'>,
) => {
    if (!action.payload.branch) throw new SilentError('clipboard is empty');
    const branch = cloneBranch(action.payload.branch);

    const nextNode = branch.nodeId;
    insertNode(
        document,
        {
            payload: {
                activeNodeId: action.payload.targetNodeId,
                position: 'down',
                content: branch.content[branch.nodeId]?.content,
            },
        },
        branch.nodeId,
    );
    pastChildGroups(document, branch);
    cleanAndSortColumns(document);
    return nextNode;
};
