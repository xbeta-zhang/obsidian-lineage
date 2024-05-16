import invariant from 'tiny-invariant';
import { getActiveView } from '../card/get-active-view';

export const SEL_CONTROLS_GROUP = '.controls-container';
export const getSnapshotsButton = async () => {
    const view = await getActiveView();
    const button = await view.$(
        `${SEL_CONTROLS_GROUP} button[aria-label="History"]`,
    );
    invariant(button);
    return button;
};
