<script lang="ts">
    import { numberOfConflictingHotkeysStore } from 'src/stores/hotkeys/derived/number-of-conflicting-hotkeys';

    const numberOfConflictingHotkeys = numberOfConflictingHotkeysStore()
</script>

{#if $numberOfConflictingHotkeys}
    <div class="conflicts-indicator">
        {$numberOfConflictingHotkeys} command{$numberOfConflictingHotkeys === 1
            ? ''
            : 's'} with conflicts
    </div>
{/if}

<style>
    .conflicts-indicator {
        font-size: 12px;
        color: var(--color-red);
        padding-left: 18px;
    }
</style>
