import { describe, expect, it } from 'vitest';
import { deleteNode } from 'src/stores/document/reducers/delete-node/delete-node';

import { LineageDocument } from 'src/stores/document/document-state-type';

describe('delete node', () => {
    it('should delete node', () => {
        const activeNode = 'n-lt1jmx8g';
        const expectedActiveNode = 'n-lt1jmx8d';
        const input = {
            content: {},
            columns: [
                {
                    id: 'c-lt1jmx8b',
                    groups: [
                        {
                            nodes: ['n-lt1jmx8a', 'n-lt1jmx8j'],
                            parentId: 'r-lt1jmx89',
                        },
                    ],
                },
                {
                    id: 'c-lt1jmx8e',
                    groups: [
                        {
                            nodes: [
                                expectedActiveNode,
                                activeNode,
                                'n-lt1jmx8h',
                                'n-lt1jmx8i',
                            ],
                            parentId: 'n-lt1jmx8a',
                        },
                    ],
                },
            ],
        } satisfies LineageDocument;
        const output = {
            content: {},
            columns: [
                {
                    id: 'c-lt1jmx8b',
                    groups: [
                        {
                            nodes: ['n-lt1jmx8a', 'n-lt1jmx8j'],
                            parentId: 'r-lt1jmx89',
                        },
                    ],
                },
                {
                    id: 'c-lt1jmx8e',
                    groups: [
                        {
                            nodes: [
                                expectedActiveNode,
                                'n-lt1jmx8h',
                                'n-lt1jmx8i',
                            ],
                            parentId: 'n-lt1jmx8a',
                        },
                    ],
                },
            ],
        } satisfies LineageDocument;

        expect(deleteNode(input, activeNode)).toEqual(expectedActiveNode);
        expect(input).toEqual(output);
    });

    it('bug 24-02-26', () => {
        const deletedNode = 'n-lt3bize5';
        const aboveDeleteNode = 'n-lt3bize2';
        const belowDeletedNode = 'n-lt3bizej';

        const childNode1 = 'n-lt3bize6';
        const childNode2 = 'n-lt3bize9';
        const childNode3 = 'n-lt3bizea';
        const childNode4 = 'n-lt3bized';
        const childNode5 = 'n-lt3bizeg';
        const stateBefore = {
            content: {},
            columns: [
                {
                    id: 'c-lt3bize3',
                    groups: [
                        {
                            nodes: [
                                aboveDeleteNode,
                                deletedNode,
                                belowDeletedNode,
                            ],
                            parentId: 'r-lt3bize1',
                        },
                    ],
                },
                {
                    id: 'c-lt3bize7',
                    groups: [
                        {
                            nodes: [childNode1, childNode2],
                            parentId: deletedNode,
                        },
                    ],
                },
                {
                    id: 'c-lt3bizeb',
                    groups: [
                        {
                            nodes: [childNode3],
                            parentId: childNode2,
                        },
                    ],
                },
                {
                    id: 'c-lt3bizee',
                    groups: [
                        {
                            nodes: [childNode4],
                            parentId: childNode3,
                        },
                    ],
                },
                {
                    id: 'c-lt3bizeh',
                    groups: [
                        {
                            nodes: [childNode5],
                            parentId: childNode4,
                        },
                    ],
                },
            ],
        } satisfies LineageDocument;

        const stateAfter = {
            content: {},
            columns: [
                {
                    id: 'c-lt3bize3',
                    groups: [
                        {
                            nodes: [aboveDeleteNode, belowDeletedNode],
                            parentId: 'r-lt3bize1',
                        },
                    ],
                },
            ],
        } satisfies LineageDocument;
        const nextNode = deleteNode(stateBefore, deletedNode);
        expect(nextNode).toEqual(aboveDeleteNode);
        expect(stateBefore).toEqual(stateAfter);
    });

    it('case', () => {
        const activeNodeId = 'n-lt8wzcvn';
        const siblingNodId = 'n-lt8wz9zd';
        const state = {
            content: {
                'n-lt8wz9zd': { content: 'one' },
                'n-lt8wzcvn': { content: 'two' },
            },
            columns: [
                {
                    id: 'c-lt8wz9ze',
                    groups: [
                        {
                            parentId: 'r-lt8wz9zc',
                            nodes: [siblingNodId, activeNodeId],
                        },
                    ],
                },
            ],
        } satisfies LineageDocument;

        const stateAfter = {
            content: { 'n-lt8wz9zd': { content: 'one' } },
            columns: [
                {
                    id: 'c-lt8wz9ze',
                    groups: [{ parentId: 'r-lt8wz9zc', nodes: [siblingNodId] }],
                },
            ],
        } satisfies LineageDocument;

        expect(deleteNode(state, activeNodeId)).toEqual(siblingNodId);
        expect(state).toEqual(stateAfter);
    });
    it('>1 2 3', () => {
        const n1 = 'nCjW';
        const n2 = 'n7D6';
        const n3 = 'njBB';
        const input = {
            columns: [
                {
                    id: 'cmeX',
                    groups: [{ nodes: [n1, n2, n3], parentId: 'reOM' }],
                },
            ],
            content: {
                nCjW: { content: '1' },
                n7D6: { content: '2' },
                njBB: { content: '3' },
            },
        };

        const output = {
            columns: [
                {
                    id: 'cmeX',
                    groups: [{ nodes: [n2, n3], parentId: 'reOM' }],
                },
            ],

            content: { n7D6: { content: '2' }, njBB: { content: '3' } },
        };
        expect(deleteNode(input, n1)).toEqual(n2);
        expect(input).toEqual(output);
    });
    it('1 >2 3', () => {
        const n1 = 'nCjW';
        const n2 = 'n7D6';
        const n3 = 'njBB';
        const input = {
            columns: [
                {
                    id: 'cmeX',
                    groups: [{ nodes: [n1, n2, n3], parentId: 'reOM' }],
                },
            ],

            content: {
                nCjW: { content: '1' },
                n7D6: { content: '2' },
                njBB: { content: '3' },
            },
        };

        const output = {
            columns: [
                {
                    id: 'cmeX',
                    groups: [{ nodes: [n1, n3], parentId: 'reOM' }],
                },
            ],

            content: { nCjW: { content: '1' }, njBB: { content: '3' } },
        };
        expect(deleteNode(input, n2)).toEqual(n1);
        expect(input).toEqual(output);
    });
    it('1 2 >3', () => {
        const n1 = 'nCjW';
        const n2 = 'n7D6';
        const n3 = 'njBB';
        const input = {
            columns: [
                {
                    id: 'cmeX',
                    groups: [{ nodes: [n1, n2, n3], parentId: 'reOM' }],
                },
            ],

            content: {
                nCjW: { content: '1' },
                n7D6: { content: '2' },
                njBB: { content: '3' },
            },
        };

        const output = {
            columns: [
                {
                    id: 'cmeX',
                    groups: [{ nodes: [n1, n2], parentId: 'reOM' }],
                },
            ],

            content: { nCjW: { content: '1' }, n7D6: { content: '2' } },
        };
        expect(deleteNode(input, n3)).toEqual(n2);
        expect(input).toEqual(output);
    });
    it('>1|* 2|* 3|*', () => {
        const n2 = 'nvs7';
        const n2_1 = 'n7C5';
        const n2_2 = 'nM2n';
        const n3 = 'nqVP';
        const n3_1 = 'nnki';
        const n3_2 = 'nSMD';
        const n1 = 'nRBv';
        const n1_1 = 'nmvn';
        const n1_2 = 'ngvt';
        const c0 = 'cYdG';
        const c1 = 'czGr';
        const input = {
            columns: [
                { id: c0, groups: [{ nodes: [n1, n2, n3], parentId: 'rux9' }] },
                {
                    id: c1,
                    groups: [
                        { nodes: [n1_1, n1_2], parentId: n1 },
                        { nodes: [n2_1, n2_2], parentId: n2 },
                        { nodes: [n3_1, n3_2], parentId: n3 },
                    ],
                },
            ],

            content: {
                [n2]: { content: '2' },
                [n2_1]: { content: '2.1' },
                [n2_2]: { content: '2.2' },
                [n3]: { content: '3' },
                [n3_1]: { content: '3.1' },
                [n3_2]: { content: '3.2' },
                [n1]: { content: '1' },
                [n1_1]: { content: '1.1' },
                [n1_2]: { content: '1.2' },
            },
        };
        const output = {
            columns: [
                { id: c0, groups: [{ nodes: [n2, n3], parentId: 'rux9' }] },
                {
                    id: c1,
                    groups: [
                        { nodes: [n2_1, n2_2], parentId: n2 },
                        { nodes: [n3_1, n3_2], parentId: n3 },
                    ],
                },
            ],

            content: {
                [n2]: { content: '2' },
                [n2_1]: { content: '2.1' },
                [n2_2]: { content: '2.2' },
                [n3]: { content: '3' },
                [n3_1]: { content: '3.1' },
                [n3_2]: { content: '3.2' },
            },
        };
        expect(deleteNode(input, n1)).toEqual(n2);
        expect(input).toEqual(output);
    });
    it('1|* >2|* 3|*', () => {
        const n1 = 'nP_R';
        const n1_1 = 'n6Zv';
        const n1_2 = 'n5_W';
        const n2 = 'nlQ9';
        const n2_1 = 'nngo';
        const n2_2 = 'npKD';
        const n3 = 'nnlZ';
        const n3_1 = 'nLSJ';
        const n3_2 = 'nzZn';
        const c0 = 'c9VT';
        const c1 = 'cyrh';
        const input = {
            columns: [
                { id: c0, groups: [{ nodes: [n1, n2, n3], parentId: 'rDRO' }] },
                {
                    id: c1,
                    groups: [
                        { nodes: [n1_1, n1_2], parentId: n1 },
                        { nodes: [n2_1, n2_2], parentId: n2 },
                        { nodes: [n3_1, n3_2], parentId: n3 },
                    ],
                },
            ],

            content: {
                [n1]: { content: '1' },
                [n1_1]: { content: '1.1' },
                [n1_2]: { content: '1.2' },
                [n2]: { content: '2' },
                [n2_1]: { content: '2.1' },
                [n2_2]: { content: '2.2' },
                [n3]: { content: '3' },
                [n3_1]: { content: '3.1' },
                [n3_2]: { content: '3.2' },
            },
        };
        const output = {
            columns: [
                { id: c0, groups: [{ nodes: [n1, n3], parentId: 'rDRO' }] },
                {
                    id: c1,
                    groups: [
                        { nodes: [n1_1, n1_2], parentId: n1 },
                        { nodes: [n3_1, n3_2], parentId: n3 },
                    ],
                },
            ],

            content: {
                [n1]: { content: '1' },
                [n1_1]: { content: '1.1' },
                [n1_2]: { content: '1.2' },
                [n3]: { content: '3' },
                [n3_1]: { content: '3.1' },
                [n3_2]: { content: '3.2' },
            },
        };
        expect(deleteNode(input, n2)).toEqual(n1);
        expect(input).toEqual(output);
    });
    it('1|* 2|* >3|*', () => {
        const n1 = 'nP_R';
        const n1_1 = 'n6Zv';
        const n1_2 = 'n5_W';
        const n2 = 'nlQ9';
        const n2_1 = 'nngo';
        const n2_2 = 'npKD';
        const n3 = 'nnlZ';
        const n3_1 = 'nLSJ';
        const n3_2 = 'nzZn';
        const c0 = 'c9VT';
        const c1 = 'cyrh';
        const input = {
            columns: [
                { id: c0, groups: [{ nodes: [n1, n2, n3], parentId: 'rDRO' }] },
                {
                    id: c1,
                    groups: [
                        { nodes: [n1_1, n1_2], parentId: n1 },
                        { nodes: [n2_1, n2_2], parentId: n2 },
                        { nodes: [n3_1, n3_2], parentId: n3 },
                    ],
                },
            ],

            content: {
                [n1]: { content: '1' },
                [n1_1]: { content: '1.1' },
                [n1_2]: { content: '1.2' },
                [n2]: { content: '2' },
                [n2_1]: { content: '2.1' },
                [n2_2]: { content: '2.2' },
                [n3]: { content: '3' },
                [n3_1]: { content: '3.1' },
                [n3_2]: { content: '3.2' },
            },
        };
        const output = {
            columns: [
                { id: c0, groups: [{ nodes: [n1, n2], parentId: 'rDRO' }] },
                {
                    id: c1,
                    groups: [
                        { nodes: [n1_1, n1_2], parentId: n1 },
                        { nodes: [n2_1, n2_2], parentId: n2 },
                    ],
                },
            ],

            content: {
                [n1]: { content: '1' },
                [n1_1]: { content: '1.1' },
                [n1_2]: { content: '1.2' },
                [n2]: { content: '2' },
                [n2_1]: { content: '2.1' },
                [n2_2]: { content: '2.2' },
            },
        };
        expect(deleteNode(input, n3)).toEqual(n2);
        expect(input).toEqual(output);
    });
    it('>*|1|* *|2|* *|3|*', () => {
        const c0 = 'cK_J';
        const c1 = 'cnTn';
        const c2 = 'czcJ';
        const root = 'r9Jc';
        const n1 = 'nnUL';
        const n1_1 = 'ntg5';
        const n1_2 = 'nrRn';
        const n2 = 'nlGO';
        const n2_1 = 'nnBS';
        const n2_2 = 'nm53';
        const n3 = 'ndbX';
        const n3_1 = 'n92e';
        const n3_2 = 'nPls';
        const n1_1_1 = 'nZ8f';
        const n1_1_2 = 'n4ak';
        const n1_2_1 = 'n_aJ';
        const n1_2_2 = 'ndCx';
        const n2_1_1 = 'nQEv';
        const n2_1_2 = 'n1bY';
        const n2_2_1 = 'nGSg';
        const n2_2_2 = 'nZAS';
        const n3_1_1 = 'nppN';
        const n3_1_2 = 'nDYT';
        const n3_2_1 = 'nfuk';
        const n3_2_2 = 'nC6y';
        const input = {
            columns: [
                { id: c0, groups: [{ nodes: [n1, n2, n3], parentId: root }] },
                {
                    id: c1,
                    groups: [
                        { nodes: [n1_1, n1_2], parentId: n1 },
                        { nodes: [n2_1, n2_2], parentId: n2 },
                        { nodes: [n3_1, n3_2], parentId: n3 },
                    ],
                },
                {
                    id: c2,
                    groups: [
                        { nodes: [n1_1_1, n1_1_2], parentId: n1_1 },
                        { nodes: [n1_2_1, n1_2_2], parentId: n1_2 },
                        { nodes: [n2_1_1, n2_1_2], parentId: n2_1 },
                        { nodes: [n2_2_1, n2_2_2], parentId: n2_2 },
                        { nodes: [n3_1_1, n3_1_2], parentId: n3_1 },
                        { nodes: [n3_2_1, n3_2_2], parentId: n3_2 },
                    ],
                },
            ],

            content: {
                [n1]: { content: '1' },
                [n1_1]: { content: '1.1' },
                [n1_2]: { content: '1.2' },
                [n2]: { content: '2' },
                [n2_1]: { content: '2.1' },
                [n2_2]: { content: '2.2' },
                [n3]: { content: '3' },
                [n3_1]: { content: '3.1' },
                [n3_2]: { content: '3.2' },
                [n1_1_1]: { content: '1.1.1' },
                [n1_1_2]: { content: '1.1.2' },
                [n1_2_1]: { content: '1.2.1' },
                [n1_2_2]: { content: '1.2.2' },
                [n2_1_1]: { content: '2.1.1' },
                [n2_1_2]: { content: '2.1.2' },
                [n2_2_1]: { content: '2.2.1' },
                [n2_2_2]: { content: '2.2.2' },
                [n3_1_1]: { content: '3.1.1' },
                [n3_1_2]: { content: '3.1.2' },
                [n3_2_1]: { content: '3.2.1' },
                [n3_2_2]: { content: '3.2.2' },
            },
        };
        const output = {
            columns: [
                { id: c0, groups: [{ nodes: [n1, n2, n3], parentId: root }] },
                {
                    id: c1,
                    groups: [
                        { nodes: [n1_1], parentId: n1 },
                        { nodes: [n2_1, n2_2], parentId: n2 },
                        { nodes: [n3_1, n3_2], parentId: n3 },
                    ],
                },
                {
                    id: c2,
                    groups: [
                        { nodes: [n1_1_1, n1_1_2], parentId: n1_1 },
                        { nodes: [n2_1_1, n2_1_2], parentId: n2_1 },
                        { nodes: [n2_2_1, n2_2_2], parentId: n2_2 },
                        { nodes: [n3_1_1, n3_1_2], parentId: n3_1 },
                        { nodes: [n3_2_1, n3_2_2], parentId: n3_2 },
                    ],
                },
            ],

            content: {
                [n1]: { content: '1' },
                [n1_1]: { content: '1.1' },
                [n2]: { content: '2' },
                [n2_1]: { content: '2.1' },
                [n2_2]: { content: '2.2' },
                [n3]: { content: '3' },
                [n3_1]: { content: '3.1' },
                [n3_2]: { content: '3.2' },
                [n1_1_1]: { content: '1.1.1' },
                [n1_1_2]: { content: '1.1.2' },
                [n2_1_1]: { content: '2.1.1' },
                [n2_1_2]: { content: '2.1.2' },
                [n2_2_1]: { content: '2.2.1' },
                [n2_2_2]: { content: '2.2.2' },
                [n3_1_1]: { content: '3.1.1' },
                [n3_1_2]: { content: '3.1.2' },
                [n3_2_1]: { content: '3.2.1' },
                [n3_2_2]: { content: '3.2.2' },
            },
        };
        expect(deleteNode(input, n1_2)).toEqual(n1_1);
        expect(input).toEqual(output);
    });
    it('*|1|* >*|2|* *|3|*', () => {
        const c0 = 'cK_J';
        const c1 = 'cnTn';
        const c2 = 'czcJ';
        const root = 'r9Jc';
        const n1 = 'nnUL';
        const n1_1 = 'ntg5';
        const n1_2 = 'nrRn';
        const n2 = 'nlGO';
        const n2_1 = 'nnBS';
        const n2_2 = 'nm53';
        const n3 = 'ndbX';
        const n3_1 = 'n92e';
        const n3_2 = 'nPls';
        const n1_1_1 = 'nZ8f';
        const n1_1_2 = 'n4ak';
        const n1_2_1 = 'n_aJ';
        const n1_2_2 = 'ndCx';
        const n2_1_1 = 'nQEv';
        const n2_1_2 = 'n1bY';
        const n2_2_1 = 'nGSg';
        const n2_2_2 = 'nZAS';
        const n3_1_1 = 'nppN';
        const n3_1_2 = 'nDYT';
        const n3_2_1 = 'nfuk';
        const n3_2_2 = 'nC6y';
        const input = {
            columns: [
                { id: c0, groups: [{ nodes: [n1, n2, n3], parentId: root }] },
                {
                    id: c1,
                    groups: [
                        { nodes: [n1_1, n1_2], parentId: n1 },
                        { nodes: [n2_1, n2_2], parentId: n2 },
                        { nodes: [n3_1, n3_2], parentId: n3 },
                    ],
                },
                {
                    id: c2,
                    groups: [
                        { nodes: [n1_1_1, n1_1_2], parentId: n1_1 },
                        { nodes: [n1_2_1, n1_2_2], parentId: n1_2 },
                        { nodes: [n2_1_1, n2_1_2], parentId: n2_1 },
                        { nodes: [n2_2_1, n2_2_2], parentId: n2_2 },
                        { nodes: [n3_1_1, n3_1_2], parentId: n3_1 },
                        { nodes: [n3_2_1, n3_2_2], parentId: n3_2 },
                    ],
                },
            ],

            content: {
                [n1]: { content: '1' },
                [n1_1]: { content: '1.1' },
                [n1_2]: { content: '1.2' },
                [n2]: { content: '2' },
                [n2_1]: { content: '2.1' },
                [n2_2]: { content: '2.2' },
                [n3]: { content: '3' },
                [n3_1]: { content: '3.1' },
                [n3_2]: { content: '3.2' },
                [n1_1_1]: { content: '1.1.1' },
                [n1_1_2]: { content: '1.1.2' },
                [n1_2_1]: { content: '1.2.1' },
                [n1_2_2]: { content: '1.2.2' },
                [n2_1_1]: { content: '2.1.1' },
                [n2_1_2]: { content: '2.1.2' },
                [n2_2_1]: { content: '2.2.1' },
                [n2_2_2]: { content: '2.2.2' },
                [n3_1_1]: { content: '3.1.1' },
                [n3_1_2]: { content: '3.1.2' },
                [n3_2_1]: { content: '3.2.1' },
                [n3_2_2]: { content: '3.2.2' },
            },
        };
        const output = {
            columns: [
                { id: c0, groups: [{ nodes: [n1, n2, n3], parentId: root }] },
                {
                    id: c1,
                    groups: [
                        { nodes: [n1_1, n1_2], parentId: n1 },
                        { nodes: [n2_2], parentId: n2 },
                        { nodes: [n3_1, n3_2], parentId: n3 },
                    ],
                },
                {
                    id: c2,
                    groups: [
                        { nodes: [n1_1_1, n1_1_2], parentId: n1_1 },
                        { nodes: [n1_2_1, n1_2_2], parentId: n1_2 },
                        { nodes: [n2_2_1, n2_2_2], parentId: n2_2 },
                        { nodes: [n3_1_1, n3_1_2], parentId: n3_1 },
                        { nodes: [n3_2_1, n3_2_2], parentId: n3_2 },
                    ],
                },
            ],

            content: {
                [n1]: { content: '1' },
                [n1_1]: { content: '1.1' },
                [n1_2]: { content: '1.2' },
                [n2]: { content: '2' },
                [n2_2]: { content: '2.2' },
                [n3]: { content: '3' },
                [n3_1]: { content: '3.1' },
                [n3_2]: { content: '3.2' },
                [n1_1_1]: { content: '1.1.1' },
                [n1_1_2]: { content: '1.1.2' },
                [n1_2_1]: { content: '1.2.1' },
                [n1_2_2]: { content: '1.2.2' },
                [n2_2_1]: { content: '2.2.1' },
                [n2_2_2]: { content: '2.2.2' },
                [n3_1_1]: { content: '3.1.1' },
                [n3_1_2]: { content: '3.1.2' },
                [n3_2_1]: { content: '3.2.1' },
                [n3_2_2]: { content: '3.2.2' },
            },
        };
        expect(deleteNode(input, n2_1)).toEqual(n2_2);
        expect(input).toEqual(output);
    });
    it('*|1|* *|2|* >*|3|*', () => {
        const c0 = 'cK_J';
        const c1 = 'cnTn';
        const c2 = 'czcJ';
        const root = 'r9Jc';
        const n1 = 'nnUL';
        const n1_1 = 'ntg5';
        const n1_2 = 'nrRn';
        const n2 = 'nlGO';
        const n2_1 = 'nnBS';
        const n2_2 = 'nm53';
        const n3 = 'ndbX';
        const n3_1 = 'n92e';
        const n3_2 = 'nPls';
        const n1_1_1 = 'nZ8f';
        const n1_1_2 = 'n4ak';
        const n1_2_1 = 'n_aJ';
        const n1_2_2 = 'ndCx';
        const n2_1_1 = 'nQEv';
        const n2_1_2 = 'n1bY';
        const n2_2_1 = 'nGSg';
        const n2_2_2 = 'nZAS';
        const n3_1_1 = 'nppN';
        const n3_1_2 = 'nDYT';
        const n3_2_1 = 'nfuk';
        const n3_2_2 = 'nC6y';
        const input = {
            columns: [
                { id: c0, groups: [{ nodes: [n1, n2, n3], parentId: root }] },
                {
                    id: c1,
                    groups: [
                        { nodes: [n1_1, n1_2], parentId: n1 },
                        { nodes: [n2_1, n2_2], parentId: n2 },
                        { nodes: [n3_1, n3_2], parentId: n3 },
                    ],
                },
                {
                    id: c2,
                    groups: [
                        { nodes: [n1_1_1, n1_1_2], parentId: n1_1 },
                        { nodes: [n1_2_1, n1_2_2], parentId: n1_2 },
                        { nodes: [n2_1_1, n2_1_2], parentId: n2_1 },
                        { nodes: [n2_2_1, n2_2_2], parentId: n2_2 },
                        { nodes: [n3_1_1, n3_1_2], parentId: n3_1 },
                        { nodes: [n3_2_1, n3_2_2], parentId: n3_2 },
                    ],
                },
            ],

            content: {
                [n1]: { content: '1' },
                [n1_1]: { content: '1.1' },
                [n1_2]: { content: '1.2' },
                [n2]: { content: '2' },
                [n2_1]: { content: '2.1' },
                [n2_2]: { content: '2.2' },
                [n3]: { content: '3' },
                [n3_1]: { content: '3.1' },
                [n3_2]: { content: '3.2' },
                [n1_1_1]: { content: '1.1.1' },
                [n1_1_2]: { content: '1.1.2' },
                [n1_2_1]: { content: '1.2.1' },
                [n1_2_2]: { content: '1.2.2' },
                [n2_1_1]: { content: '2.1.1' },
                [n2_1_2]: { content: '2.1.2' },
                [n2_2_1]: { content: '2.2.1' },
                [n2_2_2]: { content: '2.2.2' },
                [n3_1_1]: { content: '3.1.1' },
                [n3_1_2]: { content: '3.1.2' },
                [n3_2_1]: { content: '3.2.1' },
                [n3_2_2]: { content: '3.2.2' },
            },
        };
        const output = {
            columns: [
                { id: c0, groups: [{ nodes: [n1, n2, n3], parentId: root }] },
                {
                    id: c1,
                    groups: [
                        { nodes: [n1_1, n1_2], parentId: n1 },
                        { nodes: [n2_1, n2_2], parentId: n2 },
                        { nodes: [n3_2], parentId: n3 },
                    ],
                },
                {
                    id: c2,
                    groups: [
                        { nodes: [n1_1_1, n1_1_2], parentId: n1_1 },
                        { nodes: [n1_2_1, n1_2_2], parentId: n1_2 },
                        { nodes: [n2_1_1, n2_1_2], parentId: n2_1 },
                        { nodes: [n2_2_1, n2_2_2], parentId: n2_2 },
                        { nodes: [n3_2_1, n3_2_2], parentId: n3_2 },
                    ],
                },
            ],

            content: {
                [n1]: { content: '1' },
                [n1_1]: { content: '1.1' },
                [n1_2]: { content: '1.2' },
                [n2]: { content: '2' },
                [n2_1]: { content: '2.1' },
                [n2_2]: { content: '2.2' },
                [n3]: { content: '3' },
                [n3_2]: { content: '3.2' },
                [n1_1_1]: { content: '1.1.1' },
                [n1_1_2]: { content: '1.1.2' },
                [n1_2_1]: { content: '1.2.1' },
                [n1_2_2]: { content: '1.2.2' },
                [n2_1_1]: { content: '2.1.1' },
                [n2_1_2]: { content: '2.1.2' },
                [n2_2_1]: { content: '2.2.1' },
                [n2_2_2]: { content: '2.2.2' },
                [n3_2_1]: { content: '3.2.1' },
                [n3_2_2]: { content: '3.2.2' },
            },
        };
        expect(deleteNode(input, n3_1)).toEqual(n3_2);
        expect(input).toEqual(output);
    });
    it('*|*|1 *|*|2 >*|*|3', () => {
        const c0 = 'cK_J';
        const c1 = 'cnTn';
        const c2 = 'czcJ';
        const root = 'r9Jc';
        const n1 = 'nnUL';
        const n1_1 = 'ntg5';
        const n1_2 = 'nrRn';
        const n2 = 'nlGO';
        const n2_1 = 'nnBS';
        const n2_2 = 'nm53';
        const n3 = 'ndbX';
        const n3_1 = 'n92e';
        const n3_2 = 'nPls';
        const n1_1_1 = 'nZ8f';
        const n1_1_2 = 'n4ak';
        const n1_2_1 = 'n_aJ';
        const n1_2_2 = 'ndCx';
        const n2_1_1 = 'nQEv';
        const n2_1_2 = 'n1bY';
        const n2_2_1 = 'nGSg';
        const n2_2_2 = 'nZAS';
        const n3_1_1 = 'nppN';
        const n3_1_2 = 'nDYT';
        const n3_2_1 = 'nfuk';
        const n3_2_2 = 'nC6y';
        const input = {
            columns: [
                { id: c0, groups: [{ nodes: [n1, n2, n3], parentId: root }] },
                {
                    id: c1,
                    groups: [
                        { nodes: [n1_1, n1_2], parentId: n1 },
                        { nodes: [n2_1, n2_2], parentId: n2 },
                        { nodes: [n3_1, n3_2], parentId: n3 },
                    ],
                },
                {
                    id: c2,
                    groups: [
                        { nodes: [n1_1_1, n1_1_2], parentId: n1_1 },
                        { nodes: [n1_2_1, n1_2_2], parentId: n1_2 },
                        { nodes: [n2_1_1, n2_1_2], parentId: n2_1 },
                        { nodes: [n2_2_1, n2_2_2], parentId: n2_2 },
                        { nodes: [n3_1_1, n3_1_2], parentId: n3_1 },
                        { nodes: [n3_2_1, n3_2_2], parentId: n3_2 },
                    ],
                },
            ],

            content: {
                [n1]: { content: '1' },
                [n1_1]: { content: '1.1' },
                [n1_2]: { content: '1.2' },
                [n2]: { content: '2' },
                [n2_1]: { content: '2.1' },
                [n2_2]: { content: '2.2' },
                [n3]: { content: '3' },
                [n3_1]: { content: '3.1' },
                [n3_2]: { content: '3.2' },
                [n1_1_1]: { content: '1.1.1' },
                [n1_1_2]: { content: '1.1.2' },
                [n1_2_1]: { content: '1.2.1' },
                [n1_2_2]: { content: '1.2.2' },
                [n2_1_1]: { content: '2.1.1' },
                [n2_1_2]: { content: '2.1.2' },
                [n2_2_1]: { content: '2.2.1' },
                [n2_2_2]: { content: '2.2.2' },
                [n3_1_1]: { content: '3.1.1' },
                [n3_1_2]: { content: '3.1.2' },
                [n3_2_1]: { content: '3.2.1' },
                [n3_2_2]: { content: '3.2.2' },
            },
        };
        const output = {
            columns: [
                { id: c0, groups: [{ nodes: [n1, n2, n3], parentId: root }] },
                {
                    id: c1,
                    groups: [
                        { nodes: [n1_1, n1_2], parentId: n1 },
                        { nodes: [n2_1, n2_2], parentId: n2 },
                        { nodes: [n3_1, n3_2], parentId: n3 },
                    ],
                },
                {
                    id: c2,
                    groups: [
                        { nodes: [n1_1_1, n1_1_2], parentId: n1_1 },
                        { nodes: [n1_2_1, n1_2_2], parentId: n1_2 },
                        { nodes: [n2_1_1, n2_1_2], parentId: n2_1 },
                        { nodes: [n2_2_1, n2_2_2], parentId: n2_2 },
                        { nodes: [n3_1_1, n3_1_2], parentId: n3_1 },
                        { nodes: [n3_2_2], parentId: n3_2 },
                    ],
                },
            ],

            content: {
                [n1]: { content: '1' },
                [n1_1]: { content: '1.1' },
                [n1_2]: { content: '1.2' },
                [n2]: { content: '2' },
                [n2_1]: { content: '2.1' },
                [n2_2]: { content: '2.2' },
                [n3]: { content: '3' },
                [n3_1]: { content: '3.1' },
                [n3_2]: { content: '3.2' },
                [n1_1_1]: { content: '1.1.1' },
                [n1_1_2]: { content: '1.1.2' },
                [n1_2_1]: { content: '1.2.1' },
                [n1_2_2]: { content: '1.2.2' },
                [n2_1_1]: { content: '2.1.1' },
                [n2_1_2]: { content: '2.1.2' },
                [n2_2_1]: { content: '2.2.1' },
                [n2_2_2]: { content: '2.2.2' },
                [n3_1_1]: { content: '3.1.1' },
                [n3_1_2]: { content: '3.1.2' },
                [n3_2_2]: { content: '3.2.2' },
            },
        };
        expect(deleteNode(input, n3_2_1)).toEqual(n3_2_2);
        expect(input).toEqual(output);
    });
    it('*|*|1 >*|*|2 *|*|3', () => {
        const c0 = 'cK_J';
        const c1 = 'cnTn';
        const c2 = 'czcJ';
        const root = 'r9Jc';
        const n1 = 'nnUL';
        const n1_1 = 'ntg5';
        const n1_2 = 'nrRn';
        const n2 = 'nlGO';
        const n2_1 = 'nnBS';
        const n2_2 = 'nm53';
        const n3 = 'ndbX';
        const n3_1 = 'n92e';
        const n3_2 = 'nPls';
        const n1_1_1 = 'nZ8f';
        const n1_1_2 = 'n4ak';
        const n1_2_1 = 'n_aJ';
        const n1_2_2 = 'ndCx';
        const n2_1_1 = 'nQEv';
        const n2_1_2 = 'n1bY';
        const n2_2_1 = 'nGSg';
        const n2_2_2 = 'nZAS';
        const n3_1_1 = 'nppN';
        const n3_1_2 = 'nDYT';
        const n3_2_1 = 'nfuk';
        const n3_2_2 = 'nC6y';
        const input = {
            columns: [
                { id: c0, groups: [{ nodes: [n1, n2, n3], parentId: root }] },
                {
                    id: c1,
                    groups: [
                        { nodes: [n1_1, n1_2], parentId: n1 },
                        { nodes: [n2_1, n2_2], parentId: n2 },
                        { nodes: [n3_1, n3_2], parentId: n3 },
                    ],
                },
                {
                    id: c2,
                    groups: [
                        { nodes: [n1_1_1, n1_1_2], parentId: n1_1 },
                        { nodes: [n1_2_1, n1_2_2], parentId: n1_2 },
                        { nodes: [n2_1_1, n2_1_2], parentId: n2_1 },
                        { nodes: [n2_2_1, n2_2_2], parentId: n2_2 },
                        { nodes: [n3_1_1, n3_1_2], parentId: n3_1 },
                        { nodes: [n3_2_1, n3_2_2], parentId: n3_2 },
                    ],
                },
            ],

            content: {
                [n1]: { content: '1' },
                [n1_1]: { content: '1.1' },
                [n1_2]: { content: '1.2' },
                [n2]: { content: '2' },
                [n2_1]: { content: '2.1' },
                [n2_2]: { content: '2.2' },
                [n3]: { content: '3' },
                [n3_1]: { content: '3.1' },
                [n3_2]: { content: '3.2' },
                [n1_1_1]: { content: '1.1.1' },
                [n1_1_2]: { content: '1.1.2' },
                [n1_2_1]: { content: '1.2.1' },
                [n1_2_2]: { content: '1.2.2' },
                [n2_1_1]: { content: '2.1.1' },
                [n2_1_2]: { content: '2.1.2' },
                [n2_2_1]: { content: '2.2.1' },
                [n2_2_2]: { content: '2.2.2' },
                [n3_1_1]: { content: '3.1.1' },
                [n3_1_2]: { content: '3.1.2' },
                [n3_2_1]: { content: '3.2.1' },
                [n3_2_2]: { content: '3.2.2' },
            },
        };
        const output = {
            columns: [
                { id: c0, groups: [{ nodes: [n1, n2, n3], parentId: root }] },
                {
                    id: c1,
                    groups: [
                        { nodes: [n1_1, n1_2], parentId: n1 },
                        { nodes: [n2_1, n2_2], parentId: n2 },
                        { nodes: [n3_1, n3_2], parentId: n3 },
                    ],
                },
                {
                    id: c2,
                    groups: [
                        { nodes: [n1_1_1, n1_1_2], parentId: n1_1 },
                        { nodes: [n1_2_1, n1_2_2], parentId: n1_2 },
                        { nodes: [n2_1_1], parentId: n2_1 },
                        { nodes: [n2_2_1, n2_2_2], parentId: n2_2 },
                        { nodes: [n3_1_1, n3_1_2], parentId: n3_1 },
                        { nodes: [n3_2_1, n3_2_2], parentId: n3_2 },
                    ],
                },
            ],

            content: {
                [n1]: { content: '1' },
                [n1_1]: { content: '1.1' },
                [n1_2]: { content: '1.2' },
                [n2]: { content: '2' },
                [n2_1]: { content: '2.1' },
                [n2_2]: { content: '2.2' },
                [n3]: { content: '3' },
                [n3_1]: { content: '3.1' },
                [n3_2]: { content: '3.2' },
                [n1_1_1]: { content: '1.1.1' },
                [n1_1_2]: { content: '1.1.2' },
                [n1_2_1]: { content: '1.2.1' },
                [n1_2_2]: { content: '1.2.2' },
                [n2_1_1]: { content: '2.1.1' },
                [n2_2_1]: { content: '2.2.1' },
                [n2_2_2]: { content: '2.2.2' },
                [n3_1_1]: { content: '3.1.1' },
                [n3_1_2]: { content: '3.1.2' },
                [n3_2_1]: { content: '3.2.1' },
                [n3_2_2]: { content: '3.2.2' },
            },
        };
        expect(deleteNode(input, n2_1_2)).toEqual(n2_1_1);
        expect(input).toEqual(output);
    });
    it('1|*|*|* 2|*|*|* >3|*|*|*', () => {
        const c0 = 'cK_J';
        const c1 = 'cnTn';
        const c2 = 'czcJ';
        const c3 = 'cQZE';
        const root = 'r9Jc';
        const n1 = 'nnUL';
        const n1_1 = 'ntg5';
        const n1_2 = 'nrRn';
        const n2 = 'nlGO';
        const n2_1 = 'nnBS';
        const n2_2 = 'nm53';
        const n3 = 'ndbX';
        const n3_1 = 'n92e';
        const n3_2 = 'nPls';
        const n1_1_1 = 'nZ8f';
        const n1_1_2 = 'n4ak';
        const n1_2_1 = 'n_aJ';
        const n1_2_2 = 'ndCx';
        const n2_1_1 = 'nQEv';
        const n2_2_1 = 'nGSg';
        const n2_2_2 = 'nZAS';
        const n3_1_1 = 'nppN';
        const n3_1_2 = 'nDYT';
        const n3_2_1 = 'nfuk';
        const n3_2_2 = 'nC6y';
        const n1_1_1_1 = 'nrD5';
        const n1_1_1_2 = 'nO_l';
        const n1_1_2_1 = 'nI5n';
        const n1_1_2_2 = 'nzW6';
        const n1_2_1_1 = 'n3Mf';
        const n1_2_1_2 = 'n4Zz';
        const n1_2_2_1 = 'nX-H';
        const n1_2_2_2 = 'nYGC';
        const n2_1_1_1 = 'nv8D';
        const n2_1_1_2 = 'n53v';
        const n2_2_1_1 = 'nry4';
        const n2_2_1_2 = 'n22L';
        const n2_2_2_1 = 'nh4v';
        const n2_2_2_2 = 'nvkt';
        const n3_1_1_1 = 'niQ1';
        const n3_1_1_2 = 'nPYA';
        const n3_1_2_1 = 'nenm';
        const n3_1_2_2 = 'n7s1';
        const n3_2_1_1 = 'nRoe';
        const n3_2_1_2 = 'nryg';
        const n3_2_2_1 = 'nQBC';
        const n3_2_2_2 = 'nrlC';
        const input = {
            columns: [
                { id: c0, groups: [{ nodes: [n1, n2, n3], parentId: root }] },
                {
                    id: c1,
                    groups: [
                        { nodes: [n1_1, n1_2], parentId: n1 },
                        { nodes: [n2_1, n2_2], parentId: n2 },
                        { nodes: [n3_1, n3_2], parentId: n3 },
                    ],
                },
                {
                    id: c2,
                    groups: [
                        { nodes: [n1_1_1, n1_1_2], parentId: n1_1 },
                        { nodes: [n1_2_1, n1_2_2], parentId: n1_2 },
                        { nodes: [n2_1_1], parentId: n2_1 },
                        { nodes: [n2_2_1, n2_2_2], parentId: n2_2 },
                        { nodes: [n3_1_1, n3_1_2], parentId: n3_1 },
                        { nodes: [n3_2_1, n3_2_2], parentId: n3_2 },
                    ],
                },
                {
                    id: c3,
                    groups: [
                        { nodes: [n1_1_1_1, n1_1_1_2], parentId: n1_1_1 },
                        { nodes: [n1_1_2_1, n1_1_2_2], parentId: n1_1_2 },
                        { nodes: [n1_2_1_1, n1_2_1_2], parentId: n1_2_1 },
                        { nodes: [n1_2_2_1, n1_2_2_2], parentId: n1_2_2 },
                        { nodes: [n2_1_1_1, n2_1_1_2], parentId: n2_1_1 },
                        { nodes: [n2_2_1_1, n2_2_1_2], parentId: n2_2_1 },
                        { nodes: [n2_2_2_1, n2_2_2_2], parentId: n2_2_2 },
                        { nodes: [n3_1_1_1, n3_1_1_2], parentId: n3_1_1 },
                        { nodes: [n3_1_2_1, n3_1_2_2], parentId: n3_1_2 },
                        { nodes: [n3_2_1_1, n3_2_1_2], parentId: n3_2_1 },
                        { nodes: [n3_2_2_1, n3_2_2_2], parentId: n3_2_2 },
                    ],
                },
            ],
            content: {
                [n1]: { content: '1' },
                [n1_1]: { content: '1.1' },
                [n1_2]: { content: '1.2' },
                [n2]: { content: '2' },
                [n2_1]: { content: '2.1' },
                [n2_2]: { content: '2.2' },
                [n3]: { content: '3' },
                [n3_1]: { content: '3.1' },
                [n3_2]: { content: '3.2' },
                [n1_1_1]: { content: '1.1.1' },
                [n1_1_2]: { content: '1.1.2' },
                [n1_2_1]: { content: '1.2.1' },
                [n1_2_2]: { content: '1.2.2' },
                [n2_1_1]: { content: '2.1.1' },
                [n2_2_1]: { content: '2.2.1' },
                [n2_2_2]: { content: '2.2.2' },
                [n3_1_1]: { content: '3.1.1' },
                [n3_1_2]: { content: '3.1.2' },
                [n3_2_1]: { content: '3.2.1' },
                [n3_2_2]: { content: '3.2.2' },
                [n1_1_1_1]: { content: '1.1.1.1' },
                [n1_1_1_2]: { content: '1.1.1.2' },
                [n1_1_2_1]: { content: '1.1.2.1' },
                [n1_1_2_2]: { content: '1.1.2.2' },
                [n1_2_1_1]: { content: '1.2.1.1' },
                [n1_2_1_2]: { content: '1.2.1.2' },
                [n1_2_2_1]: { content: '1.2.2.1' },
                [n1_2_2_2]: { content: '1.2.2.2' },
                [n2_1_1_1]: { content: '2.1.1.1' },
                [n2_1_1_2]: { content: '2.1.1.2' },
                [n2_2_1_1]: { content: '2.2.1.1' },
                [n2_2_1_2]: { content: '2.2.1.2' },
                [n2_2_2_1]: { content: '2.2.2.1' },
                [n2_2_2_2]: { content: '2.2.2.2' },
                [n3_1_1_1]: { content: '3.1.1.1' },
                [n3_1_1_2]: { content: '3.1.1.2' },
                [n3_1_2_1]: { content: '3.1.2.1' },
                [n3_1_2_2]: { content: '3.1.2.2' },
                [n3_2_1_1]: { content: '3.2.1.1' },
                [n3_2_1_2]: { content: '3.2.1.2' },
                [n3_2_2_1]: { content: '3.2.2.1' },
                [n3_2_2_2]: { content: '3.2.2.2' },
            },
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
                        { nodes: [n2_1_1], parentId: n2_1 },
                        { nodes: [n2_2_1, n2_2_2], parentId: n2_2 },
                    ],
                },
                {
                    id: c3,
                    groups: [
                        { nodes: [n1_1_1_1, n1_1_1_2], parentId: n1_1_1 },
                        { nodes: [n1_1_2_1, n1_1_2_2], parentId: n1_1_2 },
                        { nodes: [n1_2_1_1, n1_2_1_2], parentId: n1_2_1 },
                        { nodes: [n1_2_2_1, n1_2_2_2], parentId: n1_2_2 },
                        { nodes: [n2_1_1_1, n2_1_1_2], parentId: n2_1_1 },
                        { nodes: [n2_2_1_1, n2_2_1_2], parentId: n2_2_1 },
                        { nodes: [n2_2_2_1, n2_2_2_2], parentId: n2_2_2 },
                    ],
                },
            ],
            content: {
                [n1]: { content: '1' },
                [n1_1]: { content: '1.1' },
                [n1_2]: { content: '1.2' },
                [n2]: { content: '2' },
                [n2_1]: { content: '2.1' },
                [n2_2]: { content: '2.2' },
                [n1_1_1]: { content: '1.1.1' },
                [n1_1_2]: { content: '1.1.2' },
                [n1_2_1]: { content: '1.2.1' },
                [n1_2_2]: { content: '1.2.2' },
                [n2_1_1]: { content: '2.1.1' },
                [n2_2_1]: { content: '2.2.1' },
                [n2_2_2]: { content: '2.2.2' },
                [n1_1_1_1]: { content: '1.1.1.1' },
                [n1_1_1_2]: { content: '1.1.1.2' },
                [n1_1_2_1]: { content: '1.1.2.1' },
                [n1_1_2_2]: { content: '1.1.2.2' },
                [n1_2_1_1]: { content: '1.2.1.1' },
                [n1_2_1_2]: { content: '1.2.1.2' },
                [n1_2_2_1]: { content: '1.2.2.1' },
                [n1_2_2_2]: { content: '1.2.2.2' },
                [n2_1_1_1]: { content: '2.1.1.1' },
                [n2_1_1_2]: { content: '2.1.1.2' },
                [n2_2_1_1]: { content: '2.2.1.1' },
                [n2_2_1_2]: { content: '2.2.1.2' },
                [n2_2_2_1]: { content: '2.2.2.1' },
                [n2_2_2_2]: { content: '2.2.2.2' },
            },
        };
        expect(deleteNode(input, n3)).toEqual(n2);
        expect(input).toEqual(output);
    });
    it('1|*|*|* >2|*|*|* 3|*|*|*', () => {
        const c0 = 'cucq';
        const c1 = 'cIGA';
        const c2 = 'ciKH';
        const c3 = 'c8zp';
        const root = 'rE7S';
        const n1 = 'nudG';
        const n1_1 = 'nye8';
        const n1_1_1 = 'nF3r';
        const n1_1_1_1 = 'nekl';
        const n1_1_1_2 = 'nxW2';
        const n1_1_2 = 'nu7-';
        const n1_1_2_1 = 'n7Xf';
        const n1_1_2_2 = 'nRAj';
        const n1_2 = 'nt_7';
        const n1_2_1 = 'n7-H';
        const n1_2_1_1 = 'ncOF';
        const n1_2_1_2 = 'nBKw';
        const n1_2_2 = 'n96V';
        const n1_2_2_1 = 'n2Mm';
        const n1_2_2_2 = 'nT_k';
        const n2 = 'n41B';
        const n2_1 = 'njFU';
        const n2_1_1 = 'nBPD';
        const n2_1_1_1 = 'nfAO';
        const n2_1_1_2 = 'ns_U';
        const n2_2 = 'n3r2';
        const n2_2_1 = 'nIhA';
        const n2_2_1_1 = 'n5et';
        const n2_2_1_2 = 'nOL-';
        const n2_2_2 = 'nuZ7';
        const n2_2_2_1 = 'nypw';
        const n2_2_2_2 = 'nIVy';
        const n3 = 'nxi_';
        const n3_1 = 'nSh2';
        const n3_1_1 = 'nLTu';
        const n3_1_1_1 = 'naYL';
        const n3_1_1_2 = 'n108';
        const n3_1_2 = 'ndJK';
        const n3_1_2_1 = 'n7MA';
        const n3_1_2_2 = 'nzTS';
        const n3_2 = 'nYln';
        const n3_2_1 = 'n05b';
        const n3_2_1_1 = 'nuyi';
        const n3_2_1_2 = 'nBdO';
        const n3_2_2 = 'nSyh';
        const n3_2_2_1 = 'ndYd';
        const n3_2_2_2 = 'n621';
        const input = {
            columns: [
                { id: c0, groups: [{ nodes: [n1, n2, n3], parentId: root }] },
                {
                    id: c1,
                    groups: [
                        { nodes: [n1_1, n1_2], parentId: n1 },
                        { nodes: [n2_1, n2_2], parentId: n2 },
                        { nodes: [n3_1, n3_2], parentId: n3 },
                    ],
                },
                {
                    id: c2,
                    groups: [
                        { nodes: [n1_1_1, n1_1_2], parentId: n1_1 },
                        { nodes: [n1_2_1, n1_2_2], parentId: n1_2 },
                        { nodes: [n2_1_1], parentId: n2_1 },
                        { nodes: [n2_2_1, n2_2_2], parentId: n2_2 },
                        { nodes: [n3_1_1, n3_1_2], parentId: n3_1 },
                        { nodes: [n3_2_1, n3_2_2], parentId: n3_2 },
                    ],
                },
                {
                    id: c3,
                    groups: [
                        { nodes: [n1_1_1_1, n1_1_1_2], parentId: n1_1_1 },
                        { nodes: [n1_1_2_1, n1_1_2_2], parentId: n1_1_2 },
                        { nodes: [n1_2_1_1, n1_2_1_2], parentId: n1_2_1 },
                        { nodes: [n1_2_2_1, n1_2_2_2], parentId: n1_2_2 },
                        { nodes: [n2_1_1_1, n2_1_1_2], parentId: n2_1_1 },
                        { nodes: [n2_2_1_1, n2_2_1_2], parentId: n2_2_1 },
                        { nodes: [n2_2_2_1, n2_2_2_2], parentId: n2_2_2 },
                        { nodes: [n3_1_1_1, n3_1_1_2], parentId: n3_1_1 },
                        { nodes: [n3_1_2_1, n3_1_2_2], parentId: n3_1_2 },
                        { nodes: [n3_2_1_1, n3_2_1_2], parentId: n3_2_1 },
                        { nodes: [n3_2_2_1, n3_2_2_2], parentId: n3_2_2 },
                    ],
                },
            ],
            content: {
                [n1]: { content: '1' },
                [n1_1]: { content: '1.1' },
                [n1_1_1]: { content: '1.1.1' },
                [n1_1_1_1]: { content: '1.1.1.1' },
                [n1_1_1_2]: { content: '1.1.1.2' },
                [n1_1_2]: { content: '1.1.2' },
                [n1_1_2_1]: { content: '1.1.2.1' },
                [n1_1_2_2]: { content: '1.1.2.2' },
                [n1_2]: { content: '1.2' },
                [n1_2_1]: { content: '1.2.1' },
                [n1_2_1_1]: { content: '1.2.1.1' },
                [n1_2_1_2]: { content: '1.2.1.2' },
                [n1_2_2]: { content: '1.2.2' },
                [n1_2_2_1]: { content: '1.2.2.1' },
                [n1_2_2_2]: { content: '1.2.2.2' },
                [n2]: { content: '2' },
                [n2_1]: { content: '2.1' },
                [n2_1_1]: { content: '2.1.1' },
                [n2_1_1_1]: { content: '2.1.1.1' },
                [n2_1_1_2]: { content: '2.1.1.2' },
                [n2_2]: { content: '2.2' },
                [n2_2_1]: { content: '2.2.1' },
                [n2_2_1_1]: { content: '2.2.1.1' },
                [n2_2_1_2]: { content: '2.2.1.2' },
                [n2_2_2]: { content: '2.2.2' },
                [n2_2_2_1]: { content: '2.2.2.1' },
                [n2_2_2_2]: { content: '2.2.2.2' },
                [n3]: { content: '3' },
                [n3_1]: { content: '3.1' },
                [n3_1_1]: { content: '3.1.1' },
                [n3_1_1_1]: { content: '3.1.1.1' },
                [n3_1_1_2]: { content: '3.1.1.2' },
                [n3_1_2]: { content: '3.1.2' },
                [n3_1_2_1]: { content: '3.1.2.1' },
                [n3_1_2_2]: { content: '3.1.2.2' },
                [n3_2]: { content: '3.2' },
                [n3_2_1]: { content: '3.2.1' },
                [n3_2_1_1]: { content: '3.2.1.1' },
                [n3_2_1_2]: { content: '3.2.1.2' },
                [n3_2_2]: { content: '3.2.2' },
                [n3_2_2_1]: { content: '3.2.2.1' },
                [n3_2_2_2]: { content: '3.2.2.2' },
            },
        };
        const output = {
            columns: [
                { id: c0, groups: [{ nodes: [n1, n3], parentId: root }] },
                {
                    id: c1,
                    groups: [
                        { nodes: [n1_1, n1_2], parentId: n1 },
                        { nodes: [n3_1, n3_2], parentId: n3 },
                    ],
                },
                {
                    id: c2,
                    groups: [
                        { nodes: [n1_1_1, n1_1_2], parentId: n1_1 },
                        { nodes: [n1_2_1, n1_2_2], parentId: n1_2 },
                        { nodes: [n3_1_1, n3_1_2], parentId: n3_1 },
                        { nodes: [n3_2_1, n3_2_2], parentId: n3_2 },
                    ],
                },
                {
                    id: c3,
                    groups: [
                        { nodes: [n1_1_1_1, n1_1_1_2], parentId: n1_1_1 },
                        { nodes: [n1_1_2_1, n1_1_2_2], parentId: n1_1_2 },
                        { nodes: [n1_2_1_1, n1_2_1_2], parentId: n1_2_1 },
                        { nodes: [n1_2_2_1, n1_2_2_2], parentId: n1_2_2 },
                        { nodes: [n3_1_1_1, n3_1_1_2], parentId: n3_1_1 },
                        { nodes: [n3_1_2_1, n3_1_2_2], parentId: n3_1_2 },
                        { nodes: [n3_2_1_1, n3_2_1_2], parentId: n3_2_1 },
                        { nodes: [n3_2_2_1, n3_2_2_2], parentId: n3_2_2 },
                    ],
                },
            ],
            content: {
                [n1]: { content: '1' },
                [n1_1]: { content: '1.1' },
                [n1_1_1]: { content: '1.1.1' },
                [n1_1_1_1]: { content: '1.1.1.1' },
                [n1_1_1_2]: { content: '1.1.1.2' },
                [n1_1_2]: { content: '1.1.2' },
                [n1_1_2_1]: { content: '1.1.2.1' },
                [n1_1_2_2]: { content: '1.1.2.2' },
                [n1_2]: { content: '1.2' },
                [n1_2_1]: { content: '1.2.1' },
                [n1_2_1_1]: { content: '1.2.1.1' },
                [n1_2_1_2]: { content: '1.2.1.2' },
                [n1_2_2]: { content: '1.2.2' },
                [n1_2_2_1]: { content: '1.2.2.1' },
                [n1_2_2_2]: { content: '1.2.2.2' },
                [n3]: { content: '3' },
                [n3_1]: { content: '3.1' },
                [n3_1_1]: { content: '3.1.1' },
                [n3_1_1_1]: { content: '3.1.1.1' },
                [n3_1_1_2]: { content: '3.1.1.2' },
                [n3_1_2]: { content: '3.1.2' },
                [n3_1_2_1]: { content: '3.1.2.1' },
                [n3_1_2_2]: { content: '3.1.2.2' },
                [n3_2]: { content: '3.2' },
                [n3_2_1]: { content: '3.2.1' },
                [n3_2_1_1]: { content: '3.2.1.1' },
                [n3_2_1_2]: { content: '3.2.1.2' },
                [n3_2_2]: { content: '3.2.2' },
                [n3_2_2_1]: { content: '3.2.2.1' },
                [n3_2_2_2]: { content: '3.2.2.2' },
            },
        };
        expect(deleteNode(input, n2)).toEqual(n1);
        expect(input).toEqual(output);
    });

    it('>*|1|*|* *|2|*|* *|3|*|*', () => {
        const c0 = 'cucq';
        const c1 = 'cIGA';
        const c2 = 'ciKH';
        const c3 = 'c8zp';
        const root = 'rE7S';
        const n1 = 'nudG';
        const n1_1 = 'nye8';
        const n1_1_1 = 'nF3r';
        const n1_1_1_1 = 'nekl';
        const n1_1_1_2 = 'nxW2';
        const n1_1_2 = 'nu7-';
        const n1_1_2_1 = 'n7Xf';
        const n1_1_2_2 = 'nRAj';
        const n1_2 = 'nt_7';
        const n1_2_1 = 'n7-H';
        const n1_2_1_1 = 'ncOF';
        const n1_2_1_2 = 'nBKw';
        const n1_2_2 = 'n96V';
        const n1_2_2_1 = 'n2Mm';
        const n1_2_2_2 = 'nT_k';
        const n2 = 'n41B';
        const n2_1 = 'njFU';
        const n2_1_1 = 'nBPD';
        const n2_1_1_1 = 'nfAO';
        const n2_1_1_2 = 'ns_U';
        const n2_2 = 'n3r2';
        const n2_2_1 = 'nIhA';
        const n2_2_1_1 = 'n5et';
        const n2_2_1_2 = 'nOL-';
        const n2_2_2 = 'nuZ7';
        const n2_2_2_1 = 'nypw';
        const n2_2_2_2 = 'nIVy';
        const n3 = 'nxi_';
        const n3_1 = 'nSh2';
        const n3_1_1 = 'nLTu';
        const n3_1_1_1 = 'naYL';
        const n3_1_1_2 = 'n108';
        const n3_1_2 = 'ndJK';
        const n3_1_2_1 = 'n7MA';
        const n3_1_2_2 = 'nzTS';
        const n3_2 = 'nYln';
        const n3_2_1 = 'n05b';
        const n3_2_1_1 = 'nuyi';
        const n3_2_1_2 = 'nBdO';
        const n3_2_2 = 'nSyh';
        const n3_2_2_1 = 'ndYd';
        const n3_2_2_2 = 'n621';
        const input = {
            columns: [
                { id: c0, groups: [{ nodes: [n1, n2, n3], parentId: root }] },
                {
                    id: c1,
                    groups: [
                        { nodes: [n1_1, n1_2], parentId: n1 },
                        { nodes: [n2_1, n2_2], parentId: n2 },
                        { nodes: [n3_1, n3_2], parentId: n3 },
                    ],
                },
                {
                    id: c2,
                    groups: [
                        { nodes: [n1_1_1, n1_1_2], parentId: n1_1 },
                        { nodes: [n1_2_1, n1_2_2], parentId: n1_2 },
                        { nodes: [n2_1_1], parentId: n2_1 },
                        { nodes: [n2_2_1, n2_2_2], parentId: n2_2 },
                        { nodes: [n3_1_1, n3_1_2], parentId: n3_1 },
                        { nodes: [n3_2_1, n3_2_2], parentId: n3_2 },
                    ],
                },
                {
                    id: c3,
                    groups: [
                        { nodes: [n1_1_1_1, n1_1_1_2], parentId: n1_1_1 },
                        { nodes: [n1_1_2_1, n1_1_2_2], parentId: n1_1_2 },
                        { nodes: [n1_2_1_1, n1_2_1_2], parentId: n1_2_1 },
                        { nodes: [n1_2_2_1, n1_2_2_2], parentId: n1_2_2 },
                        { nodes: [n2_1_1_1, n2_1_1_2], parentId: n2_1_1 },
                        { nodes: [n2_2_1_1, n2_2_1_2], parentId: n2_2_1 },
                        { nodes: [n2_2_2_1, n2_2_2_2], parentId: n2_2_2 },
                        { nodes: [n3_1_1_1, n3_1_1_2], parentId: n3_1_1 },
                        { nodes: [n3_1_2_1, n3_1_2_2], parentId: n3_1_2 },
                        { nodes: [n3_2_1_1, n3_2_1_2], parentId: n3_2_1 },
                        { nodes: [n3_2_2_1, n3_2_2_2], parentId: n3_2_2 },
                    ],
                },
            ],
            content: {
                [n1]: { content: '1' },
                [n1_1]: { content: '1.1' },
                [n1_1_1]: { content: '1.1.1' },
                [n1_1_1_1]: { content: '1.1.1.1' },
                [n1_1_1_2]: { content: '1.1.1.2' },
                [n1_1_2]: { content: '1.1.2' },
                [n1_1_2_1]: { content: '1.1.2.1' },
                [n1_1_2_2]: { content: '1.1.2.2' },
                [n1_2]: { content: '1.2' },
                [n1_2_1]: { content: '1.2.1' },
                [n1_2_1_1]: { content: '1.2.1.1' },
                [n1_2_1_2]: { content: '1.2.1.2' },
                [n1_2_2]: { content: '1.2.2' },
                [n1_2_2_1]: { content: '1.2.2.1' },
                [n1_2_2_2]: { content: '1.2.2.2' },
                [n2]: { content: '2' },
                [n2_1]: { content: '2.1' },
                [n2_1_1]: { content: '2.1.1' },
                [n2_1_1_1]: { content: '2.1.1.1' },
                [n2_1_1_2]: { content: '2.1.1.2' },
                [n2_2]: { content: '2.2' },
                [n2_2_1]: { content: '2.2.1' },
                [n2_2_1_1]: { content: '2.2.1.1' },
                [n2_2_1_2]: { content: '2.2.1.2' },
                [n2_2_2]: { content: '2.2.2' },
                [n2_2_2_1]: { content: '2.2.2.1' },
                [n2_2_2_2]: { content: '2.2.2.2' },
                [n3]: { content: '3' },
                [n3_1]: { content: '3.1' },
                [n3_1_1]: { content: '3.1.1' },
                [n3_1_1_1]: { content: '3.1.1.1' },
                [n3_1_1_2]: { content: '3.1.1.2' },
                [n3_1_2]: { content: '3.1.2' },
                [n3_1_2_1]: { content: '3.1.2.1' },
                [n3_1_2_2]: { content: '3.1.2.2' },
                [n3_2]: { content: '3.2' },
                [n3_2_1]: { content: '3.2.1' },
                [n3_2_1_1]: { content: '3.2.1.1' },
                [n3_2_1_2]: { content: '3.2.1.2' },
                [n3_2_2]: { content: '3.2.2' },
                [n3_2_2_1]: { content: '3.2.2.1' },
                [n3_2_2_2]: { content: '3.2.2.2' },
            },
        };
        const output = {
            columns: [
                { id: c0, groups: [{ nodes: [n1, n2, n3], parentId: root }] },
                {
                    id: c1,
                    groups: [
                        { nodes: [n1_1], parentId: n1 },
                        { nodes: [n2_1, n2_2], parentId: n2 },
                        { nodes: [n3_1, n3_2], parentId: n3 },
                    ],
                },
                {
                    id: c2,
                    groups: [
                        { nodes: [n1_1_1, n1_1_2], parentId: n1_1 },
                        { nodes: [n2_1_1], parentId: n2_1 },
                        { nodes: [n2_2_1, n2_2_2], parentId: n2_2 },
                        { nodes: [n3_1_1, n3_1_2], parentId: n3_1 },
                        { nodes: [n3_2_1, n3_2_2], parentId: n3_2 },
                    ],
                },
                {
                    id: c3,
                    groups: [
                        { nodes: [n1_1_1_1, n1_1_1_2], parentId: n1_1_1 },
                        { nodes: [n1_1_2_1, n1_1_2_2], parentId: n1_1_2 },
                        { nodes: [n2_1_1_1, n2_1_1_2], parentId: n2_1_1 },
                        { nodes: [n2_2_1_1, n2_2_1_2], parentId: n2_2_1 },
                        { nodes: [n2_2_2_1, n2_2_2_2], parentId: n2_2_2 },
                        { nodes: [n3_1_1_1, n3_1_1_2], parentId: n3_1_1 },
                        { nodes: [n3_1_2_1, n3_1_2_2], parentId: n3_1_2 },
                        { nodes: [n3_2_1_1, n3_2_1_2], parentId: n3_2_1 },
                        { nodes: [n3_2_2_1, n3_2_2_2], parentId: n3_2_2 },
                    ],
                },
            ],
            content: {
                [n1]: { content: '1' },
                [n1_1]: { content: '1.1' },
                [n1_1_1]: { content: '1.1.1' },
                [n1_1_1_1]: { content: '1.1.1.1' },
                [n1_1_1_2]: { content: '1.1.1.2' },
                [n1_1_2]: { content: '1.1.2' },
                [n1_1_2_1]: { content: '1.1.2.1' },
                [n1_1_2_2]: { content: '1.1.2.2' },
                [n2]: { content: '2' },
                [n2_1]: { content: '2.1' },
                [n2_1_1]: { content: '2.1.1' },
                [n2_1_1_1]: { content: '2.1.1.1' },
                [n2_1_1_2]: { content: '2.1.1.2' },
                [n2_2]: { content: '2.2' },
                [n2_2_1]: { content: '2.2.1' },
                [n2_2_1_1]: { content: '2.2.1.1' },
                [n2_2_1_2]: { content: '2.2.1.2' },
                [n2_2_2]: { content: '2.2.2' },
                [n2_2_2_1]: { content: '2.2.2.1' },
                [n2_2_2_2]: { content: '2.2.2.2' },
                [n3]: { content: '3' },
                [n3_1]: { content: '3.1' },
                [n3_1_1]: { content: '3.1.1' },
                [n3_1_1_1]: { content: '3.1.1.1' },
                [n3_1_1_2]: { content: '3.1.1.2' },
                [n3_1_2]: { content: '3.1.2' },
                [n3_1_2_1]: { content: '3.1.2.1' },
                [n3_1_2_2]: { content: '3.1.2.2' },
                [n3_2]: { content: '3.2' },
                [n3_2_1]: { content: '3.2.1' },
                [n3_2_1_1]: { content: '3.2.1.1' },
                [n3_2_1_2]: { content: '3.2.1.2' },
                [n3_2_2]: { content: '3.2.2' },
                [n3_2_2_1]: { content: '3.2.2.1' },
                [n3_2_2_2]: { content: '3.2.2.2' },
            },
        };
        expect(deleteNode(input, n1_2)).toEqual(n1_1);
        expect(input).toEqual(output);
    });
    it('*|1|*|* >*|2|*|* *|3|*|*', () => {
        const c0 = 'cucq';
        const c1 = 'cIGA';
        const c2 = 'ciKH';
        const c3 = 'c8zp';
        const root = 'rE7S';
        const n1 = 'nudG';
        const n1_1 = 'nye8';
        const n1_1_1 = 'nF3r';
        const n1_1_1_1 = 'nekl';
        const n1_1_1_2 = 'nxW2';
        const n1_1_2 = 'nu7-';
        const n1_1_2_1 = 'n7Xf';
        const n1_1_2_2 = 'nRAj';
        const n1_2 = 'nt_7';
        const n1_2_1 = 'n7-H';
        const n1_2_1_1 = 'ncOF';
        const n1_2_1_2 = 'nBKw';
        const n1_2_2 = 'n96V';
        const n1_2_2_1 = 'n2Mm';
        const n1_2_2_2 = 'nT_k';
        const n2 = 'n41B';
        const n2_1 = 'njFU';
        const n2_1_1 = 'nBPD';
        const n2_1_1_1 = 'nfAO';
        const n2_1_1_2 = 'ns_U';
        const n2_2 = 'n3r2';
        const n2_2_1 = 'nIhA';
        const n2_2_1_1 = 'n5et';
        const n2_2_1_2 = 'nOL-';
        const n2_2_2 = 'nuZ7';
        const n2_2_2_1 = 'nypw';
        const n2_2_2_2 = 'nIVy';
        const n3 = 'nxi_';
        const n3_1 = 'nSh2';
        const n3_1_1 = 'nLTu';
        const n3_1_1_1 = 'naYL';
        const n3_1_1_2 = 'n108';
        const n3_1_2 = 'ndJK';
        const n3_1_2_1 = 'n7MA';
        const n3_1_2_2 = 'nzTS';
        const n3_2 = 'nYln';
        const n3_2_1 = 'n05b';
        const n3_2_1_1 = 'nuyi';
        const n3_2_1_2 = 'nBdO';
        const n3_2_2 = 'nSyh';
        const n3_2_2_1 = 'ndYd';
        const n3_2_2_2 = 'n621';
        const input = {
            columns: [
                { id: c0, groups: [{ nodes: [n1, n2, n3], parentId: root }] },
                {
                    id: c1,
                    groups: [
                        { nodes: [n1_1, n1_2], parentId: n1 },
                        { nodes: [n2_1, n2_2], parentId: n2 },
                        { nodes: [n3_1, n3_2], parentId: n3 },
                    ],
                },
                {
                    id: c2,
                    groups: [
                        { nodes: [n1_1_1, n1_1_2], parentId: n1_1 },
                        { nodes: [n1_2_1, n1_2_2], parentId: n1_2 },
                        { nodes: [n2_1_1], parentId: n2_1 },
                        { nodes: [n2_2_1, n2_2_2], parentId: n2_2 },
                        { nodes: [n3_1_1, n3_1_2], parentId: n3_1 },
                        { nodes: [n3_2_1, n3_2_2], parentId: n3_2 },
                    ],
                },
                {
                    id: c3,
                    groups: [
                        { nodes: [n1_1_1_1, n1_1_1_2], parentId: n1_1_1 },
                        { nodes: [n1_1_2_1, n1_1_2_2], parentId: n1_1_2 },
                        { nodes: [n1_2_1_1, n1_2_1_2], parentId: n1_2_1 },
                        { nodes: [n1_2_2_1, n1_2_2_2], parentId: n1_2_2 },
                        { nodes: [n2_1_1_1, n2_1_1_2], parentId: n2_1_1 },
                        { nodes: [n2_2_1_1, n2_2_1_2], parentId: n2_2_1 },
                        { nodes: [n2_2_2_1, n2_2_2_2], parentId: n2_2_2 },
                        { nodes: [n3_1_1_1, n3_1_1_2], parentId: n3_1_1 },
                        { nodes: [n3_1_2_1, n3_1_2_2], parentId: n3_1_2 },
                        { nodes: [n3_2_1_1, n3_2_1_2], parentId: n3_2_1 },
                        { nodes: [n3_2_2_1, n3_2_2_2], parentId: n3_2_2 },
                    ],
                },
            ],
            content: {
                [n1]: { content: '1' },
                [n1_1]: { content: '1.1' },
                [n1_1_1]: { content: '1.1.1' },
                [n1_1_1_1]: { content: '1.1.1.1' },
                [n1_1_1_2]: { content: '1.1.1.2' },
                [n1_1_2]: { content: '1.1.2' },
                [n1_1_2_1]: { content: '1.1.2.1' },
                [n1_1_2_2]: { content: '1.1.2.2' },
                [n1_2]: { content: '1.2' },
                [n1_2_1]: { content: '1.2.1' },
                [n1_2_1_1]: { content: '1.2.1.1' },
                [n1_2_1_2]: { content: '1.2.1.2' },
                [n1_2_2]: { content: '1.2.2' },
                [n1_2_2_1]: { content: '1.2.2.1' },
                [n1_2_2_2]: { content: '1.2.2.2' },
                [n2]: { content: '2' },
                [n2_1]: { content: '2.1' },
                [n2_1_1]: { content: '2.1.1' },
                [n2_1_1_1]: { content: '2.1.1.1' },
                [n2_1_1_2]: { content: '2.1.1.2' },
                [n2_2]: { content: '2.2' },
                [n2_2_1]: { content: '2.2.1' },
                [n2_2_1_1]: { content: '2.2.1.1' },
                [n2_2_1_2]: { content: '2.2.1.2' },
                [n2_2_2]: { content: '2.2.2' },
                [n2_2_2_1]: { content: '2.2.2.1' },
                [n2_2_2_2]: { content: '2.2.2.2' },
                [n3]: { content: '3' },
                [n3_1]: { content: '3.1' },
                [n3_1_1]: { content: '3.1.1' },
                [n3_1_1_1]: { content: '3.1.1.1' },
                [n3_1_1_2]: { content: '3.1.1.2' },
                [n3_1_2]: { content: '3.1.2' },
                [n3_1_2_1]: { content: '3.1.2.1' },
                [n3_1_2_2]: { content: '3.1.2.2' },
                [n3_2]: { content: '3.2' },
                [n3_2_1]: { content: '3.2.1' },
                [n3_2_1_1]: { content: '3.2.1.1' },
                [n3_2_1_2]: { content: '3.2.1.2' },
                [n3_2_2]: { content: '3.2.2' },
                [n3_2_2_1]: { content: '3.2.2.1' },
                [n3_2_2_2]: { content: '3.2.2.2' },
            },
        };
        const output = {
            columns: [
                { id: c0, groups: [{ nodes: [n1, n2, n3], parentId: root }] },
                {
                    id: c1,
                    groups: [
                        { nodes: [n1_1, n1_2], parentId: n1 },
                        { nodes: [n2_2], parentId: n2 },
                        { nodes: [n3_1, n3_2], parentId: n3 },
                    ],
                },
                {
                    id: c2,
                    groups: [
                        { nodes: [n1_1_1, n1_1_2], parentId: n1_1 },
                        { nodes: [n1_2_1, n1_2_2], parentId: n1_2 },
                        { nodes: [n2_2_1, n2_2_2], parentId: n2_2 },
                        { nodes: [n3_1_1, n3_1_2], parentId: n3_1 },
                        { nodes: [n3_2_1, n3_2_2], parentId: n3_2 },
                    ],
                },
                {
                    id: c3,
                    groups: [
                        { nodes: [n1_1_1_1, n1_1_1_2], parentId: n1_1_1 },
                        { nodes: [n1_1_2_1, n1_1_2_2], parentId: n1_1_2 },
                        { nodes: [n1_2_1_1, n1_2_1_2], parentId: n1_2_1 },
                        { nodes: [n1_2_2_1, n1_2_2_2], parentId: n1_2_2 },
                        { nodes: [n2_2_1_1, n2_2_1_2], parentId: n2_2_1 },
                        { nodes: [n2_2_2_1, n2_2_2_2], parentId: n2_2_2 },
                        { nodes: [n3_1_1_1, n3_1_1_2], parentId: n3_1_1 },
                        { nodes: [n3_1_2_1, n3_1_2_2], parentId: n3_1_2 },
                        { nodes: [n3_2_1_1, n3_2_1_2], parentId: n3_2_1 },
                        { nodes: [n3_2_2_1, n3_2_2_2], parentId: n3_2_2 },
                    ],
                },
            ],
            content: {
                [n1]: { content: '1' },
                [n1_1]: { content: '1.1' },
                [n1_1_1]: { content: '1.1.1' },
                [n1_1_1_1]: { content: '1.1.1.1' },
                [n1_1_1_2]: { content: '1.1.1.2' },
                [n1_1_2]: { content: '1.1.2' },
                [n1_1_2_1]: { content: '1.1.2.1' },
                [n1_1_2_2]: { content: '1.1.2.2' },
                [n1_2]: { content: '1.2' },
                [n1_2_1]: { content: '1.2.1' },
                [n1_2_1_1]: { content: '1.2.1.1' },
                [n1_2_1_2]: { content: '1.2.1.2' },
                [n1_2_2]: { content: '1.2.2' },
                [n1_2_2_1]: { content: '1.2.2.1' },
                [n1_2_2_2]: { content: '1.2.2.2' },
                [n2]: { content: '2' },
                [n2_2]: { content: '2.2' },
                [n2_2_1]: { content: '2.2.1' },
                [n2_2_1_1]: { content: '2.2.1.1' },
                [n2_2_1_2]: { content: '2.2.1.2' },
                [n2_2_2]: { content: '2.2.2' },
                [n2_2_2_1]: { content: '2.2.2.1' },
                [n2_2_2_2]: { content: '2.2.2.2' },
                [n3]: { content: '3' },
                [n3_1]: { content: '3.1' },
                [n3_1_1]: { content: '3.1.1' },
                [n3_1_1_1]: { content: '3.1.1.1' },
                [n3_1_1_2]: { content: '3.1.1.2' },
                [n3_1_2]: { content: '3.1.2' },
                [n3_1_2_1]: { content: '3.1.2.1' },
                [n3_1_2_2]: { content: '3.1.2.2' },
                [n3_2]: { content: '3.2' },
                [n3_2_1]: { content: '3.2.1' },
                [n3_2_1_1]: { content: '3.2.1.1' },
                [n3_2_1_2]: { content: '3.2.1.2' },
                [n3_2_2]: { content: '3.2.2' },
                [n3_2_2_1]: { content: '3.2.2.1' },
                [n3_2_2_2]: { content: '3.2.2.2' },
            },
        };
        expect(deleteNode(input, n2_1)).toEqual(n2_2);
        expect(input).toEqual(output);
    });
    it('*|*|1|* >*|*|2|* *|*|3|*', () => {
        const c0 = 'cucq';
        const c1 = 'cIGA';
        const c2 = 'ciKH';
        const c3 = 'c8zp';
        const root = 'rE7S';
        const n1 = 'nudG';
        const n1_1 = 'nye8';
        const n1_1_1 = 'nF3r';
        const n1_1_1_1 = 'nekl';
        const n1_1_1_2 = 'nxW2';
        const n1_1_2 = 'nu7-';
        const n1_1_2_1 = 'n7Xf';
        const n1_1_2_2 = 'nRAj';
        const n1_2 = 'nt_7';
        const n1_2_1 = 'n7-H';
        const n1_2_1_1 = 'ncOF';
        const n1_2_1_2 = 'nBKw';
        const n1_2_2 = 'n96V';
        const n1_2_2_1 = 'n2Mm';
        const n1_2_2_2 = 'nT_k';
        const n2 = 'n41B';
        const n2_1 = 'njFU';
        const n2_1_1 = 'nBPD';
        const n2_1_1_1 = 'nfAO';
        const n2_1_1_2 = 'ns_U';
        const n2_2 = 'n3r2';
        const n2_2_1 = 'nIhA';
        const n2_2_1_1 = 'n5et';
        const n2_2_1_2 = 'nOL-';
        const n2_2_2 = 'nuZ7';
        const n2_2_2_1 = 'nypw';
        const n2_2_2_2 = 'nIVy';
        const n3 = 'nxi_';
        const n3_1 = 'nSh2';
        const n3_1_1 = 'nLTu';
        const n3_1_1_1 = 'naYL';
        const n3_1_1_2 = 'n108';
        const n3_1_2 = 'ndJK';
        const n3_1_2_1 = 'n7MA';
        const n3_1_2_2 = 'nzTS';
        const n3_2 = 'nYln';
        const n3_2_1 = 'n05b';
        const n3_2_1_1 = 'nuyi';
        const n3_2_1_2 = 'nBdO';
        const n3_2_2 = 'nSyh';
        const n3_2_2_1 = 'ndYd';
        const n3_2_2_2 = 'n621';
        const input = {
            columns: [
                { id: c0, groups: [{ nodes: [n1, n2, n3], parentId: root }] },
                {
                    id: c1,
                    groups: [
                        { nodes: [n1_1, n1_2], parentId: n1 },
                        { nodes: [n2_1, n2_2], parentId: n2 },
                        { nodes: [n3_1, n3_2], parentId: n3 },
                    ],
                },
                {
                    id: c2,
                    groups: [
                        { nodes: [n1_1_1, n1_1_2], parentId: n1_1 },
                        { nodes: [n1_2_1, n1_2_2], parentId: n1_2 },
                        { nodes: [n2_1_1], parentId: n2_1 },
                        { nodes: [n2_2_1, n2_2_2], parentId: n2_2 },
                        { nodes: [n3_1_1, n3_1_2], parentId: n3_1 },
                        { nodes: [n3_2_1, n3_2_2], parentId: n3_2 },
                    ],
                },
                {
                    id: c3,
                    groups: [
                        { nodes: [n1_1_1_1, n1_1_1_2], parentId: n1_1_1 },
                        { nodes: [n1_1_2_1, n1_1_2_2], parentId: n1_1_2 },
                        { nodes: [n1_2_1_1, n1_2_1_2], parentId: n1_2_1 },
                        { nodes: [n1_2_2_1, n1_2_2_2], parentId: n1_2_2 },
                        { nodes: [n2_1_1_1, n2_1_1_2], parentId: n2_1_1 },
                        { nodes: [n2_2_1_1, n2_2_1_2], parentId: n2_2_1 },
                        { nodes: [n2_2_2_1, n2_2_2_2], parentId: n2_2_2 },
                        { nodes: [n3_1_1_1, n3_1_1_2], parentId: n3_1_1 },
                        { nodes: [n3_1_2_1, n3_1_2_2], parentId: n3_1_2 },
                        { nodes: [n3_2_1_1, n3_2_1_2], parentId: n3_2_1 },
                        { nodes: [n3_2_2_1, n3_2_2_2], parentId: n3_2_2 },
                    ],
                },
            ],
            content: {
                [n1]: { content: '1' },
                [n1_1]: { content: '1.1' },
                [n1_1_1]: { content: '1.1.1' },
                [n1_1_1_1]: { content: '1.1.1.1' },
                [n1_1_1_2]: { content: '1.1.1.2' },
                [n1_1_2]: { content: '1.1.2' },
                [n1_1_2_1]: { content: '1.1.2.1' },
                [n1_1_2_2]: { content: '1.1.2.2' },
                [n1_2]: { content: '1.2' },
                [n1_2_1]: { content: '1.2.1' },
                [n1_2_1_1]: { content: '1.2.1.1' },
                [n1_2_1_2]: { content: '1.2.1.2' },
                [n1_2_2]: { content: '1.2.2' },
                [n1_2_2_1]: { content: '1.2.2.1' },
                [n1_2_2_2]: { content: '1.2.2.2' },
                [n2]: { content: '2' },
                [n2_1]: { content: '2.1' },
                [n2_1_1]: { content: '2.1.1' },
                [n2_1_1_1]: { content: '2.1.1.1' },
                [n2_1_1_2]: { content: '2.1.1.2' },
                [n2_2]: { content: '2.2' },
                [n2_2_1]: { content: '2.2.1' },
                [n2_2_1_1]: { content: '2.2.1.1' },
                [n2_2_1_2]: { content: '2.2.1.2' },
                [n2_2_2]: { content: '2.2.2' },
                [n2_2_2_1]: { content: '2.2.2.1' },
                [n2_2_2_2]: { content: '2.2.2.2' },
                [n3]: { content: '3' },
                [n3_1]: { content: '3.1' },
                [n3_1_1]: { content: '3.1.1' },
                [n3_1_1_1]: { content: '3.1.1.1' },
                [n3_1_1_2]: { content: '3.1.1.2' },
                [n3_1_2]: { content: '3.1.2' },
                [n3_1_2_1]: { content: '3.1.2.1' },
                [n3_1_2_2]: { content: '3.1.2.2' },
                [n3_2]: { content: '3.2' },
                [n3_2_1]: { content: '3.2.1' },
                [n3_2_1_1]: { content: '3.2.1.1' },
                [n3_2_1_2]: { content: '3.2.1.2' },
                [n3_2_2]: { content: '3.2.2' },
                [n3_2_2_1]: { content: '3.2.2.1' },
                [n3_2_2_2]: { content: '3.2.2.2' },
            },
        };
        const output = {
            columns: [
                { id: c0, groups: [{ nodes: [n1, n2, n3], parentId: root }] },
                {
                    id: c1,
                    groups: [
                        { nodes: [n1_1, n1_2], parentId: n1 },
                        { nodes: [n2_1, n2_2], parentId: n2 },
                        { nodes: [n3_1, n3_2], parentId: n3 },
                    ],
                },
                {
                    id: c2,
                    groups: [
                        { nodes: [n1_1_1, n1_1_2], parentId: n1_1 },
                        { nodes: [n1_2_1, n1_2_2], parentId: n1_2 },
                        { nodes: [n2_1_1], parentId: n2_1 },
                        { nodes: [n2_2_2], parentId: n2_2 },
                        { nodes: [n3_1_1, n3_1_2], parentId: n3_1 },
                        { nodes: [n3_2_1, n3_2_2], parentId: n3_2 },
                    ],
                },
                {
                    id: c3,
                    groups: [
                        { nodes: [n1_1_1_1, n1_1_1_2], parentId: n1_1_1 },
                        { nodes: [n1_1_2_1, n1_1_2_2], parentId: n1_1_2 },
                        { nodes: [n1_2_1_1, n1_2_1_2], parentId: n1_2_1 },
                        { nodes: [n1_2_2_1, n1_2_2_2], parentId: n1_2_2 },
                        { nodes: [n2_1_1_1, n2_1_1_2], parentId: n2_1_1 },
                        { nodes: [n2_2_2_1, n2_2_2_2], parentId: n2_2_2 },
                        { nodes: [n3_1_1_1, n3_1_1_2], parentId: n3_1_1 },
                        { nodes: [n3_1_2_1, n3_1_2_2], parentId: n3_1_2 },
                        { nodes: [n3_2_1_1, n3_2_1_2], parentId: n3_2_1 },
                        { nodes: [n3_2_2_1, n3_2_2_2], parentId: n3_2_2 },
                    ],
                },
            ],
            content: {
                [n1]: { content: '1' },
                [n1_1]: { content: '1.1' },
                [n1_1_1]: { content: '1.1.1' },
                [n1_1_1_1]: { content: '1.1.1.1' },
                [n1_1_1_2]: { content: '1.1.1.2' },
                [n1_1_2]: { content: '1.1.2' },
                [n1_1_2_1]: { content: '1.1.2.1' },
                [n1_1_2_2]: { content: '1.1.2.2' },
                [n1_2]: { content: '1.2' },
                [n1_2_1]: { content: '1.2.1' },
                [n1_2_1_1]: { content: '1.2.1.1' },
                [n1_2_1_2]: { content: '1.2.1.2' },
                [n1_2_2]: { content: '1.2.2' },
                [n1_2_2_1]: { content: '1.2.2.1' },
                [n1_2_2_2]: { content: '1.2.2.2' },
                [n2]: { content: '2' },
                [n2_1]: { content: '2.1' },
                [n2_1_1]: { content: '2.1.1' },
                [n2_1_1_1]: { content: '2.1.1.1' },
                [n2_1_1_2]: { content: '2.1.1.2' },
                [n2_2]: { content: '2.2' },
                [n2_2_2]: { content: '2.2.2' },
                [n2_2_2_1]: { content: '2.2.2.1' },
                [n2_2_2_2]: { content: '2.2.2.2' },
                [n3]: { content: '3' },
                [n3_1]: { content: '3.1' },
                [n3_1_1]: { content: '3.1.1' },
                [n3_1_1_1]: { content: '3.1.1.1' },
                [n3_1_1_2]: { content: '3.1.1.2' },
                [n3_1_2]: { content: '3.1.2' },
                [n3_1_2_1]: { content: '3.1.2.1' },
                [n3_1_2_2]: { content: '3.1.2.2' },
                [n3_2]: { content: '3.2' },
                [n3_2_1]: { content: '3.2.1' },
                [n3_2_1_1]: { content: '3.2.1.1' },
                [n3_2_1_2]: { content: '3.2.1.2' },
                [n3_2_2]: { content: '3.2.2' },
                [n3_2_2_1]: { content: '3.2.2.1' },
                [n3_2_2_2]: { content: '3.2.2.2' },
            },
        };
        expect(deleteNode(input, n2_2_1)).toEqual(n2_2_2);
        expect(input).toEqual(output);
    });
    it('*|*|1|* >*|*|2|* *|*|3|*', () => {
        const c0 = 'cucq';
        const c1 = 'cIGA';
        const c2 = 'ciKH';
        const c3 = 'c8zp';
        const root = 'rE7S';
        const n1 = 'nudG';
        const n1_1 = 'nye8';
        const n1_1_1 = 'nF3r';
        const n1_1_1_1 = 'nekl';
        const n1_1_1_2 = 'nxW2';
        const n1_1_2 = 'nu7-';
        const n1_1_2_1 = 'n7Xf';
        const n1_1_2_2 = 'nRAj';
        const n1_2 = 'nt_7';
        const n1_2_1 = 'n7-H';
        const n1_2_1_1 = 'ncOF';
        const n1_2_1_2 = 'nBKw';
        const n1_2_2 = 'n96V';
        const n1_2_2_1 = 'n2Mm';
        const n1_2_2_2 = 'nT_k';
        const n2 = 'n41B';
        const n2_1 = 'njFU';
        const n2_1_1 = 'nBPD';
        const n2_1_1_1 = 'nfAO';
        const n2_1_1_2 = 'ns_U';
        const n2_2 = 'n3r2';
        const n2_2_2 = 'nuZ7';
        const n2_2_2_1 = 'nypw';
        const n2_2_2_2 = 'nIVy';
        const n3 = 'nxi_';
        const n3_1 = 'nSh2';
        const n3_1_1 = 'nLTu';
        const n3_1_1_1 = 'naYL';
        const n3_1_1_2 = 'n108';
        const n3_1_2 = 'ndJK';
        const n3_1_2_1 = 'n7MA';
        const n3_1_2_2 = 'nzTS';
        const n3_2 = 'nYln';
        const n3_2_1 = 'n05b';
        const n3_2_1_1 = 'nuyi';
        const n3_2_1_2 = 'nBdO';
        const n3_2_2 = 'nSyh';
        const n3_2_2_1 = 'ndYd';
        const n3_2_2_2 = 'n621';
        const input = {
            columns: [
                { id: c0, groups: [{ nodes: [n1, n2, n3], parentId: root }] },
                {
                    id: c1,
                    groups: [
                        { nodes: [n1_1, n1_2], parentId: n1 },
                        { nodes: [n2_1, n2_2], parentId: n2 },
                        { nodes: [n3_1, n3_2], parentId: n3 },
                    ],
                },
                {
                    id: c2,
                    groups: [
                        { nodes: [n1_1_1, n1_1_2], parentId: n1_1 },
                        { nodes: [n1_2_1, n1_2_2], parentId: n1_2 },
                        { nodes: [n2_1_1], parentId: n2_1 },
                        { nodes: [n2_2_2], parentId: n2_2 },
                        { nodes: [n3_1_1, n3_1_2], parentId: n3_1 },
                        { nodes: [n3_2_1, n3_2_2], parentId: n3_2 },
                    ],
                },
                {
                    id: c3,
                    groups: [
                        { nodes: [n1_1_1_1, n1_1_1_2], parentId: n1_1_1 },
                        { nodes: [n1_1_2_1, n1_1_2_2], parentId: n1_1_2 },
                        { nodes: [n1_2_1_1, n1_2_1_2], parentId: n1_2_1 },
                        { nodes: [n1_2_2_1, n1_2_2_2], parentId: n1_2_2 },
                        { nodes: [n2_1_1_1, n2_1_1_2], parentId: n2_1_1 },
                        { nodes: [n2_2_2_1, n2_2_2_2], parentId: n2_2_2 },
                        { nodes: [n3_1_1_1, n3_1_1_2], parentId: n3_1_1 },
                        { nodes: [n3_1_2_1, n3_1_2_2], parentId: n3_1_2 },
                        { nodes: [n3_2_1_1, n3_2_1_2], parentId: n3_2_1 },
                        { nodes: [n3_2_2_1, n3_2_2_2], parentId: n3_2_2 },
                    ],
                },
            ],

            content: {
                [n1]: { content: '1' },
                [n1_1]: { content: '1.1' },
                [n1_1_1]: { content: '1.1.1' },
                [n1_1_1_1]: { content: '1.1.1.1' },
                [n1_1_1_2]: { content: '1.1.1.2' },
                [n1_1_2]: { content: '1.1.2' },
                [n1_1_2_1]: { content: '1.1.2.1' },
                [n1_1_2_2]: { content: '1.1.2.2' },
                [n1_2]: { content: '1.2' },
                [n1_2_1]: { content: '1.2.1' },
                [n1_2_1_1]: { content: '1.2.1.1' },
                [n1_2_1_2]: { content: '1.2.1.2' },
                [n1_2_2]: { content: '1.2.2' },
                [n1_2_2_1]: { content: '1.2.2.1' },
                [n1_2_2_2]: { content: '1.2.2.2' },
                [n2]: { content: '2' },
                [n2_1]: { content: '2.1' },
                [n2_1_1]: { content: '2.1.1' },
                [n2_1_1_1]: { content: '2.1.1.1' },
                [n2_1_1_2]: { content: '2.1.1.2' },
                [n2_2]: { content: '2.2' },
                [n2_2_2]: { content: '2.2.2' },
                [n2_2_2_1]: { content: '2.2.2.1' },
                [n2_2_2_2]: { content: '2.2.2.2' },
                [n3]: { content: '3' },
                [n3_1]: { content: '3.1' },
                [n3_1_1]: { content: '3.1.1' },
                [n3_1_1_1]: { content: '3.1.1.1' },
                [n3_1_1_2]: { content: '3.1.1.2' },
                [n3_1_2]: { content: '3.1.2' },
                [n3_1_2_1]: { content: '3.1.2.1' },
                [n3_1_2_2]: { content: '3.1.2.2' },
                [n3_2]: { content: '3.2' },
                [n3_2_1]: { content: '3.2.1' },
                [n3_2_1_1]: { content: '3.2.1.1' },
                [n3_2_1_2]: { content: '3.2.1.2' },
                [n3_2_2]: { content: '3.2.2' },
                [n3_2_2_1]: { content: '3.2.2.1' },
                [n3_2_2_2]: { content: '3.2.2.2' },
            },
        };
        const output = {
            columns: [
                { id: c0, groups: [{ nodes: [n1, n2, n3], parentId: root }] },
                {
                    id: c1,
                    groups: [
                        { nodes: [n1_1, n1_2], parentId: n1 },
                        { nodes: [n2_1, n2_2], parentId: n2 },
                        { nodes: [n3_1, n3_2], parentId: n3 },
                    ],
                },
                {
                    id: c2,
                    groups: [
                        { nodes: [n1_1_1, n1_1_2], parentId: n1_1 },
                        { nodes: [n1_2_1, n1_2_2], parentId: n1_2 },
                        { nodes: [n2_1_1], parentId: n2_1 },
                        { nodes: [n3_1_1, n3_1_2], parentId: n3_1 },
                        { nodes: [n3_2_1, n3_2_2], parentId: n3_2 },
                    ],
                },
                {
                    id: c3,
                    groups: [
                        { nodes: [n1_1_1_1, n1_1_1_2], parentId: n1_1_1 },
                        { nodes: [n1_1_2_1, n1_1_2_2], parentId: n1_1_2 },
                        { nodes: [n1_2_1_1, n1_2_1_2], parentId: n1_2_1 },
                        { nodes: [n1_2_2_1, n1_2_2_2], parentId: n1_2_2 },
                        { nodes: [n2_1_1_1, n2_1_1_2], parentId: n2_1_1 },
                        { nodes: [n3_1_1_1, n3_1_1_2], parentId: n3_1_1 },
                        { nodes: [n3_1_2_1, n3_1_2_2], parentId: n3_1_2 },
                        { nodes: [n3_2_1_1, n3_2_1_2], parentId: n3_2_1 },
                        { nodes: [n3_2_2_1, n3_2_2_2], parentId: n3_2_2 },
                    ],
                },
            ],

            content: {
                [n1]: { content: '1' },
                [n1_1]: { content: '1.1' },
                [n1_1_1]: { content: '1.1.1' },
                [n1_1_1_1]: { content: '1.1.1.1' },
                [n1_1_1_2]: { content: '1.1.1.2' },
                [n1_1_2]: { content: '1.1.2' },
                [n1_1_2_1]: { content: '1.1.2.1' },
                [n1_1_2_2]: { content: '1.1.2.2' },
                [n1_2]: { content: '1.2' },
                [n1_2_1]: { content: '1.2.1' },
                [n1_2_1_1]: { content: '1.2.1.1' },
                [n1_2_1_2]: { content: '1.2.1.2' },
                [n1_2_2]: { content: '1.2.2' },
                [n1_2_2_1]: { content: '1.2.2.1' },
                [n1_2_2_2]: { content: '1.2.2.2' },
                [n2]: { content: '2' },
                [n2_1]: { content: '2.1' },
                [n2_1_1]: { content: '2.1.1' },
                [n2_1_1_1]: { content: '2.1.1.1' },
                [n2_1_1_2]: { content: '2.1.1.2' },
                [n2_2]: { content: '2.2' },
                [n3]: { content: '3' },
                [n3_1]: { content: '3.1' },
                [n3_1_1]: { content: '3.1.1' },
                [n3_1_1_1]: { content: '3.1.1.1' },
                [n3_1_1_2]: { content: '3.1.1.2' },
                [n3_1_2]: { content: '3.1.2' },
                [n3_1_2_1]: { content: '3.1.2.1' },
                [n3_1_2_2]: { content: '3.1.2.2' },
                [n3_2]: { content: '3.2' },
                [n3_2_1]: { content: '3.2.1' },
                [n3_2_1_1]: { content: '3.2.1.1' },
                [n3_2_1_2]: { content: '3.2.1.2' },
                [n3_2_2]: { content: '3.2.2' },
                [n3_2_2_1]: { content: '3.2.2.1' },
                [n3_2_2_2]: { content: '3.2.2.2' },
            },
        };
        expect(deleteNode(input, n2_2_2)).toEqual(n2_2);
        expect(input).toEqual(output);
    });
});
