import {
    AlignBranchState,
    alignElement,
} from 'src/stores/view/subscriptions/effects/align-branch/helpers/align-element';
import { getNodeElement } from 'src/stores/view/subscriptions/effects/align-branch/helpers/get-node-element';
import { ViewState } from 'src/stores/view/view-state-type';

export const alignParentsAndActiveNode = (
    viewState: ViewState,
    container: HTMLElement,
    localState: AlignBranchState,
    behavior?: ScrollBehavior,
) => {
    const element = getNodeElement(container, viewState.document.activeNode);
    if (element) {
        const columnId = alignElement(container, element, behavior, 'both');
        if (columnId) localState.columns.add(columnId);
    }
    for (const id of viewState.document.activeBranch.sortedParentNodes) {
        const element = getNodeElement(container, id);
        if (element) {
            const columnId = alignElement(container, element, behavior);
            if (columnId) localState.columns.add(columnId);
        }
    }
};
