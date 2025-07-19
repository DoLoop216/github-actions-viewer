const vscode = require('vscode');
const { WORKFLOWS_PATH } = require('../constants/generalConstants');

const dragAndDropController = {
    dragMimeTypes: ['application/vnd.code.tree.mainview'],
    dropMimeTypes: ['application/vnd.code.tree.mainview'],
    async handleDrag(sourceItems, treeDataTransfer, token) {
        treeDataTransfer.set(
            'application/vnd.code.tree.mainview',
            new vscode.DataTransferItem(sourceItems)
        )
    },
    async handleDrop(targetItem, treeDataTransfer, token) {
        const sourceItems = treeDataTransfer.get('application/vnd.code.tree.mainview');
        if (!sourceItems) {
            return;
        }
        const sourcePaths = sourceItems.value.map(item => item.filePath);
        const targetPath = targetItem?.dirPath || '';

        for (const sourcePath of sourcePaths) {
            try{
                const src = vscode.Uri.joinPath(WORKFLOWS_PATH, sourcePath);
                const dest = vscode.Uri.joinPath(WORKFLOWS_PATH, targetPath + sourcePath.split('/').pop().split('_').pop());
                await vscode.workspace.fs.rename(
                    src,
                    dest,
                    { overwrite: true }
                );
            }
            catch (error) {
                vscode.window.showErrorMessage(`Failed to move file ${sourcePath}: ${error.message}`);
                return;
            }
        }
        const { getTreeDataProvider } = require('../extension');
        getTreeDataProvider().refresh();
    }
}

module.exports = {
    dragAndDropController
}