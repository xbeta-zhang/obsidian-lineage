import { LineageView } from 'src/view/view';

import { cssVariables } from 'src/stores/view/subscriptions/effects/css-variables/helpers/css-variables';

export const applyActiveBranchBg = (
    view: LineageView,
    color: string | undefined,
) => {
    if (color) {
        view.containerEl.style.setProperty(cssVariables.activeBranchBg, color);
    } else {
        view.containerEl.style.removeProperty(cssVariables.activeBranchBg);
    }
};
