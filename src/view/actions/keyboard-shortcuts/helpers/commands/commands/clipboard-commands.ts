import { PluginCommand } from 'src/view/actions/keyboard-shortcuts/helpers/commands/command-names';
import { isActiveAndNotEditing } from 'src/view/actions/keyboard-shortcuts/helpers/commands/commands/helpers/is-editing';
import { copyNode } from 'src/view/actions/keyboard-shortcuts/helpers/commands/commands/helpers/copy-node';
import { cutNode } from 'src/view/actions/keyboard-shortcuts/helpers/commands/commands/helpers/cut-node';
import { pasteNode } from 'src/view/actions/keyboard-shortcuts/helpers/commands/commands/helpers/paste-node';

export const clipboardCommands = () => {
    return [
        {
            name: 'copy_node',
            check: isActiveAndNotEditing,
            callback: async (view, event) => {
                event.preventDefault();
                copyNode(view);
            },
            hotkeys: [{ key: 'C', modifiers: ['Ctrl'] }],
        },
        {
            name: 'cut_node',
            check: isActiveAndNotEditing,
            callback: async (view, event) => {
                event.preventDefault();
                cutNode(view);
            },
            hotkeys: [{ key: 'X', modifiers: ['Ctrl'] }],
        },
        {
            name: 'paste_node',
            check: isActiveAndNotEditing,
            callback: async (view, event) => {
                event.preventDefault();
                pasteNode(view);
            },
            hotkeys: [{ key: 'V', modifiers: ['Ctrl'] }],
        },
    ] satisfies PluginCommand[];
};
