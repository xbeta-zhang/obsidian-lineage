import { PluginCommand } from 'src/view/actions/keyboard-shortcuts/helpers/commands/command-names';
import { isActiveAndNotEditing } from 'src/view/actions/keyboard-shortcuts/helpers/commands/commands/helpers/is-editing';

export const clipboardCommands = () => {
    return [
        {
            name: 'copy_node',
            check: isActiveAndNotEditing,
            callback: (view, event) => {
                event.preventDefault();
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
            callback: (view, event) => {
                event.preventDefault();
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
            callback: (view, event) => {
                event.preventDefault();
                view.documentStore.dispatch({
                    type: 'DOCUMENT/PASTE_NODE',
                    payload: {
                        targetNodeId:
                            view.viewStore.getValue().document.activeNode,
                        branch: view.plugin.documents.getValue().clipboard
                            .branch,
                    },
                });
            },
            hotkeys: [{ key: 'V', modifiers: ['Ctrl'] }],
        },
    ] satisfies PluginCommand[];
};
