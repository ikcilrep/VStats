import * as vscode from 'vscode';
import { API_BASE_URL } from '../const';
import { finalizeLogin } from './authService';

export const login = (context: vscode.ExtensionContext) => async () => {
    vscode.env.openExternal(vscode.Uri.parse(API_BASE_URL + '/auth'));
    const res = await vscode.window.showInputBox({
        title: 'Enter auth code',
    });

    if(!res) {
        vscode.window.showErrorMessage('Login cancelled.');
    }

    await finalizeLogin(context, res!);
}
