import { Statistics, statisticsFromDocuments } from "./stats";
import * as vscode from "vscode";
import axios, { AxiosRequestConfig } from "axios";

async function getProjectId(context: vscode.ExtensionContext): Promise<string> {
    const token = context.globalState.get('token');
    const config: AxiosRequestConfig = { headers: { Authorization: `Bearer ${token}` } };

    if (context.workspaceState.get("projectId") !== undefined)
        return context.workspaceState.get("projectId") as string;
    else {
        const response = await axios.post("https://vstatsapi.cubepotato.eu/stats/project", undefined, config);
        context.workspaceState.update("projectId", response.data["id"]);
        return response.data["id"];
    }
}

const updateStatistics = (context: vscode.ExtensionContext) => (documents: readonly vscode.TextDocument[]) => {
    const token = context.globalState.get('token');
    getProjectId(context).then((projectId) => {
        const statistics = statisticsFromDocuments(documents, projectId);
        const config: AxiosRequestConfig = { headers: { Authorization: `Bearer ${token}` } };
        axios.post("https://vstatsapi.cubepotato.eu/stats", statistics, config).catch((err) => console.log(err));
    });
    vscode.window.setStatusBarMessage('VStats: updating...', 2000);
}

function dataToStatistics(data: any): Statistics {
    return {
        characterCount: data["characterCount"],
        createdAt: data["createdAt"],
        fileCount: data["fileCount"],
        language: data["language"],
        linesOfCode: data["linesOfCode"],
        projectId: data["projectID"]
    };
}

async function fetchStatistics(context: vscode.ExtensionContext): Promise<Statistics[]> {
    const token = context.globalState.get('token');

    const projectId = await getProjectId(context);

    const config: AxiosRequestConfig = {
        headers: { Authorization: `Bearer ${token}` },
        params: { projectId }
    };

    const response = await axios.get("https://vstatsapi.cubepotato.eu/stats", config);
    return response.data.map((data: any) => dataToStatistics(data));
};

async function fetchTopLanguageStatistics(context: vscode.ExtensionContext, limit: number, language: string): Promise<Statistics[]> {
    const token = context.globalState.get('token');
    const config = { params: { language, limit }, headers: { Authorization: `Bearer ${token}` } };
    const response = await axios.get('https://vstatsapi.cubepotato.eu/stats', config);

    return response.data.map((data: any) => dataToStatistics(data));
}

export { updateStatistics, fetchStatistics, fetchTopLanguageStatistics };