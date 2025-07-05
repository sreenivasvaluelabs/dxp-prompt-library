import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    console.log('🚀 DXP Extension - MINIMAL VERSION ACTIVATING');
    
    // MINIMAL TEST - Register ONLY the test command with no dependencies
    const disposable = vscode.commands.registerCommand('dxpPromptLibrary.test', () => {
        console.log('✅ MINIMAL TEST COMMAND EXECUTED!');
        vscode.window.showInformationMessage('🎉 MINIMAL DXP Extension Test Successful!');
    });

    context.subscriptions.push(disposable);
    console.log('✅ Minimal test command registered');
    
    // Immediate verification
    setTimeout(() => {
        vscode.commands.getCommands(true).then(allCommands => {
            const hasCommand = allCommands.includes('dxpPromptLibrary.test');
            console.log(`🔍 Command 'dxpPromptLibrary.test' registered: ${hasCommand}`);
            console.log(`📝 Total commands found: ${allCommands.length}`);
            
            if (hasCommand) {
                vscode.window.showInformationMessage('✅ DXP Test Command is ready! Try it now.');
            } else {
                console.error('❌ FATAL: Command not found after registration!');
                vscode.window.showErrorMessage('❌ Command registration failed');
            }
        });
    }, 1000);
}

export function deactivate() {
    console.log('🛑 DXP Extension deactivated');
}
