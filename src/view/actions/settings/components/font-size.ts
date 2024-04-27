import { SettingsStore } from 'src/main';
import { Setting, SliderComponent } from 'obsidian';

export const FontSize = (
    element: HTMLElement,
    settingsStore: SettingsStore,
) => {
    const settingsState = settingsStore.getValue();
    let input: SliderComponent;

    const setValue = () => {
        input.setValue(settingsState.view.fontSize);
    };
    new Setting(element)
        .setName('Font size')
        .addSlider((cb) => {
            input = cb;
            cb.onChange((fontSize) => {
                settingsStore.dispatch({
                    type: 'SET_FONT_SIZE',
                    payload: {
                        fontSize,
                    },
                });
            });
            cb.setLimits(8, 36, 1).setDynamicTooltip();
            setValue();
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
                    setValue();
                })
                .setTooltip('Reset');
        });
};
