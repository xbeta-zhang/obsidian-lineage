import {
    ClipboardPaste,
    FileEdit,
    FileMinus,
    FileOutput,
    FilePlus,
    FileSymlink,
    FileUp,
    Heading1,
    Merge,
    Scissors,
} from 'lucide-svelte';
import { UndoableAction } from 'src/stores/document/document-store-actions';

type Key = UndoableAction['type'];
export const actionInfo: Partial<
    Record<Key, { label: string; icon: typeof FileEdit }>
> = {
    'DOCUMENT/SET_NODE_CONTENT': { label: 'Updated a card', icon: FileEdit },
    'DOCUMENT/INSERT_NODE': { label: 'Created a card', icon: FilePlus },
    'DOCUMENT/DROP_NODE': { label: 'Dropped a card', icon: FileOutput },
    'DOCUMENT/LOAD_FILE': { label: 'Loaded document', icon: FileUp },
    'DOCUMENT/DELETE_NODE': { label: 'Deleted a card', icon: FileMinus },
    'DOCUMENT/MOVE_NODE': { label: 'Moved a card', icon: FileOutput },
    'DOCUMENT/MERGE_NODE': { label: 'Merged a card', icon: Merge },
    'DOCUMENT/FORMAT_HEADINGS': { label: 'Formatted headings', icon: Heading1 },
    'DOCUMENT/CUT_NODE': { label: 'Cut a card', icon: Scissors },
    'DOCUMENT/PASTE_NODE': { label: 'Pasted a card', icon: ClipboardPaste },
    'DOCUMENT/EXTRACT_BRANCH': { label: 'Extracted a card', icon: FileSymlink },
};
