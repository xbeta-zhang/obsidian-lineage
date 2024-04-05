import { getSortedChildGroups } from 'src/stores/document/reducers/move-node/helpers/move-child-groups/get-sorted-child-groups';
import {
    ClipboardBranch,
    Column,
    Content,
    NodeGroup,
} from 'src/stores/document/document-state-type';
import { deleteNodeById } from 'src/stores/document/reducers/delete-node/helpers/delete-node-by-id';
import { clone } from 'src/helpers/clone';
import { id } from 'src/helpers/id';

import { cloneGroup } from 'src/stores/document/reducers/clipboard/cut-node/helpers/clone-group';

export const getBranch = (
    columns: Column[],
    content: Content,
    nodeId: string,
    mode: 'cut' | 'copy',
) => {
    const cut = mode === 'cut';
    const sortedChildGroups = getSortedChildGroups(columns, nodeId, cut);

    const newContent: Content = {};
    for (const sortedChildGroup of sortedChildGroups) {
        for (const group of sortedChildGroup) {
            for (const node of group.nodes) {
                if (node in content) {
                    newContent[node] = content[node];
                    if (cut) delete content[node];
                }
            }
        }
    }
    newContent[nodeId] = content[nodeId];
    const branch: ClipboardBranch = {
        sortedChildGroups,
        content: newContent,
        nodeId: nodeId,
        mode: mode,
    };
    if (cut) deleteNodeById(columns, content, nodeId);
    else if (mode === 'copy') {
        const newNodeId = id.node();
        const oldId_newId: Record<string, string> = {
            [nodeId]: newNodeId,
        };

        const newSortedChildGroups: NodeGroup[][] = [];
        const newContent: Content = {};
        newContent[newNodeId] = content[nodeId];
        for (const sortedChildGroup of branch.sortedChildGroups) {
            const newSortedChildGroup: NodeGroup[] = [];
            for (const group of sortedChildGroup) {
                const newGroup = cloneGroup(
                    group,
                    oldId_newId,
                    content,
                    newContent,
                );
                newSortedChildGroup.push(newGroup);
            }
            newSortedChildGroups.push(newSortedChildGroup);
        }
        branch.sortedChildGroups = newSortedChildGroups;
        branch.content = newContent;
        branch.nodeId = newNodeId;
    }
    return clone(branch);
};
