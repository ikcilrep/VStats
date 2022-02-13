import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

export class VStatsPanel implements vscode.TreeDataProvider<Tab> {
  constructor(private workspaceRoot: string) {}

  getTreeItem(element: Tab): vscode.TreeItem {
    return element;
  }

  getChildren(element?: Tab): Thenable<Tab[]> {
    return Promise.resolve([
      new Tab("Tab","TestPanel", "A Tab", "Tab tab; click it"),
    ]);
  }


}

class Tab extends vscode.TreeItem {
  constructor(
    public readonly name: string,
    public readonly commandName: string,
    public readonly description: string = "",
    public readonly tooltip: string = "",
    public readonly iconPath = {
      light: path.join(__filename, '..', '..', '..', 'resources','light', 'tabIcon.svg'),
      dark: path.join(__filename, '..', '..', '..', 'resources','dark', 'tabIcon.svg')
    }
  ) {
    super(name);
    this.tooltip = `${this.label}`;
    //this.iconPath = iconPath;
    this.description = description;
    this.command = {title:"TabCommant",command:commandName}
  }
}