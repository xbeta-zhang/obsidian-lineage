import { MarkdownView } from 'obsidian';
import { LineageView } from 'src/view/view';
import { AdjustHeight } from 'src/view/actions/inline-editor/expandable-textarea-action';

export class InlineEditor {
    private inlineView: MarkdownView;
    private containerEl: HTMLElement;
    private nodeId: string | null = null;
    private target: HTMLElement | null = null;
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

    setContent(content: string) {
        this.inlineView.setViewData(content, true);
    }

    loadNode(target: HTMLElement, nodeId: string) {
        const content =
            this.view.documentStore.getValue().document.content[nodeId];
        this.setContent(content?.content || '');

        this.inlineView.editor.setCursor({
            line: this.inlineView.editor.lastLine(),
            ch: this.inlineView.editor.getLine(
                this.inlineView.editor.lastLine(),
            ).length,
        });
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
        } as never);

        if (this.inlineView.getMode() === 'preview') {
            await this.inlineView.setState(
                { mode: 'source' },
                { history: false },
            );
        }
    }
}
