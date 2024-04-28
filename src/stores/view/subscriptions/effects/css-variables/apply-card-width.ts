import { LineageView } from 'src/view/view';
import { cssVariables } from 'src/stores/view/subscriptions/effects/css-variables/helpers/css-variables';
import invariant from 'tiny-invariant';

export const applyCardWidth = (view: LineageView, width: number) => {
    invariant(width);
    view.containerEl.style.setProperty(cssVariables.cardWidth, `${width}px`);
};
