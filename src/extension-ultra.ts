import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    console.log('🚀 DXP Extension - ULTRA MINIMAL ACTIVATING');
    
    // Only register the test command - no imports, no dependencies, nothing else
    const testDisposable = vscode.commands.registerCommand('dxpPromptLibrary.test', () => {
        console.log('✅ ULTRA MINIMAL TEST SUCCESS!');
        vscode.window.showInformationMessage('✅ DXP Ultra Minimal Test Works!');
    });
    
    context.subscriptions.push(testDisposable);
    
    // Immediate verification
    console.log('🔍 Test command registered, verifying...');
    setTimeout(() => {
        vscode.commands.getCommands(true).then(commands => {
            const found = commands.includes('dxpPromptLibrary.test');
            console.log(`Command found: ${found}`);
            if (found) {
                vscode.window.showInformationMessage('✅ Ultra minimal extension ready!');
            } else {
                vscode.window.showErrorMessage('❌ Command registration failed in ultra minimal version!');
            }
        });
    }, 500);
}

export function deactivate() {
    console.log('🛑 Ultra minimal extension deactivated');
}
