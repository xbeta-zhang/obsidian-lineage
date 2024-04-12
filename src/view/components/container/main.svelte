<script lang="ts">
    import ControlsBar from './controls-bar/controls-container.svelte';
    import Container from './container.svelte';
    import Breadcrumbs from './breadcrumbs/breadcrumbs.svelte';
    import Toolbar from './toolbar/toolbar.svelte';
    import Settings from './controls-bar/modals/settings/settings.svelte';
    import FileHistory from 'src/view/components/container/controls-bar/modals/snapshots-list/file-histoy.svelte';
    import Hotkeys from 'src/view/components/container/controls-bar/modals/hotkeys/hotkeys.svelte';
    import { LineageView } from '../../view';
    import Lineage from '../../../main';
    import { setContext } from 'svelte';
    import { searchStore } from 'src/stores/view/derived/search-store';
    import { uiControlsStore } from 'src/stores/view/derived/ui-controls-store';

    export let plugin: Lineage;
    export let view: LineageView;
    setContext('plugin', plugin);
    setContext('view', view);
    const search = searchStore(view);
    const controls = uiControlsStore(view);


</script>

<div class={`lineage-main ${$search.searching ? 'is-loading' : ''}`}>
    <Container />
    <Toolbar />
    <Breadcrumbs />
    <ControlsBar />
    {#if $controls.showHistorySidebar}
        <FileHistory />
    {:else if $controls.showHelpSidebar}
        <Hotkeys />
    {:else if $controls.showSettingsSidebar}
        <Settings />
    {/if}
</div>

<style>
    .lineage-main {
        --sidebar-right: 50px;
        --z-index-breadcrumbs: 10;
        background-color: var(--background-container);
        display: flex;
        height: 100%;
        width: 100%;
        position: relative;
    }
</style>
