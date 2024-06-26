<script lang="ts">
    import { Hotkey } from 'obsidian';
    import { RotateCcw, X } from 'lucide-svelte';

    import { CommandName } from 'src/view/actions/keyboard-shortcuts/helpers/commands/command-names';
    import { hotkeyStore } from 'src/stores/hotkeys/hotkey-store';
    import { Modifiers } from 'src/view/actions/keyboard-shortcuts/helpers/commands/update-commands-dictionary';
    import { isMacLike, modKey } from 'src/view/actions/keyboard-shortcuts/helpers/keyboard-events/mod-key';
    import { focusContainer } from 'src/stores/view/subscriptions/effects/focus-container';
    import { getView } from 'src/view/components/container/context';

    export let isCustom: boolean | undefined;
    export let hotkey: Hotkey;
    export let commandName: CommandName;
    export let isPrimary: boolean;
    export let onCancel: () => void;

    let key = hotkey.key;
    let MOD = hotkey.modifiers.includes('Mod');
    let SHIFT = hotkey.modifiers.includes('Shift');
    let ALT = hotkey.modifiers.includes('Alt');
    let CTRL = hotkey.modifiers.includes('Ctrl');

    // eslint-disable-next-line no-undef
    const onKeyDown = (e: KeyboardEvent) => {
        e.preventDefault();
        if (e.shiftKey || e.ctrlKey || e.altKey || e.metaKey) return;
        if (e.key === ' ' || e.key==="META") return;
        const value = e.key.toUpperCase();
        key = value.length === 1 ? value.toUpperCase() : value;
        save();
    };

    const toggleMod = () => {
        MOD = !MOD;
        save();
    };
    const toggleShift = () => {
        SHIFT = !SHIFT;
        save();
    };
    const toggleAlt = () => {
        ALT = !ALT;
        save();
    };
    const toggleCtrl = () => {
        CTRL = !CTRL;
        save();
    };

    const save = () => {
        let modifiers: Hotkey['modifiers'] =[]

        if (MOD) modifiers.push('Mod');
        if (SHIFT) modifiers.push('Shift');
        if (ALT) modifiers.push('Alt');
        if (CTRL && isMacLike) modifiers.push('Ctrl');
        hotkeyStore.dispatch({
            type: 'HOTKEY/UPDATE',
            payload: {
                hotkey: {
                    key,
                    modifiers,
                },
                primary: isPrimary,
                command: commandName,
            },
        });
    };
    const view = getView();
    // eslint-disable-next-line no-undef
    const reset = () => {
        hotkeyStore.dispatch({
            type: 'HOTKEY/RESET',
            payload: {
                command: commandName,
                primary: isPrimary,
            },
        });
        setTimeout(() => {
            MOD = hotkey.modifiers.includes('Mod');
            ALT = hotkey.modifiers.includes('Alt');
            SHIFT = hotkey.modifiers.includes('Shift');
            CTRL = hotkey.modifiers.includes('Ctrl');
            key = hotkey.key
        });
       focusContainer(view);
    };
</script>

<div class="container">
    <div class="hotkey-container">
        <div class="modifiers">
            {#if isMacLike}
                <kbd class={!CTRL ? 'disabled' : ''} on:click={toggleCtrl}
                    >{Modifiers.Ctrl}</kbd
                >
            {/if}
            <kbd class={!MOD ? 'disabled' : ''} on:click={toggleMod}
                >{modKey}</kbd
            >
            <kbd class={!ALT ? 'disabled' : ''} on:click={toggleAlt}
                >{Modifiers.Alt}</kbd
            >
            <kbd class={!SHIFT ? 'disabled' : ''} on:click={toggleShift}
                >{Modifiers.Shift}</kbd
            >
        </div>
        <input
            bind:value={key}
            class="search-input input hotkey-key"
            on:keydown={onKeyDown}
            placeholder={'Key'}
            spellcheck="false"
            type="text"
        />
    </div>
    <div class="save-and-cancel-buttons">
        <button aria-label="Go back" class="hotkey-button"
                on:click={onCancel}
            ><X class="svg-icon" size={8} /></button
        >
        <button aria-label="Reset" class="hotkey-button" disabled={!isCustom}
                on:click={reset}
            ><RotateCcw class="svg-icon" size={8} /></button
        >
    </div>
</div>

<style>
    .container {
        display: flex;
        gap: 5px;
        align-items: center;
        justify-content: center;
    }
    .hotkey-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 5px;
    }
    .input {
        width: 115px;
        height: 25px;
        text-align: center;
        font-size:14px;
    }

    .modifiers {
        display: flex;
        gap: 5px;
        width: 100%;
        justify-content: center;
    }

    .disabled {
        background-color: var(--color-base-50);
    }

    button:disabled {
        cursor: not-allowed;
    }

    .save-and-cancel-buttons {
        display: flex;
        gap: 5px;
        flex-direction: column;
    }
    .hotkey-button {
        background-color: transparent;
        color: var(--color-base-25);
        border: none;
        width: 20px;
        height: 20px;
        box-shadow: none;
        padding: 2px;
        cursor: pointer;
    }
    .hotkey-key{
        color: lightgrey;
        background-color: #175c5a;
        border-color: #227f7d
    }
</style>
