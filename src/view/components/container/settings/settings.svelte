<script lang="ts">
    import { renderSettings } from 'src/view/actions/settings/render-settings';
</script>

<div class="sidebar" id="lineage-view-settings">
    <div class="setting-items" use:renderSettings></div>
</div>

<style>
    .sidebar {
        width: 350px;
        background-color: var(--background-primary);
        position: absolute;
        right: var(--sidebar-right);
        top: var(--size-4-2);
        padding: var(--size-4-2);
        display: flex;
        flex-direction: column;
        gap: var(--size-4-2);
    }

    .setting-items {
        display: flex;
        flex-direction: column;
        padding: 20px;


        & .setting-item {
            padding: 10px 0;
        }
    }
</style>
