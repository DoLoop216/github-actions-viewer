const fs = require('fs').promises;
const vscode = require('vscode');
const { CREATE_WORKFLOWS_DIRECTORY_PROMPT, CREATE_WORKFLOWS_DIRECTORY_SUCCESS, CREATE_WORKFLOWS_DIRECTORY_FAILURE } = require('../constants/messagesConstants');

async function checkAndCreateWorkflows(path) {
    try {
        await fs.access(path);
    } catch {
        const choice = await vscode.window.showInformationMessage(
            CREATE_WORKFLOWS_DIRECTORY_PROMPT,
            'Yes',
            'No'
        );
        if (choice === 'Yes') {
            try {
                await fs.mkdir(path, { recursive: true });
                vscode.window.showInformationMessage(CREATE_WORKFLOWS_DIRECTORY_SUCCESS);
            } catch {
                vscode.window.showErrorMessage(CREATE_WORKFLOWS_DIRECTORY_FAILURE);
            }
        }
    }
}

module.exports = {
    checkAndCreateWorkflows
};
