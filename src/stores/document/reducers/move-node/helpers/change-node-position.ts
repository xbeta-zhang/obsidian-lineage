import { AllDirections } from 'src/stores/document/document-store-actions';
import { moveNodeAsChild } from 'src/stores/document/reducers/move-node/helpers/move-node-as-child';
import { moveNodeAsSibling } from 'src/stores/document/reducers/move-node/helpers/move-node-as-sibling';
import { moveChildGroupsNextToTheirParent } from 'src/stores/document/reducers/move-node/helpers/move-child-groups/move-child-groups-next-to-their-parent';
import {
    LineageDocument,
    NodeId,
} from 'src/stores/document/document-state-type';
import { removeNodeFromGroup } from 'src/stores/document/reducers/move-node/helpers/remove-node-from-group';
import { findGroupByNodeId } from 'src/stores/view/helpers/search/find-group-by-node-id';
import invariant from 'tiny-invariant';

export const changeNodePosition = (
    document: Pick<LineageDocument, 'columns'>,
    node: NodeId,
    targetNode: NodeId,
    direction: AllDirections,
    type: 'move' | 'drop',
) => {
    const group = findGroupByNodeId(document.columns, node);
    invariant(group);
    removeNodeFromGroup(document.columns, node);
    if (direction === 'right') {
        moveNodeAsChild(document, node, targetNode);
    } else {
        moveNodeAsSibling(
            document.columns,
            direction,
            node,
            targetNode,
            type === 'move' && direction !== 'left' ? group : undefined,
        );
    }
    moveChildGroupsNextToTheirParent(document, node);
};
