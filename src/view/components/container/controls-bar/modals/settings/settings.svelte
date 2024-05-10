<script lang="ts">
    import { renderSettings } from 'src/view/actions/settings/render-settings';
</script>

<div class="sidebar" id="lineage-view-settings" tabindex="0">
    <div class="setting-items" use:renderSettings></div>
</div>

<style>
    .sidebar {
        min-width: 165px;

        width: fit-content;
        background-color: var(--background-primary);
        position: absolute;
        right: var(--sidebar-right);
        top: var(--size-4-2);
        padding: var(--size-4-2);
        display: flex;
        flex-direction: column;
        gap: var(--size-4-2);
        z-index: 10;
    }

    .setting-items {
        display: flex;
        flex-direction: column;
        padding: 20px;
        & .setting-item {
            padding: 10px 0;
        }
    }
    :global(.is-mobile) {
        & .sidebar {
            width: fit-content;
        }
        & .setting-items {
            padding: 5px 10px;
        }
        & :global(.setting-item) {
            display: flex;
            flex-direction: column;
            gap: 4px;
        }
        & :global(.setting-item-control) {
            width: 100%;
            justify-content: center;
        }
    }
</style>
