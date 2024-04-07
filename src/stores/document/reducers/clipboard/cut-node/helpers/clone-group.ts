import { Content, NodeGroup } from 'src/stores/document/document-state-type';
import invariant from 'tiny-invariant';
import { createGroup } from 'src/stores/view/helpers/create-node';
import { id } from 'src/helpers/id';

export const cloneGroup = (
    group: NodeGroup,
    nodeIdMap: Record<string, string>,
    oldContent: Content,
    newContent: Content,
) => {
    const parentNodeId = nodeIdMap[group.parentId];
    invariant(parentNodeId);
    const newGroup = createGroup(parentNodeId);
    for (const node of group.nodes) {
        const newNode = id.node();
        nodeIdMap[node] = newNode;
        newGroup.nodes.push(newNode);
        const existingContent = oldContent[node];
        if (existingContent) {
            newContent[newNode] = {
                ...existingContent,
            };
        }
    }
    nodeIdMap[group.parentId] = newGroup.parentId;
    return newGroup;
};
