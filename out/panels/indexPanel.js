"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IndexPanel = void 0;
const vscode = require("vscode");
const getUri_1 = require("../utils/getUri");
class IndexPanel {
    constructor(panel, extensionUri) {
        this._disposables = [];
        this._panel = panel;
        this._panel.onDidDispose(this.dispose, null, this._disposables);
        this._panel.webview.html = this._getWebviewContent(this._panel.webview, extensionUri);
    }
    static render(extensionUri) {
        if (IndexPanel.currentPanel) {
            IndexPanel.currentPanel._panel.reveal(vscode.ViewColumn.One);
        }
        else {
            const panel = vscode.window.createWebviewPanel("helloworld", "Hello World", vscode.ViewColumn.One, {
                enableScripts: true,
            });
            IndexPanel.currentPanel = new IndexPanel(panel, extensionUri);
        }
    }
    dispose() {
        IndexPanel.currentPanel = undefined;
        this._panel.dispose();
        while (this._disposables.length) {
            const disposable = this._disposables.pop();
            if (disposable) {
                disposable.dispose();
            }
        }
    }
    _getWebviewContent(webview, extensionUri) {
        // Tip: Install the es6-string-html VS Code extension to enable code highlighting below
        const toolkitUri = (0, getUri_1.getUri)(webview, extensionUri, [
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
exports.IndexPanel = IndexPanel;
//# sourceMappingURL=indexPanel.js.map