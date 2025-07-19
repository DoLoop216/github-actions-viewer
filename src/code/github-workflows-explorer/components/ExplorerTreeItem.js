const { extractChildren } = require('../helpers/explorerTreeItemHelpers')
const { EXPLORER_TREE_ITEM_CONTEXT_VALUE, EXPLORER_TREE_ITEM_FOLDER_ICON } = require('../constants/generalConstants')

const vscode = require('vscode');

class ExplorerTreeItem extends vscode.TreeItem {
    constructor(label, paths, dirPath) {
        super(label, vscode.TreeItemCollapsibleState.Collapsed)
        this.id = dirPath; // or any unique string identifier
        this.iconPath = new vscode.ThemeIcon(EXPLORER_TREE_ITEM_FOLDER_ICON)
        this.children = extractChildren(paths, dirPath)
        this.contextValue = EXPLORER_TREE_ITEM_CONTEXT_VALUE
        this.dirPath = dirPath
    }
}

module.exports = {
    ExplorerTreeItem
}