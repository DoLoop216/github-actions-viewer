const vscode = require('vscode')

const { DIRECTORY_SEPARATOR } = require('../constants/generalConstants')
const { COULD_NOT_PARSE_SINGLE_FILE_BECAUSE_NAMING } = require('../constants/messagesConstants')
const { EXPLORER_TREE_ITEM_CONTEXT_VALUE_FILE } = require('../constants/generalConstants')

const isDirectory = (path) => path.includes(DIRECTORY_SEPARATOR);
const extractDirectory = (path) => path.split(DIRECTORY_SEPARATOR)[0];
const extractChildren = (paths, dirPath) => {
    const { ExplorerTreeItem } = require('../components/ExplorerTreeItem');
    const files = [];
    const dirs = new Map();

    for (const name of paths) {
        if (!name) {
            vscode.window.showErrorMessage(COULD_NOT_PARSE_SINGLE_FILE_BECAUSE_NAMING);
            continue;
        }
        if (isDirectory(name)) {
            const dir = extractDirectory(name);
            const rest = name.slice(dir.length + 1);
            dirs.set(dir, [...(dirs.get(dir) || []), rest]);
        } else {
            files.push(name);
        }
    }

    const children = [];
    for (const [dir, ps] of dirs.entries()) {
        children.push(new ExplorerTreeItem(dir, ps, dirPath + dir + DIRECTORY_SEPARATOR));
    }
    for (const file of files.sort()) {
        const node = new vscode.TreeItem(file, vscode.TreeItemCollapsibleState.None)
        node.contextValue = EXPLORER_TREE_ITEM_CONTEXT_VALUE_FILE
        node.filePath = dirPath + file;
        children.push(node);
    }
    return children;
};

module.exports = {
    isDirectory,
    extractDirectory,
    extractChildren,
}