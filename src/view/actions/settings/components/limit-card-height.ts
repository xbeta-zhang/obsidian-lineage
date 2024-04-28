import { SettingsStore } from 'src/main';
import { Setting } from 'obsidian';

export const LimitCardHeight = (
    element: HTMLElement,
    settingsStore: SettingsStore,
) => {
    const settingsState = settingsStore.getValue();
    new Setting(element).setName('Limit card height').addToggle((cb) => {
        cb.setValue(settingsState.view.limitPreviewHeight).onChange((limit) => {
            settingsStore.dispatch({
                type: 'SET_LIMIT_PREVIEW_HEIGHT',
                payload: {
                    limit,
                },
            });
        });
    });
};
