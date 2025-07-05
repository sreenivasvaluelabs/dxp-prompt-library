#!/usr/bin/env node

console.log('🔍 Testing DXP Extension Commands...\n');

const { execSync } = require('child_process');

try {
    // Check if extension is installed
    const extensions = execSync('code --list-extensions', { encoding: 'utf8' });
    
    if (extensions.includes('cognizant-dxp.dxp-prompt-library')) {
        console.log('✅ Extension is installed: cognizant-dxp.dxp-prompt-library');
    } else {
        console.log('❌ Extension not found!');
        console.log('Installed extensions:', extensions);
        process.exit(1);
    }

    console.log('\n📋 To test the commands:');
    console.log('1. Close VS Code completely if it\'s open');
    console.log('2. Open VS Code again');
    console.log('3. Press Ctrl+Shift+P');
    console.log('4. Type "DXP" - you should see these commands:');
    console.log('   • DXP: Test Extension');
    console.log('   • DXP: Open Prompt Palette');
    console.log('   • DXP: Insert Prompt');
    console.log('   • DXP: Search Prompts');
    console.log('   • DXP: Filter by Component');
    console.log('   • DXP: Filter by SDLC Stage');

    console.log('\n🎯 Quick Test:');
    console.log('- Try "DXP: Test Extension" first');
    console.log('- You should see: "✅ DXP Prompt Library is working correctly! 🎉"');

    console.log('\n🔧 If commands still don\'t appear:');
    console.log('1. Check Developer Console: Help → Toggle Developer Tools → Console');
    console.log('2. Look for DXP activation logs');
    console.log('3. Check Extensions panel: Ctrl+Shift+X → Search "DXP"');

    console.log('\n🚀 Opening VS Code for you...');
    
    // Open VS Code
    setTimeout(() => {
        try {
            execSync('code .', { stdio: 'inherit' });
        } catch (error) {
            console.log('Note: Please open VS Code manually to test the extension.');
        }
    }, 1000);

} catch (error) {
    console.error('❌ Error:', error.message);
}
