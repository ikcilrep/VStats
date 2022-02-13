import * as vscode from "vscode";
import { getUri } from "../utils/getUri";

export class LeaderBoardsPanel {
  public static currentPanel: LeaderBoardsPanel | undefined;
  private readonly _panel: vscode.WebviewPanel;
  private _disposables: vscode.Disposable[] = [];

  private constructor(panel: vscode.WebviewPanel, extensionUri: vscode.Uri) {
    this._panel = panel;
    this._panel.onDidDispose(this.dispose, null, this._disposables);
    this._panel.webview.html = this._getWebviewContent(
      this._panel.webview,
      extensionUri
    );
  }

  public static render(extensionUri: vscode.Uri) {
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

      LeaderBoardsPanel.currentPanel = new LeaderBoardsPanel(panel, extensionUri);
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

  private _getWebviewContent(
    webview: vscode.Webview,
    extensionUri: vscode.Uri
  ) {
    // Tip: Install the es6-string-html VS Code extension to enable code highlighting below
    const toolkitUri = getUri(webview, extensionUri, [
      "node_modules",
      "@vscode",
      "webview-ui-toolkit",
      "dist",
      "toolkit.js",
    ]);

    const languages = ["Python", "JS", "C", "Java"]

    const languageHTML = () => {
      let html = "";
      languages.forEach(lang => {
        html += "<vscode-option>" + lang + "</vscode-option>"
      })
      return html
    }

    return /*html*/ `
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
                <vscode-dropdown class="language-selector">
                  ${languageHTML()}
                </vscode-dropdown>

                <div class="leaderboards">
                  <div class="board">
                    <h2>Lines of code</h2>
                    <div id="lines-of-code"></div>
                  </div>
                  <hr>
                  <div class="board">
                    <h2>Character count</h2>
                    <div id="character-count"></div>
                  </div>
                  <hr>
                  <div class="board">
                    <h2>File count</h2>
                    <div id="file-count"></div>
                  </div>
                  <hr>
                  <div class="board">
                    <h2>Problem count</h2>
                    <div id="problem-count">endless<br>more enless</div>
                  </div>
                  <hr>
                </div>
              </div>
            </body>
          </html>
        `;
  }
}