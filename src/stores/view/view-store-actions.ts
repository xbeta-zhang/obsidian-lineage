import { SetSearchQueryAction } from 'src/stores/view/reducers/search/set-search-query';
import { SetSearchResultsAction } from 'src/stores/view/reducers/search/set-search-results';
import { ToggleSearchInputAction } from 'src/stores/view/reducers/search/toggle-search-input';
import { ChangeZoomLevelAction } from 'src/stores/view/reducers/ui/change-zoom-level';
import { DisableEditModeAction } from 'src/stores/view/reducers/document/disable-edit-mode';
import { ToggleEditModeAction } from 'src/stores/view/reducers/document/enable-edit-mode';
import { SetDragStartedAction } from 'src/stores/view/reducers/document/on-drag-start';
import { SetDragCanceled } from 'src/stores/view/reducers/document/on-drag-end';
import { UpdateActiveBranchAction } from 'src/stores/view/reducers/document/helpers/update-active-branch';
import { JumpToNodeAction } from 'src/stores/view/reducers/document/jump-to-node';
import { ChangeActiveNodeAction } from 'src/stores/view/reducers/document/navigate-using-keyboard';
import { NavigationAction } from 'src/stores/view/reducers/ui/navigate-active-node';
import { ToggleFuzzySearchAction } from 'src/stores/view/reducers/search/toggle-fuzzy-search';

export type ViewStoreAction =
    | SearchAction
    | ViewUIAction
    | ViewDocumentAction
    | NodeSelectionAction
    | NavigationAction;

export type SearchAction =
    | SetSearchQueryAction
    | SetSearchResultsAction
    | ToggleSearchInputAction
    | ToggleFuzzySearchAction;

export type ViewUIAction =
    | ChangeZoomLevelAction
    | ToggleHelpSidebarAction
    | ToggleHistorySidebarAction
    | ToggleSettingsSidebarAction
    | { type: 'CLOSE_MODALS'; payload?: { closeAllModals: boolean } };

export type ViewDocumentAction =
    | DisableEditModeAction
    | ToggleEditModeAction
    | SetDragStartedAction
    | SetDragCanceled
    | UpdateActiveBranchAction
    | {
          type: 'DOCUMENT/CONFIRM_DISABLE_EDIT';
      }
    | {
          type: 'DOCUMENT/RESET_DISABLE_EDIT_CONFIRMATION';
      };
type ToggleHistorySidebarAction = {
    type: 'UI/TOGGLE_HISTORY_SIDEBAR';
};
type ToggleHelpSidebarAction = {
    type: 'UI/TOGGLE_HELP_SIDEBAR';
};
type ToggleSettingsSidebarAction = {
    type: 'UI/TOGGLE_SETTINGS_SIDEBAR';
};
type SetActiveNodeAction = {
    type: 'DOCUMENT/SET_ACTIVE_NODE';
    payload: {
        id: string;
    };
    context?: {
        modKey: boolean;
    };
};
export type NodeSelectionAction =
    | JumpToNodeAction
    | ChangeActiveNodeAction
    | SetActiveNodeAction;
