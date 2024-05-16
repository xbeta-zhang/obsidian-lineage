import { LineageView } from 'src/view/view';
import { derived } from 'src/helpers/store/derived';

export const columnsStore = (view: LineageView) =>
    derived(view.documentStore, (state) => state.document.columns);
