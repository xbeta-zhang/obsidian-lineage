<script lang="ts">
    import { getView } from '../../context';
    import { searchStore } from 'src/stores/view/derived/search-store';

    const view = getView();
    const viewStore = view.viewStore;
    const search = searchStore(view);
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

<div class="search-input-wrapper">
    <input
        aria-label="Search document"
        autofocus={true}
        class="search-input search-input-element"
        enterkeyhint="search"
        on:input={onInput}
        placeholder={'search'}
        spellcheck="false"
        type="search"
        value={$search.query}
    />
    <div
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
        style={$search.query ? '' : 'display: none'}
    ></div>
</div>

<style>
    .search-input-element {
        height: 34px;
        width: 250px;
        max-width: 100%;
    }

    @media(max-width: 568px){
        .search-input-element {
            width: 100%
        }
        .search-input-wrapper {
            width: 100%;
        }
    }

    .search-input-wrapper {
        max-width: 100%;
    }
</style>
