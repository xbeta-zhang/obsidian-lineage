<script lang="ts">
    import SnapshotButton from './components/snapshot-button.svelte';
    import { updateRelativeTime } from 'src/view/actions/update-relative-time';
    import { historyStore } from 'src/stores/document/derived/history-store';
    import { getView } from '../../../context';

    const view = getView();
    const history = historyStore(view)
</script>

<div class="sidebar">
    <div
        class="snapshots-list"
        use:updateRelativeTime
    >
        {#each [...$history.items].sort((a, b) => b.created - a.created) as snapshot, index (snapshot.id)}
            <SnapshotButton
                {snapshot}
                active={$history.items.length - index - 1 ===
                    $history.state.activeIndex}
                reverseIndex={$history.items.length - index}
            />
        {/each}
    </div>
</div>

<style>
    .sidebar {
        min-width: 165px;
		width: fit-content;
        background-color:var(--background-primary);
        position: absolute;
        right: var(--sidebar-right);
        top: var(--size-4-2);
        padding: var(--size-4-2);
        z-index: 10;
    }

    .snapshots-list {
        display: flex;
        flex-direction: column;
        gap:  var(--size-4-2);
        height: fit-content;
        max-height: 400px;
        overflow-y: auto;
    }
</style>
