import * as vscode from 'vscode';

export const logout = (context: vscode.ExtensionContext) => async () => {
    context.globalState.update('token', undefined);
    context.globalState.update('user', undefined);
    vscode.window.showInformationMessage('Logged out');
};