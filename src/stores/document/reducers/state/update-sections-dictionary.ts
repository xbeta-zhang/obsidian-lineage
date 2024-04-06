import { calculateColumnTreeIndexes } from 'src/stores/view/subscriptions/helpers/calculate-tree-index';
import { DocumentState } from 'src/stores/document/document-state-type';

export const updateSectionsDictionary = (state: DocumentState) => {
    state.sections.id_section = calculateColumnTreeIndexes(
        state.document.columns,
    );
    state.sections.section_id = Object.fromEntries(
        Object.entries(state.sections.id_section).map(([k, v]) => [v, k]),
    );
};
