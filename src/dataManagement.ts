import { statisticsFromDocuments } from "./stats";
import * as vscode from "vscode";
import axios, { AxiosRequestConfig } from "axios";

async function getProjectId(context: vscode.ExtensionContext): Promise<string> {
    const token = context.globalState.get('token');
    const config: AxiosRequestConfig = { headers: { Authorization: `Bearer ${token}` } };

    if (context.workspaceState.get("projectId") !== undefined)
        return context.workspaceState.get("projectId") as string;
    else {
        const response = await axios.get("https://vstatsapi.cubepotato.eu/stats/project", config);
        return response.data["id"];
    }
}

const updateStatistics = (context: vscode.ExtensionContext) => (documents: readonly vscode.TextDocument[]) => {
    const token = context.globalState.get('token');
    getProjectId(context).then((projectId) => {
        const statistics = statisticsFromDocuments(documents, projectId);
        const config: AxiosRequestConfig = { headers: { Authorization: `Bearer ${token}` } };
        axios.post("https://vstatsapi.cubepotato.eu/stats", statistics, config);
    });
}

async function fetchStatistics(context: vscode.ExtensionContext) {
    const token = context.globalState.get('token');

    const projectId = await getProjectId(context);

    const config: AxiosRequestConfig = {
        headers: { Authorization: `Bearer ${token}` },
        params: { projectId }
    };
    const response = await axios.get("https://https://vstatsapi.cubepotato.eu/stats", config);
    return response.data;
};

export { updateStatistics, fetchStatistics };