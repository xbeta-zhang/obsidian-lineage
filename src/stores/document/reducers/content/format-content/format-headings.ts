import { Column, Content } from 'src/stores/document/document-state-type';
import { calculateColumnTreeIndexes } from 'src/stores/view/subscriptions/helpers/calculate-tree-index';
import { formatHeadings as _formatHeaders } from 'src/stores/document/reducers/content/format-content/helpers/format-headings';

export type FormatHeadingsAction = {
    type: 'DOCUMENT/FORMAT_HEADINGS';
};
export const formatHeadings = (content: Content, columns: Column[]) => {
    const treeIndex = calculateColumnTreeIndexes(columns);

    _formatHeaders(content, treeIndex);
};
