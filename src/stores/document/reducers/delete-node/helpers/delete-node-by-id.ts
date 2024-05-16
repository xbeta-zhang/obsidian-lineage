import { Column, Content } from 'src/stores/document/document-state-type';

export const deleteNodeById = (
    columns: Column[],
    content: Content,
    nodeId: string,
): void => {
    for (const column of columns) {
        for (const group of column.groups) {
            for (let i = 0; i < group.nodes.length; i++) {
                const _nodeId = group.nodes[i];
                if (_nodeId === nodeId) {
                    group.nodes.splice(i, 1);
                    group.nodes = [...group.nodes];
                    delete content[_nodeId];
                    return;
                }
            }
        }
    }
};
