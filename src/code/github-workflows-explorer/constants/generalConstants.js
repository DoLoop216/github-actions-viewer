const vscode = require('vscode')

const DIRECTORY_SEPARATOR = '_'
const EXPLORER_TREE_ITEM_CONTEXT_VALUE = 'github-workflows-explorer-item'
const EXPLORER_TREE_ITEM_CONTEXT_VALUE_FILE = 'github-workflows-explorer-item-file'
const EXPLORER_TREE_ITEM_FOLDER_ICON = 'folder'
const COULD_NOT_LOAD_WORKFLOWS_EXPLORER = 'Could not load workflows explorer.'
const WORKFLOWS_PATH = vscode.Uri.joinPath(vscode.workspace.workspaceFolders[0].uri, ".github", "workflows")

module.exports = {
    DIRECTORY_SEPARATOR,
    EXPLORER_TREE_ITEM_CONTEXT_VALUE,
    EXPLORER_TREE_ITEM_CONTEXT_VALUE_FILE,
    EXPLORER_TREE_ITEM_FOLDER_ICON,
    COULD_NOT_LOAD_WORKFLOWS_EXPLORER,
    WORKFLOWS_PATH
}