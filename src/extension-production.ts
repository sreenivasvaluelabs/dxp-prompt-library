import * as vscode from 'vscode';
import { PromptManager } from './promptManager';

export function activate(context: vscode.ExtensionContext) {
    console.log('🚀 DXP Extension - PRODUCTION VERSION ACTIVATING');
    
    // STEP 1: Register ALL commands first (we know this works)
    console.log('📝 Registering all commands...');
    
    let promptManager: PromptManager | null = null;
    
    // Test command - always works
    const testCommand = vscode.commands.registerCommand('dxpPromptLibrary.test', () => {
        console.log('✅ TEST COMMAND SUCCESS!');
        const status = promptManager ? 'with full functionality' : 'in basic mode';
        vscode.window.showInformationMessage(`✅ DXP Extension is working ${status}!`);
    });
    context.subscriptions.push(testCommand);
    
    // Other commands with PromptManager integration OR fallback
    const openPromptPalette = vscode.commands.registerCommand('dxpPromptLibrary.openPromptPalette', async () => {
        console.log('🎯 openPromptPalette executed');
        try {
            if (promptManager) {
                await promptManager.openPromptPalette();
            } else {
                vscode.window.showInformationMessage('🔧 Loading PromptManager functionality...');
                // Could implement basic functionality here as fallback
            }
        } catch (error) {
            console.error('Error in openPromptPalette:', error);
            vscode.window.showErrorMessage(`Prompt Palette error: ${error}`);
        }
    });
    context.subscriptions.push(openPromptPalette);
    
    const insertPrompt = vscode.commands.registerCommand('dxpPromptLibrary.insertPrompt', async () => {
        console.log('🎯 insertPrompt executed');
        try {
            if (promptManager) {
                await promptManager.insertPromptAtCursor();
            } else {
                vscode.window.showInformationMessage('🔧 PromptManager not available. Basic mode active.');
            }
        } catch (error) {
            console.error('Error in insertPrompt:', error);
            vscode.window.showErrorMessage(`Insert Prompt error: ${error}`);
        }
    });
    context.subscriptions.push(insertPrompt);
    
    const searchPrompts = vscode.commands.registerCommand('dxpPromptLibrary.searchPrompts', async () => {
        console.log('🎯 searchPrompts executed');
        try {
            if (promptManager) {
                await promptManager.searchPrompts();
            } else {
                vscode.window.showInformationMessage('🔧 Search functionality requires PromptManager.');
            }
        } catch (error) {
            console.error('Error in searchPrompts:', error);
            vscode.window.showErrorMessage(`Search Prompts error: ${error}`);
        }
    });
    context.subscriptions.push(searchPrompts);
    
    const filterByComponent = vscode.commands.registerCommand('dxpPromptLibrary.filterByComponent', async () => {
        console.log('🎯 filterByComponent executed');
        try {
            if (promptManager) {
                await promptManager.filterByComponent();
            } else {
                vscode.window.showInformationMessage('🔧 Component filtering requires PromptManager.');
            }
        } catch (error) {
            console.error('Error in filterByComponent:', error);
            vscode.window.showErrorMessage(`Filter by Component error: ${error}`);
        }
    });
    context.subscriptions.push(filterByComponent);
    
    const filterBySDLC = vscode.commands.registerCommand('dxpPromptLibrary.filterBySDLC', async () => {
        console.log('🎯 filterBySDLC executed');
        try {
            if (promptManager) {
                await promptManager.filterBySDLCStage();
            } else {
                vscode.window.showInformationMessage('🔧 SDLC filtering requires PromptManager.');
            }
        } catch (error) {
            console.error('Error in filterBySDLC:', error);
            vscode.window.showErrorMessage(`Filter by SDLC error: ${error}`);
        }
    });
    context.subscriptions.push(filterBySDLC);
    
    console.log('✅ All 6 commands registered successfully');
    
    // STEP 2: Try to initialize PromptManager AFTER commands are registered
    setTimeout(() => {
        try {
            console.log('🔧 Attempting to load PromptManager...');
            promptManager = new PromptManager(context);
            console.log('✅ PromptManager loaded successfully!');
            
            // Setup event listeners
            const onDidChangeActiveTextEditor = vscode.window.onDidChangeActiveTextEditor(() => {
                if (promptManager) promptManager.onEditorChanged();
            });
            
            const onDidChangeTextDocument = vscode.workspace.onDidChangeTextDocument((event) => {
                if (promptManager) promptManager.onDocumentChanged(event);
            });
            
            context.subscriptions.push(onDidChangeActiveTextEditor, onDidChangeTextDocument);
            
            // Initialize auto-suggestions if enabled
            const config = vscode.workspace.getConfiguration('dxpPromptLibrary');
            if (config.get('autoSuggest')) {
                promptManager.enableAutoSuggestions();
            }
            
            vscode.window.showInformationMessage('🎉 DXP Prompt Library fully loaded! All Sitecore/Helix features available.');
            
        } catch (error) {
            console.warn('⚠️ PromptManager failed to load, but commands still work:', error);
            vscode.window.showWarningMessage('⚠️ DXP Extension in basic mode. Some features limited.');
        }
    }, 1000); // Delay PromptManager loading to ensure commands are registered first
    
    // STEP 3: Final verification
    setTimeout(() => {
        vscode.commands.getCommands(true).then(commands => {
            const dxpCommands = commands.filter(cmd => cmd.startsWith('dxpPromptLibrary'));
            console.log(`🎯 Final verification: ${dxpCommands.length} DXP commands registered`);
        });
    }, 1500);
}

export function deactivate() {
    console.log('🛑 DXP Extension deactivated');
}
