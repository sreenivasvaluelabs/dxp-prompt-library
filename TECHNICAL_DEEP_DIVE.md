# DXP Prompt Library - Technical Deep Dive

## 🔍 How DXP Extension Works: Complete Technical Flow

### 1. Command Registration & Discovery (Ctrl+Shift+P Flow)

#### A. Extension Activation
When VS Code starts, the DXP extension activates because of the configuration in `package.json`:

```json
// package.json lines 18-20
"activationEvents": [
    "onStartupFinished"
]
```

#### B. Command Registration Process
**File: `src/extension.ts` (Lines 1-100)**

```typescript
export function activate(context: vscode.ExtensionContext) {
    // All commands are registered here with bulletproof handlers
    
    const insertPrompt = vscode.commands.registerCommand('dxpPromptLibrary.insertPrompt', async () => {
        // Command handler logic
    });
    context.subscriptions.push(insertPrompt);
}
```

#### C. Command Palette Integration
**File: `package.json` (Lines 70-85)**

Commands appear in Command Palette because they're registered in TWO places:

1. **Command Definition** (`contributes.commands`):
```json
{
    "command": "dxpPromptLibrary.insertPrompt",
    "title": "DXP: Insert Prompt",
    "category": "DXP Prompt Library"
}
```

2. **Command Palette Menu** (`contributes.menus.commandPalette`):
```json
{
    "command": "dxpPromptLibrary.insertPrompt"
}
```

### 2. When You Press Ctrl+Shift+P

#### Step 1: VS Code Command Palette Opens
- VS Code scans all registered commands
- Filters commands that have `commandPalette` menu contributions
- Shows commands with "DXP:" prefix

#### Step 2: User Types "DXP"
- VS Code filters and shows:
  - `DXP: Insert Prompt`
  - `DXP: Open Prompt Palette`
  - `DXP: Search Prompts`
  - `DXP: Filter by Component`
  - etc.

#### Step 3: User Selects "DXP: Insert Prompt"
- VS Code calls: `vscode.commands.executeCommand('dxpPromptLibrary.insertPrompt')`
- This triggers the registered handler in `extension.ts`

### 3. Insert Prompt Command Flow

#### A. Handler Execution (Lines 84-260)
```typescript
const insertPrompt = vscode.commands.registerCommand('dxpPromptLibrary.insertPrompt', async () => {
    // 1. Check if editor is active
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
        vscode.window.showWarningMessage('No active editor found');
        return;
    }
    
    // 2. Show quick pick with predefined prompts
    const prompts = [
        {
            label: '🏗️ Foundation Service Interface',
            snippet: `// Foundation service interface code...`,
            description: 'Creates a foundation layer service interface'
        },
        // ... more prompts
    ];
    
    // 3. Show VS Code QuickPick UI
    const selected = await vscode.window.showQuickPick(prompts, {
        placeHolder: 'Select code snippet to insert',
        matchOnDescription: true
    });
    
    // 4. Insert selected snippet
    if (selected) {
        const position = editor.selection.active;
        await editor.edit(editBuilder => {
            editBuilder.insert(position, selected.snippet + '\n\n');
        });
    }
});
```

### 4. Foundation Service Interface Selection Flow

When you select "🏗️ Foundation Service Interface":

#### A. Snippet Definition (Lines 96-108)
```typescript
{
    label: '🏗️ Foundation Service Interface',
    snippet: `// Foundation service interface
public interface I{{ServiceName}}Service
{
    Task<{{ReturnType}}> {{MethodName}}Async({{Parameters}});
    void LogOperation(string operation, object data = null);
}`,
    description: 'Creates a foundation layer service interface'
}
```

#### B. Code Insertion (Lines 250-260)
- Gets current cursor position in active editor
- Uses VS Code's TextEditor.edit() API
- Inserts the snippet at cursor position
- Shows success message

### 5. Code Generation System

#### A. generateSitecoreCode Function (Lines 462-510)
```typescript
async function generateSitecoreCode(templateType: string, context: vscode.ExtensionContext) {
    // 1. Ensure active editor exists
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
        // Create new file if needed
        const doc = await vscode.workspace.openTextDocument({
            content: '',
            language: 'csharp'
        });
        await vscode.window.showTextDocument(doc);
    }
    
    // 2. Switch based on template type
    switch (templateType) {
        case '🏗️ Sitecore Helix: Create Foundation Module':
            codeTemplate = generateFoundationModule();
            fileName = 'FoundationModule.cs';
            break;
        // ... other cases
    }
    
    // 3. Insert generated code
    const currentEditor = vscode.window.activeTextEditor;
    if (currentEditor) {
        const position = currentEditor.selection.active;
        await currentEditor.edit(editBuilder => {
            editBuilder.insert(position, codeTemplate);
        });
    }
}
```

#### B. Template Generation Functions (Lines 600+)
```typescript
function generateFoundationModule(): string {
    return `// Foundation Module - Base Services and Utilities
using Microsoft.Extensions.DependencyInjection;
using Sitecore.DependencyInjection;

namespace Foundation.DependencyInjection
{
    public class DependencyInjectionConfigurator : IServicesConfigurator
    {
        public void Configure(IServiceCollection serviceCollection)
        {
            // Register foundation services
            serviceCollection.AddTransient<ILoggingService, LoggingService>();
            serviceCollection.AddSingleton<ICacheService, CacheService>();
        }
    }
}`;
}
```

### 6. Data Sources & Configuration

#### A. Prompt Data (src/promptData.json)
```json
{
  "metadata": {
    "version": "1.0.0",
    "description": "Cognizant DXP Prompt Library for Sitecore 10.4"
  },
  "categories": {
    "components": {
      "carousel": {
        "name": "Carousel Component",
        "prompts": {
          "requirements": {
            "prompt": "Generate detailed functional requirements...",
            "tags": ["requirements", "carousel", "helix"]
          }
        }
      }
    }
  }
}
```

#### B. Search Functionality (Lines 300-400)
```typescript
async function performPromptSearch(searchTerm: string) {
    // Load prompt data from JSON
    const promptDataPath = path.join(context.extensionPath, 'out', 'promptData.json');
    const promptData = JSON.parse(fs.readFileSync(promptDataPath, 'utf8'));
    
    // Search through categories and prompts
    const results = [];
    for (const category in promptData.categories) {
        // Filter prompts by search term
        // Return matching results
    }
    return results;
}
```

### 7. GitHub Copilot Integration

#### A. How DXP Enhances Copilot
The DXP extension **enhances** GitHub Copilot in several ways:

1. **Context Enrichment**: Provides Sitecore-specific prompts that give Copilot better context
2. **Template Seeding**: Inserts structured templates that Copilot can complete more accurately
3. **Pattern Recognition**: Establishes Helix architecture patterns that Copilot learns from

#### B. Workflow Integration
```
User Action: Select "Foundation Service Interface"
     ↓
