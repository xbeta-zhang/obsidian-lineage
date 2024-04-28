import { ViewState } from 'src/stores/view/view-state-type';

export type ToggleFuzzySearchAction = {
    type: 'SEARCH/TOGGLE_FUZZY_MODE';
};

export const toggleFuzzySearch = (state: ViewState) => {
    state.search.fuzzySearch = !state.search.fuzzySearch;
    state.search = { ...state.search };
};
