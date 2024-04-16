import { LineageView } from 'src/view/view';
import { derived } from 'src/helpers/store/derived';

export const scrollingStore = (view: LineageView) =>
    derived(view.plugin.settings, (state) => state.view.scrolling);
