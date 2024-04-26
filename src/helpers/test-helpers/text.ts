import { LineageDocument } from 'src/stores/document/document-state-type';
import { jsonToMarkdown } from 'src/stores/view/helpers/json-to-md/json-to-makdown/json-to-markdown';
import { columnsToJsonTree } from 'src/stores/view/helpers/json-to-md/columns-to-json/columns-to-json-tree';

export const text = (document: LineageDocument) =>
    jsonToMarkdown(columnsToJsonTree(document.columns, document.content));
