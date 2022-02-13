import * as vscode from "vscode";
import "./stats";
import { statisticsFromDocuments } from "./stats";
import { VStatsPanel } from "./utils/VStatsPanel";

export function activate(context: vscode.ExtensionContext) {
  const postStatistics = vscode.workspace.onDidSaveTextDocument((document) => {
    let statistics = statisticsFromDocuments(vscode.workspace.textDocuments);
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

  let root = vscode.workspace.rootPath
  if(root){
    vscode.window.createTreeView('VStats', {
      treeDataProvider: new VStatsPanel(root)
    });
  }
}

export function deactivate() {}
