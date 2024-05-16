import { LineageView } from 'src/view/view';
import { derived } from 'src/helpers/store/derived';

export const limitPreviewHeightStore = (view: LineageView) =>
    derived(view.plugin.settings, (state) => state.view.limitPreviewHeight);
