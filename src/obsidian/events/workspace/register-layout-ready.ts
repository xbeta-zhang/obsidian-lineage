import Lineage from 'src/main';

export const registerLayoutReady = (plugin: Lineage) => {
    plugin.app.workspace.onLayoutReady(() => {
        plugin.documents.dispatch({
            type: 'WORKSPACE/LAYOUT_READY',
        });
    });
};
