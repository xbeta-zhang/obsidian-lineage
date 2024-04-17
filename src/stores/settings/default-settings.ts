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
            alwaysCenterHorizontally: true,
            offset: 0,
            enableOffset: false,
        },
    },
});
