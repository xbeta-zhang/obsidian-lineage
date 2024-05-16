import { LineageView } from 'src/view/view';
import { derived } from 'src/helpers/store/derived';

export const documentStateStore = (view: LineageView) =>
    derived(view.viewStore, (state) => state.document.editing);
