import { SettingsStore } from 'src/main';
import { ColorComponent, Setting } from 'obsidian';
import { getDefaultTheme } from 'src/stores/view/subscriptions/effects/css-variables/helpers/get-default-theme';

export const BackgroundColor = (
    element: HTMLElement,
    settingsStore: SettingsStore,
) => {
    const settingsState = settingsStore.getValue();
    let colorPicker: ColorComponent;

    const setValue = () => {
        colorPicker.setValue(
            settingsState.view.theme.containerBg ||
                getDefaultTheme().containerBg,
        );
    };
    new Setting(element)
        .setName('Background color')
        .addColorPicker((cb) => {
            colorPicker = cb;
            cb.onChange((color) => {
                settingsStore.dispatch({
                    type: 'SET_CONTAINER_BG',
                    payload: {
                        backgroundColor: color,
                    },
                });
            });
            setValue();
        })
        .addExtraButton((cb) => {
            cb.setIcon('reset')
                .onClick(() => {
                    settingsStore.dispatch({
                        type: 'SET_CONTAINER_BG',
                        payload: {
                            backgroundColor: undefined,
                        },
                    });
                    setValue();
                })
                .setTooltip('Reset');
        });
};
