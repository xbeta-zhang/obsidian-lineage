export const AdjustHeight = (el: HTMLElement) => {
    let previousScrollHeight = 0;
    let x: HTMLElement;
    return () => {
        if (!x) {
            x = el.querySelector('.cm-scroller') as HTMLElement;
            x.style.height = 'auto';
        }
        if (x && x.scrollHeight !== previousScrollHeight) {
            previousScrollHeight = x.scrollHeight;
            el.style.height = x.scrollHeight + 'px';
        }
    };
};
export const expandableTextareaAction = (el: HTMLElement) => {
    const adjustHeight = AdjustHeight(el);

    el.addEventListener('keydown', adjustHeight);

    return {
        destroy: () => {
            el.removeEventListener('keydown', adjustHeight);
        },
    };
};
