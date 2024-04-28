import { hotkeyStore } from 'src/stores/hotkeys/hotkey-store';
import { derived } from 'src/helpers/store/derived';

export const numberOfConflictingHotkeys = derived(
    hotkeyStore,
    (store) => store.numberOfConflictingHotkeys,
);
