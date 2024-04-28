import { LineageView } from 'src/view/view';

export const closeModalsWhenClickingOutside = (
    element: HTMLElement,
    view: LineageView,
) => {
    const onClick = (e: MouseEvent) => {
        if (e.button === 0) {
            view.viewStore.dispatch({
                type: 'CLOSE_MODALS',
            });
        }
    };
    element.addEventListener('mouseup', onClick);
    return {
        destroy: () => {
            element.removeEventListener('mouseup', onClick);
        },
    };
};
