import { cleanAndSortColumns } from 'src/stores/document/reducers/move-node/helpers/clean-and-sort-columns';
import { LineageDocument } from 'src/stores/document/document-state-type';
import { deleteBranch } from 'src/stores/document/reducers/delete-node/helpers/delete-branch';
import { isLastRootNode } from 'src/stores/document/reducers/delete-node/helpers/is-last-root-node';
import invariant from 'tiny-invariant';
import { findNextActiveNode } from 'src/stores/view/reducers/document/helpers/find-next-node/find-next-active-node';

export type DeleteNodeAction = {
    type: 'DOCUMENT/DELETE_NODE';
    payload: {
        activeNodeId: string;
    };
};

export const deleteNode = (document: LineageDocument, nodeId: string) => {
    invariant(nodeId);

    const lastNode = isLastRootNode(document.columns, nodeId);
    if (lastNode) throw new Error('cannot delete last root node');

    const nextNode = findNextActiveNode(document.columns, nodeId, {
        type: 'DOCUMENT/DELETE_NODE',
        payload: {
            activeNodeId: nodeId,
        },
    });
    if (!nextNode) throw new Error('could not find next node');
    deleteBranch(document, nodeId);
    cleanAndSortColumns(document);
    return nextNode;
};
