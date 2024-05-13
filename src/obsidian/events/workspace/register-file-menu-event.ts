import { lang } from 'src/lang/lang';
import { TFile, TFolder } from 'obsidian';
import Lineage from 'src/main';
import { createNewFile } from 'src/obsidian/commands/helpers/create-new-file';
import { openFile } from 'src/obsidian/commands/helpers/open-file';
import { toggleFileViewType } from 'src/obsidian/events/workspace/helpers/toggle-file-view-type';
import { FILE_VIEW_TYPE } from 'src/view/view';
import { customIcons } from 'src/helpers/load-custom-icons';

export const registerFileMenuEvent = (plugin: Lineage) => {
    plugin.registerEvent(
        plugin.app.workspace.on(
            'file-menu',
            (menu, abstractFile, source, leaf) => {
                if (abstractFile instanceof TFile) {
                    const view = leaf?.view;
                    if (!view) return;
                    menu.addItem((item) => {
                        const isTree = view.getViewType() === FILE_VIEW_TYPE;
                        item.setTitle(
                            isTree ? lang.open_in_editor : lang.open_in_lineage,
                        );
                        item.setIcon(
                            isTree ? 'file-text' : customIcons.cards.name,
                        );

                        item.onClick(async () => {
                            toggleFileViewType(plugin, abstractFile, leaf);
                        });
                    });
                } else if (abstractFile instanceof TFolder) {
                    menu.addItem((item) => {
                        item.setTitle(lang.new_file);
                        item.setIcon(customIcons.cards.name);

                        item.onClick(async () => {
                            const newFile = await createNewFile(
                                plugin,
                                abstractFile,
                            );
                            if (newFile) {
                                await openFile(
                                    plugin,
                                    newFile,
                                    'tab',
                                    'lineage',
                                );
                            }
                        });
                    });
                }
            },
        ),
    );
};
