const vscode = require('vscode');
const { checkAndCreateWorkflows } = require(`../helpers/globalHelpers`)

const directorySplitter = '_';
const isDirectory = (path) => path.includes(directorySplitter);
const extractDirectory = (path) => path.split(directorySplitter)[0];
const extractChildren = (paths, dirPath) => {
    paths.sort()
    const files = []
    const dirs = new Map()
    paths.map((name) => {
        if(!name || name.length === 0) {
            vscode.window.showErrorMessage('Could not parse your github workflow files within view because some file does not follow naming convention. Be sure to name your files as `some-file.yml` or if you want them within directories then use underscore (_) as directory separator. Example: this-is_multiple_sub-directories_and-then-file-at-the-end.yml.');
            return;
        }
        if(isDirectory(name)) {
            const dir = extractDirectory(name)
            if(!dirs.has(dir))
                dirs.set(dir, [])
            const original = dirs.get(dir)
            original.push(name.substring(dir.length + 1)) // +1 to remove leading _
            dirs.set(dir, original)
            return
        }
        files.push(name)
    })
    const ch = []
    if(dirs.length !== 0) {
        dirs.forEach((ps, dir) => {
            ch.push(new ViewerTreeItem(dir, ps, dirPath + dir + directorySplitter))
        })
    }
    if(files.toSorted().length !== 0)
        files.map((file) =>{
            var node = new vscode.TreeItem(file, vscode.TreeItemCollapsibleState.None);
            // node.iconPath = new vscode.ThemeIcon('file') // looks too much
            ch.push(node)
        })
    return ch
}

class ViewerTreeItem extends vscode.TreeItem {
    constructor(label, paths, dirPath) {
        super(label, vscode.TreeItemCollapsibleState.Collapsed)
        this.iconPath = new vscode.ThemeIcon('folder')
        this.children = extractChildren(paths, dirPath)
        this.contextValue = 'github-workflows-viewer-item'
        this.dirPath = dirPath
    }
}
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
    if (!workspaceFolder) return [ new vscode.TreeItem('No workflow files within repository')];

    const workflowsUri = vscode.Uri.joinPath(workspaceFolder.uri, '.github', 'workflows');
    await checkAndCreateWorkflows(workflowsUri.path)
    try {
        const entries = await vscode.workspace.fs.readDirectory(workflowsUri);
        const files = entries?.filter(([name, type]) => type === vscode.FileType.File).map(([name]) => name);
        if (!files || files.length === 0) return [ new vscode.TreeItem('No workflow files within repository')];
        return [new ViewerTreeItem('Workflows', files, '/')]
    } catch (err) {
        vscode.window.showErrorMessage('Could not read .github/workflows directory.');
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
