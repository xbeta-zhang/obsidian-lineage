import { LineageView } from 'src/view/view';
import { cssVariables } from 'src/stores/view/subscriptions/effects/css-variables/helpers/css-variables';

export const applyCardWidth = (
    view: LineageView,
    width: number | undefined,
) => {
    if (width) {
        view.containerEl.style.setProperty(
            cssVariables.cardWidth,
            `${width}px`,
        );
    } else view.containerEl.style.removeProperty(cssVariables.cardWidth);
};
