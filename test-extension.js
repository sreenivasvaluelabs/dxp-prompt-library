// Test script to verify VS Code extension commands
const { execSync } = require('child_process');

console.log('Testing DXP Prompt Library Extension...');

try {
    // Check if extension is installed
    const listResult = execSync('code --list-extensions', { encoding: 'utf8' });
    if (listResult.includes('cognizant-dxp.dxp-prompt-library')) {
        console.log('✅ Extension is installed');
    } else {
        console.log('❌ Extension is not found in installed extensions');
        console.log('Installed extensions:', listResult);
        process.exit(1);
    }

    // Test getting extension info
    console.log('📝 Extension appears to be properly installed');
    console.log('');
    console.log('To test the commands:');
    console.log('1. Open VS Code manually');
    console.log('2. Press Ctrl+Shift+P to open Command Palette');
    console.log('3. Type "DXP" to see available commands');
    console.log('4. Try running "DXP: Test Extension" command');
    console.log('');
    console.log('Available commands should include:');
    console.log('- DXP: Test Extension');
    console.log('- DXP: Open Prompt Palette');
    console.log('- DXP: Insert Prompt');
    console.log('- DXP: Search Prompts');
    console.log('- DXP: Filter by Component');
    console.log('- DXP: Filter by SDLC Stage');

} catch (error) {
    console.error('❌ Error testing extension:', error.message);
    process.exit(1);
}
