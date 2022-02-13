import * as vscode from "vscode";
import { updateStatistics } from "./dataManagement";
import { groupByLanguage } from "./languages";
import { IndexPanel } from "./panels/indexPanel";
import "./stats";
import { VStatsPanel } from "./utils/VStatsPanel";
import { LeaderBoardsPanel } from "./panels/leaderboardsPanel";
import { login } from "./auth/authCommand";
import { logout } from "./auth/logoutCommand";

export function activate(context: vscode.ExtensionContext) {
  const VStatsPanelprovider = new VStatsPanel();

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

  vscode.commands.registerCommand("LeaderboardsPanel",() => {
    LeaderBoardsPanel.render(context.extensionUri, context);
  });


  vscode.commands.registerCommand('RefreshTabs', () =>
    VStatsPanelprovider.refresh()
  );

  const loginC = vscode.commands.registerCommand('extension.login', login(context));
  const logoutC = vscode.commands.registerCommand('extension.logout', logout(context));
  context.subscriptions.push(loginC);
  context.subscriptions.push(logoutC);


  context.subscriptions.push(showGUI);

  let root = vscode.workspace.rootPath
  if (root) {
    vscode.window.createTreeView('VStats', {
      treeDataProvider: VStatsPanelprovider
    });
  }
}

export function deactivate() { }
