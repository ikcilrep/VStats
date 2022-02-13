"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode = require("vscode");
const indexPanel_1 = require("./panels/indexPanel");
function activate(context) {
    var changes = 0;
    let onDidChangeDisposable = vscode.workspace.onDidChangeTextDocument((event) => {
        changes += 1;
    });
    let button = vscode.window.createStatusBarItem();
    button.text = "$(notebook-state-success) VSCS";
    button.show();
    const showGUI = vscode.commands.registerCommand("vstats.showGUI", () => {
        indexPanel_1.IndexPanel.render(context.extensionUri);
    });
    context.subscriptions.push(showGUI);
}
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map