import { Columns, NodeGroup, NodeId } from 'src/stores/view/view-state-type';
import { findNodeColumn } from 'src/stores/view/helpers/find-node-column';
import { id } from 'src/helpers/id';

export const moveChildGroupsNextToTheirParent = (
    columns: Columns,
    parentNode: NodeId,
    sortedChildGroups: NodeGroup[][],
) => {
    // insert child groups into their new columns
    const parentColumnIndex = findNodeColumn(columns, parentNode);
    for (let i = 0; i < sortedChildGroups.length; i++) {
        const groups = sortedChildGroups[i];

        for (const group of groups) {
            const targetColumnIndex = parentColumnIndex + 1 + i;
            if (!columns[targetColumnIndex]) {
                columns.push({
                    id: id.column(),
                    groups: [],
                });
            }

            columns[targetColumnIndex].groups.push(group);
        }
    }
};
