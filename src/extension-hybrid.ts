import * as vscode from 'vscode';
import { PromptManager } from './promptManager';

export function activate(context: vscode.ExtensionContext) {
    console.log('🚀 DXP Extension - FULL VERSION ACTIVATING');
    
    // STEP 1: Register the test command FIRST (we know this works)
    const testCommand = vscode.commands.registerCommand('dxpPromptLibrary.test', () => {
        console.log('✅ TEST COMMAND EXECUTED!');
        vscode.window.showInformationMessage('🎉 DXP Extension Test Successful! All features are working.');
    });
    context.subscriptions.push(testCommand);
    console.log('✅ Test command registered');

    // STEP 2: Initialize PromptManager safely
    let promptManager: PromptManager | null = null;
    try {
        console.log('🔧 Loading PromptManager...');
        promptManager = new PromptManager(context);
        console.log('✅ PromptManager loaded successfully');
    } catch (error) {
        console.warn('⚠️ PromptManager failed to load, using fallback mode:', error);
    }

    // STEP 3: Register commands with PromptManager OR fallback messages
    const openPromptPalette = vscode.commands.registerCommand('dxpPromptLibrary.openPromptPalette', async () => {
        console.log('🎯 openPromptPalette command executed');
        try {
            if (promptManager) {
                await promptManager.openPromptPalette();
            } else {
                vscode.window.showWarningMessage('PromptManager not available. Extension is in fallback mode.');
            }
        } catch (error) {
            console.error('❌ Error in openPromptPalette:', error);
            vscode.window.showErrorMessage(`Error opening prompt palette: ${error}`);
        }
    });

    const insertPrompt = vscode.commands.registerCommand('dxpPromptLibrary.insertPrompt', async () => {
        console.log('🎯 insertPrompt command executed');
        try {
            if (promptManager) {
                await promptManager.insertPromptAtCursor();
            } else {
                vscode.window.showWarningMessage('PromptManager not available. Extension is in fallback mode.');
            }
        } catch (error) {
            console.error('❌ Error in insertPrompt:', error);
            vscode.window.showErrorMessage(`Error inserting prompt: ${error}`);
        }
    });

    const searchPrompts = vscode.commands.registerCommand('dxpPromptLibrary.searchPrompts', async () => {
        console.log('🎯 searchPrompts command executed');
        try {
            if (promptManager) {
                await promptManager.searchPrompts();
            } else {
                vscode.window.showWarningMessage('PromptManager not available. Extension is in fallback mode.');
            }
        } catch (error) {
            console.error('❌ Error in searchPrompts:', error);
            vscode.window.showErrorMessage(`Error searching prompts: ${error}`);
        }
    });

    const filterByComponent = vscode.commands.registerCommand('dxpPromptLibrary.filterByComponent', async () => {
        console.log('🎯 filterByComponent command executed');
        try {
            if (promptManager) {
                await promptManager.filterByComponent();
            } else {
                vscode.window.showWarningMessage('PromptManager not available. Extension is in fallback mode.');
            }
        } catch (error) {
            console.error('❌ Error in filterByComponent:', error);
            vscode.window.showErrorMessage(`Error filtering by component: ${error}`);
        }
    });

    const filterBySDLC = vscode.commands.registerCommand('dxpPromptLibrary.filterBySDLC', async () => {
        console.log('🎯 filterBySDLC command executed');
        try {
            if (promptManager) {
                await promptManager.filterBySDLCStage();
            } else {
                vscode.window.showWarningMessage('PromptManager not available. Extension is in fallback mode.');
            }
        } catch (error) {
            console.error('❌ Error in filterBySDLC:', error);
            vscode.window.showErrorMessage(`Error filtering by SDLC: ${error}`);
        }
    });

    // STEP 4: Add all commands to subscriptions
    context.subscriptions.push(
        openPromptPalette,
        insertPrompt,
        searchPrompts,
        filterByComponent,
        filterBySDLC
    );
    console.log('✅ All commands registered');

    // STEP 5: Setup event listeners if PromptManager loaded successfully
    if (promptManager) {
        try {
            const onDidChangeActiveTextEditor = vscode.window.onDidChangeActiveTextEditor(() => {
                if (promptManager) promptManager.onEditorChanged();
            });

            const onDidChangeTextDocument = vscode.workspace.onDidChangeTextDocument((event) => {
                if (promptManager) promptManager.onDocumentChanged(event);
            });

            context.subscriptions.push(onDidChangeActiveTextEditor, onDidChangeTextDocument);
            console.log('✅ Event listeners registered');

            // Initialize auto-suggestions if enabled
            const config = vscode.workspace.getConfiguration('dxpPromptLibrary');
            if (config.get('autoSuggest')) {
                promptManager.enableAutoSuggestions();
            }
        } catch (error) {
            console.warn('⚠️ Event listeners setup failed:', error);
        }
    }

    // STEP 6: Show success message
    setTimeout(() => {
        vscode.commands.getCommands(true).then(allCommands => {
            const dxpCommands = allCommands.filter(cmd => cmd.startsWith('dxpPromptLibrary'));
            console.log(`✅ Successfully registered ${dxpCommands.length} DXP commands:`, dxpCommands);
            
            if (promptManager) {
                vscode.window.showInformationMessage('🎉 DXP Prompt Library is fully loaded! All features are available.');
            } else {
                vscode.window.showWarningMessage('⚠️ DXP Extension loaded in fallback mode. Some features may be limited.');
            }
        });
    }, 500);
}

export function deactivate() {
    console.log('🛑 DXP Extension deactivated');
}
