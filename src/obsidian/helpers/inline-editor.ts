import { MarkdownView, TFile } from 'obsidian';
import { LineageView } from 'src/view/view';
import { AdjustHeight } from 'src/view/actions/inline-editor/expandable-textarea-action';

const noop = async () => {};

export type InlineMarkdownView = MarkdownView & {
    __setViewData__: MarkdownView['setViewData'];
};
export class InlineEditor {
    private inlineView: InlineMarkdownView;
    private containerEl: HTMLElement;
    private nodeId: string | null = null;
    private target: HTMLElement | null = null;
    private appliedExternalCursor = false;

    constructor(private view: LineageView) {}

    get activeNode() {
        return this.nodeId;
    }

    getContent() {
        return this.inlineView.editor.getValue();
    }

    getCursor() {
        return this.inlineView.editor.getCursor();
    }

    overrideCursor(line: number, ch: number) {
        this.appliedExternalCursor = true;
        this.setCursor(line, ch);
    }

    setContent(content: string) {
        this.inlineView.__setViewData__(content, true);
    }

    loadNode(target: HTMLElement, nodeId: string) {
        const content =
            this.view.documentStore.getValue().document.content[nodeId];
        this.setContent(content?.content || '');

        if (!this.appliedExternalCursor)
            this.setCursor(
                this.inlineView.editor.lastLine(),
                this.inlineView.editor.getLine(
                    this.inlineView.editor.lastLine(),
                ).length,
            );
        this.appliedExternalCursor = false;
        target.append(this.containerEl);
        this.inlineView.editor.focus();
        AdjustHeight(target)();
        this.nodeId = nodeId;
        this.target = target;
    }

    unloadNode() {
        this.nodeId = null;
        if (this.target) this.target.empty();
        this.target = null;
    }

    async onload() {
        const workspace = this.view.plugin.app.workspace;
        // @ts-ignore

        this.containerEl = document.createElement('div');
        this.containerEl.addClasses(['lineage-inline-editor']);
        // help: how to instantiate a MarkdownView?
        this.inlineView = new MarkdownView({
            containerEl: this.containerEl,
            app: this.view.plugin.app,
            workspace,
        } as never) as InlineMarkdownView;
        this.inlineView.save = noop;
        this.inlineView.requestSave = noop;
        this.inlineView.__setViewData__ = this.inlineView.setViewData;
        this.inlineView.setViewData = noop;

        if (this.inlineView.getMode() === 'preview') {
            await this.inlineView.setState(
                { mode: 'source' },
                { history: false },
            );
        }
    }

    async loadFile(file: TFile) {
        this.inlineView.file = file;
        await this.inlineView.onLoadFile(file);
    }

    async unloadFile() {
        const file = this.inlineView.file;
        if (file) {
            this.inlineView.file = null;
            await this.inlineView.onUnloadFile(file);
        }
    }

    private setCursor(line: number, ch: number) {
        this.inlineView.editor.setCursor(line, ch);
    }
}
