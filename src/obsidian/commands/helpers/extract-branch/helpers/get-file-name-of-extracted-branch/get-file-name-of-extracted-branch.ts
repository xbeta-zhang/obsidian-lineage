import { getFileNameFromContent } from 'src/obsidian/commands/helpers/extract-branch/helpers/get-file-name-of-extracted-branch/get-file-name-from-content';

export const getFileNameOfExtractedBranch = (
    nodeContent: string,
    currentFileName: string,
    sectionNumber: string | undefined,
) => {
    const name = getFileNameFromContent(nodeContent);
    if (name) return name;
    if (sectionNumber) {
        return `${currentFileName} - ${sectionNumber}`;
    } else return `${currentFileName} - extracted-section`;
};
