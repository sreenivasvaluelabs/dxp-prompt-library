# DXP Prompt Library - Distribution & Installation Guide

## 🚀 For Others to Use on Their Local Machine

### Method 1: Install Pre-built VSIX Package (Easiest)

#### Prerequisites:
- Visual Studio Code installed
- No additional tools required

#### Steps:

1. **Get the VSIX File**
   ```
   Download: dxp-prompt-library-1.0.0.vsix
   From: c:\Users\HP\Downloads\DXP\dxp-prompt-library\dxp-prompt-library-1.0.0.vsix
   ```

2. **Install via VS Code UI**
   - Open VS Code
   - Press `Ctrl+Shift+P` → Type "Extensions: Install from VSIX"
   - Select the `dxp-prompt-library-1.0.0.vsix` file
   - Wait for installation to complete
   - Restart VS Code if prompted

3. **Install via Command Line**
   ```bash
   # Windows
   code --install-extension dxp-prompt-library-1.0.0.vsix
   
   # macOS/Linux
   code --install-extension dxp-prompt-library-1.0.0.vsix
   ```

4. **Verify Installation**
   - Press `Ctrl+Shift+P`
   - Type "DXP:" - you should see all DXP commands
   - Try "DXP: Insert Prompt" to test functionality

### Method 2: Build from Source (Developers)

#### Prerequisites:
- Node.js (v16 or higher)
- npm or yarn
- Visual Studio Code
- Git (optional)

#### Steps:

1. **Get Source Code**
   ```bash
   # Option A: Copy the entire folder
   Copy folder: c:\Users\HP\Downloads\DXP\dxp-prompt-library
   To: C:\YourPath\dxp-prompt-library
   
   # Option B: Clone if it's in a Git repository
   git clone [repository-url]
   cd dxp-prompt-library
   ```

2. **Install Dependencies**
   ```bash
   cd dxp-prompt-library
   npm install
   ```

3. **Compile TypeScript**
   ```bash
   npm run compile
   ```

4. **Package Extension**
   ```bash
   # Install VSCE if not already installed
   npm install -g @vscode/vsce
   
   # Package the extension
   npx vsce package
   ```

5. **Install Generated VSIX**
   ```bash
   code --install-extension dxp-prompt-library-1.0.0.vsix
   ```

### Method 3: Development Mode (For Contributors)

#### Steps:

