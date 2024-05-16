<script lang="ts">
    import { writable } from 'svelte/store';
    import { getView } from 'src/view/components/container/context';
    import { scrollingAxis } from 'src/view/actions/scrolling-axis/scrolling-axis';
    import { verticalOffsetStore } from 'src/stores/settings/derived/scrolling-store';

    const pressed = writable(false);
    const view = getView();
    const verticalOffset = verticalOffsetStore(view);
</script>

<div
    style="position: absolute; right: 0; bottom: 0; z-index: 1; width: 1px; height: 1px;"
    use:scrollingAxis="{{ view, pressed }}"
></div>
<div
    class={'scrolling-axis-v ' + ($pressed ? 'show-axis' : '')}
    style={`top: ${$verticalOffset}px`}
></div>

{#if $pressed}
    <div class="center-indicator">
        <div class="center-indicator-x"></div>
        <div class="center-indicator-y"></div>
    </div>
{/if}

<style>

    .center-indicator {
        position: absolute;
        width: 100px;
        height: 100px;
        left: calc(50% - 50px);
        top: calc(50% - 50px);
        display: flex;
        align-items: center;
        justify-content: center;
        pointer-events: none;
    }
    .center-indicator-x {
        min-width: 100%;
        min-height: 2px;
        background-color: var(--color-base-40);
        position: absolute;
    }
    .center-indicator-y {
        min-height: 100%;
        min-width: 2px;
        background-color: var(--color-base-40);
        position: absolute;
    }
</style>
