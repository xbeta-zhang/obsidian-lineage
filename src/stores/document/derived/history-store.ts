import { LineageView } from 'src/view/view';
import { derived } from 'src/helpers/store/derived';

export const historyStore = (view: LineageView) => {
    return derived(view.documentStore, (state) => {
        return state.history;
    });
};
