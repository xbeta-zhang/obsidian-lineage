import { CustomHotkeys, Settings } from './settings-type';

export type SettingsActions =
    | {
          type: 'SET_DOCUMENT_TYPE_TO_TREE';
          payload: {
              path: string;
          };
      }
    | {
          type: 'SET_DOCUMENT_TYPE_TO_MARKDOWN';
          payload: {
              path: string;
          };
      }
    | {
          type: 'HISTORY/UPDATE_DOCUMENT_PATH';
          payload: {
              oldPath: string;
              newPath: string;
          };
      }
    | {
          type: 'SET_CUSTOM_HOTKEYS';
          payload: {
              customHotkeys: CustomHotkeys;
          };
      }
    | {
          type: 'SET_FONT_SIZE';
          payload: {
              fontSize: number;
          };
      }
    | {
          type: 'SET_CONTAINER_BG';
          payload: {
              backgroundColor: string | undefined;
          };
      }
    | {
          type: 'SET_ACTIVE_BRANCH_BG';
          payload: {
              backgroundColor: string | undefined;
          };
      }
    | {
          type: 'SET_CARD_WIDTH';
          payload: {
              width: number;
          };
      }
    | {
          type: 'SET_MIN_CARD_HEIGHT';
          payload: {
              height: number | undefined;
          };
      }
    | {
          type: 'SET_ALWAYS_CENTER_HORIZONTALLY';
          payload: {
              center: boolean;
          };
      }
    | {
          type: 'SET_HORIZONTAL_OFFSET';
          payload: {
              offset: number;
          };
      }
    | {
          type: 'TOGGLE_HORIZONTAL_OFFSET';
          payload: {
              enable: boolean;
          };
      };

const updateState = (store: Settings, action: SettingsActions) => {
    if (action.type === 'SET_DOCUMENT_TYPE_TO_MARKDOWN') {
        delete store.documents[action.payload.path];
    } else if (action.type === 'SET_DOCUMENT_TYPE_TO_TREE') {
        store.documents[action.payload.path] = true;
    } else if (action.type === 'HISTORY/UPDATE_DOCUMENT_PATH') {
        delete store.documents[action.payload.oldPath];
        store.documents[action.payload.newPath] = true;
    } else if (action.type === 'SET_CUSTOM_HOTKEYS') {
        store.hotkeys.customHotkeys = action.payload.customHotkeys;
    } else if (action.type === 'SET_FONT_SIZE') {
        store.view.fontSize = action.payload.fontSize;
    } else if (action.type === 'SET_CONTAINER_BG') {
        store.view.theme.containerBg = action.payload.backgroundColor;
    } else if (action.type === 'SET_ACTIVE_BRANCH_BG') {
        store.view.theme.activeBranchBg = action.payload.backgroundColor;
    } else if (action.type === 'SET_CARD_WIDTH') {
        store.view.cardWidth = action.payload.width;
    } else if (action.type === 'SET_MIN_CARD_HEIGHT') {
        store.view.minimumCardHeight = action.payload.height;
    } else if (action.type === 'SET_ALWAYS_CENTER_HORIZONTALLY') {
        store.view.scrolling.alwaysCenterHorizontally = action.payload.center;
        store.view.scrolling = { ...store.view.scrolling };
    } else if (action.type === 'SET_HORIZONTAL_OFFSET') {
        store.view.scrolling.offset = action.payload.offset;
        store.view.scrolling = { ...store.view.scrolling };
    } else if (action.type === 'TOGGLE_HORIZONTAL_OFFSET') {
        store.view.scrolling.enableOffset = action.payload.enable;
        if (!store.view.scrolling.enableOffset) store.view.scrolling.offset = 0;
        store.view.scrolling = { ...store.view.scrolling };
    }
};
export const settingsReducer = (
    store: Settings,
    action: SettingsActions,
): Settings => {
    updateState(store, action);
    return store;
};
