import { SettingsStore } from 'src/main';
import { Setting } from 'obsidian';
import { ScrollingMode } from 'src/stores/settings/settings-type';

export const ScrollingBehavior = (
    element: HTMLElement,
    settingsStore: SettingsStore,
) => {
    const settingsState = settingsStore.getValue();
    const setting = new Setting(element).setName('Scrolling behavior');

    setting.addDropdown((cb) => {
        const value = settingsState.view.scrolling.horizontalScrollingMode;

        cb.addOptions({
            'reveal-active-card': 'Reveal active card',
            'reveal-active-card-and-direct-child':
                'Reveal active card and its children',
            'keep-active-card-at-center': 'Keep active card in the center',
            'fixed-position': 'Keep active card in a fixed position',
        } satisfies Record<ScrollingMode, string>)
            .setValue(value)
            .onChange((mode) => {
                settingsStore.dispatch({
                    type: 'SET_HORIZONTAL_SCROLLING_MODE',
                    payload: {
                        mode: mode as ScrollingMode,
                    },
                });
            });
    });
};
