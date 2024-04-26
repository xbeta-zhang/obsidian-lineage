import { PluginCommand } from 'src/view/actions/keyboard-shortcuts/helpers/commands/command-names';
import { isActiveAndNotEditing } from 'src/view/actions/keyboard-shortcuts/helpers/commands/commands/helpers/is-editing';
import { copyActiveBranchToClipboard } from 'src/view/actions/keyboard-shortcuts/helpers/commands/commands/helpers/clipboard/copy-active-branch-to-clipboard';

export const clipboardCommands = () => {
    return [
        {
            name: 'copy_node',
            check: isActiveAndNotEditing,
            callback: async (view, event) => {
                event.preventDefault();
                await copyActiveBranchToClipboard(view);
                view.documentStore.dispatch({
                    type: 'DOCUMENT/COPY_NODE',
                    payload: {
                        nodeId: view.viewStore.getValue().document.activeNode,
                    },
                });
            },
            hotkeys: [{ key: 'C', modifiers: ['Ctrl'] }],
        },
        {
            name: 'cut_node',
            check: isActiveAndNotEditing,
            callback: async (view, event) => {
                event.preventDefault();
                await copyActiveBranchToClipboard(view);
                view.documentStore.dispatch({
                    type: 'DOCUMENT/CUT_NODE',
                    payload: {
                        nodeId: view.viewStore.getValue().document.activeNode,
                    },
                });
            },
            hotkeys: [{ key: 'X', modifiers: ['Ctrl'] }],
        },
        {
            name: 'paste_node',
            check: isActiveAndNotEditing,
            callback: async (view, event) => {
                event.preventDefault();
                const viewState = view.viewStore.getValue();
                const text = await navigator.clipboard.readText();
                view.documentStore.dispatch({
                    type: 'DOCUMENT/PASTE_NODE',
                    payload: {
                        targetNodeId: viewState.document.activeNode,
                        text,
                    },
                });
            },
            hotkeys: [{ key: 'V', modifiers: ['Ctrl'] }],
        },
    ] satisfies PluginCommand[];
};
