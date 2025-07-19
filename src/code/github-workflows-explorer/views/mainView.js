const { checkAndCreateWorkflows } = require(`../helpers/globalHelpers`)
const { ExplorerTreeItem } = require(`../components/ExplorerTreeItem`)
const { NO_WORKFLOW_FILES_MESSAGE, COULD_NOT_LOAD_WORKFLOWS_EXPLORER } = require(`../constants/messagesConstants`)

const vscode = require('vscode');

class MainViewTreeProvider {
  constructor(context) {
    this.context = context;
    this._onDidChangeTreeData = new vscode.EventEmitter();
    this.onDidChangeTreeData = this._onDidChangeTreeData.event;
  }

  async refresh(element) {
    this._onDidChangeTreeData.fire()
  }

  async getTreeItem(element) {
    return element;
  }

  async getChildren(element) {
    if(element)
        return element.children
    const workspaceFolder = vscode.workspace.workspaceFolders?.[0];
    if (!workspaceFolder) return [ new vscode.TreeItem(NO_WORKFLOW_FILES_MESSAGE)];

    const workflowsUri = vscode.Uri.joinPath(workspaceFolder.uri, '.github', 'workflows');
    await checkAndCreateWorkflows(workflowsUri.path)
    try {
        const entries = await vscode.workspace.fs.readDirectory(workflowsUri);
        const files = entries?.filter(([name, type]) => type === vscode.FileType.File).map(([name]) => name);
        if (!files || files.length === 0) return [ new vscode.TreeItem(NO_WORKFLOW_FILES_MESSAGE)];
        return [new ExplorerTreeItem('Workflows', files, '/')]
    } catch (err) {
        vscode.window.showErrorMessage(COULD_NOT_LOAD_WORKFLOWS_EXPLORER);
        vscode.window.showErrorMessage(err.message);
        return [];
    }
  }
}

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  const treeDataProvider = new MyTreeDataProvider();
  vscode.window.registerTreeDataProvider('myView', treeDataProvider);
}

module.exports = {
  activate,
  MainViewTreeProvider
};
