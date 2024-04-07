import {
    AlignBranchState,
    alignElement,
} from 'src/stores/view/subscriptions/effects/align-branch/helpers/align-element';
import { getNodeElement } from 'src/stores/view/subscriptions/effects/align-branch/helpers/get-node-element';
import { ViewState } from 'src/stores/view/view-state-type';
import { Column } from 'src/stores/document/document-state-type';

export const alignParentsAndActiveNode = (
    viewState: ViewState,
    container: HTMLElement,
    localState: AlignBranchState,
    columns: Column[],
    behavior?: ScrollBehavior,
) => {
    const activeNodeId = viewState.document.activeNode;
    const element = getNodeElement(container, activeNodeId);
    if (element) {
        const childGroupElement =
            viewState.document.activeBranch.childGroups.size > 0
                ? getNodeElement(container, 'group-' + activeNodeId)
                : undefined;
        const columnId = alignElement(
            container,
            element,
            behavior,
            'both',
            childGroupElement,
        );
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
