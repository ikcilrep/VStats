import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

export class VStatsPanel implements vscode.TreeDataProvider<Tab> {
  constructor() {}

  

  getTreeItem(element: Tab): vscode.TreeItem {
    return element;
  }

  getChildren(element?: Tab): Thenable<Tab[]> {
    return Promise.resolve([
      new Tab("Local Stats","vstats.showGUI", "", "My statistics"),
      new Tab("Leaderboards", "LeaderboardsPanel"),
      new Tab("Log In","extension.login","","","login.svg"),
      new Tab("Log Out","extension.logout","","","logout.svg"),
    
    ]);
  }

  private _onDidChangeTreeData: vscode.EventEmitter<Tab | undefined | null | void> = new vscode.EventEmitter<Tab | undefined | null | void>();
  readonly onDidChangeTreeData: vscode.Event<Tab | undefined | null | void> = this._onDidChangeTreeData.event;

  refresh(): void {
    this._onDidChangeTreeData.fire();
  }
}

class Tab extends vscode.TreeItem {
  constructor(
    public readonly name: string,
    public readonly commandName: string,
    public readonly description: string = "",
    public readonly tooltip: string = "",
    public readonly iconName: string = "tabIcon.svg",
  ) {
    super(name);
    this.tooltip = `${this.label}`;
    //this.iconPath = iconPath;
    this.description = description;
    this.command = {title:"TabCommand",command:commandName}
    this.iconPath = {
      light: path.join(__filename, '..', '..', '..', 'resources','light', this.iconName),
      dark: path.join(__filename, '..', '..', '..', 'resources','dark', this.iconName)
    }
    
  }
}