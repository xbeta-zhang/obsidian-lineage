<script lang="ts">
    import Column from './column/column.svelte';
    import { keyboardShortcuts } from 'src/view/actions/keyboard-shortcuts/keyboard-shortcuts';
    import { getView } from 'src/view/components/container/context';
    import { scrollOnDndX } from 'src/view/actions/dnd/scroll-on-dnd-x';

    const view = getView();
    const store = view.documentStore;
</script>

<div
    class="columns-container"
    id="columns-container"
    tabindex="0"
    use:keyboardShortcuts={{ view }}
    use:scrollOnDndX
>
    <div class="columns">
        {#each $store.document.columns as column (column.id)}
            <Column {column} />
        {/each}
        <div style="min-width: 50px;min-height: 10px"></div>
    </div>
</div>

<style>
    .columns-container {
        position: relative;
        flex: 1;
        height: 100%;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: start;
        padding-left: 100px;
        overflow-y: hidden;
        overflow-x: auto;
        @media (max-width: 1280px) {
            padding-left: 10px;
        }
    }
    .columns {
        display: flex;
        align-items: center;
        width: 100%;
    }
</style>
