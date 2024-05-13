import { cleanAndSortColumns } from 'src/stores/document/reducers/move-node/helpers/clean-and-sort-columns';
import { LineageDocument } from 'src/stores/document/document-state-type';
import { deleteChildNodes } from 'src/stores/document/reducers/delete-node/helpers/delete-child-nodes';
import { isLastRootNode } from 'src/stores/document/reducers/delete-node/helpers/is-last-root-node';
import invariant from 'tiny-invariant';
import { findNextActiveNode } from 'src/stores/view/reducers/document/helpers/find-next-node/find-next-active-node';
import { deleteNodeById } from 'src/stores/document/reducers/delete-node/helpers/delete-node-by-id';
import { lang } from 'src/lang/lang';

export type DeleteNodeAction = {
    type: 'DOCUMENT/DELETE_NODE';
    payload: {
        activeNodeId: string;
    };
};

export const deleteNode = (document: LineageDocument, nodeId: string) => {
    invariant(nodeId);

    const lastNode = isLastRootNode(document.columns, nodeId);
    if (lastNode) throw new Error(lang.error_delete_last_node);

    const nextNode = findNextActiveNode(document.columns, nodeId, {
        type: 'DOCUMENT/DELETE_NODE',
        payload: {
            activeNodeId: nodeId,
        },
    });
    invariant(nextNode);
    deleteChildNodes(document, nodeId);
    deleteNodeById(document.columns, document.content, nodeId);
    cleanAndSortColumns(document);
    return nextNode;
};
