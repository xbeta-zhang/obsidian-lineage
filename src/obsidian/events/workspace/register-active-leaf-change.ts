import Lineage from 'src/main';
import { LineageView } from 'src/view/view';

export const registerActiveLeafChange = (plugin: Lineage) => {
    plugin.registerEvent(
        plugin.app.workspace.on('active-leaf-change', (leaf) => {
            if (leaf?.view instanceof LineageView && leaf.view.file?.path) {
                plugin.documents.dispatch({
                    type: 'WORKSPACE/SET_ACTIVE_LINEAGE_VIEW',
                    payload: {
                        path: leaf.view.file?.path,
                        viewId: leaf.view.id,
                    },
                });
            }
            plugin.documents.dispatch({
                type: 'WORKSPACE/ACTIVE_LEAF_CHANGE',
            });
        }),
    );
};
