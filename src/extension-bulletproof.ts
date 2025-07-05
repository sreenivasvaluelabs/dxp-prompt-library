import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    console.log('🚀 DXP Extension - BULLETPROOF VERSION ACTIVATING');
    
    // Show immediate activation proof
    vscode.window.showInformationMessage('🚀 DXP Extension Activated - Bulletproof Version!');
    
    // CRITICAL: Register ALL commands FIRST, with NO dependencies
    console.log('📝 Registering commands with bulletproof handlers...');
    
    try {
        // 1. Test command - simplest possible
        const testCommand = vscode.commands.registerCommand('dxpPromptLibrary.test', () => {
            console.log('✅ TEST COMMAND EXECUTED');
            vscode.window.showInformationMessage('✅ DXP Extension is working perfectly! 🎉');
        });
        context.subscriptions.push(testCommand);
        console.log('✅ Test command registered');

        // 2. Open Prompt Palette - with fallback implementation
        const openPromptPalette = vscode.commands.registerCommand('dxpPromptLibrary.openPromptPalette', async () => {
            console.log('🎯 openPromptPalette executed');
            try {
                // Simple implementation without PromptManager dependency
                const prompts = [
                    'Sitecore Helix: Create Foundation Module',
                    'Sitecore Helix: Create Feature Module', 
                    'Sitecore Helix: Create Project Module',
                    'Sitecore: Create Controller Rendering',
                    'Sitecore: Create View Rendering',
                    'Sitecore: Create Data Template'
                ];
                
                const selected = await vscode.window.showQuickPick(prompts, {
                    placeHolder: 'Select a DXP prompt template'
                });
                
                if (selected) {
                    vscode.window.showInformationMessage(`Selected: ${selected}`);
                }
            } catch (error) {
                console.error('Error in openPromptPalette:', error);
                vscode.window.showErrorMessage(`Prompt Palette error: ${error}`);
            }
        });
        context.subscriptions.push(openPromptPalette);
        console.log('✅ Open Prompt Palette command registered');

        // 3. Insert Prompt - with basic implementation
        const insertPrompt = vscode.commands.registerCommand('dxpPromptLibrary.insertPrompt', async () => {
            console.log('🎯 insertPrompt executed');
            try {
                const editor = vscode.window.activeTextEditor;
                if (!editor) {
                    vscode.window.showWarningMessage('No active editor found');
                    return;
                }
                
                const prompts = [
                    '// TODO: Implement Sitecore Helix architecture',
                    '// TODO: Create controller rendering for Sitecore',
                    '// TODO: Add Glass Mapper model',
                    '// TODO: Configure dependency injection'
                ];
                
                const selected = await vscode.window.showQuickPick(prompts, {
                    placeHolder: 'Select prompt to insert'
                });
                
                if (selected) {
                    const position = editor.selection.active;
                    editor.edit(editBuilder => {
                        editBuilder.insert(position, selected + '\n');
                    });
                }
            } catch (error) {
                console.error('Error in insertPrompt:', error);
                vscode.window.showErrorMessage(`Insert Prompt error: ${error}`);
            }
        });
        context.subscriptions.push(insertPrompt);
        console.log('✅ Insert Prompt command registered');

        // 4. Search Prompts - basic implementation
        const searchPrompts = vscode.commands.registerCommand('dxpPromptLibrary.searchPrompts', async () => {
            console.log('🎯 searchPrompts executed');
            try {
                const searchTerm = await vscode.window.showInputBox({
                    prompt: 'Search DXP prompts',
                    placeHolder: 'Enter search term (e.g., "controller", "helix", "sitecore")'
                });
                
                if (searchTerm) {
                    vscode.window.showInformationMessage(`Searching for: "${searchTerm}" - Feature coming soon!`);
                }
            } catch (error) {
                console.error('Error in searchPrompts:', error);
                vscode.window.showErrorMessage(`Search error: ${error}`);
            }
        });
        context.subscriptions.push(searchPrompts);
        console.log('✅ Search Prompts command registered');

        // 5. Filter by Component - basic implementation
        const filterByComponent = vscode.commands.registerCommand('dxpPromptLibrary.filterByComponent', async () => {
            console.log('🎯 filterByComponent executed');
            try {
                const components = [
                    'Foundation',
                    'Feature', 
                    'Project',
                    'Controllers',
                    'Views',
                    'Models',
                    'Templates'
                ];
                
                const selected = await vscode.window.showQuickPick(components, {
                    placeHolder: 'Filter by Helix component type'
                });
                
                if (selected) {
                    vscode.window.showInformationMessage(`Filtering by: ${selected} - Feature coming soon!`);
                }
            } catch (error) {
                console.error('Error in filterByComponent:', error);
                vscode.window.showErrorMessage(`Filter error: ${error}`);
            }
        });
        context.subscriptions.push(filterByComponent);
        console.log('✅ Filter by Component command registered');

        // 6. Filter by SDLC - basic implementation
        const filterBySDLC = vscode.commands.registerCommand('dxpPromptLibrary.filterBySDLC', async () => {
            console.log('🎯 filterBySDLC executed');
            try {
                const stages = [
                    'Planning',
                    'Development',
                    'Testing',
                    'Deployment',
                    'Maintenance'
                ];
                
                const selected = await vscode.window.showQuickPick(stages, {
                    placeHolder: 'Filter by SDLC stage'
                });
                
                if (selected) {
                    vscode.window.showInformationMessage(`Filtering by SDLC: ${selected} - Feature coming soon!`);
                }
            } catch (error) {
                console.error('Error in filterBySDLC:', error);
                vscode.window.showErrorMessage(`SDLC filter error: ${error}`);
            }
        });
        context.subscriptions.push(filterBySDLC);
        console.log('✅ Filter by SDLC command registered');

        console.log('🎉 ALL 6 COMMANDS REGISTERED SUCCESSFULLY!');
        
        // Immediate verification
        setTimeout(() => {
            vscode.commands.getCommands(true).then(commands => {
                const dxpCommands = commands.filter(cmd => cmd.startsWith('dxpPromptLibrary'));
                console.log(`🔍 Verification: ${dxpCommands.length}/6 DXP commands found`);
                console.log('📋 Found commands:', dxpCommands);
                
                if (dxpCommands.length === 6) {
                    vscode.window.showInformationMessage('🎉 All DXP commands registered and verified!');
                } else {
                    vscode.window.showWarningMessage(`⚠️ Only ${dxpCommands.length}/6 commands found`);
                }
            });
        }, 500);
        
    } catch (error) {
        console.error('❌ CRITICAL ERROR during command registration:', error);
        vscode.window.showErrorMessage(`Extension activation failed: ${error}`);
    }
    
    // OPTIONAL: Try to load advanced features AFTER commands are stable
    setTimeout(() => {
        try {
            console.log('🔧 Loading advanced features...');
            // This is where we would load PromptManager if needed
            // For now, keeping it simple and reliable
            console.log('✅ Advanced features placeholder loaded');
        } catch (error) {
            console.warn('⚠️ Advanced features failed to load (commands still work):', error);
        }
    }, 2000);
}

export function deactivate() {
    console.log('🛑 DXP Extension deactivated');
}
