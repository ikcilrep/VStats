import * as vscode from "vscode";
import "./stats";
import { Statistics, statisticsFromDocuments } from "./stats";


export function activate(context: vscode.ExtensionContext) {
  const postStatistics = vscode.workspace.onDidSaveTextDocument((document) => {
    let statistics = statisticsFromDocuments(vscode.workspace.textDocuments)
  });

  context.subscriptions.push(postStatistics);
}

export function deactivate() { }
