import { LineageView } from 'src/view/view';
import { cssVariables } from 'src/stores/view/subscriptions/effects/apply-background-color/helpers/get-default-theme';

export const applyContainerBg = (
    view: LineageView,
    color: string | undefined,
) => {
    if (color) {
        view.containerEl.style.setProperty(cssVariables.containerBg, color);
        view.containerEl.style.setProperty(cssVariables.inactiveNodeBg, color);
    } else {
        view.containerEl.style.removeProperty(cssVariables.containerBg);
        view.containerEl.style.removeProperty(cssVariables.inactiveNodeBg);
    }
};
