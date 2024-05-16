import { CMD_CREATE_FILE, runCommand } from '../obsidian-commands/run-command';
import { __obsidian__ } from '../../getters/obsidian/load-obsidian';
import { LINEAGE_VIEW } from '../../getters/lineage-view/card/get-active-view';

export const createNewLineageFile = async () => {
    await runCommand(CMD_CREATE_FILE);
    await __obsidian__.focus(`.workspace-leaf.mod-active ${LINEAGE_VIEW}`);
};
