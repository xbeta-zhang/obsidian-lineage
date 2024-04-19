<script lang="ts">
    import { relativeTime } from 'src/helpers/relative-time';
    import {
        actionInfo
    } from 'src/view/components/container/controls-bar/modals/snapshots-list/components/helpers/action-info';
    import { Snapshot } from 'src/stores/document/document-state-type';
    import { getView } from '../../../../context';
    import { Notice } from 'obsidian';
    import invariant from 'tiny-invariant';

    export let snapshot: Snapshot;
    export let active: boolean;
    export let reverseIndex: number;

    const view = getView();
    const documentStore = view.documentStore;
    const viewStore = view.viewStore;
    const infoFactory = actionInfo[snapshot.context.action.type];
    invariant(infoFactory);
    const info = infoFactory(snapshot);
</script>

<div
    aria-label={info.label}
    class="snapshot"
    class:selected={active}
    on:click={() => {
        if (viewStore.getValue().document.editing.activeNodeId)
            new Notice('cannot apply snapshot while editing');
        else
            documentStore.dispatch({
                type: 'HISTORY/SELECT_SNAPSHOT',
                payload: { snapshotId: snapshot.id },
            });
    }}
>
    <div
        style="width: 32px; display: flex; align-items: center; justify-content: center;"
    >
        <svelte:component class="svg-icon label" this={info.icon} />
    </div>
    <div style="display: flex; flex-direction: column; gap: 5px; width: 100%">
        <div style="display: flex; justify-content: space-between">
            <span class="text">
                {info.label}
            </span>
        </div>
        <div style="display: flex; justify-content: space-between; width: 100%">
            <span class="time" data-created={snapshot.created}>
                {relativeTime(snapshot.created)}
            </span>
            <span class="index"
                >{snapshot.context.numberOfSections}{snapshot.context
                    .numberOfSections === 1
                    ? ' card'
                    : ' cards'}</span
            >
        </div>
    </div>
</div>

<style>
    .snapshot {
        padding: 10px 6px;
        cursor: pointer;
        display: flex;
        align-items: center;
        border-radius: 4px;
        gap: 4px;
        height: 52px;
        width: 230px;
    }
    .text {
        font-size: 14px;
        color: var(--color-base-70);
        display: block;
        max-width: 210px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .index {
        font-size: 12px;
        color: var(--color-base-50);
        min-width: 16px;
        text-align: left;
        margin-left: auto;
    }

    .selected {
        background-color: var(--nav-item-background-selected);
    }
    .time {
        font-size: 12px;
        color: var(--color-base-60);
    }
</style>
