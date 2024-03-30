import { getCombinedBoundingClientRect } from 'src/stores/view/subscriptions/effects/align-branch/helpers/get-combined-client-rect';
import {
    restoreZoom,
    suspendZoom,
} from 'src/stores/view/subscriptions/effects/align-branch/helpers/restore-zoom';

export type AlignBranchState = { columns: Set<string> };
export const alignElement = (
    container: HTMLElement,
    elements: HTMLElement | HTMLElement[],
    behavior: ScrollBehavior = 'smooth',
    mode: 'vertical' | 'horizontal' | 'both' = 'vertical',
) => {
    if (!container) return;
    const isArray = Array.isArray(elements);
    const element = isArray ? elements[0] : elements;
    if (!element) return;
    const column = element.matchParent('.column') as HTMLElement;
    const columns = column.matchParent('.columns') as HTMLElement;
    if (column) {
        const zoomStyle = suspendZoom(column, columns);
        const elementRect = isArray
            ? getCombinedBoundingClientRect(elements)
            : element.getBoundingClientRect();
        const containerRect = (
            container.parentElement as HTMLElement
        ).getBoundingClientRect();

        if (mode === 'horizontal' || mode === 'both') {
            // only scroll horizontally if the element is not fully visible
            const isHorizontallyVisible =
                elementRect.left >= containerRect.left &&
                elementRect.right <= containerRect.right;
            if (!isHorizontallyVisible) {
                let scrollLeft = 0;
                const padding = 100;
                if (elementRect.left < containerRect.left + padding) {
                    scrollLeft =
                        elementRect.left - (containerRect.left + padding);
                } else if (elementRect.right > containerRect.right - padding) {
                    scrollLeft =
                        elementRect.right - (containerRect.right - padding);
                }
                if (Math.abs(scrollLeft) > 5)
                    container.scrollBy({
                        left: scrollLeft,
                        behavior,
                    });
            }
        }

        if (mode === 'vertical' || mode === 'both') {
            const verticalMiddle = containerRect.height / 2;
            const scrollTop =
                verticalMiddle -
                (elementRect.top - containerRect.top + elementRect.height / 2);
            if (Math.abs(scrollTop) > 5)
                column.scrollBy({
                    top: scrollTop * -1,
                    behavior,
                });
        }

        restoreZoom(column, columns, zoomStyle);
        return column.id;
    }
};
