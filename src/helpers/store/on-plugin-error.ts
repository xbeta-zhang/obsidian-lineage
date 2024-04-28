import { SilentError } from 'src/stores/view/helpers/errors';
import { Notice } from 'obsidian';

export const onPluginError = (
    error: Error,
    location: 'reducer' | 'subscriber' | 'command',
    action: unknown,
) => {
    if (!(error instanceof SilentError)) {
        // eslint-disable-next-line no-console
        console.error(`[${location}] action: `, action);
        // eslint-disable-next-line no-console
        console.error(`[${location}]`, error);
        new Notice('Lineage plugin: ' + error.message);
    }
};
