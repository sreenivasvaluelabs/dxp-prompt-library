import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    console.log('🚨 EMERGENCY DXP Extension - DIFFERENT COMMAND NAME');
    
    // Try completely different command name
    const testDisposable = vscode.commands.registerCommand('dxpTest.emergency', () => {
        console.log('🚨 EMERGENCY TEST SUCCESS!');
        vscode.window.showInformationMessage('🚨 Emergency DXP Test Works with Different Name!');
    });
    
    context.subscriptions.push(testDisposable);
    
    // Also try the original name
    const originalDisposable = vscode.commands.registerCommand('dxpPromptLibrary.test', () => {
        console.log('✅ ORIGINAL NAME TEST SUCCESS!');
        vscode.window.showInformationMessage('✅ Original DXP Test Works!');
    });
    
    context.subscriptions.push(originalDisposable);
    
    console.log('🔍 Both commands registered, verifying...');
    setTimeout(() => {
        vscode.commands.getCommands(true).then(commands => {
            const emergency = commands.includes('dxpTest.emergency');
            const original = commands.includes('dxpPromptLibrary.test');
            console.log(`Emergency command found: ${emergency}`);
            console.log(`Original command found: ${original}`);
            
            if (emergency || original) {
                vscode.window.showInformationMessage(`✅ Commands registered! Emergency: ${emergency}, Original: ${original}`);
            } else {
                vscode.window.showErrorMessage('❌ Neither command was registered!');
            }
        });
    }, 1000);
}

export function deactivate() {
    console.log('🛑 Emergency extension deactivated');
}
