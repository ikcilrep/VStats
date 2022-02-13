import axios, { AxiosRequestConfig } from "axios";
import * as vscode from "vscode";
import { groupByLanguage } from "./languages";
import { IndexPanel } from "./panels/indexPanel";
import "./stats";
import { statisticsFromDocuments } from "./stats";
import { VStatsPanel } from "./utils/VStatsPanel";

export function activate(context: vscode.ExtensionContext) {
  const token = "temporaryToken";

  function updateStatistics(documents: readonly vscode.TextDocument[]) {
    const statistics = statisticsFromDocuments(documents);
    const config: AxiosRequestConfig = { headers: { Authorization: `Bearer ${token}` } };
    axios.post("https://vstatsapi.cubepotato.eu/stats", statistics, config);
  }

  const postStatistics = vscode.workspace.onDidSaveTextDocument(() =>
    groupByLanguage(vscode.workspace.textDocuments).forEach(updateStatistics)
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
