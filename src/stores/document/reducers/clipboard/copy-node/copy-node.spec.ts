import { beforeEach, describe, expect, test, vi } from 'vitest';
import { copyNode } from 'src/stores/document/reducers/clipboard/copy-node/copy-node';
import { clone } from 'src/helpers/clone';
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

describe('copy node', () => {
    beforeEach(() => {
        state.n = 0;
        state.c = 0;
        state.s = 0;
        __id__.reset();
    });
    test('4 columns', () => {
        const c0 = 'cTrw';
        const c1 = 'cv4O';
        const c2 = 'crri';
        const c3 = 'cLdL';
        const root = 'ru1R';
        const n1 = 'nQO6';
        const n1_1 = 'nKyd';
        const n1_1_1 = 'n6yg';
        const n1_1_2 = 'n4v7';
        const n1_1_2_1 = 'nrdW';
        const n1_2 = 'nfza';
        const n1_2_1 = 'nx6S';
        const n1_2_1_1 = 'nHXG';
        const n1_2_1_2 = 'nBli';
        const n2 = 'nFyV';
        const n3 = __id__.node();
        const n3_1 = __id__.node();
        const n3_2 = __id__.node();
        const n3_1_1 = __id__.node();
        const n3_1_2 = __id__.node();
        const n3_2_1 = __id__.node();
        const n3_1_2_1 = __id__.node();
        const n3_2_1_1 = __id__.node();
        const n3_2_1_2 = __id__.node();
        const input = {
            columns: [
                { id: c0, groups: [{ nodes: [n1, n2], parentId: root }] },
                { id: c1, groups: [{ nodes: [n1_1, n1_2], parentId: n1 }] },
                {
                    id: c2,
                    groups: [
                        { nodes: [n1_1_1, n1_1_2], parentId: n1_1 },
                        { nodes: [n1_2_1], parentId: n1_2 },
                    ],
                },
                {
                    id: c3,
                    groups: [
                        { nodes: [n1_1_2_1], parentId: n1_1_2 },
                        { nodes: [n1_2_1_1, n1_2_1_2], parentId: n1_2_1 },
                    ],
                },
            ],
            content: {
                [n1]: { content: '1' },
                [n1_1]: { content: '1.1' },
                [n1_1_1]: { content: '1.1.1' },
                [n1_1_2]: { content: '1.1.2' },
                [n1_1_2_1]: { content: '1.1.2.1' },
                [n1_2]: { content: '1.2' },
                [n1_2_1]: { content: '1.2.1' },
                [n1_2_1_1]: { content: '1.2.1.1' },
                [n1_2_1_2]: { content: '1.2.1.2' },
                [n2]: { content: '2' },
            },
        };
        const input_clipboard: Clipboard = {
            branch: null,
        };
        const nodeId = 'nQO6';

        const output = clone(input);
        const output_clipboard: Clipboard = {
            branch: {
                sortedChildGroups: [
                    [{ nodes: [n3_1, n3_2], parentId: n3 }],
                    [
                        { nodes: [n3_1_1, n3_1_2], parentId: n3_1 },
                        { nodes: [n3_2_1], parentId: n3_2 },
                    ],
                    [
                        { nodes: [n3_1_2_1], parentId: n3_1_2 },
                        { nodes: [n3_2_1_1, n3_2_1_2], parentId: n3_2_1 },
                    ],
                ],
                content: {
                    [n3]: { content: '1' },
                    [n3_1]: { content: '1.1' },
                    [n3_1_1]: { content: '1.1.1' },
                    [n3_1_2]: { content: '1.1.2' },
                    [n3_1_2_1]: { content: '1.1.2.1' },
                    [n3_2]: { content: '1.2' },
                    [n3_2_1]: { content: '1.2.1' },
                    [n3_2_1_1]: { content: '1.2.1.1' },
                    [n3_2_1_2]: { content: '1.2.1.2' },
                },
                nodeId: n3,
                mode: 'copy',
            },
        };
        copyNode(input.columns, input.content, input_clipboard, nodeId);
        expect(input.columns).toEqual(output.columns);
        expect(input.content).toEqual(output.content);
        expect(input_clipboard).toEqual(output_clipboard);
    });
    test('5 columns', () => {
        const c0 = 'c4Ro';
        const c1 = 'cnDH';
        const c2 = 'ciNY';
        const c3 = 'c-OE';
        const c4 = 'chpx';
        const root = 'rGLR';
        const n1 = 'nhZS';
        const n1_1 = 'nvy7';
        const n1_1_1 = 'n-qK';
        const n1_1_2 = 'nViX';
        const n1_1_2_1 = 'nebB';
        const n1_1_2_2 = 'n92E';
        const n1_2 = 'nJaU';
        const n1_2_1 = 'nO_A';
        const n1_2_2 = 'npKs';
        const n1_2_2_1 = 'nYpy';
        const n1_2_2_1_1 = 'njdP';
        const n1_2_2_1_2 = 'nDh4';
        const n2 = 'ntq4';
        const n2_1 = 'nvJp';
        const n2_2 = 'niLR';
        const n2_2_1 = 'nlEl';
        const n2_2_2 = 'nN4M';
        const n3 = __id__.node();
        const n3_1 = __id__.node();
        const n3_2 = __id__.node();
        const n3_1_1 = __id__.node();
        const n3_1_2 = __id__.node();
        const n3_2_1 = __id__.node();
        const n3_2_2 = __id__.node();
        const n3_1_2_1 = __id__.node();
        const n3_1_2_2 = __id__.node();
        const n3_2_2_1 = __id__.node();
        const n3_2_2_1_1 = __id__.node();
        const n3_2_2_1_2 = __id__.node();
        const input = {
            columns: [
                { id: c0, groups: [{ nodes: [n1, n2], parentId: root }] },
                {
                    id: c1,
                    groups: [
                        { nodes: [n1_1, n1_2], parentId: n1 },
                        { nodes: [n2_1, n2_2], parentId: n2 },
                    ],
                },
                {
                    id: c2,
                    groups: [
                        { nodes: [n1_1_1, n1_1_2], parentId: n1_1 },
                        { nodes: [n1_2_1, n1_2_2], parentId: n1_2 },
                        { nodes: [n2_2_1, n2_2_2], parentId: n2_2 },
                    ],
                },
                {
                    id: c3,
                    groups: [
                        { nodes: [n1_1_2_1, n1_1_2_2], parentId: n1_1_2 },
                        { nodes: [n1_2_2_1], parentId: n1_2_2 },
                    ],
                },
                {
                    id: c4,
                    groups: [
                        { nodes: [n1_2_2_1_1, n1_2_2_1_2], parentId: n1_2_2_1 },
                    ],
                },
            ],
            content: {
                [n1]: { content: '1' },
                [n1_1]: { content: '1.1' },
                [n1_1_1]: { content: '1.1.1' },
                [n1_1_2]: { content: '1.1.2' },
                [n1_1_2_1]: { content: '1.1.2.1' },
                [n1_1_2_2]: { content: '1.1.2.2' },
                [n1_2]: { content: '1.2' },
                [n1_2_1]: { content: '1.2.1' },
                [n1_2_2]: { content: '1.2.2' },
                [n1_2_2_1]: { content: '1.2.2.1' },
                [n1_2_2_1_1]: { content: '1.2.2.1.1' },
                [n1_2_2_1_2]: { content: '1.2.2.1.2' },
                [n2]: { content: '2' },
                [n2_1]: { content: '2.1' },
                [n2_2]: { content: '2.2' },
                [n2_2_1]: { content: '2.2.1' },
                [n2_2_2]: { content: '2.2.2' },
            },
        };
        const nodeId = 'nhZS';
        const input_clipboard: Clipboard = {
            branch: null,
        };
        const output = {
            columns: [
                { id: c0, groups: [{ nodes: [n1, n2], parentId: root }] },
                {
                    id: c1,
                    groups: [
                        { nodes: [n1_1, n1_2], parentId: n1 },
                        { nodes: [n2_1, n2_2], parentId: n2 },
                    ],
                },
                {
                    id: c2,
                    groups: [
                        { nodes: [n1_1_1, n1_1_2], parentId: n1_1 },
                        { nodes: [n1_2_1, n1_2_2], parentId: n1_2 },
                        { nodes: [n2_2_1, n2_2_2], parentId: n2_2 },
                    ],
                },
                {
                    id: c3,
                    groups: [
                        { nodes: [n1_1_2_1, n1_1_2_2], parentId: n1_1_2 },
                        { nodes: [n1_2_2_1], parentId: n1_2_2 },
                    ],
                },
                {
                    id: c4,
                    groups: [
                        { nodes: [n1_2_2_1_1, n1_2_2_1_2], parentId: n1_2_2_1 },
                    ],
                },
            ],
            content: {
                [n1]: { content: '1' },
                [n1_1]: { content: '1.1' },
                [n1_1_1]: { content: '1.1.1' },
                [n1_1_2]: { content: '1.1.2' },
                [n1_1_2_1]: { content: '1.1.2.1' },
                [n1_1_2_2]: { content: '1.1.2.2' },
                [n1_2]: { content: '1.2' },
                [n1_2_1]: { content: '1.2.1' },
                [n1_2_2]: { content: '1.2.2' },
                [n1_2_2_1]: { content: '1.2.2.1' },
                [n1_2_2_1_1]: { content: '1.2.2.1.1' },
                [n1_2_2_1_2]: { content: '1.2.2.1.2' },
                [n2]: { content: '2' },
                [n2_1]: { content: '2.1' },
                [n2_2]: { content: '2.2' },
                [n2_2_1]: { content: '2.2.1' },
                [n2_2_2]: { content: '2.2.2' },
            },
        };
        const output_clipboard: Clipboard = {
            branch: {
                sortedChildGroups: [
                    [{ nodes: [n3_1, n3_2], parentId: n3 }],
                    [
                        { nodes: [n3_1_1, n3_1_2], parentId: n3_1 },
                        { nodes: [n3_2_1, n3_2_2], parentId: n3_2 },
                    ],
                    [
                        { nodes: [n3_1_2_1, n3_1_2_2], parentId: n3_1_2 },
                        { nodes: [n3_2_2_1], parentId: n3_2_2 },
                    ],
                    [{ nodes: [n3_2_2_1_1, n3_2_2_1_2], parentId: n3_2_2_1 }],
                ],
                content: {
                    [n3]: { content: '1' },
                    [n3_1]: { content: '1.1' },
                    [n3_1_1]: { content: '1.1.1' },
                    [n3_1_2]: { content: '1.1.2' },
                    [n3_1_2_1]: { content: '1.1.2.1' },
                    [n3_1_2_2]: { content: '1.1.2.2' },
                    [n3_2]: { content: '1.2' },
                    [n3_2_1]: { content: '1.2.1' },
                    [n3_2_2]: { content: '1.2.2' },
                    [n3_2_2_1]: { content: '1.2.2.1' },
                    [n3_2_2_1_1]: { content: '1.2.2.1.1' },
                    [n3_2_2_1_2]: { content: '1.2.2.1.2' },
                },
                nodeId: n3,
                mode: 'copy',
            },
        };
        copyNode(input.columns, input.content, input_clipboard, nodeId);
        expect(input.columns).toEqual(output.columns);
        expect(input.content).toEqual(output.content);
        expect(input_clipboard).toEqual(output_clipboard);
    });
});
