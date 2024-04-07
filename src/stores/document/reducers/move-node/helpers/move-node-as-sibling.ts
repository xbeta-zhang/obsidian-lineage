import { VerticalDirection } from 'src/stores/document/document-store-actions';

import { findGroupByNodeId } from 'src/stores/view/helpers/search/find-group-by-node-id';
import {
    Columns,
    NodeGroup,
    NodeId,
} from 'src/stores/document/document-state-type';

export const moveNodeAsSibling = (
    columns: Columns,
    direction: VerticalDirection | 'left',
    node: NodeId,
    targetNode: NodeId,
    adjacentGroup?: NodeGroup,
) => {
    const targetGroup = findGroupByNodeId(columns, targetNode);
    if (targetGroup) {
        let insertionIndex: number;
        if (adjacentGroup && adjacentGroup.parentId !== targetGroup.parentId) {
            if (direction === 'down') {
                targetGroup.nodes.splice(0, 0, node);
            } else if (direction === 'up') {
                targetGroup.nodes.push(node);
            }
        } else {
            direction = direction === 'left' ? 'down' : direction;
            const index = targetGroup.nodes.findIndex((n) => n === targetNode);
            insertionIndex = direction === 'up' ? index : index + 1;
            targetGroup.nodes.splice(insertionIndex, 0, node);
        }
    }
};
