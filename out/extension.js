"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode = require("vscode");
const languages_1 = require("./languages");
require("./stats");
const stats_1 = require("./stats");
function activate(context) {
    const postStatistics = vscode.workspace.onDidSaveTextDocument((document) => {
        (0, languages_1.groupByLanguage)(vscode.workspace.textDocuments).forEach((documents, language) => {
            const statistics = (0, stats_1.statisticsFromDocuments)(documents);
            console.log(language);
            console.log("Bu!");
            console.log(statistics.chars);
        });
    });
    context.subscriptions.push(postStatistics);
    /*
    var changes = 0;
    let onDidChangeDisposable = vscode.workspace.onDidChangeTextDocument(
      (event: vscode.TextDocumentChangeEvent) => {
        changes += 1;
      }
    );*/
    let button = vscode.window.createStatusBarItem();
    button.text = "$(notebook-state-success) VSCS";
    button.tooltip = "Collecting data...";
    button.show();
    // IndexPanel.render(context.extensionUri); / zeby odpalic gui
}
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map