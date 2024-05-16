import Lineage from 'src/main';

export const registerWorkspaceResize = (plugin: Lineage) => {
    plugin.registerEvent(
        plugin.app.workspace.on('resize', () => {
            plugin.documents.dispatch({
                type: 'WORKSPACE/RESIZE',
            });
        }),
    );
};
