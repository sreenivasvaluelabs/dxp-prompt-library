# 🔧 DXP Extension Command Troubleshooting

## ✅ Extension Status
- **Installed**: ✅ cognizant-dxp.dxp-prompt-library@1.0.0
- **Compiled**: ✅ No errors
- **Enhanced Logging**: ✅ Added detailed diagnostics

## 🎯 **SOLUTION: How to Find DXP Commands**

### ❌ **Wrong Way** (what you tried):
```
dxp libray.test  # This won't work - typos and wrong interface
```

### ✅ **Correct Way**:
1. **Close VS Code completely** (important!)
2. **Reopen VS Code**
3. **Press `Ctrl+Shift+P`** to open Command Palette
4. **Type exactly: `DXP`** (not dxp, not dxppromtlibrary)
5. **You should see 6 commands appear:**
   - `DXP: Test Extension`
   - `DXP: Open Prompt Palette`
   - `DXP: Insert Prompt`
   - `DXP: Search Prompts`
   - `DXP: Filter by Component`
   - `DXP: Filter by SDLC Stage`

## 🚨 **If Commands Still Don't Appear**

### Step 1: Force Extension Reload
1. Open VS Code
2. Press `Ctrl+Shift+P`
3. Type: `Developer: Reload Window`
4. Press Enter
5. Try again with `Ctrl+Shift+P` → `DXP`

### Step 2: Check Extension Status
1. Press `Ctrl+Shift+X` (Extensions view)
2. Search for "DXP"
3. Make sure "DXP Prompt Library" is **enabled**
4. If disabled, click the enable button

### Step 3: Check Developer Console
1. Press `F12` or `Help → Toggle Developer Tools`
2. Go to **Console** tab
3. Look for DXP activation messages like:
   ```
   === DXP Prompt Library extension ACTIVATING ===
   ✅ Test command registered successfully
   ```

### Step 4: Manual Command Test
1. Press `Ctrl+Shift+P`
2. Type the FULL command: `dxpPromptLibrary.test`
3. If this works, the extension is active but title display might be wrong

## 🎯 **Expected Behavior**
When you type "DXP" in Command Palette, you should immediately see:
```
🔍 DXP: Test Extension
🔍 DXP: Open Prompt Palette  
🔍 DXP: Insert Prompt
🔍 DXP: Search Prompts
🔍 DXP: Filter by Component
🔍 DXP: Filter by SDLC Stage
```

## ⚡ **Quick Test**
Try this exact sequence:
1. `Ctrl+Shift+P`
2. Type: `DXP: Test`
3. Select: `DXP: Test Extension`
4. Expected result: "✅ DXP Prompt Library is working correctly! 🎉"

## 📞 **Still Having Issues?**
The extension has been enhanced with detailed logging. Check the VS Code Output panel:
1. `View → Output`
2. Select "DXP Prompt Library" from dropdown
3. Look for activation and command registration logs
