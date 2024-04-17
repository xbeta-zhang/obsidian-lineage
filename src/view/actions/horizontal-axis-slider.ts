import { LineageView } from 'src/view/view';

export const horizontalAxisSlider = (
    input: HTMLInputElement,
    view: LineageView,
) => {
    const onChange = () => {
        if (!view.container) return;
        const rect = view.container.getBoundingClientRect();
        const value = +input.value;
        const minValue = 0;
        const valueMax = 100;
        const thumbHalfWidth = 4;
        const left =
            ((value - minValue) / (valueMax - minValue)) *
            (input.getBoundingClientRect().width -
                thumbHalfWidth -
                thumbHalfWidth);
        const offset =
            rect.left +
            left -
            (rect.left + rect.width / 2) +
            view.plugin.settings.getValue().view.cardWidth / 2;

        view.plugin.settings.dispatch({
            type: 'SET_HORIZONTAL_OFFSET',
            payload: {
                offset,
            },
        });
    };
    const applyOffsetToSlider = () => {
        if (!view.container) return;
        const minValue = 0;
        const valueMax = 100;
        const thumbHalfWidth = 4;

        const rect = view.container.getBoundingClientRect();
        const offset = view.plugin.settings.getValue().view.scrolling.offset;
        const left =
            rect.width / 2 +
            offset -
            view.plugin.settings.getValue().view.cardWidth / 2;

        input.value = String(
            Math.round(
                ((valueMax - minValue) * left) /
                    (input.getBoundingClientRect().width -
                        thumbHalfWidth -
                        thumbHalfWidth) +
                    -minValue,
            ),
        );
    };
    input.addEventListener('change', onChange);
    setTimeout(applyOffsetToSlider);
    return {
        destroy: () => {
            input.removeEventListener('change', onChange);
        },
    };
};
