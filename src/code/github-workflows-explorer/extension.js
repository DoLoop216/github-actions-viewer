const { MainViewTreeProvider } = require('./views/mainView');
const { NEW_FILE_COMMAND, DELETE_FILE_COMMAND } = require('./constants/commandsConstants');
const { newFileCommand } = require('./commands/newFileCommand');
const { deleteFileCommand } = require('./commands/deleteFileCommand');
const { dragAndDropController } = require('./controllers/dragAndDropController');

const vscode = require('vscode');
var treeProvider;
/**
 * @param {vscode.ExtensionContext} context
 */
async function activate(context) {
	treeProvider = new MainViewTreeProvider(context)
	const treeView = vscode.window.createTreeView('MainView', {
		treeDataProvider: treeProvider,
		dragAndDropController: dragAndDropController
	});
	context.subscriptions.push(treeView);
	vscode.commands.registerCommand(NEW_FILE_COMMAND, (item) => newFileCommand(treeProvider, item));
  	vscode.commands.registerCommand(DELETE_FILE_COMMAND, (item) => deleteFileCommand(treeProvider, item));
}

async function deactivate() {}

function getTreeDataProvider() {
	if (!treeProvider) {
		throw new Error('Tree data provider is not initialized. Make sure to call activate first.');
	}
	return treeProvider;
}

module.exports = {
	activate,
	deactivate,
	getTreeDataProvider
}
