<script lang="ts">
    import { NodeId } from 'src/stores/document/document-state-type';
    import Node from './components/card/card.svelte';
    import { ActiveStatus } from 'src/view/components/container/column/components/group/components/active-status.enum';
    import { getView } from 'src/view/components/container/context';
    import clx from 'classnames';
    import { nodesStore } from 'src/stores/document/derived/nodes-store';
    import { activeBranchStore } from 'src/stores/view/derived/active-branch-store';
    import { searchStore } from 'src/stores/view/derived/search-store';
    import { activeNodeStore } from 'src/stores/view/derived/active-node-store';
    import { editingStore } from 'src/stores/view/derived/editing-store';

    const view = getView();
    export let groupId: string;
    export let columnId: string;
    const nodes = nodesStore(view,columnId,groupId);
    const activeBranch = activeBranchStore(view);
    const activeNode = activeNodeStore(view);
    const editing = editingStore(view)
    const search = searchStore(view)
    let parentNodes: Set<NodeId> = new Set<NodeId>();
    $: parentNodes = new Set(
        $activeBranch.sortedParentNodes,
    );
</script>

{#if $nodes.length > 0 && ($search.query.length === 0 || $nodes.some( (n) => $search.results.has(n), ))}
    <div
        class={clx(
            'group',
            $activeBranch.childGroups.has(groupId) &&
                'group-has-active-parent',
            $activeBranch.group === groupId &&
                'group-has-active-node',
        )}
        id={'group-' + groupId}
    >
        {#each $nodes as node (node)}
            {#if $search.query.length === 0 || (!$search.searching && $search.results.has(node))}
                <Node
                    {node}
                    active={node === $activeNode
                        ? ActiveStatus.node
                        : parentNodes.has(node)
                          ? ActiveStatus.parent
                          : $activeBranch.childGroups.has(
                                  groupId,
                              )
                            ? ActiveStatus.child
                            : $activeBranch.group ===
                                groupId
                              ? ActiveStatus.sibling
                              : null}
                    editing={$editing.activeNodeId === node}
                    hasChildren={$activeBranch.childGroups
                        .size > 0}
                    parentId={groupId}
                    disableEditConfirmation={$editing.activeNodeId ===
                        node && $editing.disableEditConfirmation}
                />
            {/if}
        {/each}
    </div>
{/if}

<style>
    .group {
        display: flex;
        flex-direction: column;
        width: fit-content;
        gap: 4px;
        padding: 8px;
        margin-bottom: 2px;
    }
    .group:last-child {
        margin-bottom: 0;
    }
    .group-has-active-node {
    }
    .group-has-active-parent {
        border-bottom-left-radius: 6px;
        border-top-left-radius: 6px;
    }
</style>
