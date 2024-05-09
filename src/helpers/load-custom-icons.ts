import { addIcon } from 'obsidian';

const svgWrapper = (innerSVG: string) =>
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="svg-icon" stroke="transparent" fill="currentColor"> ${innerSVG.trim().replace(/\n/g, '')}</svg>`;

const cards = {
    name: 'lineage-cards',
    svg: `
    <path
       d="m 2,10 v 4 h 9 v -4 z m 11.000234,6 v 4 H 22 V 16 Z M 13,10 v 4 h 8.999766 v -4 z m 0,-6 v 4 h 8.999766 V 4 Z" />
    <path
       style="opacity: 0.4"
       d="m 2,4 v 4 h 9 V 4 Z m 0,11.913357 v 4 h 9 v -4 z" />
    `,
};

export const customIcons = { cards };

export const loadCustomIcons = () => {
    for (const icon of Object.values(customIcons)) {
        addIcon(icon.name, svgWrapper(icon.svg));
    }
};
