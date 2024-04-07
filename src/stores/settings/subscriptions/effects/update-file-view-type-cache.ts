import { Settings } from 'src/stores/settings/settings-type';

export let fileViewTypeCache: Settings['documents'] = {};

export const updateFileViewTypeCache = (state: Settings['documents']) => {
    fileViewTypeCache = state;
};
