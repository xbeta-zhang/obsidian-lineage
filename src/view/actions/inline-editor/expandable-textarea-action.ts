const deletionKeys = new Set(['Backspace', 'Delete', 'x', ' ']);

export const AdjustHeight = (el: HTMLElement) => {
    let previousScrollHeight = 0;
    let x: HTMLElement;
    return (e?: KeyboardEvent) => {
        if (!x) {
            x = el.querySelector('.cm-scroller') as HTMLElement;
            x.style.height = 'auto';
        }

        if (!x) return;
        if (
            x.scrollHeight !== previousScrollHeight ||
            (e && deletionKeys.has(e.key))
        ) {
            x.style.height = 'auto';
            previousScrollHeight = x.scrollHeight;
            el.style.height = previousScrollHeight + 'px';
            x.style.height = '';
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
