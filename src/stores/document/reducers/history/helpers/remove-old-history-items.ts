import {
    DocumentHistory,
    NavigationHistory,
} from 'src/stores/document/document-state-type';

export const removeOldHistoryItems = (
    history: NavigationHistory | DocumentHistory,
    MAX_ITEMS: number,
) => {
    if (history.items.length >= MAX_ITEMS) {
        const numSnapshotsToRemove = history.items.length - MAX_ITEMS + 1;
        history.items.splice(0, numSnapshotsToRemove);
        const activeItem = history.items[history.state.activeIndex];
        history.state.activeIndex = history.items.findIndex(
            (item) => item === activeItem,
        );
    }
};
