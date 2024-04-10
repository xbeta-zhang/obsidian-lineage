<script lang="ts">
    import { ChevronRight } from 'lucide-svelte';
    import { getView } from 'src/view/components/container/context';

    export let parentId: string;
    export let index: number
    const view = getView();
    const viewStore = view.viewStore;
    const documentStore = view.documentStore;
    const content = documentStore.getValue().document.content[parentId].content;
</script>

{#if index > 0}
    <ChevronRight class="svg-icon chevron" size="12" />
{/if}
<button
    aria-label={content || 'Empty parent'}
    class="breadcrumbs-item"
    data-tooltip-position="top"
    on:click={() => {
        viewStore.dispatch({
            type: 'DOCUMENT/SET_ACTIVE_NODE',
            payload: { id: parentId },
        });
    }}
>
    <span class="breadcrumbs-item-text">
        {content || '(empty)'}
    </span>
</button>

<style>
    .chevron {
        color: var(--text-muted);
    }
    .breadcrumbs-item {
        box-shadow: none;
        height: 30px;
        display: flex;
        line-height: 1;
        font-size: inherit;
        align-items: center;
        justify-content: center;
        padding: var(--size-4-2);
        border-bottom: 1px solid var(--background-modifier-border);
        color: var(--text-muted);
        background-color: var(--interactive-normal);
        --icon-size: var(--icon-s);
        --icon-stroke: var(--icon-s-stroke-width);
        cursor: pointer;
    }

    .breadcrumbs-item:hover {
        background-color: var(--interactive-hover);
    }
    .breadcrumbs-item:last-child {
        border-bottom: none;
    }
    .breadcrumbs-item-text {
        max-width: 300px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
</style>
