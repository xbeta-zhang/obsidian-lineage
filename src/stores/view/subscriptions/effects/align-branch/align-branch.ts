import { DocumentState } from 'src/stores/document/document-state-type';
import {
    AlignBranchState,
    alignElement,
} from 'src/stores/view/subscriptions/effects/align-branch/helpers/align-element/align-element';
import { alignParentsAndActiveNode } from 'src/stores/view/subscriptions/effects/align-branch/align-parents-and-active-node';
import { alignChildGroupOfColumn } from 'src/stores/view/subscriptions/effects/align-branch/align-child-group-of-column';
import { ViewState } from 'src/stores/view/view-state-type';
import { debounce } from 'obsidian';
import { getNodeElement } from 'src/stores/view/subscriptions/effects/align-branch/helpers/get-node-element';
import { Settings } from 'src/stores/settings/settings-type';

export const alignBranch = (
    documentState: DocumentState,
    viewState: ViewState,
    container: HTMLElement,
    settings: Settings,
    behavior?: ScrollBehavior,
) => {
    if (!container) return;
    const nodeId = viewState.document.activeNode;
    if (!nodeId) return;
    const localState: AlignBranchState = {
        columns: new Set<string>(),
    };

    alignParentsAndActiveNode(
        viewState,
        container,
        localState,
        settings,
        behavior,
    );

    for (const column of documentState.document.columns) {
        if (localState.columns.has(column.id)) continue;

        const activeNodesOfColumn =
            viewState.document.activeNodesOfColumn[column.id];

        const activeDirectChildNode = activeNodesOfColumn
            ? activeNodesOfColumn[viewState.document.activeNode]
            : null;
        if (activeDirectChildNode) {
            const element = getNodeElement(container, activeDirectChildNode);
            if (element) {
                const columnId = alignElement(
                    container,
                    element,
                    settings,
                    behavior,
                );
                if (columnId) localState.columns.add(columnId);
            }
        } else {
            const childGroup = column.groups.find((g) =>
                viewState.document.activeBranch.childGroups.has(g.parentId),
            );
            if (childGroup) {
                alignChildGroupOfColumn(
                    viewState,
                    container,
                    column.id,
                    settings,
                    behavior,
                );
            } /*else {
            alignInactiveColumn(column, container, behavior);
        }*/
        }
    }
};
export const alignBranchDebounced = debounce(alignBranch, 32);
