import { LineageView } from 'src/view/view';
import { eventToString } from 'src/view/actions/keyboard-shortcuts/helpers/keyboard-events/event-to-string';
import { hotkeyStore } from 'src/stores/hotkeys/hotkey-store';
import {
    commandsDictionary,
    updateCommandsDictionary,
} from 'src/view/actions/keyboard-shortcuts/helpers/commands/update-commands-dictionary';
import { Notice } from 'obsidian';
import { handleEscapeKey } from 'src/view/actions/on-escape/helpers/handle-escape-key';

/* using native obsidian hotkeys is not practical because (1) the plugin uses too many basic
 * hotkeys such as 'Arrow keys' and 'Enter' and (2) the plugin only listens to hotkeys in its
 * custom view */
export const keyboardShortcuts = (
    target: HTMLElement,
    {
        view,
    }: {
        view: LineageView;
    },
) => {
    const event = 'keydown';

    const unsubscribeFromHotkeyStore = hotkeyStore.subscribe(
        (state, action, initialRun) => {
            if (
                action?.type === 'HOTKEY/UPDATE' ||
                action?.type === 'HOTKEY/RESET' ||
                initialRun
            )
                updateCommandsDictionary(state.hotkeys);
        },
    );
    const keyboardEventHandler = (event: Event) => {
        if (!(event instanceof KeyboardEvent)) return;
        if (event.key === 'Escape') {
            const contain = handleEscapeKey(view);
            if (contain) return;
        }
        const command = commandsDictionary.current[eventToString(event)];
        if (command) {
            if (command.check(view)) {
                try {
                    command.callback(view, event);
                } catch (error) {
                    // eslint-disable-next-line no-console
                    console.error(`[hotkey] command: `, command.name);
                    // eslint-disable-next-line no-console
                    console.error(`[hotkey] `, error);
                    new Notice('Lineage plugin: ' + error.message);
                }
            }
        }
    };

    target.addEventListener(event, keyboardEventHandler);

    return {
        destroy: () => {
            unsubscribeFromHotkeyStore();
            target.removeEventListener(event, keyboardEventHandler);
        },
    };
};
