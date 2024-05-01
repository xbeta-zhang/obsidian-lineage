import { SettingsStore } from 'src/main';
import { ColorComponent, Setting } from 'obsidian';
import { getDefaultTheme } from 'src/stores/view/subscriptions/effects/css-variables/helpers/get-default-theme';

export const BackgroundColor = (
    element: HTMLElement,
    settingsStore: SettingsStore,
) => {
    const settingsState = settingsStore.getValue();
    let colorPicker: ColorComponent;

    const onChange = (color: string) => {
        settingsStore.dispatch({
            type: 'SET_CONTAINER_BG',
            payload: {
                backgroundColor: color,
            },
        });
    };

    const setValue = () => {
        colorPicker.onChange(() => void undefined);
        colorPicker.setValue(
            settingsState.view.theme.containerBg ||
                getDefaultTheme().containerBg,
        );
        colorPicker.onChange(onChange);
    };
    new Setting(element)
        .setName('Background color')
        .addColorPicker((cb) => {
            colorPicker = cb;
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