1. **Open in VS Code**
   ```bash
   cd dxp-prompt-library
   code .
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Run in Development Mode**
   - Press `F5` in VS Code
   - This opens a new "Extension Development Host" window
   - Test the extension in this development window

4. **Make Changes and Test**
   - Edit `src/extension.ts` or other files
   - Press `Ctrl+Shift+F5` to reload extension
   - Test changes immediately

---

## 📦 Publishing to VS Code Marketplace (For Public Distribution)

### Prerequisites for Publishing

1. **Visual Studio Marketplace Account**
   - Create account at: https://marketplace.visualstudio.com/manage
   - You'll need a Microsoft account

2. **Azure DevOps Organization**
   - Create at: https://dev.azure.com/
   - Link to your Marketplace account

3. **Personal Access Token (PAT)**
   - In Azure DevOps → User Settings → Personal Access Tokens
   - Create token with "Marketplace (publish)" scope

4. **VSCE Tool**
   ```bash
   npm install -g @vscode/vsce
   ```

### Step-by-Step Publishing Process

#### Step 1: Prepare Extension for Publishing

1. **Update package.json for Marketplace**
   ```json
   {
     "name": "dxp-prompt-library",
     "displayName": "DXP Prompt Library",
     "description": "AI-powered prompt library for Sitecore 10.4 development with Helix architecture",
     "version": "1.0.0",
     "publisher": "your-publisher-name",  // ← Change this
     "engines": {
       "vscode": "^1.80.0"
     },
     "repository": {
       "type": "git",
       "url": "https://github.com/your-username/dxp-prompt-library.git"  // ← Add this
     },
     "homepage": "https://github.com/your-username/dxp-prompt-library",  // ← Add this
     "bugs": {
       "url": "https://github.com/your-username/dxp-prompt-library/issues"  // ← Add this
     },
     "license": "MIT",  // ← Add license
     "icon": "icon.png",  // ← Add 128x128 icon (optional)
     "categories": [
       "Other",
       "Snippets",
       "AI"
     ],
     "keywords": [
       "sitecore",
       "helix",
       "prompt",
       "copilot",
       "ai",
       "cognizant",
       "dxp"
     ]
   }
   ```

2. **Create Required Files**
   ```bash
   # Create icon (128x128 PNG)
   # Add: icon.png
   
   # Create or update LICENSE file
   # Add: LICENSE.txt
   
   # Update README.md for marketplace
   # Ensure it explains installation and usage clearly
   ```

3. **Test Extension Thoroughly**
   ```bash
   # Compile and test
   npm run compile
   npx vsce package
   code --install-extension dxp-prompt-library-1.0.0.vsix
   
   # Test all commands work correctly
   ```

#### Step 2: Create Publisher Account

1. **Go to Visual Studio Marketplace**
   - Visit: https://marketplace.visualstudio.com/manage
   - Sign in with Microsoft account

2. **Create Publisher**
   - Click "Create publisher"
   - Enter details:
     - Publisher ID: `cognizant-dxp` (or your choice)
     - Publisher name: `Cognizant DXP Team`
     - Email: your-email@company.com

3. **Get Personal Access Token**
   - Go to Azure DevOps: https://dev.azure.com/
   - User Settings → Personal Access Tokens
   - Create new token:
     - Name: "VS Code Extension Publishing"
     - Scopes: "Marketplace (publish)"
     - Copy the token (save it securely!)

#### Step 3: Configure VSCE

1. **Login to VSCE**
   ```bash
   vsce login your-publisher-name
   # Enter your Personal Access Token when prompted
   ```

2. **Verify Publisher**
   ```bash
   vsce ls-publishers
   # Should show your publisher
   ```

#### Step 4: Publish Extension

1. **Initial Publish**
   ```bash
   # Make sure you're in the extension directory
   cd dxp-prompt-library
   
   # Publish to marketplace
   vsce publish
   ```

2. **Update Version and Republish**
   ```bash
   # Update version in package.json (e.g., 1.0.1)
   # Or use vsce to auto-increment
   vsce publish patch  # 1.0.0 → 1.0.1
   vsce publish minor  # 1.0.0 → 1.1.0
   vsce publish major  # 1.0.0 → 2.0.0
   ```

#### Step 5: Verify Publication

1. **Check Marketplace**
   - Visit: https://marketplace.visualstudio.com/
   - Search for "DXP Prompt Library"
   - Verify extension appears and details are correct

2. **Test Installation**
   ```bash
   # Install from marketplace
   code --install-extension your-publisher-name.dxp-prompt-library
   ```

### Advanced Publishing Options

#### Automated Publishing with GitHub Actions

Create `.github/workflows/publish.yml`:

```yaml
name: Publish Extension

on:
  push:
    tags:
      - 'v*'

jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        
    - name: Install dependencies
      run: npm install
      
    - name: Compile TypeScript
      run: npm run compile
      
    - name: Publish to VS Code Marketplace
      env:
        VSCE_PAT: ${{ secrets.VSCE_PAT }}
      run: |
        npm install -g @vscode/vsce
        vsce publish
```

#### Pre-release Versions

```bash
# Publish as pre-release
vsce publish --pre-release

# Specific pre-release version
vsce publish 1.1.0-beta.1 --pre-release
```

---

## 📋 Distribution Checklist

### Before Sharing VSIX File:

- [ ] All commands work correctly
- [ ] No TypeScript compilation errors
- [ ] Extension activates without errors
- [ ] README.md is comprehensive
- [ ] Version number is correct in package.json
- [ ] File size is reasonable (current: ~75KB)

### Before Publishing to Marketplace:

- [ ] Publisher account created and verified
- [ ] Personal Access Token obtained
- [ ] Repository URL added to package.json
- [ ] License file included
- [ ] Icon added (128x128 PNG)
- [ ] Keywords and categories optimized
- [ ] Description is marketplace-friendly
- [ ] All links work correctly
- [ ] Extension tested on clean VS Code installation

### Post-Publication:

- [ ] Extension appears in marketplace search
- [ ] Installation from marketplace works
- [ ] All functionality works when installed from marketplace
- [ ] Documentation updated with marketplace link
- [ ] Release notes published

---

## 🔗 Quick Links for Users

### Install from VSIX (Immediate Use):
1. Download `dxp-prompt-library-1.0.0.vsix`
2. VS Code → `Ctrl+Shift+P` → "Extensions: Install from VSIX"
3. Select the file and install

### Install from Marketplace (Once Published):
1. VS Code → Extensions tab (`Ctrl+Shift+X`)
2. Search "DXP Prompt Library"
3. Click "Install"

### Verify Installation:
1. `Ctrl+Shift+P` → Type "DXP:"
2. You should see all DXP commands available
3. Try "DXP: Insert Prompt" to test

The extension is now ready for distribution through either method!
