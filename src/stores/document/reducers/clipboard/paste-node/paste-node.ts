import { insertNode } from 'src/stores/document/reducers/insert-node/insert-node';
import { LineageDocument } from 'src/stores/document/document-state-type';
import { pastChildGroups } from 'src/stores/document/reducers/clipboard/paste-node/helpers/past-child-groups';
import { cleanAndSortColumns } from 'src/stores/document/reducers/move-node/helpers/clean-and-sort-columns';
import { textToBranches } from 'src/stores/document/reducers/clipboard/paste-node/helpers/text-to-branches';
import invariant from 'tiny-invariant';
import { Direction } from 'src/stores/document/document-store-actions';

export type PasteNodeAction = {
    type: 'DOCUMENT/PASTE_NODE';
    payload: {
        targetNodeId: string;
        text: string;
        position?: Direction;
    };
};

export const pasteNode = (
    document: LineageDocument,
    action: Pick<PasteNodeAction, 'payload'>,
) => {
    const branches = textToBranches(action.payload.text);
    let nextNode: string = '';
    for (const branch of branches) {
        nextNode = branch.nodeId;
        insertNode(
            document,
            {
                payload: {
                    activeNodeId: action.payload.targetNodeId,
                    position: action.payload.position || 'down',
                    content: branch.content[branch.nodeId]?.content,
                },
            },
            branch.nodeId,
        );
        pastChildGroups(document, branch);
        cleanAndSortColumns(document);
    }
    invariant(nextNode);
    return nextNode;
};
