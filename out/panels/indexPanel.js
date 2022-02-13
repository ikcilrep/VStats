"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IndexPanel = void 0;
const vscode = require("vscode");
const getUri_1 = require("../utils/getUri");
class IndexPanel {
    constructor(panel, extensionUri) {
        this._disposables = [];
        this._panel = panel;
        this._panel.onDidDispose(this.dispose, null, this._disposables);
        this._panel.webview.html = this._getWebviewContent(this._panel.webview, extensionUri);
    }
    static render(extensionUri) {
        if (IndexPanel.currentPanel) {
            IndexPanel.currentPanel._panel.reveal(vscode.ViewColumn.One);
        }
        else {
            const panel = vscode.window.createWebviewPanel("helloworld", "Hello World", vscode.ViewColumn.One, {
                enableScripts: true,
            });
            IndexPanel.currentPanel = new IndexPanel(panel, extensionUri);
        }
    }
    dispose() {
        IndexPanel.currentPanel = undefined;
        this._panel.dispose();
        while (this._disposables.length) {
            const disposable = this._disposables.pop();
            if (disposable) {
                disposable.dispose();
            }
        }
    }
    _getWebviewContent(webview, extensionUri) {
        // Tip: Install the es6-string-html VS Code extension to enable code highlighting below
        const toolkitUri = (0, getUri_1.getUri)(webview, extensionUri, [
            "node_modules",
            "@vscode",
            "webview-ui-toolkit",
            "dist",
            "toolkit.js",
        ]);
        return /*html*/ `
          <!DOCTYPE html>
          <html lang="en">
            <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <script type="module" src="${toolkitUri}"></script>
              <title>Hello World!</title>
            </head>
            <body>
              <h1>Hello World!</h1>
              <vscode-button id="howdy">Howdy!</vscode-button>
            </body>
          </html>
        `;
    }
}
exports.IndexPanel = IndexPanel;
//# sourceMappingURL=indexPanel.js.map