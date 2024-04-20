<script lang="ts">
    import { getView } from 'src/view/components/container/context';
    import Item from './breadcrumbs-item.svelte';
    import { activeBranchStore } from 'src/stores/view/derived/active-branch-store';

    const view = getView();
    const activeBranch = activeBranchStore(view);

</script>

<div class="breadcrumbs-container">
    <div class="breadcrumbs">
        {#each $activeBranch.sortedParentNodes as parentId, index (parentId)}
            <Item {parentId} {index} />
        {/each}
    </div>
</div>

<style>
    button:disabled {
        cursor: not-allowed;
    }
    .breadcrumbs-container {
        z-index: var(--z-index-breadcrumbs);
        left: var(--size-4-2);
        bottom: var(--size-4-2);
        display: flex;
        position: absolute;
    }
    .breadcrumbs {
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: var(--radius-s);
        background-color: var(--interactive-normal);
        border: 1px solid var(--background-modifier-border);
        box-shadow: var(--input-shadow);
        overflow: hidden;
    }
</style>
