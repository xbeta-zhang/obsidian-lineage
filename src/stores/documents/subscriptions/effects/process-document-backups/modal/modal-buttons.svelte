<script lang="ts">
    export let callbacks: {
        accept: () => void;
        reject: () => void;
    }
</script>
<div class="modal-button-container">
    <button class="mod-warning" on:click={callbacks.reject}>Delete backup </button>
    <button class="mod-cta" on:click={callbacks.accept}>Restore backup </button>
</div>
