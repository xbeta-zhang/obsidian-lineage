<script lang="ts">
    import { renderSettings } from 'src/view/actions/settings/render-settings';
</script>

<div class="lineage-modal" id="lineage-view-settings" tabindex="0">
    <div class="setting-items" use:renderSettings></div>
</div>

<style>


    .setting-items {
        display: flex;
        flex-direction: column;
        padding: 20px;
        & .setting-item {
            padding: 10px 0;
        }
    }
    :global(.is-mobile) {

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
