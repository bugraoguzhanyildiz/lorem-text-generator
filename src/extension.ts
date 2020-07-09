import * as vscode from 'vscode';
import { resolveCliPathFromVSCodeExecutablePath } from 'vscode-test';
import fetch, { Response } from 'node-fetch';

export function activate(context: vscode.ExtensionContext) {

	let disposableSmall = vscode.commands.registerCommand('lorem-text-generator.smallLorem', async () => {
		await generateLorem('1/small');
	});

	let disposableMedium = vscode.commands.registerCommand('lorem-text-generator.mediumLorem', async () => {		
		await generateLorem('medium');
  });
  
  let disposableLong = vscode.commands.registerCommand('lorem-text-generator.longLorem', async () => {		
		await generateLorem('long');
  });
  
  let disposableVeryLong = vscode.commands.registerCommand('lorem-text-generator.veryLongLorem', async () => {		
		await generateLorem('verylong');
	});

	context.subscriptions.push(disposableSmall, disposableMedium, disposableLong, disposableVeryLong);
}

const generateLorem = async (size: String) => {
  const editor = vscode.window.activeTextEditor;
  if(!editor){
    vscode.window.showInformationMessage('Editor does not exist');
  }

  const response = await fetch(`https://loripsum.net/api/${size}/plaintext`);;
  let data = await response.text();
  // data = data.replace(/^\s+|\s+$/g, ''); //Removing line breaks that is came from api
  editor?.edit(edit => {
    edit.insert(editor.selection.active, data);
  });
}; 

export function deactivate() {}
