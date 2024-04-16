const VERTICAL_PADDING = 20;

export const calculateScrollTop = (
    elementRect: DOMRect,
    containerRect: DOMRect,
    alwaysCenter = true,
) => {
    const viewPortIsTallEnough = containerRect.height >= elementRect.height;
    const deltaTop = containerRect.top + VERTICAL_PADDING - elementRect.top;
    const deltaBottom =
        containerRect.bottom - VERTICAL_PADDING - elementRect.bottom;
    const topSideIsVisible = deltaTop < 0;
    const bottomSideIsVisible = deltaBottom > 0;
    let scrollTop = 0;
    if (!viewPortIsTallEnough) {
        scrollTop = deltaTop;
    } else if (alwaysCenter) {
        const verticalMiddle = containerRect.height / 2;
        scrollTop =
            verticalMiddle -
            (elementRect.top - containerRect.top + elementRect.height / 2);
    } else if (!topSideIsVisible) {
        scrollTop = deltaTop;
    } else if (!bottomSideIsVisible) {
        scrollTop = deltaBottom;
    }
    return scrollTop;
};
