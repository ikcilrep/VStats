import * as vscode from "vscode";
import { getUri } from "../utils/getUri";
import { fetchTopLanguageStatistics } from "../dataManagement"
import internal = require("stream");

export class LeaderBoardsPanel {
  public static currentPanel: LeaderBoardsPanel | undefined;
  private readonly _panel: vscode.WebviewPanel;
  private _disposables: vscode.Disposable[] = [];
  private seletedLanguage: string = "plaintext";

  private constructor(panel: vscode.WebviewPanel, extensionUri: vscode.Uri, context: vscode.ExtensionContext) {
    this._panel = panel;
    this._panel.onDidDispose(this.dispose, null, this._disposables);
    this._getWebviewContent(
      this._panel.webview,
      extensionUri,
      context
    ).then(s => {
      this._panel.webview.html = s;
    });
  }

  public static render(extensionUri: vscode.Uri, context: vscode.ExtensionContext) {
    if (LeaderBoardsPanel.currentPanel) {
      LeaderBoardsPanel.currentPanel._panel.reveal(vscode.ViewColumn.One);
    } else {
      const panel = vscode.window.createWebviewPanel(
        "VStats",
        "VStats",
        vscode.ViewColumn.One,
        {
          enableScripts: true,
        }
      );

      LeaderBoardsPanel.currentPanel = new LeaderBoardsPanel(panel, extensionUri, context);
    }
  }

  public dispose() {
    LeaderBoardsPanel.currentPanel = undefined;

    this._panel.dispose();

    while (this._disposables.length) {
      const disposable = this._disposables.pop();
      if (disposable) {
        disposable.dispose();
      }
    }
  }

  

  private async _getWebviewContent(
    webview: vscode.Webview,
    extensionUri: vscode.Uri,
    context: vscode.ExtensionContext
  ) : Promise<string> {
    // Tip: Install the es6-string-html VS Code extension to enable code highlighting below
    const toolkitUri = getUri(webview, extensionUri, [
      "node_modules",
      "@vscode",
      "webview-ui-toolkit",
      "dist",
      "toolkit.js",
    ]);

    let usernames = "";
    let lines = "";
    let characters = "";
    let files = "";
    let problems = "";
    let languageHTML="";

    return vscode.languages.getLanguages().then(val => {
      this.seletedLanguage=val[0];
      val.forEach(lang => {
        languageHTML += "<vscode-option>" + lang + "</vscode-option>"
      })
    }).then(() => {

    return fetchTopLanguageStatistics(context,50,this.seletedLanguage).then(data => {
      data.sort().forEach(val => {
        usernames += "<h3> "+val.user+"</h3>"
        lines += "<h3> "+val.linesOfCode+"</h3>"
        characters += "<h3> "+val.characterCount+"</h3>"
        files += "<h3> "+val.fileCount+"</h3>"
        problems += "<h3> "+"no what so ever"+"</h3>"
      })
      console.log(data)
    }).then( ()=>{
    return `
          <!DOCTYPE html>
          <html lang="en">
            <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <script type="module" src="${toolkitUri}"></script>
              <style>
                .center {
                  display: flex;
                  flex-direction: column;
                  width: 100%;
                  height: 100%;
                  align-items: center;
                  justify-content: center;
                }

                body, html {
                  width: 100%;
                  height: 100%;
                }

                .language-selector {
                  margin-bottom: 1em;
                }

                .leaderboards {
                  display: flex;
                }
                
                .board {
                  margin-right: .5em;
                  margin-left: .5em;
                  text-align: center;
                  padding-bottom: 1em;
                }
              </style>
              <title>VStats</title>
            </head>
            <body>
              <div class="center">
                <h1>Leaderboards</h1>
                <vscode-dropdown class="language-selector" id="language-selector" >
                  ${languageHTML}
                </vscode-dropdown>

                <div class="leaderboards">
                  <div class="board">
                    <h2>Username</h2>
                    <div id="lines-of-code">
                      ${usernames}
                    </div>
                  </div>
                  <hr>
                  <div class="board">
                    <h2>Lines of code</h2>
                    <div id="lines-of-code">
                      ${lines}
                    </div>
                  </div>
                  <hr>
                  <div class="board">
                    <h2>Character count</h2>
                    <div id="character-count">${characters}</div>
                  </div>
                  <hr>
                  <div class="board">
                    <h2>File count</h2>
                    <div id="file-count">${files}</div>
                  </div>
                  <hr>
                  <div class="board">
                    <h2>Problem count</h2>
                    <div id="problem-count">${problems}</div>
                  </div>
                  <hr>
                </div>
              </div>
            </body>
          </html>
        `})})
  }
}