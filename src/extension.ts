import * as vscode from "vscode";
import { updateStatistics } from "./dataManagement";
import { groupByLanguage } from "./languages";
import { IndexPanel } from "./panels/indexPanel";
import "./stats";
import { VStatsPanel } from "./utils/VStatsPanel";

export function activate(context: vscode.ExtensionContext) {
  const postStatistics = vscode.workspace.onDidSaveTextDocument(() =>
    groupByLanguage(vscode.workspace.textDocuments).forEach(updateStatistics(context))
  );

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

  const showGUI = vscode.commands.registerCommand("vstats.showGUI", () => {
    IndexPanel.render(context.extensionUri);
  });

  context.subscriptions.push(showGUI);

  let root = vscode.workspace.rootPath
  if (root) {
    vscode.window.createTreeView('VStats', {
      treeDataProvider: new VStatsPanel(root)
    });
  }
}

export function deactivate() { }
