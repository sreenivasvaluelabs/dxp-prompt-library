# Step-by-Step Publishing Guide to VS Code Marketplace

## 🎯 Complete Publishing Process

### Phase 1: Pre-Publication Preparation

#### Step 1: Create Publisher Account (5 minutes)
1. **Go to Visual Studio Marketplace**
   ```
   https://marketplace.visualstudio.com/manage
   ```
2. **Sign in** with Microsoft account
3. **Create new publisher**
   - Publisher ID: `cognizant-dxp` (or your choice)
   - Display Name: `Cognizant DXP Team`
   - Email: your-email@company.com
4. **Verify email** if prompted

#### Step 2: Set Up Azure DevOps (3 minutes)
1. **Go to Azure DevOps**
   ```
   https://dev.azure.com/
   ```
2. **Create organization** (free tier is sufficient)
3. **Go to User Settings** → Personal Access Tokens
4. **Create new token**
   - Name: "VS Code Extension Publishing"
   - Expiration: 1 year
   - Scopes: Select "Marketplace (publish)"
   - **Copy and save the token securely!**

#### Step 3: Install Publishing Tools (2 minutes)
```bash
# Install VSCE globally
npm install -g @vscode/vsce

# Verify installation
vsce --version
```

### Phase 2: Prepare Extension for Publishing

#### Step 4: Update Package.json (Already Done!)
The package.json is already marketplace-ready with:
- ✅ Repository URL
- ✅ License
- ✅ Homepage
- ✅ Bug report URL
- ✅ Keywords and categories

#### Step 5: Create Extension Icon (Optional)
```bash
# Create a 128x128 PNG icon named "icon.png"
# Place it in the root directory
# Then add to package.json:
# "icon": "icon.png"
```

For now, we can publish without an icon (VS Code will use a default).

#### Step 6: Final Quality Check
```bash
cd "c:\Users\HP\Downloads\DXP\dxp-prompt-library"

# Compile and test
npm run compile

# Package locally to test
npx vsce package

# Test the packaged extension
code --install-extension dxp-prompt-library-1.0.0.vsix

# Test all commands work
# Ctrl+Shift+P → "DXP:" → Test each command
```

### Phase 3: Publish to Marketplace

#### Step 7: Login to VSCE
```bash
# Login with your publisher name
vsce login cognizant-dxp

# When prompted, enter your Personal Access Token from Step 2
```

#### Step 8: Publish Extension
```bash
cd "c:\Users\HP\Downloads\DXP\dxp-prompt-library"

# Publish to marketplace
vsce publish

# You should see output like:
# "Publishing cognizant-dxp.dxp-prompt-library@1.0.0..."
# "Extension published successfully!"
```

#### Step 9: Verify Publication (5 minutes)
1. **Check marketplace**
   ```
   https://marketplace.visualstudio.com/search?term=dxp%20prompt%20library
   ```
2. **Verify extension appears**
3. **Test installation from marketplace**
   ```bash
   # Uninstall local version first
   code --uninstall-extension cognizant-dxp.dxp-prompt-library
   
   # Install from marketplace
   code --install-extension cognizant-dxp.dxp-prompt-library
   ```

### Phase 4: Post-Publication

#### Step 10: Update Documentation
1. **Add marketplace badge to README**
2. **Update installation instructions**
3. **Share with team and community**

#### Step 11: Monitor and Maintain
1. **Check extension statistics** in publisher portal
2. **Monitor user feedback** and issues
3. **Plan future updates**

---

## 🚀 For Immediate Local Distribution (Before Marketplace)

### Option A: Share VSIX File

1. **Package the extension**
   ```bash
   npx vsce package
   ```

2. **Share the file**
   ```
   File: dxp-prompt-library-1.0.0.vsix
   Size: ~75KB
   ```

3. **Installation instructions for users**
   ```bash
   # Method 1: Command line
   code --install-extension dxp-prompt-library-1.0.0.vsix
   
   # Method 2: VS Code UI
   # Ctrl+Shift+P → "Extensions: Install from VSIX" → Select file
   ```

### Option B: GitHub Repository Distribution

1. **Create GitHub repository**
   ```bash
   git init
   git add .
   git commit -m "Initial DXP Prompt Library release"
   git remote add origin https://github.com/your-username/dxp-prompt-library.git
   git push -u origin main
   ```

2. **Create GitHub Release**
   - Go to GitHub repository
   - Releases → Create new release
   - Tag: v1.0.0
   - Upload: dxp-prompt-library-1.0.0.vsix
   - Description: Release notes

3. **Users can download**
   ```
   https://github.com/your-username/dxp-prompt-library/releases/latest
   ```

---

## 📋 Publishing Checklist

### Pre-Publication ✅
- [x] Extension compiles without errors
- [x] All commands tested and working
- [x] Package.json has marketplace metadata
- [x] LICENSE.txt file created
- [x] README.md is comprehensive
- [ ] Icon created (optional for v1.0.0)
- [ ] Publisher account created
- [ ] Personal Access Token obtained

### Publication Process ⏳
- [ ] VSCE tool installed
- [ ] Logged into VSCE with publisher account
- [ ] Extension published successfully
- [ ] Marketplace listing verified
- [ ] Installation from marketplace tested

### Post-Publication 📈
- [ ] Documentation updated with marketplace link
- [ ] Team notified of release
- [ ] Community announcement (if applicable)
- [ ] Monitor for user feedback
- [ ] Plan next version features

---

## 🎯 Quick Commands Summary

```bash
# Development
npm install
npm run compile
npx vsce package

# Testing
code --install-extension dxp-prompt-library-1.0.0.vsix

# Publishing
npm install -g @vscode/vsce
vsce login your-publisher-name
vsce publish

# Updating
vsce publish patch  # 1.0.0 → 1.0.1
vsce publish minor  # 1.0.0 → 1.1.0
vsce publish major  # 1.0.0 → 2.0.0
```

## 📞 Support During Publishing

If you encounter issues:
1. **VSCE Documentation**: https://code.visualstudio.com/api/working-with-extensions/publishing-extension
2. **Common Issues**: Check TROUBLESHOOTING.md
3. **VS Code Extension Guidelines**: https://code.visualstudio.com/api/references/extension-guidelines

The extension is ready for both immediate local distribution and marketplace publishing!
