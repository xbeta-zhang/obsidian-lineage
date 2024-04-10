<script lang="ts">
    import Group from './components/group/group.svelte';
    import { getView } from 'src/view/components/container/context';
    import { scrollOnDndY } from 'src/view/actions/dnd/scroll-on-dnd-y';
    import { groupsStore } from 'src/stores/document/derived/groups-store';
    import { dndStore } from 'src/stores/view/derived/dnd-store';

    const view = getView();
    export let columnId: string;
    const groups = groupsStore(view,columnId);
    const dnd = dndStore(view)
</script>

<div class="column" id={columnId}  use:scrollOnDndY>
    <div class="column-buffer" />
    {#each $groups as group (group.parentId)}
        {#if !$dnd.childGroups.has(group.parentId)}
            <Group groupId={group.parentId} {columnId} />
        {/if}
    {/each}
    <div class="column-buffer" />
</div>

<style>
    .column {
        min-width: fit-content;
        height: 100vh;
        overflow-y: scroll;
        overflow-x: hidden;
    }

    .column::-webkit-scrollbar {
        display: none;
    }
    .column-buffer {
        height: 60%;
        min-width: var(--node-width);
    }
</style>
