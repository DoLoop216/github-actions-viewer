async function checkAndCreateWorkflows(path) {
  const fs = require('fs');
  const vscode = require('vscode');

    await new Promise((resolve, reject) => {
        fs.access(path, fs.constants.F_OK, async (err) => {
            if (err) {
                const choice = await vscode.window.showInformationMessage(
                    "'.github/workflows' directory doesn't exist. Create it?",
                    'Yes',
                    'No'
                );

                if (choice === 'Yes') {
                    fs.mkdir(path, { recursive: true }, (mkdirErr) => {
                    if (mkdirErr)
                        vscode.window.showErrorMessage(`Failed to create directory: ${mkdirErr.message}`);
                    else
                        vscode.window.showInformationMessage('Directory created successfully.');
                    });
                }}
                resolve()
            });
        })
}


module.exports = {
    checkAndCreateWorkflows
}