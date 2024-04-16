<script lang="ts">
    import Column from './column/column.svelte';
    import { keyboardShortcuts } from 'src/view/actions/keyboard-shortcuts/keyboard-shortcuts';
    import { getView } from 'src/view/components/container/context';
    import { scrollOnDndX } from 'src/view/actions/dnd/scroll-on-dnd-x';
    import { columnsStore } from 'src/stores/document/derived/columns-store';
    import ColumnsBuffer from './buffers/columns-buffer.svelte';
    import { scrollingStore } from 'src/stores/settings/derived/scrolling-store';

    const view = getView();
    const columns = columnsStore(view);
    const scrolling = scrollingStore(view)
</script>

<div
    class={'columns-container ' +
        ($scrolling.alwaysCenterHorizontally ? 'hide-scrollbars' : '')}
    id="columns-container"
    tabindex="0"
    use:keyboardShortcuts={{ view }}
    use:scrollOnDndX
>
    <div class="columns">
        {#if $scrolling.alwaysCenterHorizontally}
            <ColumnsBuffer />
        {/if}
        {#each $columns as column (column.id)}
            <Column columnId={column.id} />
        {/each}
        {#if $scrolling.alwaysCenterHorizontally}
            <ColumnsBuffer />
        {:else}
            <div style="min-width: 50px;min-height: 10px"></div>
        {/if}
    </div>
</div>

<style>
    :root {
        --container-left-padding: 100px;
    }
    .columns-container {
        position: relative;
        flex: 1;
        height: 100%;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: start;
        padding-left: var(--container-left-padding);
        overflow-y: hidden;
        overflow-x: auto;
    }
    :global(.is-mobile) {
        --container-left-padding: 10px;
    }
    .columns {
        display: flex;
        align-items: center;
        width: 100%;
    }
    .hide-scrollbars {
        --scrollbar-thumb-bg: transparent;
        --scrollbar-active-thumb-bg: transparent;
        --scrollbar-bg: transparent;
    }
</style>
