import {
    ClipboardBranch,
    Column,
} from 'src/stores/document/document-state-type';
import { columnsToJsonTree } from 'src/stores/view/helpers/json-to-md/columns-to-json/columns-to-json-tree';
import { createColumn, createGroup } from 'src/stores/view/helpers/create-node';
import { jsonToMarkdown } from 'src/stores/view/helpers/json-to-md/json-to-makdown/json-to-markdown';

export const branchToText = (branch: ClipboardBranch) => {
    const columns: Column[] = [];
    columns.push(createColumn());
    columns[columns.length - 1].groups.push(createGroup('root'));
    columns[columns.length - 1].groups[0].nodes.push(branch.nodeId);
    for (const groups of branch.sortedChildGroups) {
        columns.push(createColumn());
        for (const group of groups) {
            columns[columns.length - 1].groups.push(group);
        }
    }

    return jsonToMarkdown(columnsToJsonTree(columns, branch.content));
};
