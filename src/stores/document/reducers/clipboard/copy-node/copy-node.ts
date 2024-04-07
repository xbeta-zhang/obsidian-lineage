import {
    Column,
    Content,
    DocumentState,
} from 'src/stores/document/document-state-type';
import { getBranch } from 'src/stores/document/reducers/clipboard/cut-node/helpers/get-branch';

export type CopyNodeAction = {
    type: 'DOCUMENT/COPY_NODE';
    payload: {
        nodeId: string;
    };
};

export const copyNode = (
    columns: Column[],
    content: Content,
    state: DocumentState['clipboard'],
    nodeId: string,
) => {
    state.branch = getBranch(columns, content, nodeId, 'copy');
};
