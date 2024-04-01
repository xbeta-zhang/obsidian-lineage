import Lineage from 'src/main';
import { hotkeyStore } from 'src/stores/hotkeys/hotkey-store';
import { getUsedHotkeys } from 'src/obsidian/helpers/get-used-hotkeys';

export const hotkeySubscriptions = (plugin: Lineage) => {
    hotkeyStore.subscribe((state, action) => {
        if (action) {
            if (
                action.type === 'HOTKEY/RESET' ||
                action.type === 'HOTKEY/UPDATE'
            ) {
                plugin.settings.dispatch({
                    type: 'SET_CUSTOM_HOTKEYS',
                    payload: {
                        customHotkeys: state.customHotkeys,
                    },
                });
                hotkeyStore.dispatch({
                    type: 'SET_CONFLICTING_HOTKEYS',
                    payload: {
                        conflictingHotkeys: getUsedHotkeys(plugin),
                    },
                });
            }
        }
    });
};
