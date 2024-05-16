import { LineageDocument } from 'src/stores/document/document-state-type';
import { sortGroups } from 'src/stores/document/reducers/move-node/helpers/sort-groups';

export const cleanAndSortColumns = (
    document: Pick<LineageDocument, 'columns'>,
) => {
    const emptyColumns: Set<string> = new Set();

    for (let i = 1; i < document.columns.length; i++) {
        const column = document.columns[i];

        column.groups = column.groups.filter((g) => g.nodes.length > 0);
        if (column.groups.length === 0) {
            emptyColumns.add(column.id);
        }
    }

    for (const emptyColumn of emptyColumns) {
        const i = document.columns.findIndex((c) => c.id === emptyColumn);
        if (i > 0) {
            document.columns.splice(i, 1);
            document.columns = [...document.columns];
        }
    }

    for (let i = 1; i < document.columns.length; i++) {
        const column = document.columns[i];
        if (column.groups.length) {
            const previousColumn = document.columns[i - 1];
            if (column.groups.length > 0) {
                column.groups = sortGroups(
                    previousColumn.groups,
                    column.groups,
                );
            }
        }
    }
};
