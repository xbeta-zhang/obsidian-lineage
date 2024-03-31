import { SettingsStore } from 'src/main';
import { Setting } from 'obsidian';
import { getDefaultTheme } from 'src/stores/view/subscriptions/effects/apply-background-color/helpers/get-default-theme';

export const ActiveBranchColor = (
    element: HTMLElement,
    settingsStore: SettingsStore,
) => {
    const settingsState = settingsStore.getValue();
    element.empty();
    new Setting(element)
        .setName('Active branch color')
        .addColorPicker((cb) => {
            cb.setValue(
                settingsState.view.theme.activeBranchBg ||
                    getDefaultTheme().activeBranchBg,
            ).onChange((color) => {
                settingsStore.dispatch({
                    type: 'SET_ACTIVE_BRANCH_BG',
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
                        type: 'SET_ACTIVE_BRANCH_BG',
                        payload: {
                            backgroundColor: undefined,
                        },
                    });
                    ActiveBranchColor(element, settingsStore);
                })
                .setTooltip('Reset');
        });
};
