"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode = require("vscode");
require("./stats");
const stats_1 = require("./stats");
function activate(context) {
    const postStatistics = vscode.workspace.onDidSaveTextDocument((document) => {
        let statistics = (0, stats_1.statisticsFromDocuments)(vscode.workspace.textDocuments);
    });
    context.subscriptions.push(postStatistics);
}
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map