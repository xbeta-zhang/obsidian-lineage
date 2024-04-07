import { SettingsStore } from 'src/main';
import { Setting } from 'obsidian';

export const FontSize = (
    element: HTMLElement,
    settingsStore: SettingsStore,
) => {
    const settingsState = settingsStore.getValue();
    element.empty();
    new Setting(element)
        .setName('Font size')
        .addSlider((cb) => {
            cb.setValue(settingsState.view.fontSize)
                .onChange((fontSize) => {
                    settingsStore.dispatch({
                        type: 'SET_FONT_SIZE',
                        payload: {
                            fontSize,
                        },
                    });
                })
                .setLimits(8, 36, 1)
                .setDynamicTooltip();
        })
        .addExtraButton((cb) => {
            cb.setIcon('reset')
                .onClick(() => {
                    settingsStore.dispatch({
                        type: 'SET_FONT_SIZE',
                        payload: {
                            fontSize: 16,
                        },
                    });
                    FontSize(element, settingsStore);
                })
                .setTooltip('Reset');
        });
};
