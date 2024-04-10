import { Column, NodeId } from 'src/stores/document/document-state-type';
import { traverseUp } from 'src/stores/view/helpers/search/traverse-up';
import { traverseDown } from 'src/stores/view/helpers/search/traverse-down';
import { findGroupByNodeId } from 'src/stores/view/helpers/search/find-group-by-node-id';
import { findNodeColumn } from 'src/stores/view/helpers/find-node-column';
import {
    ActiveNodeOfGroup,
    DocumentViewState,
} from 'src/stores/view/view-state-type';

export type UpdateActiveBranchAction = {
    type: 'UPDATE_ACTIVE_BRANCH';
    payload: {
        columns: Column[];
    };
};

export const updateActiveBranch = (
    state: Pick<DocumentViewState, 'activeBranch' | 'activeNode'>,
    columns: Column[],
    activeNodeOfGroup: ActiveNodeOfGroup,
) => {
    if (!state.activeNode) return;
    const sortedParents = traverseUp(columns, state.activeNode).reverse();
    const childGroups: NodeId[] = [];
    traverseDown(childGroups, columns, state.activeNode);
    const group = findGroupByNodeId(columns, state.activeNode);
    if (!group)
        throw new Error('could not find group for node ' + state.activeNode);
    const columnId = columns[findNodeColumn(columns, state.activeNode)].id;
    if (
        childGroups.join() !==
            Array.from(state.activeBranch.childGroups).join() ||
        sortedParents.join() !== state.activeBranch.sortedParentNodes.join() ||
        group.parentId !== state.activeBranch.group ||
        columnId !== state.activeBranch.column
    ) {
        state.activeBranch = {
            childGroups: new Set<string>(childGroups),
            sortedParentNodes: sortedParents,
            group: group.parentId,
            column: columnId,
        };
    }
    activeNodeOfGroup[group.parentId] = state.activeNode;
    for (const group in activeNodeOfGroup) {
        if (
            activeNodeOfGroup[group] === state.activeNode &&
            group !== state.activeBranch.group
        ) {
            delete activeNodeOfGroup[group];
        }
    }
};
