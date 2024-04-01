import { SettingsStore } from 'src/main';
import { Setting } from 'obsidian';

const DEFAULT_CARD_WIDTH = 400;

export const CardWidth = (
    element: HTMLElement,
    settingsStore: SettingsStore,
) => {
    const settingsState = settingsStore.getValue();
    element.empty();
    new Setting(element)
        .setName('Card width')
        .addSlider((cb) => {
            const value = settingsState.view.cardWidth || DEFAULT_CARD_WIDTH;
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
                            width: undefined,
                        },
                    });
                    CardWidth(element, settingsStore);
                })
                .setTooltip('Reset');
        });
};
