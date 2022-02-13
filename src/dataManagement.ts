import { statisticsFromDocuments } from "./stats";
import * as vscode from "vscode";
import axios, { AxiosRequestConfig } from "axios";

const updateStatistics = (context: vscode.ExtensionContext) => (documents: readonly vscode.TextDocument[]) => {
    const token = context.globalState.get('token');
    const statistics = statisticsFromDocuments(documents);
    const config: AxiosRequestConfig = { headers: { Authorization: `Bearer ${token}` } };
    axios.post("https://vstatsapi.cubepotato.eu/stats", statistics, config);
}

export { updateStatistics };