import { insertNode } from 'src/stores/document/reducers/insert-node/insert-node';
import {
    Column,
    Content,
    DocumentState,
} from 'src/stores/document/document-state-type';
import { pastChildGroups } from 'src/stores/document/reducers/clipboard/paste-node/helpers/past-child-groups';
import { cleanAndSortColumns } from 'src/stores/document/reducers/move-node/helpers/clean-and-sort-columns';
import { SilentError } from 'src/stores/view/helpers/errors';

export type PasteNodeAction = {
    type: 'DOCUMENT/PASTE_NODE';
    payload: {
        targetNodeId: string;
    };
};

export const pasteNode = (
    columns: Column[],
    content: Content,
    clipboard: DocumentState['clipboard'],
    targetNodeId: string,
) => {
    if (!clipboard.branch) throw new SilentError('clipboard is empty');

    const nextNode = clipboard.branch.nodeId;
    insertNode(
        columns,
        content,
        {
            payload: {
                activeNodeId: targetNodeId,
                position: 'down',
                content:
                    clipboard.branch.content[clipboard.branch.nodeId]?.content,
            },
        },
        clipboard.branch.nodeId,
    );
    pastChildGroups(columns, content, clipboard.branch);
    cleanAndSortColumns(columns);
    clipboard.branch = null;
    return nextNode;
};
