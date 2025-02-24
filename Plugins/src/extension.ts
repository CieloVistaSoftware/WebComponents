import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand('showFilePath.show', () => {
    const editor = vscode.window.activeTextEditor;
    if (editor) {
      const filePath = editor.document.uri.fsPath;
      vscode.window.showInformationMessage(`File Path: ${filePath}`);
    } else {
      vscode.window.showInformationMessage('No active editor');
    }
  });

  context.subscriptions.push(disposable);
}

export function deactivate() {}