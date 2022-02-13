import axios from 'axios';
import { API_BASE_URL } from '../const';
import * as vscode from 'vscode';
import { User } from './user';

interface LoginRes {
    token: string;
    user: User;
}

export async function finalizeLogin(context: vscode.ExtensionContext, code: string) {
    let data: LoginRes;
    try {
        const res = await axios.get(API_BASE_URL + '/auth/finalize?code=' + code);
        data = res.data;
    } catch(err) {
        vscode.window.showErrorMessage('Something went wrong with loggin in...');
        console.error(err);
        return;
    }

    vscode.window.showInformationMessage(`Logged in as ${data.user.name} (${data.user.login})`);
    context.globalState.update('token', data.token);
    context.globalState.update('user', data.user);
}