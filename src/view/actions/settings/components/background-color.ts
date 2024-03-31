import { SettingsStore } from 'src/main';
import { Setting } from 'obsidian';
import { getDefaultTheme } from 'src/stores/view/subscriptions/effects/apply-background-color/helpers/get-default-theme';

export const BackgroundColor = (
    element: HTMLElement,
    settingsStore: SettingsStore,
) => {
    const settingsState = settingsStore.getValue();
    element.empty();
    new Setting(element)
        .setName('Background color')
        .addColorPicker((cb) => {
            cb.setValue(
                settingsState.view.theme.containerBg ||
                    getDefaultTheme().containerBg,
            ).onChange((color) => {
                settingsStore.dispatch({
                    type: 'SET_CONTAINER_BG',
                    payload: {
                        backgroundColor: color,
                    },
                });
            });
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
                    BackgroundColor(element, settingsStore);
                })
                .setTooltip('Reset');
        });
};
