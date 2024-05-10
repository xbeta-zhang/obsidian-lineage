import { addIcon } from 'obsidian';

const svgWrapper = (innerSVG: string) =>
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="svg-icon" stroke="transparent" fill="currentColor"> ${innerSVG.trim().replace(/\n/g, '')}</svg>`;

const cards = {
    name: 'lineage-cards',
    svg: `
    <path
    d="m 13.115181,16.644424 h 6.605231 v 5.578301 H 13.115181 Z M 4.3082043,9.2066877 H 10.913436 V 14.784989 H 4.3082043 Z m 8.8069767,0 h 6.605231 v 5.5783013 h -6.605231 z m 0,-7.4377346 h 6.605231 V 7.347254 h -6.605231 z"
    />
  `,
};

export const customIcons = { cards };

export const loadCustomIcons = () => {
    for (const icon of Object.values(customIcons)) {
        addIcon(icon.name, svgWrapper(icon.svg));
    }
};
