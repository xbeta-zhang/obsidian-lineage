<script lang="ts">
    import { getView } from '../../../../../../../context';
    import { droppable } from 'src/view/actions/dnd/droppable';
    import { ActiveStatus } from 'src/view/components/container/column/components/group/components/active-status.enum';
    import Bridges from '../bridges/bridges.svelte';
    import clx from 'classnames';

    export let nodeId: string;
    export let active: ActiveStatus | null;
    export let hasChildren: boolean;
    export let parentId: string;
    export let editing: boolean;
    export let disableEditConfirmation: boolean;

    const setActive = () => {
        if (!editing)
            viewStore.dispatch({
                type: 'DOCUMENT/SET_ACTIVE_NODE',
                payload: { id: nodeId },
            });
    };
    const view = getView();
    const documentStore = view.documentStore;
    const viewStore = view.viewStore;

    const activeStatusClasses = {
        [ActiveStatus.node]: 'active-node',
        [ActiveStatus.child]: 'active-child',
        [ActiveStatus.parent]: 'active-parent',
        [ActiveStatus.sibling]: 'active-sibling',
    };
</script>

<div
    class={clx(
        'lineage-card',
        active ? activeStatusClasses[active] : ' inactive-node',
        disableEditConfirmation
            ? 'node-border--discard'
            : editing
              ? 'node-border--editing'
              : active === ActiveStatus.node
                ? 'node-border--active'
                : undefined,
    )}
    id={nodeId}
    on:click={setActive}
    on:dblclick={() => {
        setActive();
        viewStore.dispatch({
            type: 'DOCUMENT/ENABLE_EDIT_MODE',
            payload: {
                nodeId,
            },
        });
    }}
    use:droppable={{ viewStore, documentStore }}
>
    <slot />
    <Bridges {active} {editing} {hasChildren} {parentId} />
</div>

<style>
    :root {
        --node-width: 400px;
        --min-node-height: 100px;
    }

    .lineage-card {
        width: var(--node-width);
        height: fit-content;
        display: flex;
        position: relative;
        font-size: 16px;
    }
    .node-border--active {
        border-left: 5px var(--lineage-accent) solid;
    }
    .node-border--editing {
        border-left: 5px var(--color-base-70) solid;
    }
    .node-border--discard {
        border-left: 5px var(--color-red) solid;
    }
</style>