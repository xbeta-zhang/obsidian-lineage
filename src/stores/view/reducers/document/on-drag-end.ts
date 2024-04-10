import { DocumentViewState } from 'src/stores/view/view-state-type';

export type SetDragCanceled = {
    type: 'DOCUMENT/SET_DRAG_ENDED';
};
export const onDragEnd = (state: Pick<DocumentViewState, 'dnd'>) => {
    state.dnd = {
        node: '',
        childGroups: new Set(),
    };
};
