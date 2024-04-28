import { describe, expect, test } from 'vitest';
import { getFileNameFromContent } from 'src/obsidian/commands/helpers/extract-branch/helpers/get-file-name-of-extracted-branch/get-file-name-from-content';

const examples = [
    {
        input: `a`,
        output: 'a',
    },
    {
        input: `# a\nb `,
        output: 'a',
    },
    {
        input: 'a\nb',
        output: 'a b',
    },
    { input: '\na\nb', output: 'a b' },
    {
        input: '',
        output: undefined,
    },
    {
        input:
            Array.from({ length: 150 })
                .map(() => 'a')
                .join('') + '\nb',
        output: Array.from({ length: 100 })
            .map(() => 'a')
            .join(''),
    },
];

describe('get file name from content', () => {
    for (const example of examples) {
        test(example.input, () => {
            expect(getFileNameFromContent(example.input)).toEqual(
                example.output,
            );
        });
    }
});
