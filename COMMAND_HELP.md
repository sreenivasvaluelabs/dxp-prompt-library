# How to Run DXP Extension Commands

## ❌ Incorrect Way (What you tried)
```
dxppromtlibrary .est
```
This won't work because:
1. It has typos: should be `dxpPromptLibrary.test`
2. Extension commands can't be run directly from the terminal
3. They must be executed through VS Code's Command Palette

## ✅ Correct Way

### Method 1: Using VS Code Command Palette (Recommended)
1. **Open VS Code**
2. **Press `Ctrl+Shift+P`** (Windows/Linux) or `Cmd+Shift+P` (Mac)
3. **Type: `DXP: Test Extension`**
4. **Press Enter** to execute

### Method 2: Using VS Code's executeCommand API
If you want to run it programmatically, you can use:
```javascript
vscode.commands.executeCommand('dxpPromptLibrary.test');
```

## 🎯 Available Commands
When you open the Command Palette and type "DXP", you'll see:

- **DXP: Test Extension** (`dxpPromptLibrary.test`)
- **DXP: Open Prompt Palette** (`dxpPromptLibrary.openPromptPalette`)
- **DXP: Insert Prompt** (`dxpPromptLibrary.insertPrompt`)
- **DXP: Search Prompts** (`dxpPromptLibrary.searchPrompts`)
- **DXP: Filter by Component** (`dxpPromptLibrary.filterByComponent`)
- **DXP: Filter by SDLC Stage** (`dxpPromptLibrary.filterBySDLC`)

## 🔍 Quick Test Steps
1. Open VS Code
2. Press `Ctrl+Shift+P`
3. Type `DXP: Test`
4. Select "DXP: Test Extension"
5. You should see: "✅ DXP Prompt Library is working correctly!"

## 💡 Troubleshooting
If commands don't appear:
- Restart VS Code completely
- Check Extensions panel (Ctrl+Shift+X) for "DXP Prompt Library"
- Look at Output panel: View → Output → Select "DXP Prompt Library"
