import {
    NavigationHistory,
    NodeId,
} from 'src/stores/document/document-state-type';
import {
    ActiveBranch,
    DNDState,
    EditingState,
} from 'src/stores/view/default-view-state';

export type ActiveNodeOfGroup = {
    [groupId: string]: string;
};

export type DocumentViewState = {
    editing: EditingState;
    activeBranch: ActiveBranch;
    dnd: DNDState;
    activeNode: string;
    activeNodeOfGroup: ActiveNodeOfGroup;
};
export type ViewState = {
    search: {
        query: string;
        results: Set<NodeId>;
        searching: boolean;
        showInput: boolean;
    };
    ui: {
        showHistorySidebar: boolean;
        showHelpSidebar: boolean;
        zoomLevel: number;
        showSettingsSidebar: boolean;
    };
    document: DocumentViewState;
    navigationHistory: NavigationHistory;
};
