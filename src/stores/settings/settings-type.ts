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

export type ScrollingMode =
    | 'reveal-active-card'
    | 'reveal-active-card-and-direct-child'
    | 'keep-active-card-at-center'
    | 'fixed-position';
export type ScrollingSettings = {
    horizontalOffset: number;
    verticalOffset: number;
    horizontalScrollingMode: ScrollingMode;
};

export type Settings = {
    documents: Record<string, true>;
    hotkeys: {
        customHotkeys: CustomHotkeys;
    };
    view: {
        fontSize: number;
        theme: Theme;
        cardWidth: number;
        minimumCardHeight?: number;
        scrolling: ScrollingSettings;
    };
};
