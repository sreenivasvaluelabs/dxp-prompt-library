import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    console.log('🚀 DXP Extension - GRADUAL BUILD VERSION');
    
    // STEP 1: Test command (we know this works)
    const testDisposable = vscode.commands.registerCommand('dxpPromptLibrary.test', () => {
        console.log('✅ TEST COMMAND SUCCESS!');
        vscode.window.showInformationMessage('✅ DXP Test Works! (Gradual Build Version)');
    });
    context.subscriptions.push(testDisposable);
    console.log('✅ Test command registered');
    
    // STEP 2: Add other commands one by one (NO PromptManager yet)
    const openPromptPalette = vscode.commands.registerCommand('dxpPromptLibrary.openPromptPalette', () => {
        console.log('🎯 openPromptPalette executed');
        vscode.window.showInformationMessage('🎯 Prompt Palette - Gradual Build Version');
    });
    context.subscriptions.push(openPromptPalette);
    console.log('✅ openPromptPalette registered');
    
    const insertPrompt = vscode.commands.registerCommand('dxpPromptLibrary.insertPrompt', () => {
        console.log('🎯 insertPrompt executed');
        vscode.window.showInformationMessage('🎯 Insert Prompt - Gradual Build Version');
    });
    context.subscriptions.push(insertPrompt);
    console.log('✅ insertPrompt registered');
    
    const searchPrompts = vscode.commands.registerCommand('dxpPromptLibrary.searchPrompts', () => {
        console.log('🎯 searchPrompts executed');
        vscode.window.showInformationMessage('🎯 Search Prompts - Gradual Build Version');
    });
    context.subscriptions.push(searchPrompts);
    console.log('✅ searchPrompts registered');
    
    const filterByComponent = vscode.commands.registerCommand('dxpPromptLibrary.filterByComponent', () => {
        console.log('🎯 filterByComponent executed');
        vscode.window.showInformationMessage('🎯 Filter by Component - Gradual Build Version');
    });
    context.subscriptions.push(filterByComponent);
    console.log('✅ filterByComponent registered');
    
    const filterBySDLC = vscode.commands.registerCommand('dxpPromptLibrary.filterBySDLC', () => {
        console.log('🎯 filterBySDLC executed');
        vscode.window.showInformationMessage('🎯 Filter by SDLC - Gradual Build Version');
    });
    context.subscriptions.push(filterBySDLC);
    console.log('✅ filterBySDLC registered');
    
    // STEP 3: Final verification
    console.log('🔍 All commands registered, verifying...');
    setTimeout(() => {
        vscode.commands.getCommands(true).then(commands => {
            const dxpCommands = commands.filter(cmd => cmd.startsWith('dxpPromptLibrary'));
            console.log(`✅ Found ${dxpCommands.length} DXP commands:`, dxpCommands);
            
            if (dxpCommands.length === 6) {
                vscode.window.showInformationMessage('🎉 All 6 DXP commands registered successfully!');
            } else {
                vscode.window.showWarningMessage(`⚠️ Only ${dxpCommands.length}/6 commands registered`);
            }
        });
    }, 500);
}

export function deactivate() {
    console.log('🛑 Gradual build extension deactivated');
}
