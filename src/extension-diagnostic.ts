import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    console.log('🚨 DIAGNOSTIC VERSION - IMMEDIATE ACTIVATION');
    
    // Show immediate activation proof
    vscode.window.showInformationMessage('🚨 DIAGNOSTIC: Extension IS activating!');
    
    // Register test command with extensive logging
    console.log('🔧 About to register dxpPromptLibrary.test...');
    
    try {
        const testCommand = vscode.commands.registerCommand('dxpPromptLibrary.test', () => {
            console.log('🎯 DIAGNOSTIC TEST EXECUTED!');
            vscode.window.showInformationMessage('🎯 DIAGNOSTIC: Command executed successfully!');
        });
        
        context.subscriptions.push(testCommand);
        console.log('✅ DIAGNOSTIC: Command registered and added to subscriptions');
        
        // Immediate verification
        vscode.commands.getCommands(true).then(commands => {
            const found = commands.includes('dxpPromptLibrary.test');
            console.log(`🔍 DIAGNOSTIC: Command found in list: ${found}`);
            console.log(`📊 DIAGNOSTIC: Total commands: ${commands.length}`);
            
            if (found) {
                vscode.window.showInformationMessage('✅ DIAGNOSTIC: Command is registered and found!');
            } else {
                vscode.window.showErrorMessage('❌ DIAGNOSTIC: Command registered but NOT found in command list!');
            }
        }, error => {
            console.error('❌ DIAGNOSTIC: Error checking commands:', error);
            vscode.window.showErrorMessage(`DIAGNOSTIC: Command check failed: ${error}`);
        });
        
    } catch (error) {
        console.error('❌ DIAGNOSTIC: Error during command registration:', error);
        vscode.window.showErrorMessage(`DIAGNOSTIC: Registration failed: ${error}`);
    }
    
    // Show extension info
    console.log('📋 DIAGNOSTIC: Extension context:', {
        extensionPath: context.extensionPath,
        subscriptions: context.subscriptions.length
    });
    
    vscode.window.showInformationMessage('🔍 DIAGNOSTIC: Check console for detailed logs');
}

export function deactivate() {
    console.log('🛑 DIAGNOSTIC: Extension deactivated');
    vscode.window.showInformationMessage('🛑 DIAGNOSTIC: Extension deactivated');
}
