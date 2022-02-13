"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode = require("vscode");
const indexPanel_1 = require("./panels/indexPanel");
function activate(context) {
    const helloCommand = vscode.commands.registerCommand("vsstats.helloWorld", () => {
        indexPanel_1.IndexPanel.render(context.extensionUri);
    });
    context.subscriptions.push(helloCommand);
}
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map