import {
    DocumentState,
    LineageDocument,
} from 'src/stores/document/document-state-type';
import { getBranch } from 'src/stores/document/reducers/clipboard/cut-node/helpers/get-branch';
import { findNextNodeAfterDeletion } from 'src/stores/view/reducers/document/helpers/find-next-node/find-next-node-after-deletion';
import invariant from 'tiny-invariant';
import { isLastRootNode } from 'src/stores/document/reducers/delete-node/helpers/is-last-root-node';
import { cleanAndSortColumns } from 'src/stores/document/reducers/move-node/helpers/clean-and-sort-columns';

export type CutNodeAction = {
    type: 'DOCUMENT/CUT_NODE';
    payload: {
        nodeId: string;
    };
};

export const cutNode = (
    document: LineageDocument,
    state: DocumentState['clipboard'],
    nodeId: string,
) => {
    const lastNode = isLastRootNode(document.columns, nodeId);
    if (lastNode) throw new Error('cannot cut last root node');
    const nextNode = findNextNodeAfterDeletion(document.columns, nodeId);
    invariant(nextNode);
    state.branch = getBranch(document.columns, document.content, nodeId, 'cut');
    cleanAndSortColumns(document);
    return nextNode;
};
