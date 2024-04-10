import { beforeEach, describe, expect, test, vi } from 'vitest';
import { pasteNode } from 'src/stores/document/reducers/clipboard/paste-node/paste-node';
import { Clipboard } from 'src/stores/document/document-state-type';
import { __id__ } from 'src/helpers/test-helpers/__id__';

const state = {
    n: 0,
    c: 0,
    s: 0,
};

vi.mock('src/helpers/id', () => {
    return {
        id: {
            rootNode: () => 'r-',
            node: () => 'n-' + state.n++,
            column: () => 'c-' + state.c++,
            snapshot: () => 's-' + state.s++,
        },
    };
});

describe('paste node', () => {
    beforeEach(() => {
        state.n = 0;
        state.c = 0;
        state.s = 0;
        __id__.reset();
    });
    test('5 columns', () => {
        const c0 = 'cLbt';
        const c1 = 'c-0';
        const c2 = 'c-1';
        const c3 = 'c-2';
        const c4 = 'c-3';
        const root = 'r3gx';
        const n2 = 'nF0c';
        const n1 = __id__.node();
        const n1_1 = __id__.node();
        const n1_2 = __id__.node();
        const n1_3 = __id__.node();
        const n1_4 = __id__.node();
        const n1_1_1 = __id__.node();
        const n1_1_2 = __id__.node();
        const n1_4_1 = __id__.node();
        const n1_1_2_1 = __id__.node();
        const n1_1_2_1_1 = __id__.node();
        const n1_1_2_1_2 = __id__.node();
        const input = {
            columns: [{ id: c0, groups: [{ nodes: [n2], parentId: root }] }],
            content: { [n2]: { content: '2' } },
        };
        const input_clipboard: Clipboard = {
            branch: {
                sortedChildGroups: [
                    [
                        {
                            nodes: ['nN3y', 'nUC8', 'nfN5', 'nyxT'],
                            parentId: 'ns5q',
                        },
                    ],
                    [
                        { nodes: ['nAWh', 'nDIK'], parentId: 'nN3y' },
                        { nodes: ['nR66'], parentId: 'nyxT' },
                    ],
                    [{ nodes: ['nwWJ'], parentId: 'nDIK' }],
                    [{ nodes: ['n74E', 'ncxO'], parentId: 'nwWJ' }],
                ],
                content: {
                    nN3y: { content: '1.1' },
                    nUC8: { content: '1.2' },
                    nfN5: { content: '1.3' },
                    nyxT: { content: '1.4' },
                    nAWh: { content: '1.1.1' },
                    nDIK: { content: '1.1.2' },
                    nR66: { content: '1.4.1' },
                    nwWJ: { content: '1.1.2.1' },
                    n74E: { content: '1.1.2.1.1' },
                    ncxO: { content: '1.1.2.1.2' },
                    ns5q: { content: '1' },
                },
                nodeId: 'ns5q',
                mode: 'cut',
            },
        };
        const targetNodeId = 'nF0c';

        const output = {
            columns: [
                { id: c0, groups: [{ nodes: [n2, n1], parentId: root }] },
                {
                    id: c1,
                    groups: [{ nodes: [n1_1, n1_2, n1_3, n1_4], parentId: n1 }],
                },
                {
                    id: c2,
                    groups: [
                        { nodes: [n1_1_1, n1_1_2], parentId: n1_1 },
                        { nodes: [n1_4_1], parentId: n1_4 },
                    ],
                },
                { id: c3, groups: [{ nodes: [n1_1_2_1], parentId: n1_1_2 }] },
                {
                    id: c4,
                    groups: [
                        { nodes: [n1_1_2_1_1, n1_1_2_1_2], parentId: n1_1_2_1 },
                    ],
                },
            ],
            content: {
                [n2]: { content: '2' },
                [n1]: { content: '1' },
                [n1_1]: { content: '1.1' },
                [n1_2]: { content: '1.2' },
                [n1_3]: { content: '1.3' },
                [n1_4]: { content: '1.4' },
                [n1_1_1]: { content: '1.1.1' },
                [n1_1_2]: { content: '1.1.2' },
                [n1_4_1]: { content: '1.4.1' },
                [n1_1_2_1]: { content: '1.1.2.1' },
                [n1_1_2_1_1]: { content: '1.1.2.1.1' },
                [n1_1_2_1_2]: { content: '1.1.2.1.2' },
            },
        };

        pasteNode(input, {
            payload: { targetNodeId, branch: input_clipboard.branch },
        });
        expect(input.columns).toEqual(output.columns);
        expect(input.content).toEqual(output.content);
    });
    test('5 columns 2', () => {
        const c0 = 'cLbt';
        const c1 = 'cFaP';
        const c2 = 'cRNl';
        const c3 = 'cSe0';
        const c4 = 'cOiO';
        const root = 'r3gx';
        const n2 = 'nF0c';
        const n1 = 'ns5q';
        const n1_1 = 'nN3y';
        const n1_2 = 'nUC8';
        const n1_3 = 'nfN5';
        const n1_1_1 = 'nAWh';
        const n1_1_2 = 'nDIK';
        const n1_1_2_1 = 'nwWJ';
        const n1_1_2_1_1 = 'n74E';
        const n1_1_2_1_2 = 'ncxO';
        const n1_4 = __id__.node();
        const n1_4_1 = __id__.node();
        const input = {
            columns: [
                { id: c0, groups: [{ nodes: [n2, n1], parentId: root }] },
                {
                    id: c1,
                    groups: [{ nodes: [n1_1, n1_2, n1_3], parentId: n1 }],
                },
                {
                    id: c2,
                    groups: [{ nodes: [n1_1_1, n1_1_2], parentId: n1_1 }],
                },
                { id: c3, groups: [{ nodes: [n1_1_2_1], parentId: n1_1_2 }] },
                {
                    id: c4,
                    groups: [
                        { nodes: [n1_1_2_1_1, n1_1_2_1_2], parentId: n1_1_2_1 },
                    ],
                },
            ],
            content: {
                [n2]: { content: '2' },
                [n1]: { content: '1' },
                [n1_1]: { content: '1.1' },
                [n1_2]: { content: '1.2' },
                [n1_3]: { content: '1.3' },
                [n1_1_1]: { content: '1.1.1' },
                [n1_1_2]: { content: '1.1.2' },
                [n1_1_2_1]: { content: '1.1.2.1' },
                [n1_1_2_1_1]: { content: '1.1.2.1.1' },
                [n1_1_2_1_2]: { content: '1.1.2.1.2' },
            },
        };
        const input_clipboard: Clipboard = {
            branch: {
                sortedChildGroups: [[{ nodes: ['nR66'], parentId: 'nyxT' }]],
                content: {
                    nR66: { content: '1.4.1' },
                    nyxT: { content: '1.4' },
                },
                nodeId: 'nyxT',
                mode: 'copy',
            },
        };
        const targetNodeId = 'ns5q';

        const output = {
            columns: [
                { id: c0, groups: [{ nodes: [n2, n1, n1_4], parentId: root }] },
                {
                    id: c1,
                    groups: [
                        { nodes: [n1_1, n1_2, n1_3], parentId: n1 },
                        { nodes: [n1_4_1], parentId: n1_4 },
                    ],
                },
                {
                    id: c2,
                    groups: [{ nodes: [n1_1_1, n1_1_2], parentId: n1_1 }],
                },
                { id: c3, groups: [{ nodes: [n1_1_2_1], parentId: n1_1_2 }] },
                {
                    id: c4,
                    groups: [
                        { nodes: [n1_1_2_1_1, n1_1_2_1_2], parentId: n1_1_2_1 },
                    ],
                },
            ],
            content: {
                [n2]: { content: '2' },
                [n1]: { content: '1' },
                [n1_1]: { content: '1.1' },
                [n1_2]: { content: '1.2' },
                [n1_3]: { content: '1.3' },
                [n1_1_1]: { content: '1.1.1' },
                [n1_1_2]: { content: '1.1.2' },
                [n1_1_2_1]: { content: '1.1.2.1' },
                [n1_1_2_1_1]: { content: '1.1.2.1.1' },
                [n1_1_2_1_2]: { content: '1.1.2.1.2' },
                [n1_4]: { content: '1.4' },
                [n1_4_1]: { content: '1.4.1' },
            },
        };
        pasteNode(input, {
            payload: { targetNodeId, branch: input_clipboard.branch },
        });
        expect(input.columns).toEqual(output.columns);
        expect(input.content).toEqual(output.content);
    });

    test('5 columns, 3', () => {
        const c0 = 'cjw3';
        const c1 = 'c3Q7';
        const c2 = 'cs7w';
        const root = 'riXy';
        const n2 = 'nxdu';
        const n2_1 = 'nNB1';
        const n2_2 = 'ncLM';
        const n2_2_1 = 'n5cu';
        const n2_2_2 = 'nytl';
        const c3 = __id__.column();
        const c4 = __id__.column();
        const c5 = __id__.column();
        const c6 = __id__.column();
        const n1 = __id__.node();
        const n1_1 = __id__.node();
        const n1_2 = __id__.node();
        const n1_1_1 = __id__.node();
        const n1_1_2 = __id__.node();
        const n1_2_1 = __id__.node();
        const n1_2_2 = __id__.node();
        const n1_1_2_1 = __id__.node();
        const n1_1_2_2 = __id__.node();
        const n1_2_2_1 = __id__.node();
        const n1_2_2_1_1 = __id__.node();
        const n1_2_2_1_2 = __id__.node();
        const input = {
            columns: [
                { id: c0, groups: [{ nodes: [n2], parentId: root }] },
                { id: c1, groups: [{ nodes: [n2_1, n2_2], parentId: n2 }] },
                {
                    id: c2,
                    groups: [{ nodes: [n2_2_1, n2_2_2], parentId: n2_2 }],
                },
            ],
            content: {
                [n2]: { content: '2' },
                [n2_1]: { content: '2.1' },
                [n2_2]: { content: '2.2' },
                [n2_2_1]: { content: '2.2.1' },
                [n2_2_2]: { content: '2.2.2' },
            },
        };
        const input_clipboard: Clipboard = {
            branch: {
                sortedChildGroups: [
                    [{ nodes: [n1_1, n1_2], parentId: n1 }],
                    [
                        { nodes: [n1_1_1, n1_1_2], parentId: n1_1 },
                        { nodes: [n1_2_1, n1_2_2], parentId: n1_2 },
                    ],
                    [
                        { nodes: [n1_1_2_1, n1_1_2_2], parentId: n1_1_2 },
                        { nodes: [n1_2_2_1], parentId: n1_2_2 },
                    ],
                    [{ nodes: [n1_2_2_1_1, n1_2_2_1_2], parentId: n1_2_2_1 }],
                ],
                content: {
                    [n1]: { content: '1' },
                    [n1_1]: { content: '1.1' },
                    [n1_2]: { content: '1.2' },
                    [n1_1_1]: { content: '1.1.1' },
                    [n1_1_2]: { content: '1.1.2' },
                    [n1_2_1]: { content: '1.2.1' },
                    [n1_2_2]: { content: '1.2.2' },
                    [n1_1_2_1]: { content: '1.1.2.1' },
                    [n1_1_2_2]: { content: '1.1.2.2' },
                    [n1_2_2_1]: { content: '1.2.2.1' },
                    [n1_2_2_1_1]: { content: '1.2.2.1.1' },
                    [n1_2_2_1_2]: { content: '1.2.2.1.2' },
                },
                nodeId: n1,
                mode: 'cut',
            },
        };
        const targetNodeId = n2_2_2;

        const output = {
            columns: [
                { id: c0, groups: [{ nodes: [n2], parentId: root }] },
                { id: c1, groups: [{ nodes: [n2_1, n2_2], parentId: n2 }] },
                {
                    id: c2,
                    groups: [{ nodes: [n2_2_1, n2_2_2, n1], parentId: n2_2 }],
                },
                { id: c3, groups: [{ nodes: [n1_1, n1_2], parentId: n1 }] },
                {
                    id: c4,
                    groups: [
                        { nodes: [n1_1_1, n1_1_2], parentId: n1_1 },
                        { nodes: [n1_2_1, n1_2_2], parentId: n1_2 },
                    ],
                },
                {
                    id: c5,
                    groups: [
                        { nodes: [n1_1_2_1, n1_1_2_2], parentId: n1_1_2 },
                        { nodes: [n1_2_2_1], parentId: n1_2_2 },
                    ],
                },
                {
                    id: c6,
                    groups: [
                        { nodes: [n1_2_2_1_1, n1_2_2_1_2], parentId: n1_2_2_1 },
                    ],
                },
            ],
            content: {
                [n2]: { content: '2' },
                [n2_1]: { content: '2.1' },
                [n2_2]: { content: '2.2' },
                [n2_2_1]: { content: '2.2.1' },
                [n2_2_2]: { content: '2.2.2' },
                [n1]: { content: '1' },
                [n1_1]: { content: '1.1' },
                [n1_2]: { content: '1.2' },
                [n1_1_1]: { content: '1.1.1' },
                [n1_1_2]: { content: '1.1.2' },
                [n1_2_1]: { content: '1.2.1' },
                [n1_2_2]: { content: '1.2.2' },
                [n1_1_2_1]: { content: '1.1.2.1' },
                [n1_1_2_2]: { content: '1.1.2.2' },
                [n1_2_2_1]: { content: '1.2.2.1' },
                [n1_2_2_1_1]: { content: '1.2.2.1.1' },
                [n1_2_2_1_2]: { content: '1.2.2.1.2' },
            },
        };
        pasteNode(input, {
            payload: { targetNodeId, branch: input_clipboard.branch },
        });
        expect(input.columns).toEqual(output.columns);
        expect(input.content).toEqual(output.content);
    });
});
