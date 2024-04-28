import { LineageView } from 'src/view/view';
import Lineage from 'src/main';

export class StatusBar {
    private container: HTMLElement;
    private elements: {
        numberOfCards: HTMLElement;
    };

    constructor(public plugin: Lineage) {
        this.onload();
    }

    onload() {
        this.container = this.plugin.addStatusBarItem();
        this.elements = {
            numberOfCards: this.container.createDiv(),
        };
        this.plugin.registerEvent(
            this.plugin.app.workspace.on('active-leaf-change', (x) => {
                const visible = Boolean(x && x.view instanceof LineageView);
                this.container.toggleClass('lineage__hidden-element', !visible);
            }),
        );
    }

    update = (action: {
        type: 'NUMBER_OF_CARDS';
        payload: { cards: number };
    }) => {
        if (action.type === 'NUMBER_OF_CARDS') {
            this.elements.numberOfCards.setText(
                action.payload.cards +
                    ' card' +
                    (action.payload.cards === 1 ? '' : 's'),
            );
        }
    };
}
