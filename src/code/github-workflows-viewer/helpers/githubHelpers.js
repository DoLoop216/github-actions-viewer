const vscode = require('vscode');
async function getGitHubSession() {
  const session = await vscode.authentication.getSession('github', ['repo'], { createIfNone: false });
  if (session) {
    console.log('GitHub account connected:', session.account.label);
    return session;
  } else {
    console.log('No GitHub account connected.');
    return null;
  }
}

module.exports = {
  getGitHubSession
}