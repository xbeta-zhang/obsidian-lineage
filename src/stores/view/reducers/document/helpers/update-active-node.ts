import { DocumentViewState } from 'src/stores/view/view-state-type';
import { addNavigationHistoryItem } from 'src/stores/view/reducers/ui/helpers/add-navigation-history-item';
import { NavigationHistory } from 'src/stores/document/document-state-type';
import { disableEditMode } from 'src/stores/view/reducers/document/disable-edit-mode';

export const updateActiveNode = (
    state: DocumentViewState,
    nodeId: string,
    navigationHistory: null | NavigationHistory,
) => {
    state.activeNode = nodeId;
    if (navigationHistory)
        addNavigationHistoryItem(navigationHistory, state.activeNode);
    if (state.editing.activeNodeId && state.editing.activeNodeId !== nodeId)
        disableEditMode(state.editing);
};
