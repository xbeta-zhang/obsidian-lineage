import { LineageView } from 'src/view/view';
import { derived } from 'src/helpers/store/derived';

export const idSectionStore = (view: LineageView, nodeId: string) => {
    return derived(view.documentStore, (state) => {
        return state.sections.id_section[nodeId];
    });
};
