<script lang="ts">
    import { filteredHotkeys } from 'src/stores/hotkeys/derived/filtered-hotkeys';
    import Group from './group.svelte';
    import Front from './front.svelte';
    import { numberOfConflictingHotkeys } from 'src/stores/hotkeys/derived/number-of-conflicting-hotkeys';
</script>

<div class="sidebar">
    <Front />
    <div class="groups">
        {#each Object.entries($filteredHotkeys) as [groupName, group] (groupName)}
            <Group {groupName} {group} />
        {/each}
    </div>
    {#if $numberOfConflictingHotkeys}
        <div class="conflicts-indicator">
            {$numberOfConflictingHotkeys} command{$numberOfConflictingHotkeys ===
            1
                ? ''
                : 's'} with conflicts
        </div>
    {/if}
</div>

<style>
    .sidebar {
        width: 350px;
        background-color: var(--background-primary);
        position: absolute;
        right: var(--sidebar-right);
        top: var(--size-4-2);
        padding: var(--size-4-2) 0;
        display: flex;
        flex-direction: column;
        gap: var(--size-4-2);
        z-index: 10;
    }
    :global(.is-mobile) {
        & .sidebar {
            width: fit-content;
        }
    }

    .groups {
        padding: 0 var(--size-4-2);
        display: flex;
        flex-direction: column;
        gap: var(--size-4-2);
        max-height: 360px;
        overflow-y: auto;
    }

    .conflicts-indicator {
        font-size: 12px;
        color: var(--color-red);
        padding-left: 18px;
    }
</style>
