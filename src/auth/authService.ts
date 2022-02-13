import axios from 'axios';
import { API_BASE_URL } from '../const';
import * as vscode from 'vscode';

interface LoginRes {
    token: string;
    user: {
        login: string;
        name: string;
    }
}

export async function finalizeLogin(context: vscode.ExtensionContext, code: string) {
    const res = await axios.get(API_BASE_URL + '/auth/finalize?code=' + code);
    if(res.status != 200) {
        vscode.window.showErrorMessage('Something went wrong with loggin in...');
        console.log(res.data);
    }
    const data = res.data as LoginRes;
    vscode.window.showInformationMessage(`Logged in as ${data.user.name} (${data.user.login})`);
    context.globalState.update('token', data.token);
    context.globalState.update('user', data.user);
} 