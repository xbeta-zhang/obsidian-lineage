import { Hotkey } from 'obsidian';

import { CommandName } from 'src/view/actions/keyboard-shortcuts/helpers/commands/command-names';

export type CustomHotkeys = {
    [command in CommandName]?: {
        primary?: Hotkey;
        secondary?: Hotkey;
    };
};
export type Theme = {
    containerBg?: string;
    activeBranchBg?: string;
};
export type Settings = {
    documents: Record<string, true>;
    hotkeys: {
        customHotkeys: CustomHotkeys;
    };
    view: {
        fontSize: number;
        theme: Theme;
        cardWidth?: number;
        minimumCardHeight?: number;
    };
};
