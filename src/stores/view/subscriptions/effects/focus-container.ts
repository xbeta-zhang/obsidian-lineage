import { LineageView } from 'src/view/view';

export const focusContainer = (view: LineageView) => {
    if (view.container) view.container.focus();
};
