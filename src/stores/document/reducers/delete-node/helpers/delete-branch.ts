import {
    LineageDocument,
    NodeId,
} from 'src/stores/document/document-state-type';
import { traverseDown } from 'src/stores/view/helpers/search/traverse-down';
import { deleteGroupsByParentId } from 'src/stores/document/reducers/delete-node/helpers/delete-groups-by-parent-id';
import { deleteNodeById } from 'src/stores/document/reducers/delete-node/helpers/delete-node-by-id';

export const deleteBranch = (document: LineageDocument, node: string) => {
    const childGroups: NodeId[] = [];
    traverseDown(childGroups, document.columns, node);
    if (childGroups.length > 0)
        deleteGroupsByParentId(
            document.columns,
            document.content,
            new Set(childGroups),
        );
    deleteNodeById(document.columns, document.content, node);
};
