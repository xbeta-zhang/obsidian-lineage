import { SettingsStore } from 'src/main';
import { Setting } from 'obsidian';

export const MinCardHeight = (
    element: HTMLElement,
    settingsStore: SettingsStore,
) => {
    const settingsState = settingsStore.getValue();
    element.empty();
    new Setting(element)
        .setName('Minimum card height')
        .addSlider((cb) => {
            const value = settingsState.view.minimumCardHeight || 100;
            cb.setLimits(50, 1000, 1);
            cb.setValue(value)
                .onChange((height) => {
                    settingsStore.dispatch({
                        type: 'SET_MIN_CARD_HEIGHT',
                        payload: {
                            height,
                        },
                    });
                })

                .setDynamicTooltip();
        })
        .addExtraButton((cb) => {
            cb.setIcon('reset')
                .onClick(() => {
                    settingsStore.dispatch({
                        type: 'SET_MIN_CARD_HEIGHT',
                        payload: {
                            height: undefined,
                        },
                    });
                    MinCardHeight(element, settingsStore);
                })
                .setTooltip('Reset');
        });
};
