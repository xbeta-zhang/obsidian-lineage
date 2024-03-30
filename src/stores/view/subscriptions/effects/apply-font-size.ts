import { LineageView } from 'src/view/view';

export const applyFontSize = (view: LineageView, fontSize: number) => {
    view.containerEl.style.setProperty('--font-text-size', `${fontSize}px`);
};
