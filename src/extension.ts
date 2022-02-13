import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  console.log('Congratulations, your extension "vsstats" is now active!');

  let disposable = vscode.commands.registerCommand("vsstats.helloWorld", () => {
    vscode.window.showInformationMessage("Hello World from vsstats!");
  });

  context.subscriptions.push(disposable);
}

export function deactivate() {}
