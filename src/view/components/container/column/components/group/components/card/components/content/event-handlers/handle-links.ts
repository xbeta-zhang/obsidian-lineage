import { LineageView } from 'src/view/view';

const handleFile = (view: LineageView, link: string) => {
    const path = view.documentStore.getValue().file.path;
    if (link && path) {
        view.plugin.app.workspace.openLinkText(link, path, 'split');
    }
};

const handleHeading = (view: LineageView, link: string) => {
    const levelMatch = /(#+)/.exec(link);
    if (levelMatch) {
        for (let level = 1; level <= 6; level++) {
            const headings = Array.from(
                view.containerEl.querySelectorAll('h' + level),
            ) as HTMLHeadingElement[];
            const heading = headings.find(
                (h) => '#' + h.dataset.heading === link,
            );
            if (heading) {
                const card = heading.closest('.lineage-card');
                if (card && card.id) {
                    view.viewStore.dispatch({
                        type: 'DOCUMENT/SET_ACTIVE_NODE',
                        payload: {
                            id: card.id,
                        },
                    });
                    break;
                }
            }
        }
    }
};

export const handleClick = (view: LineageView) => (e: MouseEvent) => {
    // eslint-disable-next-line no-undef
    if (!(e.target instanceof HTMLAnchorElement)) return;
    if (!e.target.hasClass('internal-link')) return;
    const link = e.target.dataset.href;
    if (!link) return;
    if (link.startsWith('#')) {
        e.stopPropagation();
        handleHeading(view, link);
    } else {
        handleFile(view, link);
    }
};
