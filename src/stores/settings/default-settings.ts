import { Settings } from './settings-type';

export const DEFAULT_SETTINGS = (): Settings => ({
    documents: {},
    hotkeys: {
        customHotkeys: {},
    },
    view: {
        fontSize: 16,
        theme: {},
    },
});
