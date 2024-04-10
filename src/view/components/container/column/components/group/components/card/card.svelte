<script lang="ts">
    import { NodeId } from 'src/stores/document/document-state-type';
    import { ActiveStatus } from 'src/view/components/container/column/components/group/components/active-status.enum';
    import Draggable from './components/dnd/draggable.svelte';
    import Droppable from './components/dnd/droppable.svelte';
    import InlineEditor from './components/content/inline-editor.svelte';
    import Content from './components/content/content.svelte';
    import CardButtons
        from 'src/view/components/container/column/components/group/components/card/components/card-buttons/card-buttons.svelte';
    import { getView } from 'src/view/components/container/context';
    import { contentStore } from 'src/stores/document/derived/content-store';

    export let node: NodeId;
    export let editing: boolean;
    export let active: ActiveStatus | null;
    export let hasChildren: boolean;
    export let parentId: string;
    export let disableEditConfirmation: boolean
    const view = getView()

    const content =contentStore(view,node);

</script>

<Droppable {active}{disableEditConfirmation} {editing} {hasChildren} nodeId={node} {parentId}>
    {#if active===ActiveStatus.node && editing}
        <InlineEditor nodeId={node} />
    {:else}
        <Draggable nodeId={node}>
            <Content {active} content={$content} />
        </Draggable>
    {/if}
    <CardButtons {active} {editing} nodeId={node}/>
</Droppable>



