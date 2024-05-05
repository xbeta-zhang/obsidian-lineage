import { CustomHotkeys } from 'src/stores/settings/settings-type';
import { isMacLike } from 'src/view/actions/keyboard-shortcuts/helpers/keyboard-events/mod-key';

/* temporary migration for existing non-mac users to map ctrl to mod */
export const mapCtrlToMod = (customHotkeys: CustomHotkeys) => {
    if (!isMacLike) {
        for (const value of Object.values(customHotkeys)) {
            const hotkey = value.primary || value.secondary;
            if (hotkey) {
                hotkey.modifiers = hotkey.modifiers.map((m) =>
                    m === 'Ctrl' ? 'Mod' : m,
                );
            }
        }
    }
    return customHotkeys;
};
