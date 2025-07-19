const path = require('path');
const vscode = require('vscode');

async function deleteFileCommand(treeProvider, item) {
  const workspaceFolder = vscode.workspace.workspaceFolders?.[0];
  if (!workspaceFolder) {
    vscode.window.showErrorMessage('No workspace folder open.');
    return;
  }

  const fileUri = vscode.Uri.joinPath(workspaceFolder.uri, '.github', 'workflows', item.filePath);
  
  try {
    await vscode.workspace.fs.delete(fileUri);
    vscode.window.showInformationMessage(`Deleted file: ${item.label}`);
    treeProvider.refresh(item);
  } catch (err) {
    vscode.window.showErrorMessage(`Failed to delete file: ${err.message}`);
  }
}

module.exports = {
    deleteFileCommand
}