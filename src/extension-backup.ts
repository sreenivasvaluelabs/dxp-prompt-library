import * as vscode from 'vscode';
import { PromptManager } from './promptManager';

export function activate(context: vscode.ExtensionContext) {
    console.log('=== DXP Prompt Library extension ACTIVATING ===');
    
    try {
        // STEP 1: Register test command IMMEDIATELY (no dependencies)
        console.log('🔧 Registering test command (no dependencies)...');
        const testCommand = vscode.commands.registerCommand('dxpPromptLibrary.test', () => {
            console.log('✅ TEST COMMAND EXECUTED SUCCESSFULLY!');
            vscode.window.showInformationMessage('✅ DXP Prompt Library is working correctly! 🎉');
            
            // Show detailed success info
            const timestamp = new Date().toLocaleTimeString();
            console.log(`✅ DXP Extension Test Successful at ${timestamp}`);
            
            vscode.window.showInformationMessage(
                'DXP Extension is active! All commands should work now.',
                'Show All Commands'
            ).then(selection => {
                if (selection === 'Show All Commands') {
                    vscode.commands.executeCommand('workbench.action.showCommands').then(() => {
                        // Small delay then search for DXP
                        setTimeout(() => {
                            vscode.commands.executeCommand('workbench.action.showCommands', 'DXP');
                        }, 100);
                    });
                }
            });
        });
        
        // IMMEDIATELY add to subscriptions and verify
        context.subscriptions.push(testCommand);
        console.log('✅ Test command registered and added to subscriptions');

        // STEP 2: Verify command registration immediately
        vscode.commands.getCommands(true).then(commands => {
            const hasTestCommand = commands.includes('dxpPromptLibrary.test');
            console.log(`🔍 Command verification: dxpPromptLibrary.test found = ${hasTestCommand}`);
            if (!hasTestCommand) {
                console.error('❌ CRITICAL: Test command not found in registered commands!');
            }
        });

        // STEP 3: Show immediate activation message
        console.log('📢 Showing activation message...');
        vscode.window.showInformationMessage('🚀 DXP Prompt Library is loading...');

        // STEP 4: Try to initialize PromptManager (but don't let it break the test command)
        let promptManager: PromptManager;
        try {
            console.log('🔧 Attempting to create PromptManager...');
            promptManager = new PromptManager(context);
            console.log('✅ PromptManager created successfully');
        } catch (error) {
            console.error('❌ PromptManager failed, but test command should still work:', error);
            vscode.window.showWarningMessage(`PromptManager initialization failed: ${error}`);
            
            // Return early but test command should still work
            console.log('✅ Extension activated with test command only (PromptManager failed)');
            return;
        }

        // STEP 5: Register other commands with PromptManager (if it loaded successfully)
        console.log('🔧 Registering other commands...');
        
        const openPromptPalette = vscode.commands.registerCommand('dxpPromptLibrary.openPromptPalette', async () => {
            console.log('🎯 openPromptPalette command executed');
            try {
                if (promptManager) {
                    await promptManager.openPromptPalette();
                } else {
                    vscode.window.showErrorMessage('PromptManager not initialized');
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
                    vscode.window.showErrorMessage('PromptManager not initialized');
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
                    vscode.window.showErrorMessage('PromptManager not initialized');
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
                    vscode.window.showErrorMessage('PromptManager not initialized');
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
                    vscode.window.showErrorMessage('PromptManager not initialized');
                }
            } catch (error) {
                console.error('❌ Error in filterBySDLC:', error);
                vscode.window.showErrorMessage(`Error filtering by SDLC: ${error}`);
            }
        });

        // STEP 6: Add all commands to subscriptions
        context.subscriptions.push(
            openPromptPalette,
            insertPrompt,
            searchPrompts,
            filterByComponent,
            filterBySDLC
        );
        console.log('✅ All commands registered and added to subscriptions');

        // STEP 7: Register event listeners (if PromptManager is available)
        if (promptManager) {
            const onDidChangeActiveTextEditor = vscode.window.onDidChangeActiveTextEditor(() => {
                promptManager.onEditorChanged();
            });

            const onDidChangeTextDocument = vscode.workspace.onDidChangeTextDocument((event) => {
                promptManager.onDocumentChanged(event);
            });

            context.subscriptions.push(onDidChangeActiveTextEditor, onDidChangeTextDocument);
            console.log('✅ Event listeners registered');

            // Initialize auto-suggestions if enabled
            const config = vscode.workspace.getConfiguration('dxpPromptLibrary');
            if (config.get('autoSuggest')) {
                promptManager.enableAutoSuggestions();
            }
        }

        // STEP 8: Show success message
        console.log('✅ DXP Prompt Library extension activated successfully!');
        
        // Final verification
        setTimeout(() => {
            vscode.commands.getCommands(true).then(commands => {
                const dxpCommands = commands.filter(cmd => cmd.startsWith('dxpPromptLibrary'));
                console.log('🎯 FINAL VERIFICATION - All registered DXP commands:', dxpCommands);
                
                if (dxpCommands.includes('dxpPromptLibrary.test')) {
                    console.log('✅ Test command is properly registered');
                    vscode.window.showInformationMessage(
                        '🎉 DXP Extension ready! Try "DXP: Test Extension" in Command Palette.',
                        'Test Now'
                    ).then(selection => {
                        if (selection === 'Test Now') {
                            vscode.commands.executeCommand('dxpPromptLibrary.test');
                        }
                    });
                } else {
                    console.error('❌ CRITICAL: Test command still not found after registration!');
                    vscode.window.showErrorMessage('DXP Extension registration failed');
                }
            });
        }, 500);
        
    } catch (error) {
        console.error('Error activating DXP Prompt Library extension:', error);
        vscode.window.showErrorMessage(`Failed to activate DXP Prompt Library: ${error}`);
    }
}

export function deactivate() {
    console.log('DXP Prompt Library extension is now deactivated.');
}
