import { DocumentViewState } from 'src/stores/view/view-state-type';

export type ToggleEditModeAction = {
    type: 'DOCUMENT/ENABLE_EDIT_MODE';
    payload: {
        nodeId: string;
    };
};
export const enableEditMode = (
    state: Pick<DocumentViewState, 'editing'>,
    action: ToggleEditModeAction,
) => {
    state.editing = {
        activeNodeId: action.payload.nodeId,
        disableEditConfirmation: false,
    };
};
