import { LineageView } from 'src/view/view';
import { Platform } from 'obsidian';
import { onLongPress } from 'src/view/actions/context-menu/helpers/on-long-press';
import { showCardContextMenu } from 'src/view/actions/context-menu/helpers/show-card-context-menu';

export const contextMenu = (element: HTMLElement, view: LineageView) => {
    const predicate = (e: MouseEvent | TouchEvent) => {
        const target = e.target as HTMLElement;
        return (
            !target.hasClass('drag-handle') &&
            Boolean(target.closest('.active-node.node-border--active'))
        );
    };
    const listener = (e: MouseEvent | TouchEvent) => {
        if (predicate(e)) {
            if (e instanceof MouseEvent) showCardContextMenu(e, view);
            else showCardContextMenu(new MouseEvent('contextmenu', e), view);
        }
    };
    element.addEventListener('contextmenu', listener);

    let unsubFromLongPress: (() => void) | null = null;
    if (Platform.isMobile) {
        unsubFromLongPress = onLongPress(element, listener, predicate);
    }
    return {
        destroy: () => {
            element.removeEventListener('contextmenu', listener);
            if (unsubFromLongPress) {
                unsubFromLongPress();
            }
        },
    };
};
