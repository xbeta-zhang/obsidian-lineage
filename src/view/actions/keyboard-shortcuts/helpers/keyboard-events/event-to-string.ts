import { Modifiers } from 'src/view/actions/keyboard-shortcuts/helpers/commands/update-commands-dictionary';
import { isMacLike } from 'src/view/actions/keyboard-shortcuts/helpers/keyboard-events/mod-key';

export const eventToString = (event: KeyboardEvent) => {
    let string = event.key.toUpperCase();
    if (event.altKey) string += Modifiers.Alt;
    if (isMacLike) {
        if (event.ctrlKey) string += Modifiers.Ctrl;
        if (event.metaKey) string += Modifiers.Mod;
    } else {
        if (event.ctrlKey) string += Modifiers.Mod;
    }
    if (event.shiftKey) string += Modifiers.Shift;
    return string;
};
