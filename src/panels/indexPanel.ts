import * as vscode from "vscode";
import { getUri } from "../utils/getUri";

export class IndexPanel {
  public static currentPanel: IndexPanel | undefined;
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
    if (IndexPanel.currentPanel) {
      IndexPanel.currentPanel._panel.reveal(vscode.ViewColumn.One);
    } else {
      const panel = vscode.window.createWebviewPanel(
        "VStats",
        "VStats",
        vscode.ViewColumn.One,
        {
          enableScripts: true,
        }
      );

      IndexPanel.currentPanel = new IndexPanel(panel, extensionUri);
    }
  }

  public dispose() {
    IndexPanel.currentPanel = undefined;

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

    return /*html*/ `
          <!DOCTYPE html>
          <html lang="en">
            <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <script type="module" src="${toolkitUri}"></script>
              <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
              <title>Hello World!</title>
            </head>
            <body>
              <header>
                <h1>VStats</h1>
              </header>
              <section>
                <div>
                  <canvas id="myChart"></canvas>
                </div>
              </section>
              <script>
                //chart.js dla wykresów
                const labels = [
                  'January',
                  'February',
                  'March',
                  'April',
                  'May',
                  'June',
                ];
              
                const data = {
                  labels: labels,
                  datasets: [{
                    label: 'My First dataset',
                    backgroundColor: 'rgb(255, 99, 132)',
                    borderColor: 'rgb(255, 99, 132)',
                    data: [0, 10, 5, 2, 20, 30, 45],
                  }]
                };
              
                const config = {
                  type: 'line',
                  data: data,
                  options: {}
                };

                const myChart = new Chart(
                  document.getElementById('myChart'),
                  config
                );
                </script>
            </body>
          </html>
        `;
  }
}