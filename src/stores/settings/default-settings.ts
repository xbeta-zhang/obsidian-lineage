import { Settings } from './settings-type';

export const DEFAULT_CARD_WIDTH = 600;
export const DEFAULT_SETTINGS = (): Settings => ({
    documents: {},
    hotkeys: {
        customHotkeys: {},
    },
    view: {
        fontSize: 16,
        theme: {},
        cardWidth: DEFAULT_CARD_WIDTH,
        scrolling: {
            horizontalOffset: 0,
            verticalOffset: 0,
            horizontalScrollingMode: 'reveal-active-card-and-direct-child',
        },
    },
});
