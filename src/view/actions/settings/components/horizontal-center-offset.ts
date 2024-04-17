import { SettingsStore } from 'src/main';
import { Setting } from 'obsidian';

export const HorizontalCenterOffset = (
    element: HTMLElement,
    settingsStore: SettingsStore,
) => {
    const settingsState = settingsStore.getValue();
    element.empty();
    const setting = new Setting(element).setName('Center offset');

    setting.addToggle((cb) => {
        const value = settingsState.view.scrolling.enableOffset;
        cb.setValue(value).onChange((enable) => {
            settingsStore.dispatch({
                type: 'TOGGLE_HORIZONTAL_OFFSET',
                payload: {
                    enable,
                },
            });
        });
    });
};
