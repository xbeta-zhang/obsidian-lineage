import { DocumentViewState } from 'src/stores/view/view-state-type';

export type SetDragStartedAction = {
    type: 'SET_DRAG_STARTED';
    payload: {
        nodeId: string;
        childGroups: string[];
    };
};
export const onDragStart = (
    state: Pick<DocumentViewState, 'dnd'>,
    action: SetDragStartedAction,
) => {
    const node = action.payload.nodeId;
    if (node) {
        state.dnd = {
            node: action.payload.nodeId,
            childGroups: new Set(action.payload.childGroups),
        };
    }
};
