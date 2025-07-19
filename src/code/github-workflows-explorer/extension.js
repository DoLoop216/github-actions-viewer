const { MainViewTreeProvider } = require('./views/mainView');
const { NEW_FILE_COMMAND, DELETE_FILE_COMMAND } = require('./constants/commandsConstants');
const { newFileCommand } = require('./commands/newFileCommand');
const { deleteFileCommand } = require('./commands/deleteFileCommand');

const vscode = require('vscode');
var treeProvider;
/**
 * @param {vscode.ExtensionContext} context
 */
async function activate(context) {
	treeProvider = new MainViewTreeProvider(context)
	vscode.window.registerTreeDataProvider('MainView', treeProvider)
	vscode.commands.registerCommand(NEW_FILE_COMMAND, (item) => newFileCommand(treeProvider, item));
  vscode.commands.registerCommand(DELETE_FILE_COMMAND, (item) => deleteFileCommand(treeProvider, item));
}

async function deactivate() {}


module.exports = {
	activate,
	deactivate
}
