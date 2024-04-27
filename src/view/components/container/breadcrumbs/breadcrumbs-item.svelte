<script lang="ts">
    import { getView } from 'src/view/components/container/context';

    export let parentId: string;
    export let index: number;
    export let section: string;
    export let content: string;
    const view = getView();
    const viewStore = view.viewStore;
    const onClick = () => {
        viewStore.dispatch({
            type: 'DOCUMENT/SET_ACTIVE_NODE',
            payload: { id: parentId },
        });
    };
</script>

{#if index > 0}
    <span class="separator">/</span>
{/if}

<span
    aria-label={section+"\n"+content}
    class={`breadcrumbs-item ${content?'':'section-number'}`}
    data-tooltip-position="top"
    on:click={onClick}
>
    {content || section}
</span>

<style>
    .separator {
        padding: 2px 1px;
        color: var(--text-faint);
    }
    .breadcrumbs-item {
        box-shadow: none;
        height: 30px;
        display: flex;
        line-height: 1;
        font-size: inherit;
        align-items: center;
        justify-content: center;
        border-bottom: 1px solid var(--background-modifier-border);
        color: var(--text-muted);
        background-color: var(--interactive-normal);
        --icon-size: var(--icon-s);
        --icon-stroke: var(--icon-s-stroke-width);
        cursor: pointer;
        padding: 2px 4px;
        border-radius: var(--radius-s);
        max-width: 300px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .breadcrumbs-item:hover {
        background-color: var(--interactive-hover);
    }
    .breadcrumbs-item:last-child {
        border-bottom: none;
    }

    .section-number{
        font-style: italic;
        color: var(--text-faint);
    }
</style>
