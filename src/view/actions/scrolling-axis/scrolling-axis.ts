import { LineageView } from 'src/view/view';
import invariant from 'tiny-invariant';
import { get, Writable } from 'svelte/store';
import { isEditing } from 'src/view/actions/keyboard-shortcuts/helpers/commands/commands/helpers/is-editing';
import { debounce } from 'obsidian';

export const scrollingAxis = (
    element: HTMLElement,
    { view, pressed }: { view: LineageView; pressed: Writable<boolean> },
) => {
    const onKeyDown = (e: KeyboardEvent) => {
        if (e.key === ' ') {
            const enabled = !isEditing(view);
            if (enabled) {
                pressed.set(enabled);
                hookMouseEvents();
            }
        }
    };
    const onKeyUp = (e: KeyboardEvent) => {
        if (e.key === ' ') {
            if (get(pressed)) {
                pressed.set(false);
                unhookMouseEvents();
            }
        }
    };
    const hookKeyboardEvents = () => {
        const container = view.container;
        invariant(container);
        container.addEventListener('keydown', onKeyDown);
        container.addEventListener('keyup', onKeyUp);
    };

    const unhookKeyboardEvents = () => {
        const container = view.container;
        invariant(container);
        container.removeEventListener('keydown', onKeyDown);
        container.removeEventListener('keyup', onKeyUp);
    };

    let clientX = 0;
    let clientY = 0;
    const dispatch = debounce(() => {
        const container = view.container;
        invariant(container);
        const containerRect = container.getBoundingClientRect();
        view.plugin.settings.dispatch({
            type: 'UPDATE_AXIS_OFFSET',
            payload: {
                relativeClientX:
                    (clientX - containerRect.left) / containerRect.width,
                relativeClientY:
                    (clientY - containerRect.top) / containerRect.height,
            },
        });
    }, 16);
    const onMouseMove = (e: MouseEvent) => {
        clientX = e.clientX;
        clientY = e.clientY;
        dispatch();
    };
    const hookMouseEvents = () => {
        const container = view.container;
        invariant(container);

        container.addEventListener('mousemove', onMouseMove);
        container.style.cursor = 'move';
    };
    const unhookMouseEvents = () => {
        const container = view.container;
        invariant(container);
        container.removeEventListener('mousemove', onMouseMove);
        container.style.cursor = 'initial';
    };
    setTimeout(hookKeyboardEvents);
    return {
        destroy: () => {
            unhookKeyboardEvents();
            unhookMouseEvents();
        },
    };
};
