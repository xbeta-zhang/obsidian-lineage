<script lang="ts">
    import { getPlugin, getView } from '../../../../../../../context';
    import { ActiveStatus } from 'src/view/components/container/column/components/group/components/active-status.enum';
    import { parseDelimiter } from 'src/stores/view/helpers/json-to-md/markdown-to-json/helpers/delimiter';
    import { get } from 'svelte/store';
    import { MarkdownView, TFile } from 'obsidian';

    const plugin = getPlugin();
    const view = getView();
    const documentStore = view.documentStore;
    export let nodeId: string;
    export let activeStatus: ActiveStatus | null;
    export let section: string

    const openFileAndJumpToLine = async (file: TFile, line: number,ch: number) => {
        const leaf = plugin.app.workspace.getLeaf('split');
        plugin.settings.dispatch({
            type: 'SET_DOCUMENT_TYPE_TO_MARKDOWN',
            payload: { path: file.path },
        });
        await leaf.openFile(file);
        const markdownView = leaf.view as MarkdownView;
        markdownView.editor.setCursor({ line, ch });
        plugin.settings.dispatch({
            type: 'SET_DOCUMENT_TYPE_TO_TREE',
            payload: { path: file.path },
        });
    };
    // eslint-disable-next-line no-undef
    const openFile = async () => {
        if (!view.file) return;
        const treeIndex = get(documentStore).sections.id_section[nodeId];
        const lines = view.data.split('\n');
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            if (line.startsWith('<!--')) {
                const section = parseDelimiter(line);
                if (section && section[2] === treeIndex) {
                    const nextLineIndex = i+1;
                    const nextLine = lines[nextLineIndex]||"";
                    await openFileAndJumpToLine(view.file, nextLineIndex,nextLine.length);
                }
            }
        }
    };
    const classes: Partial<Record<ActiveStatus, string>> = {
        [ActiveStatus.node]: 'is-active',
        [ActiveStatus.child]: 'is-active-child',
        [ActiveStatus.parent]: 'is-active-parent',
        [ActiveStatus.sibling]: 'is-active-parent',
    };
    // move this the fuck up


</script>

<div
    aria-label="Jump to section"
    class={'tree-index ' + (activeStatus ? classes[activeStatus] : '')}
    on:click={openFile}
>
    {section}
</div>

<style>
    .tree-index {
        position: absolute;
        bottom: 3px;
        right: 8px;
        opacity: 0.8;
        font-size: 12px;
        cursor: pointer;
    }
    .is-active {
        opacity: 0.3;
    }

    .is-active-child {
        opacity: 0.3;
    }

    .is-active-parent {
        opacity: 0.6;
    }
</style>
