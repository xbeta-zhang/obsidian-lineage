<script lang="ts">
    import ControlsBar from './controls-bar/controls-bar.svelte';
    import Hotkeys from './hotkeys/hotkeys.svelte';
    import FileHistory from './file-history/file-histoy.svelte';
    import { LineageView } from '../../view';
    import Lineage from '../../../main';
    import { setContext } from 'svelte';
    import Container from './container.svelte';
    import Breadcrumbs from './breadcrumbs/breadcrumbs.svelte';
    import NavigationHistory from './navigation-history/navigation-history.svelte';
    import SearchBar from './search-bar/search-bar.svelte';
    import Settings from './settings/settings.svelte';
    import { uiControlsStore } from 'src/stores/view/derived/ui-controls-store';
    import { searchStore } from 'src/stores/view/derived/search-store';

    export let plugin: Lineage;
    export let view: LineageView;
    setContext('plugin', plugin);
    setContext('view', view);
    const controls = uiControlsStore(view);
    const search = searchStore(view)
</script>

<div class={`lineage-main ${$search.searching ? 'is-loading' : ''}`}>
    <Breadcrumbs />
    <NavigationHistory />
    <ControlsBar />
    <Container />
    {#if $controls.showHistorySidebar}
        <FileHistory />
    {:else if $controls.showHelpSidebar}
        <Hotkeys />
    {:else if $controls.showSettingsSidebar}
        <Settings />
    {/if}
    <SearchBar />
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
