const { MainViewTreeProvider } = require('./views/mainView');

const vscode = require('vscode');
var treeProvider;
/**
 * @param {vscode.ExtensionContext} context
 */
async function activate(context) {
	treeProvider = new MainViewTreeProvider(context)
	vscode.window.registerTreeDataProvider('MainView', treeProvider)
	// const disposable = vscode.commands.registerCommand('github-workflows-viewer.helloWorld', function () {
	// 	vscode.window.showInformationMessage('Hello World from github-workflows-viewer!');
	// });

	vscode.commands.registerCommand('github-workflows-viewer.newFile', promptForFileName)

	// context.subscriptions.push(disposable);
}

async function deactivate() {}

const path = require('path');

async function promptForFileName(item) {
  const fileName = await vscode.window.showInputBox({
    title: 'Create New Workflow File within .github/workflows' + item.dirPath,
    prompt: 'Enter the name of the new workflow file (e.g. myFile.yml)',
    placeHolder: 'your-workflow.yml (use underscore `_` if you want it to view it as sub-directory)',
    ignoreFocusOut: true
  });

  if (!fileName) {
    vscode.window.showWarningMessage('No file name provided.');
    return;
  }

  const workspaceFolder = vscode.workspace.workspaceFolders?.[0];
  if (!workspaceFolder) {
    vscode.window.showErrorMessage('No workspace folder open.');
    return;
  }

  const fn = '.github/workflows' + item.dirPath + fileName
  const fileUri = vscode.Uri.joinPath(workspaceFolder.uri, fn);
  const dirUri = vscode.Uri.file(path.dirname(fileUri.fsPath));

  try {
    await vscode.workspace.fs.createDirectory(dirUri); // Ensures directory exists
    await vscode.workspace.fs.writeFile(fileUri, Buffer.from(''));
    vscode.window.showInformationMessage(`Created file: ${fileName}`);
	  treeProvider.refresh(item)
  } catch (err) {
    vscode.window.showErrorMessage(`Failed to create file: ${err.message}`);
  }
}


module.exports = {
	activate,
	deactivate
}
