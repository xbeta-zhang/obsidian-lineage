import { findNodeColumn } from 'src/stores/view/helpers/find-node-column';
import { createColumn, createGroup } from 'src/stores/view/helpers/create-node';
import { findChildGroup } from 'src/stores/view/helpers/search/find-child-group';
import {
    Column,
    LineageDocument,
    NodeId,
} from 'src/stores/document/document-state-type';

export const moveNodeAsChild = (
    document: Pick<LineageDocument, 'columns'>,
    node: NodeId,
    targetNode: NodeId,
) => {
    const targetGroup = findChildGroup(document.columns, targetNode);
    if (targetGroup) {
        targetGroup.nodes.push(node);
        targetGroup.nodes = [...targetGroup.nodes];
    } else {
        const currentColumnIndex = findNodeColumn(document.columns, targetNode);
        let targetColumn: Column | undefined;
        targetColumn = document.columns[currentColumnIndex + 1];

        if (!targetColumn) {
            const newColumn = createColumn();
            document.columns.push(newColumn);
            document.columns = [...document.columns];
            targetColumn = newColumn;
        }
        const newGroup = createGroup(targetNode);
        newGroup.nodes.push(node);
        targetColumn.groups.push(newGroup);
        targetColumn.groups = [...targetColumn.groups];
    }
};
