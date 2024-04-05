import {
    ClipboardBranch,
    Columns,
    Content,
} from 'src/stores/document/document-state-type';
import { findNodeColumn } from 'src/stores/view/helpers/find-node-column';
import { id } from 'src/helpers/id';

export const pastChildGroups = (
    columns: Columns,
    content: Content,
    branch: ClipboardBranch,
) => {
    const parentColumnIndex = findNodeColumn(columns, branch.nodeId);
    if (parentColumnIndex === -1) throw new Error('could not find cut node');

    for (let i = 0; i < branch.sortedChildGroups.length; i++) {
        const groups = branch.sortedChildGroups[i];

        for (const group of groups) {
            const targetColumnIndex = parentColumnIndex + 1 + i;
            if (!columns[targetColumnIndex]) {
                columns.push({
                    id: id.column(),
                    groups: [],
                });
            }

            for (const node of group.nodes) {
                if (node in branch.content) {
                    content[node] = branch.content[node];
                }
            }
            columns[targetColumnIndex].groups.push(group);
        }
    }
};
