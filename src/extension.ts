import * as vscode from "vscode";
import { IndexPanel } from "./panels/indexPanel";

export function activate(context: vscode.ExtensionContext) {
  var changes = 0;
  let onDidChangeDisposable = vscode.workspace.onDidChangeTextDocument(
    (event: vscode.TextDocumentChangeEvent) => {
      changes += 1;
    }
  );

  let button = vscode.window.createStatusBarItem();
  button.text = "$(notebook-state-success) VSCS";
  button.show();

  const showGUI = vscode.commands.registerCommand("vstats.showGUI", () => {
    IndexPanel.render(context.extensionUri);
  });

  context.subscriptions.push(showGUI);
}

export function deactivate() {}
