import { LineageView } from 'src/view/view';
import { Menu } from 'obsidian';
import { copyNode } from 'src/view/actions/keyboard-shortcuts/helpers/commands/commands/helpers/copy-node';
import { cutNode } from 'src/view/actions/keyboard-shortcuts/helpers/commands/commands/helpers/cut-node';
import { pasteNode } from 'src/view/actions/keyboard-shortcuts/helpers/commands/commands/helpers/paste-node';
import { extractBranch } from 'src/obsidian/commands/helpers/extract-branch/extract-branch';
import { mergeNode } from 'src/view/actions/keyboard-shortcuts/helpers/commands/commands/helpers/merge-node';

export const contextMenu = (element: HTMLElement, view: LineageView) => {
    const showMenu = (event: MouseEvent) => {
        const menu = new Menu();
        menu.addItem((item) =>
            item
                .setTitle('Extract')
                .setIcon('file-symlink')
                .onClick(() => {
                    extractBranch(view);
                }),
        );
        menu.addSeparator();

        menu.addItem((item) =>
            item
                .setTitle('Merge with the card above')
                .setIcon('merge')
                .onClick(() => {
                    mergeNode(view, 'up');
                }),
        );
        menu.addItem((item) =>
            item
                .setTitle('Merge with the card below')
                .setIcon('merge')
                .onClick(() => {
                    mergeNode(view, 'down');
                }),
        );
        menu.addSeparator();
        menu.addItem((item) =>
            item
                .setTitle('Copy')
                .setIcon('documents')
                .onClick(() => {
                    copyNode(view);
                }),
        );

        menu.addItem((item) =>
            item
                .setTitle('Cut')
                .setIcon('scissors')
                .onClick(() => {
                    cutNode(view);
                }),
        );

        menu.addItem((item) =>
            item
                .setTitle('Paste')
                .setIcon('paste')
                .onClick(() => {
                    pasteNode(view);
                }),
        );

        menu.showAtMouseEvent(event);
    };
    const listener = (e: MouseEvent) => {
        if (e.button === 2) {
            const target = e.target as HTMLElement;
            const isActive = Boolean(target.closest('.active-node'));
            if (isActive) {
                showMenu(e);
            }
        }
    };
    element.addEventListener('mouseup', listener);
    return {
        destroy: () => {
            element.removeEventListener('mouseup', listener);
        },
    };
};
