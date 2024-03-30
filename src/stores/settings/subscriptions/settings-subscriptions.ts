import Lineage from 'src/main';

import { updateFileViewTypeCache } from 'src/stores/settings/subscriptions/effects/update-file-view-type-cache';

export const settingsSubscriptions = (plugin: Lineage) => {
    return plugin.settings.subscribe((state) => {
        updateFileViewTypeCache(state.documents);
    });
};
