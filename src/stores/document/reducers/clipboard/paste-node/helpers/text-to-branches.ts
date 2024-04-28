import { markdownToJson } from 'src/stores/view/helpers/json-to-md/markdown-to-json/markdown-to-json';
import { jsonTreeToColumns } from 'src/stores/view/helpers/json-to-md/json-to-columns/json-tree-to-columns';
import { ClipboardBranch } from 'src/stores/document/document-state-type';
import { getBranch } from 'src/view/actions/keyboard-shortcuts/helpers/commands/commands/helpers/get-branch';

export const textToBranches = (text: string) => {
    const tree = markdownToJson(text);
    const document = jsonTreeToColumns(tree);

    const branches: ClipboardBranch[] = [];
    for (const nodeId of document.columns[0].groups[0].nodes) {
        const branch = getBranch(
            document.columns,
            document.content,
            nodeId,
            'copy',
        );
        branches.push(branch);
    }

    return branches;
};
