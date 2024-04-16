import { SettingsStore } from 'src/main';
import { Setting } from 'obsidian';

export const CenterCardsHorizontally = (
    element: HTMLElement,
    settingsStore: SettingsStore,
) => {
    const settingsState = settingsStore.getValue();
    element.empty();
    new Setting(element)
        .setName('Center cards horizontally')
        .addToggle((cb) => {
            cb.setValue(
                settingsState.view.scrolling.alwaysCenterHorizontally,
            ).onChange((value) => {
                settingsStore.dispatch({
                    type: 'SET_ALWAYS_CENTER_HORIZONTALLY',
                    payload: {
                        center: value,
                    },
                });
            });
        });
};
