<script lang="ts">
    import { horizontalAxisSlider } from 'src/view/actions/horizontal-axis-slider';
    import { getView } from 'src/view/components/container/context';

    const view = getView()
</script>

<div class="slider-container blink_me">
    <input
        class="slider"
        max="100"
        min="0"
        step="1"
        type="range"
        use:horizontalAxisSlider={view}
    />
</div>

<style>
    .slider-container {
        position: absolute;
        bottom: -5px;
        z-index: 15;
        width: 100%;
        opacity: 0.1;
    }
    .slider-container:hover {
        opacity: 1;
    }
    .slider {
        width: 100%;
    }
    input[type='range'] {
        background: transparent;
    }

    input[type='range']::-webkit-slider-thumb {
        -webkit-appearance: none;
        background: var(--color-base-40);
        height: 20px;
        width: 8px;
        border-radius: 0;
        cursor: move;
    }

    .blink_me {
        animation: blinker 500ms linear;
    }

    @keyframes blinker {
        0% {
            opacity: 0.1;
        }
        50% {
            opacity: 1;
        }
        100% {
            opacity: 0.1;
        }
    }
</style>
