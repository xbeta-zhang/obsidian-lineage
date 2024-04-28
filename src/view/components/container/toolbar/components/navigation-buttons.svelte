<script lang="ts">
    import { getView } from '../../context';
    import { ArrowLeft, ArrowRight } from 'lucide-svelte';
    import { navigationHistoryStore } from 'src/stores/view/derived/navigation-history-store';
    import Button from '../../shared/button.svelte';

    const view = getView();
    const viewStore = view.viewStore;
    const navigationHistory = navigationHistoryStore(view);
</script>


    <div class="navigation-history buttons-group">
        <Button
            disabled={!$navigationHistory.state.canGoBack}
            label={'Navigate back'}
            on:click={() => {
                viewStore.dispatch({ type: 'NAVIGATION/NAVIGATE_BACK' });
            }}
            tooltipPosition="bottom"
        >
            <ArrowLeft class="svg-icon" size="12" />
        </Button>
        <Button
            disabled={!$navigationHistory.state.canGoForward}
            label={'Navigate forward'}
            on:click={() => {
                viewStore.dispatch({ type: 'NAVIGATION/NAVIGATE_FORWARD' });
            }}
            tooltipPosition="bottom"
        >
            <ArrowRight class="svg-icon" size="12" />
        </Button>
    </div>

<style>


    .navigation-history {
        display: flex;
        align-items: center;
        justify-content: center;

    }

</style>
