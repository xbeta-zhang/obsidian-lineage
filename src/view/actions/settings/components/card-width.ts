import { SettingsStore } from 'src/main';
import { Setting } from 'obsidian';
import { DEFAULT_CARD_WIDTH } from 'src/stores/settings/default-settings';

export const CardWidth = (
    element: HTMLElement,
    settingsStore: SettingsStore,
) => {
    const settingsState = settingsStore.getValue();
    element.empty();
    new Setting(element)
        .setName('Card width')
        .addSlider((cb) => {
            const value = settingsState.view.cardWidth;
            cb.setLimits(200, 1000, 1);
            cb.setValue(value)
                .onChange((width) => {
                    settingsStore.dispatch({
                        type: 'SET_CARD_WIDTH',
                        payload: {
                            width,
                        },
                    });
                })

                .setDynamicTooltip();
        })
        .addExtraButton((cb) => {
            cb.setIcon('reset')
                .onClick(() => {
                    settingsStore.dispatch({
                        type: 'SET_CARD_WIDTH',
                        payload: {
                            width: DEFAULT_CARD_WIDTH,
                        },
                    });
                    CardWidth(element, settingsStore);
                })
                .setTooltip('Reset');
        });
};