DXP Extension: Inserts template with placeholders
     ↓
GitHub Copilot: Recognizes pattern and suggests completions
     ↓
User: Accepts/modifies suggestions
     ↓
Result: Production-ready Sitecore code
```

#### C. No Direct API Calls
**Important**: DXP doesn't directly call GitHub Copilot APIs. Instead:
- DXP inserts structured prompts/templates
- Copilot automatically detects these patterns
- Copilot provides suggestions based on context
- User benefits from both DXP templates + Copilot intelligence

### 8. File Structure & Dependencies

#### A. Key Files:
```
dxp-prompt-library/
├── package.json                 # Extension manifest & command registration
├── src/
│   ├── extension.ts            # Main extension logic (2,363 lines)
│   └── promptData.json         # Prompt database (230 lines)
├── out/
│   ├── extension.js            # Compiled TypeScript
│   └── promptData.json         # Runtime prompt data
└── dxp-prompt-library-1.0.0.vsix  # Packaged extension
```

#### B. Dependencies Flow:
```
VS Code
    ↓ (loads)
package.json
    ↓ (points to)
out/extension.js
    ↓ (uses)
out/promptData.json
```

### 9. Adding New Commands - Step by Step

#### Step 1: Add Command to package.json
```json
// Add to contributes.commands array
{
    "command": "dxpPromptLibrary.myNewCommand",
    "title": "DXP: My New Command",
    "category": "DXP Prompt Library"
}

// Add to contributes.menus.commandPalette array
{
    "command": "dxpPromptLibrary.myNewCommand"
}
```

#### Step 2: Register Command Handler in extension.ts
```typescript
// Inside activate() function
const myNewCommand = vscode.commands.registerCommand('dxpPromptLibrary.myNewCommand', async () => {
    // Your command logic here
    vscode.window.showInformationMessage('My new command executed!');
});
context.subscriptions.push(myNewCommand);
```

#### Step 3: Add Prompt Data (Optional)
```json
// Add to promptData.json
"myNewCategory": {
    "name": "My New Category",
    "prompts": {
        "myPrompt": {
            "prompt": "Your prompt text here",
            "tags": ["tag1", "tag2"]
        }
    }
}
```

#### Step 4: Compile and Package
```powershell
cd "c:\Users\HP\Downloads\DXP\dxp-prompt-library"
npm run compile
npx vsce package
code --install-extension dxp-prompt-library-1.0.0.vsix
```

### 10. Advanced Features

#### A. Context-Aware Code Generation
```typescript
// The extension detects file type and provides relevant snippets
const fileExtension = vscode.window.activeTextEditor?.document.fileName.split('.').pop();
switch (fileExtension) {
    case 'cs':
        // Show C# templates
        break;
    case 'cshtml':
        // Show Razor templates
        break;
    case 'scss':
        // Show SCSS templates
        break;
}
```

#### B. Multi-File Generation
```typescript
// Can generate multiple related files
async function generateCompleteComponent() {
    await generateFile('Controller.cs', controllerTemplate);
    await generateFile('ViewModel.cs', viewModelTemplate);
    await generateFile('View.cshtml', viewTemplate);
    await generateFile('Styles.scss', styleTemplate);
}
```

#### C. Template Customization
```typescript
// Templates can be parameterized
function generateWithParameters(componentName: string, namespace: string) {
    return template
        .replace(/{{ComponentName}}/g, componentName)
        .replace(/{{Namespace}}/g, namespace);
}
```

## 🎯 Summary

The DXP Prompt Library works through a sophisticated but well-structured system:

1. **Registration**: Commands registered in package.json + extension.ts
2. **Discovery**: VS Code Command Palette finds registered commands
3. **Execution**: User selection triggers command handlers
4. **Generation**: Handlers create/insert Sitecore-specific code templates
5. **Enhancement**: GitHub Copilot uses these templates for better suggestions

The key insight is that DXP provides **structured starting points** that make GitHub Copilot much more effective at generating production-ready Sitecore code following Helix architecture principles.
