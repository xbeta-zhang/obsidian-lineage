import { describe, expect, it } from 'vitest';
import { formatHeadings } from './format-headings';
import { Content } from 'src/stores/document/document-state-type';
import { SectionsDictionary } from 'src/stores/view/subscriptions/helpers/calculate-tree-index';

describe('format headings', () => {
    it('should format headings correctly', () => {
        const content = {
            node1: { content: '# Title\n\n## Subtitle\n\n### Section 1' },
            node2: {
                content: '#### Subsection 1.1\n\n##### Subsubsection 1.1.1',
            },
            node3: { content: 'No heading' },
        };

        const treeIndexDict = {
            node1: '1',
            node2: '1.1',
            node3: '2',
        };

        const expectedOutput = {
            node1: { content: '# Title\n\n# Subtitle\n\n# Section 1' },
            node2: { content: '## Subsection 1.1\n\n## Subsubsection 1.1.1' },
            node3: { content: 'No heading' },
        };

        formatHeadings(content, treeIndexDict);
        expect(content).toEqual(expectedOutput);
    });

    it('should handle missing content or treeIndexDict entries', () => {
        const content = {
            node1: { content: '### Title' },
            node2: { content: '' },
            node3: { content: '## Subtitle' },
        };

        const treeIndexDict = {
            node3: '1.1',
        };

        const expectedOutput = {
            node1: { content: '### Title' },
            node2: { content: '' },
            node3: { content: '## Subtitle' },
        };

        formatHeadings(content, treeIndexDict);
        expect(content).toEqual(expectedOutput);
    });

    it('should handle empty content or treeIndexDict', () => {
        const emptyContent: Content = {};
        const emptyTreeIndexDict: SectionsDictionary = {};

        formatHeadings(emptyContent, emptyTreeIndexDict);
        expect(emptyContent).toEqual({});
    });
    it('should handle depths below 6', () => {
        const content = {
            node1: { content: '### Title' },
            node2: { content: '' },
            node3: { content: '## Subtitle' },
        };

        const treeIndexDict = {
            node1: '1.1.1.1',
            node3: '1.1.1.1.1.1.1.1.1.1',
        };

        const expectedOutput = {
            node1: { content: '#### Title' },
            node2: { content: '' },
            node3: { content: '###### Subtitle' },
        };

        formatHeadings(content, treeIndexDict);
        expect(content).toEqual(expectedOutput);
    });
});
