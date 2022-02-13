import * as vscode from "vscode";
import { IndexPanel } from "./panels/indexPanel";

export function activate(context: vscode.ExtensionContext) {
  const helloCommand = vscode.commands.registerCommand("vsstats.helloWorld", () => {
    IndexPanel.render(context.extensionUri);
  });

  context.subscriptions.push(helloCommand);
}

export function deactivate() {}
