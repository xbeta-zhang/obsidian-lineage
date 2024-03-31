import { getTheme } from 'src/obsidian/helpers/get-theme';
import { Theme } from 'src/stores/settings/settings-type';

const darkTheme = {
    containerBg: '#373d4c',
    activeBranchBg: '#5b637a',
} satisfies Theme;
const lightTheme = {
    containerBg: '#899cb3',
    activeBranchBg: '#cedbeb',
} satisfies Theme;

export const getDefaultTheme = () => {
    const theme = getTheme();
    return theme === 'light' ? lightTheme : darkTheme;
};

export const cssVariables = {
    activeBranchBg: '--background-active-parent',
    containerBg: '--background-container',
    inactiveNodeBg: '--background-inactive-node',
};
