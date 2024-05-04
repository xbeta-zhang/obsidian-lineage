import { CustomHotkeys } from 'src/stores/settings/settings-type';

export const mapCtrlToMod = (customHotkeys: CustomHotkeys) => {
    for (const value of Object.values(customHotkeys)) {
        const hotkey = value.primary || value.secondary;
        if (hotkey) {
            hotkey.modifiers = hotkey.modifiers.map((m) =>
                m === 'Ctrl' ? 'Mod' : m,
            );
        }
    }
    return customHotkeys;
};
