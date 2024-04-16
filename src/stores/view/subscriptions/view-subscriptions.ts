import { LineageView } from 'src/view/view';
import {
    DocumentEventType,
    getDocumentEventType,
} from 'src/stores/view/helpers/get-document-event-type';
import {
    getViewEventType,
    ViewEventType,
} from 'src/stores/view/helpers/get-view-event-type';
import { alignBranchDebounced } from 'src/stores/view/subscriptions/effects/align-branch/align-branch';
import { updateSearchResults } from 'src/stores/view/subscriptions/actions/update-search-results/update-search-results';
import { DocumentStoreAction } from 'src/stores/document/document-store-actions';
import { updateActiveBranch } from 'src/stores/view/subscriptions/actions/update-active-branch';
import { setActiveNode } from 'src/stores/view/subscriptions/actions/set-active-node';
import { enableEditMode } from 'src/stores/view/subscriptions/actions/enable-edit-mode';
import { removeObsoleteNavigationItems } from 'src/stores/view/subscriptions/actions/remove-obsolete-navigation-items';
import { focusContainer } from 'src/stores/view/subscriptions/effects/focus-container';
import { resetSearchFuse } from 'src/stores/view/subscriptions/actions/update-search-results/helpers/reset-search-fuse';
import { applyZoom } from 'src/stores/view/subscriptions/effects/apply-zoom';
import { ViewStoreAction } from 'src/stores/view/view-store-actions';
import { isEmptyDocument } from 'src/stores/view/subscriptions/helpers/is-empty-document';
import { discardChanges } from 'src/view/actions/keyboard-shortcuts/helpers/commands/commands/helpers/cancel-changes';
import { applyFontSize } from 'src/stores/view/subscriptions/effects/css-variables/apply-font-size';
import { applyContainerBg } from 'src/stores/view/subscriptions/effects/css-variables/apply-container-bg';
import { applyActiveBranchBg } from 'src/stores/view/subscriptions/effects/css-variables/apply-active-branch-bg';
import { applyCardWidth } from 'src/stores/view/subscriptions/effects/css-variables/apply-card-width';
import { hotkeyStore } from 'src/stores/hotkeys/hotkey-store';
import { getUsedHotkeys } from 'src/obsidian/helpers/get-used-hotkeys';
import { updateStatusBar } from 'src/stores/view/subscriptions/effects/update-status-bar';

const viewEffectsAndActions = (
    view: LineageView,
    action: DocumentStoreAction | ViewStoreAction | undefined,
    initialRun: boolean | undefined,
    fromDocument: boolean,
) => {
    const documentStore = view.documentStore;
    const documentState = documentStore.getValue();
    const viewStore = view.viewStore;
    const viewState = viewStore.getValue();
    const settings = view.plugin.settings.getValue();
    const container = view.container;
    if (initialRun) {
        // actions
        setActiveNode(viewStore, documentState);
        updateActiveBranch(viewStore, documentState);
        if (view.isActive && isEmptyDocument(documentState.document.content)) {
            enableEditMode(viewStore, documentState);
        }
        updateStatusBar(view);
        // effects
        if (view.isActive && container)
            alignBranchDebounced(documentState, viewState, container, settings);
    } else if (action) {
        const type = action.type;

        const e: (DocumentEventType & ViewEventType) | null = fromDocument
            ? getDocumentEventType(type as DocumentStoreAction['type'])
            : getViewEventType(type as ViewStoreAction['type']);
        if (!e) return;
        if (type === 'DOCUMENT/LOAD_FILE') {
            // needed when the file was modified externally
            // to prevent saving a node with an obsolete node-id
            // ideally the user should confirm this
            discardChanges(view);
        }
        const structuralChange =
            e.createOrDelete || e.dropOrMove || e.changeHistory || e.clipboard;
        const activeNodeChange = e.activeNode || e.activeNodeHistory;
        // actions
        if (structuralChange) {
            setActiveNode(viewStore, documentState);
        }
        if (activeNodeChange || structuralChange) {
            updateActiveBranch(viewStore, documentState);
        }

        if (type === 'DOCUMENT/INSERT_NODE' && view.isActive) {
            enableEditMode(viewStore, documentState);
        }

        if (type === 'DOCUMENT/DELETE_NODE' || type === 'DOCUMENT/CUT_NODE') {
            removeObsoleteNavigationItems(viewStore, documentState);
        }

        if (action.type === 'SEARCH/SET_QUERY') {
            updateSearchResults(documentStore, viewStore);
        }
        if (action.type === 'UI/TOGGLE_HELP_SIDEBAR') {
            if (viewState.ui.controls.showHelpSidebar)
                setTimeout(() => {
                    hotkeyStore.dispatch({
                        type: 'SET_CONFLICTING_HOTKEYS',
                        payload: {
                            conflictingHotkeys: getUsedHotkeys(view.plugin),
                        },
                    });
                }, 50);
        }

        if (
            (type === 'DOCUMENT/COPY_NODE' || type === 'DOCUMENT/CUT_NODE') &&
            documentState.clipboard.branch
        ) {
            view.plugin.documents.dispatch({
                type: 'DOCUMENTS/SET_CLIPBOARD',
                payload: {
                    branch: documentState.clipboard.branch,
                },
            });
            documentStore.dispatch({ type: 'DOCUMENTS/CLEAR_CLIPBOARD' });
        }

        // effects
        if (e.content || structuralChange) {
            const maybeViewIsClosing = !view.isActive;
            view.saveDocument(maybeViewIsClosing);
        }
        if (!container || !view.isActive) return;
        if (e.zoom) {
            applyZoom(container, viewState);
        }
        if (e.content || structuralChange) {
            resetSearchFuse(documentStore);
        }
        if (structuralChange) {
            updateStatusBar(view);
        }
        if (
            action.type === 'DOCUMENT/DISABLE_EDIT_MODE' ||
            e.content ||
            structuralChange
        ) {
            focusContainer(container);
        }
        if (activeNodeChange || e.zoom || e.search || structuralChange) {
            alignBranchDebounced(
                documentStore.getValue(),
                viewState,
                container,
                settings,
                type === 'DOCUMENT/MOVE_NODE' ? 'instant' : undefined,
            );
        }
    }
};

export const viewSubscriptions = (view: LineageView) => {
    const unsubFromDocument = view.documentStore.subscribe(
        (documentState, action) => {
            viewEffectsAndActions(view, action, false, true);
        },
    );

    const unsubFromView = view.viewStore.subscribe(
        (viewState, action, initialRun) => {
            viewEffectsAndActions(view, action, initialRun, false);
        },
    );

    const unsubFromSettings = view.plugin.settings.subscribe(
        (state, action, isInitialRun) => {
            if (isInitialRun) {
                applyFontSize(view, state.view.fontSize);
                applyContainerBg(view, state.view.theme.containerBg);
                applyActiveBranchBg(view, state.view.theme.activeBranchBg);
                applyCardWidth(view, state.view.cardWidth);
            } else if (action) {
                if (action.type === 'SET_FONT_SIZE') {
                    applyFontSize(view, state.view.fontSize);
                } else if (action.type === 'SET_CONTAINER_BG') {
                    applyContainerBg(view, state.view.theme.containerBg);
                } else if (action.type === 'SET_ACTIVE_BRANCH_BG') {
                    applyActiveBranchBg(view, state.view.theme.activeBranchBg);
                } else if (action.type === 'SET_CARD_WIDTH') {
                    applyCardWidth(view, state.view.cardWidth);
                }
            }
        },
    );

    return () => {
        unsubFromDocument();
        unsubFromView();
        unsubFromSettings();
    };
};
