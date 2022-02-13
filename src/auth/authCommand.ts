import * as vscode from 'vscode';
import { API_BASE_URL } from '../const';
import { finalizeLogin } from './authService';

export const login = (context: vscode.ExtensionContext) => async () => {
    if(context.globalState.get('user')) {
        vscode.window.showInformationMessage('Already logged in.');
        return;
    }

    vscode.env.openExternal(vscode.Uri.parse(API_BASE_URL + '/auth'));
    const res = await vscode.window.showInputBox({
        title: 'Enter auth code',
        ignoreFocusOut: true,
    });

    if(!res) {
        vscode.window.showErrorMessage('Login cancelled.');
    }

    await finalizeLogin(context, res!);
}
