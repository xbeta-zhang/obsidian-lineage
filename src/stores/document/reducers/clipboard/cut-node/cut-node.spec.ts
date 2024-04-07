import { describe, expect, test } from 'vitest';
import { cutNode } from 'src/stores/document/reducers/clipboard/cut-node/cut-node';
import { Clipboard } from 'src/stores/document/document-state-type';

describe('cut node', () => {
    test('4 columns', () => {
        const c0 = 'cBYG';
        const c1 = 'cBaE';
        const c2 = 'cYpO';
        const c3 = 'cMpR';
        const root = 'r92W';
        const n1 = 'n0u-';
        const n1_1 = 'nqSG';
        const n1_1_1 = 'n3Xh';
        const n1_1_1_1 = 'nhMi';
        const n2 = 'nQCx';
        const input = {
            columns: [
                { id: c0, groups: [{ nodes: [n1, n2], parentId: root }] },
                { id: c1, groups: [{ nodes: [n1_1], parentId: n1 }] },
                { id: c2, groups: [{ nodes: [n1_1_1], parentId: n1_1 }] },
                { id: c3, groups: [{ nodes: [n1_1_1_1], parentId: n1_1_1 }] },
            ],
            content: {
                [n1]: { content: '1' },
                [n1_1]: { content: '1.1' },
                [n1_1_1]: { content: '1.1.1' },
                [n1_1_1_1]: { content: '1.1.1.1' },
                [n2]: { content: '2' },
            },
        };
        const input_state: Clipboard = { branch: null };
        const nodeId = n1;

        const output = {
            columns: [{ id: c0, groups: [{ nodes: [n2], parentId: root }] }],
            content: { [n2]: { content: '2' } },
        };
        const output_state: Clipboard = {
            branch: {
                sortedChildGroups: [
                    [{ nodes: [n1_1], parentId: n1 }],
                    [{ nodes: [n1_1_1], parentId: n1_1 }],
                    [{ nodes: [n1_1_1_1], parentId: n1_1_1 }],
                ],
                content: {
                    [n1]: { content: '1' },
                    [n1_1]: { content: '1.1' },
                    [n1_1_1]: { content: '1.1.1' },
                    [n1_1_1_1]: { content: '1.1.1.1' },
                },
                nodeId: n1,
                mode: 'cut',
            },
        };
        cutNode(input.columns, input.content, input_state, nodeId);
        expect(input.columns).toEqual(output.columns);
        expect(input.content).toEqual(output.content);
        expect(input_state).toEqual(output_state);
    });
    test('5 columns', () => {
        const c0 = 'cqrN';
        const c1 = 'cDfn';
        const c2 = 'cNkz';
        const c3 = 'cTNW';
        const c4 = 'ckdo';
        const root = 'rfol';
        const n1 = 'ntJ8';
        const n1_1 = 'n7f5';
        const n1_1_1 = 'n9tT';
        const n1_1_2 = 'nmJw';
        const n1_1_2_1 = 'nWYK';
        const n1_1_2_1_1 = 'nkgL';
        const n1_1_2_1_2 = 'n1GT';
        const n1_2 = 'nuWq';
        const n1_3 = 'nMbt';
        const n1_4 = 'npnX';
        const n1_4_1 = 'noQe';
        const n2 = 'nTML';
        const input = {
            columns: [
                { id: c0, groups: [{ nodes: [n1, n2], parentId: root }] },
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
                [n1]: { content: '1' },
                [n1_1]: { content: '1.1' },
                [n1_1_1]: { content: '1.1.1' },
                [n1_1_2]: { content: '1.1.2' },
                [n1_1_2_1]: { content: '1.1.2.1' },
                [n1_1_2_1_1]: { content: '1.1.2.1.1' },
                [n1_1_2_1_2]: { content: '1.1.2.1.2' },
                [n1_2]: { content: '1.2' },
                [n1_3]: { content: '1.3' },
                [n1_4]: { content: '1.4' },
                [n1_4_1]: { content: '1.4.1' },
                [n2]: { content: '2' },
            },
        };
        const input_state: Clipboard = { branch: null };
        const nodeId = 'ntJ8';

        const output = {
            columns: [{ id: c0, groups: [{ nodes: [n2], parentId: root }] }],
            content: { [n2]: { content: '2' } },
        };
        const output_state: Clipboard = {
            branch: {
                sortedChildGroups: [
                    [
                        {
                            nodes: ['n7f5', 'nuWq', 'nMbt', 'npnX'],
                            parentId: 'ntJ8',
                        },
                    ],
                    [
                        { nodes: ['n9tT', 'nmJw'], parentId: 'n7f5' },
                        { nodes: ['noQe'], parentId: 'npnX' },
                    ],
                    [{ nodes: ['nWYK'], parentId: 'nmJw' }],
                    [{ nodes: ['nkgL', 'n1GT'], parentId: 'nWYK' }],
                ],
                content: {
                    n7f5: { content: '1.1' },
                    nuWq: { content: '1.2' },
                    nMbt: { content: '1.3' },
                    npnX: { content: '1.4' },
                    n9tT: { content: '1.1.1' },
                    nmJw: { content: '1.1.2' },
                    noQe: { content: '1.4.1' },
                    nWYK: { content: '1.1.2.1' },
                    nkgL: { content: '1.1.2.1.1' },
                    n1GT: { content: '1.1.2.1.2' },
                    ntJ8: { content: '1' },
                },
                nodeId: 'ntJ8',
                mode: 'cut',
            },
        };
        cutNode(input.columns, input.content, input_state, nodeId);
        expect(input.columns).toEqual(output.columns);
        expect(input.content).toEqual(output.content);
        expect(input_state).toEqual(output_state);
    });

    test('5 columns 2', () => {
        const c0 = 'cvyd';
        const c1 = 'cudB';
        const c2 = 'cq8h';
        const c3 = 'cKG0';
        const c4 = 'cIdk';
        const root = 'rBRF';
        const n1 = 'n1pt';
        const n1_1 = 'n5dy';
        const n1_1_1 = 'nHAO';
        const n1_1_2 = 'nSMA';
        const n1_1_2_1 = 'n1tB';
        const n1_1_2_1_1 = 'nl7V';
        const n1_1_2_1_2 = 'n5P6';
        const n1_2 = 'n0Ri';
        const n1_3 = 'nZbs';
        const n1_4 = 'nVto';
        const n1_4_1 = 'n8Fk';
        const n2 = 'nKWc';
        const input = {
            columns: [
                { id: c0, groups: [{ nodes: [n1, n2], parentId: root }] },
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
                [n1]: { content: '1' },
                [n1_1]: { content: '1.1' },
                [n1_1_1]: { content: '1.1.1' },
                [n1_1_2]: { content: '1.1.2' },
                [n1_1_2_1]: { content: '1.1.2.1' },
                [n1_1_2_1_1]: { content: '1.1.2.1.1' },
                [n1_1_2_1_2]: { content: '1.1.2.1.2' },
                [n1_2]: { content: '1.2' },
                [n1_3]: { content: '1.3' },
                [n1_4]: { content: '1.4' },
                [n1_4_1]: { content: '1.4.1' },
                [n2]: { content: '2' },
            },
        };
        const input_state: Clipboard = { branch: null };
        const nodeId = 'nVto';

        const output = {
            columns: [
                { id: c0, groups: [{ nodes: [n1, n2], parentId: root }] },
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
                [n1]: { content: '1' },
                [n1_1]: { content: '1.1' },
                [n1_1_1]: { content: '1.1.1' },
                [n1_1_2]: { content: '1.1.2' },
                [n1_1_2_1]: { content: '1.1.2.1' },
                [n1_1_2_1_1]: { content: '1.1.2.1.1' },
                [n1_1_2_1_2]: { content: '1.1.2.1.2' },
                [n1_2]: { content: '1.2' },
                [n1_3]: { content: '1.3' },
                [n2]: { content: '2' },
            },
        };
        const output_state: Clipboard = {
            branch: {
                sortedChildGroups: [[{ nodes: ['n8Fk'], parentId: 'nVto' }]],
                content: {
                    n8Fk: { content: '1.4.1' },
                    nVto: { content: '1.4' },
                },
                nodeId: 'nVto',
                mode: 'cut',
            },
        };
        cutNode(input.columns, input.content, input_state, nodeId);
        expect(input.columns).toEqual(output.columns);
        expect(input.content).toEqual(output.content);
        expect(input_state).toEqual(output_state);
    });

    test('5 columns 3', () => {
        const c0 = 'cvyd';
        const c1 = 'cudB';
        const c2 = 'cq8h';
        const c3 = 'cKG0';
        const c4 = 'cIdk';
        const root = 'rBRF';
        const n1 = 'n1pt';
        const n1_1 = 'n5dy';
        const n1_1_1 = 'nHAO';
        const n1_1_2 = 'nSMA';
        const n1_1_2_1 = 'n1tB';
        const n1_1_2_1_1 = 'nl7V';
        const n1_1_2_1_2 = 'n5P6';
        const n1_2 = 'n0Ri';
        const n1_3 = 'nZbs';
        const n1_4 = 'nVto';
        const n1_4_1 = 'n8Fk';
        const n2 = 'nKWc';
        const input = {
            columns: [
                { id: c0, groups: [{ nodes: [n1, n2], parentId: root }] },
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
                [n1]: { content: '1' },
                [n1_1]: { content: '1.1' },
                [n1_1_1]: { content: '1.1.1' },
                [n1_1_2]: { content: '1.1.2' },
                [n1_1_2_1]: { content: '1.1.2.1' },
                [n1_1_2_1_1]: { content: '1.1.2.1.1' },
                [n1_1_2_1_2]: { content: '1.1.2.1.2' },
                [n1_2]: { content: '1.2' },
                [n1_3]: { content: '1.3' },
                [n1_4]: { content: '1.4' },
                [n1_4_1]: { content: '1.4.1' },
                [n2]: { content: '2' },
            },
        };
        const input_state: Clipboard = {
            branch: {
                sortedChildGroups: [[{ nodes: ['n8Fk'], parentId: 'nVto' }]],
                content: {
                    n8Fk: { content: '1.4.1' },
                    nVto: { content: '1.4' },
                },
                nodeId: 'nVto',
                mode: 'cut',
            },
        };
        const nodeId = 'n5dy';

        const output = {
            columns: [
                { id: c0, groups: [{ nodes: [n1, n2], parentId: root }] },
                {
                    id: c1,
                    groups: [{ nodes: [n1_2, n1_3, n1_4], parentId: n1 }],
                },
                { id: c2, groups: [{ nodes: [n1_4_1], parentId: n1_4 }] },
            ],
            content: {
                [n1]: { content: '1' },
                [n1_2]: { content: '1.2' },
                [n1_3]: { content: '1.3' },
                [n1_4]: { content: '1.4' },
                [n1_4_1]: { content: '1.4.1' },
                [n2]: { content: '2' },
            },
        };
        const output_state: Clipboard = {
            branch: {
                sortedChildGroups: [
                    [{ nodes: ['nHAO', 'nSMA'], parentId: 'n5dy' }],
                    [{ nodes: ['n1tB'], parentId: 'nSMA' }],
                    [{ nodes: ['nl7V', 'n5P6'], parentId: 'n1tB' }],
                ],
                content: {
                    nHAO: { content: '1.1.1' },
                    nSMA: { content: '1.1.2' },
                    n1tB: { content: '1.1.2.1' },
                    nl7V: { content: '1.1.2.1.1' },
                    n5P6: { content: '1.1.2.1.2' },
                    n5dy: { content: '1.1' },
                },
                nodeId: 'n5dy',
                mode: 'cut',
            },
        };
        cutNode(input.columns, input.content, input_state, nodeId);
        expect(input.columns).toEqual(output.columns);
        expect(input.content).toEqual(output.content);
        expect(input_state).toEqual(output_state);
    });
});
