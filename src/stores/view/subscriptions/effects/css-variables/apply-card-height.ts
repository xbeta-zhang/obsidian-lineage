import { LineageView } from 'src/view/view';
import { cssVariables } from 'src/stores/view/subscriptions/effects/css-variables/helpers/css-variables';

export const applyCardHeight = (
    view: LineageView,
    minHeight: number | undefined,
) => {
    if (minHeight) {
        view.containerEl.style.setProperty(
            cssVariables.minCardHeight,
            `${minHeight}px`,
        );
    } else view.containerEl.style.removeProperty(cssVariables.minCardHeight);
};
