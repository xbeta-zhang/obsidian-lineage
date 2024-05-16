import { LineageView } from 'src/view/view';

export const updateStatusBar = (view: LineageView) => {
    view.plugin.statusBar.update({
        type: 'NUMBER_OF_CARDS',
        payload: {
            cards: Object.keys(view.documentStore.getValue().document.content)
                .length,
        },
    });
};
