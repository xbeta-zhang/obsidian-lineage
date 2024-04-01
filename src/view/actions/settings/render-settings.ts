import { getView } from 'src/view/components/container/context';
import { FontSize } from 'src/view/actions/settings/components/font-size';
import { BackgroundColor } from 'src/view/actions/settings/components/background-color';
import { ActiveBranchColor } from 'src/view/actions/settings/components/active-branch-color';
import { CardWidth } from 'src/view/actions/settings/components/card-width';
import { MinCardHeight } from 'src/view/actions/settings/components/min-cad-height';

export const renderSettings = (element: HTMLElement) => {
    const view = getView();
    const settingsStore = view.plugin.settings;
    const render = () => {
        CardWidth(element.createDiv(), settingsStore);
        MinCardHeight(element.createDiv(), settingsStore);
        FontSize(element.createDiv(), settingsStore);
        BackgroundColor(element.createDiv(), settingsStore);
        ActiveBranchColor(element.createDiv(), settingsStore);
    };
    render();
    return {
        update: () => {
            render();
        },
    };
};
