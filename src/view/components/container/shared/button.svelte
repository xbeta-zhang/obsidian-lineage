<script lang="ts">
    export let label: string;
    export let tooltipPosition: 'bottom' | 'top' | 'left';
    export let disabled = false;
    export let classes='';
    export let active = false;
</script>

<button
    aria-label={label}
    class={"lineage-view-button "+classes}
    data-active={active}
    data-tooltip-position={tooltipPosition}
    {disabled}
    on:click
>
    <slot />
</button>
