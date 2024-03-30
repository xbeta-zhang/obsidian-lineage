import { getView } from 'src/view/components/container/context';
import { FontSize } from 'src/view/actions/settings/components/font-size';

export const renderSettings = (element: HTMLElement) => {
    const view = getView();
    const settingsStore = view.plugin.settings;
    const render = () => {
        FontSize(element, settingsStore);
    };
    render();
    return {
        update: () => {
            render();
        },
    };
};
