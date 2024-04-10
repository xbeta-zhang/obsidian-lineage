<script lang="ts">
    import { Search } from 'lucide-svelte';
    import { getView } from 'src/view/components/container/context';
    import { searchStore } from 'src/stores/view/derived/search-store';

    const view = getView();
    const viewStore = view.viewStore;
    const search = searchStore(view)
    const onInput = (
        // eslint-disable-next-line no-undef
        e: Event & { currentTarget: EventTarget & HTMLInputElement },
    ) => {
        viewStore.dispatch({
            type: 'SEARCH/SET_QUERY',
            payload: {
                query: e.currentTarget.value,
            },
        });
    };
</script>

<div class="search-container">
    <button
        aria-label={'Toggle search input'}
        class={'search-toggle ' +
            ($search.showInput ? 'search-toggle-active' : '')}
        data-tooltip-position="bottom"
        on:click={() => {
            viewStore.dispatch({ type: 'SEARCH/TOGGLE_INPUT' });
        }}
    >
        <Search class="svg-icon" size="12" />
    </button>
    {#if $search.showInput}
        <div class="">
            <input
                value={$search.query}
                class="search-input search-input-element"
                enterkeyhint="search"
                placeholder={'search'}
                spellcheck="false"
                type="search"
                autofocus={true}
                on:input={onInput}
                aria-label="Search document"
            />
            <div
                style={$search.query ? '' : 'display: none'}
                aria-label={'Clear'}
                class="search-input-clear-button"
                on:click={() => {
                    viewStore.dispatch({
                        type: 'SEARCH/SET_QUERY',
                        payload: {
                            query: '',
                        },
                    });
                }}
            ></div>
        </div>
    {/if}
</div>

<style>
    .search-container {
        z-index: var(--z-index-breadcrumbs);
        top: var(--size-4-2);
        left: calc(70px + var(--size-4-2));
        position: absolute;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: var(--radius-s);
        background-color: var(--interactive-normal);
        border: 1px solid var(--background-modifier-border);
        box-shadow: var(--input-shadow);
        overflow: hidden;
    }

    .search-input-element {
        height: 30px;
        width: 300px;
    }

    .search-toggle {
        cursor: pointer;
    }
    .search-toggle-active {
        background-color: var(--color-base-40);
    }
</style>
