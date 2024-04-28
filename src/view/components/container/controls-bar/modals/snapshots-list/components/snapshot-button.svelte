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

    const numberOfCharacters = snapshot.context.numberOfCharacters;
    const numberOfSections = snapshot.context.numberOfSections;
    const sections = `${numberOfSections} card${
        numberOfSections === 1 ? '' : 's'
    }`;
    const chars = `${numberOfCharacters} char${numberOfCharacters === 1 ? '' : 's'}`;
</script>

<div
    aria-label={snapshot.context.contentOfAffectedSection}
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
    <div class="icon-wrapper">
        <svelte:component class="svg-icon label" this={info.icon} />
    </div>
    <div class="snapshot-content">
        <div class="snapshot-body">
            <div class="snapshot-label">
                {info.label}
            </div>
        </div>
        <div class="snapshot-card-content">
            {snapshot.context.contentOfAffectedSection}
        </div>
    </div>
    <div class="snapshot-context">
        <span class="snapshot-section-number">{sections} </span>
        <span class="snapshot-section-number">{chars}</span>
        <span class="snapshot-time" data-created={snapshot.created}>
            {relativeTime(snapshot.created)}
        </span>
    </div>
</div>

<style>
    :root {
        --icon-wrapper-width: 32px;
    }
    .snapshot {
        padding: var(--size-4-2);
        cursor: pointer;
        display: flex;
        align-items: center;
        border-radius: 4px;
        gap: 4px;
        height: 66px;
        width: 330px;
        background-color:  var(--background-secondary);
    }

    .selected {
        background-color: var(--nav-item-background-selected);
    }

    .icon-wrapper {
        width: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .snapshot-content {
        display: flex;
        flex-direction: column;
        gap: 5px;
        flex: 1;
    }

    .snapshot-body {
        display: flex;
        justify-content: space-between;
        gap: 5px;
        width: 100%;
    }

    .snapshot-label {
        font-size: 14px;
        color: var(--color-base-70);
        display: block;
        flex: 1;
        max-width: 210px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .snapshot-card-content {
        font-size: 14px;
        color: var(--color-base-60);
        display: block;
        white-space: nowrap;
        overflow: hidden;
        max-width: 190px;
        text-overflow: ellipsis;
        font-style: italic;
        opacity: 0.9;
    }

    .snapshot-context {
        display: flex;
        flex-direction: column;
        align-items: end;
        height: 100%;
        justify-content: space-between;
    }
    .snapshot-section-number {
        font-size: 11px;
        color: var(--color-base-40);
        min-width: 16px;
        text-align: left;
        margin-left: auto;
    }
    .snapshot-time {
        font-size: 11px;
        color: var(--color-base-60);
    }
</style>
