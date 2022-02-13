"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode = require("vscode");
function activate(context) {
    let openWebView = vscode.commands.registerCommand("vsstats.helloWorld", () => {
        const panel = vscode.window.createWebviewPanel("testView", "Test View", vscode.ViewColumn.One, {
            enableScripts: true,
        });
        panel.webview.html = getWebviewContent();
    });
    context.subscriptions.push(openWebView);
    function getWebviewContent() {
        return `<!DOCTYPE html>
  <html lang="en">
  <head>
	  <meta charset="UTF-8">
	  <meta name="viewport" content="width=device-width, initial-scale=1.0">
	  <title>Example Webview</title>
  </head>
  <body>
	 <h1>This works!</h1>
	  //Add some custom HTML here
  </body>
  </html>`;
    }
}
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map