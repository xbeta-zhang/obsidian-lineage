import { id } from 'src/helpers/id';
import {
    ClipboardBranch,
    Content,
    NodeGroup,
} from 'src/stores/document/document-state-type';
import { cloneGroup } from 'src/stores/document/reducers/clipboard/cut-node/helpers/clone-group';
import { clone } from 'src/helpers/clone';

export const cloneBranch = (branch: ClipboardBranch) => {
    branch = clone(branch);
    const newNodeId = id.node();
    const oldId_newId: Record<string, string> = {
        [branch.nodeId]: newNodeId,
    };

    const newSortedChildGroups: NodeGroup[][] = [];
    const newContent: Content = {};
    newContent[newNodeId] = branch.content[branch.nodeId];
    for (const sortedChildGroup of branch.sortedChildGroups) {
        const newSortedChildGroup: NodeGroup[] = [];
        for (const group of sortedChildGroup) {
            const newGroup = cloneGroup(
                group,
                oldId_newId,
                branch.content,
                newContent,
            );
            newSortedChildGroup.push(newGroup);
        }
        newSortedChildGroups.push(newSortedChildGroup);
    }
    branch.sortedChildGroups = newSortedChildGroups;
    branch.content = newContent;
    branch.nodeId = newNodeId;
    return branch;
};
