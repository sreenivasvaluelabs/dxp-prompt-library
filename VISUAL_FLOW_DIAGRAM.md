# DXP Extension - Visual Flow Diagram

## 🎯 Complete Technical Flow: From Ctrl+Shift+P to Code Generation

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           USER INTERACTION FLOW                             │
└─────────────────────────────────────────────────────────────────────────────┘

    [User Presses Ctrl+Shift+P]
               │
               ▼
    ┌─────────────────────────┐
    │   VS Code Command       │ ◄─── Scans all registered commands
    │      Palette Opens      │      from all extensions
    └─────────────────────────┘
               │
               ▼
    [User Types "DXP"]
               │
               ▼
    ┌─────────────────────────┐      ╔═══════════════════════════╗
    │   Filtered Commands     │ ◄────╢    package.json           ║
    │   - DXP: Insert Prompt  │      ║                           ║
    │   - DXP: Open Palette   │      ║ "contributes": {          ║
    │   - DXP: Search         │      ║   "commands": [...],      ║
    │   - DXP: Filter         │      ║   "menus": {              ║
    │   - DXP: SDLC           │      ║     "commandPalette": ... ║
    └─────────────────────────┘      ║   }                       ║
               │                     ║ }                         ║
               ▼                     ╚═══════════════════════════╝
    [User Selects "DXP: Insert Prompt"]
               │
               ▼

┌─────────────────────────────────────────────────────────────────────────────┐
│                          EXTENSION EXECUTION FLOW                           │
└─────────────────────────────────────────────────────────────────────────────┘

    ┌─────────────────────────┐      ╔═══════════════════════════╗
    │  VS Code Executes       │ ◄────╢    src/extension.ts       ║
    │  'dxpPromptLibrary.     │      ║                           ║
    │   insertPrompt'         │      ║ const insertPrompt =      ║
    └─────────────────────────┘      ║   vscode.commands         ║
               │                     ║   .registerCommand(       ║
               ▼                     ║     'dxpPromptLibrary     ║
    ┌─────────────────────────┐      ║      .insertPrompt',      ║
    │  Command Handler        │      ║     async () => {         ║
    │  Function Executes      │      ║       // Handler logic    ║
    │  (Lines 84-260)         │      ║     });                   ║
    └─────────────────────────┘      ╚═══════════════════════════╝
               │
               ▼
    ┌─────────────────────────┐
    │  Check Active Editor    │
    │  if (!editor) return    │
    └─────────────────────────┘
               │
               ▼
    ┌─────────────────────────┐      ╔═══════════════════════════╗
    │  Load Prompt Templates  │ ◄────╢  Hard-coded in extension  ║
    │  const prompts = [      │      ║                           ║
    │    {                    │      ║  Foundation Service,      ║
    │      label: '🏗️ Found', │      ║  Feature Controller,      ║
    │      snippet: '...',    │      ║  Glass Mapper Model,      ║
    │      description: '...' │      ║  Razor View Template,     ║
    │    }                    │      ║  Unit Test Template,      ║
    │  ]                      │      ║  SCSS Styles             ║
    └─────────────────────────┘      ╚═══════════════════════════╝
               │
               ▼
    ┌─────────────────────────┐
    │  Show VS Code           │
    │  QuickPick UI           │
    │  await vscode.window    │
    │  .showQuickPick(prompts)│
    └─────────────────────────┘
               │
               ▼

┌─────────────────────────────────────────────────────────────────────────────┐
│                        USER SELECTION & CODE INSERTION                      │
└─────────────────────────────────────────────────────────────────────────────┘

    [User Selects "🏗️ Foundation Service Interface"]
               │
               ▼
    ┌─────────────────────────┐      ╔═══════════════════════════╗
    │  Get Selected Snippet   │ ◄────╢  Selected Snippet:        ║
    │  selected.snippet       │      ║                           ║
    │                         │      ║  // Foundation service    ║
    │                         │      ║  public interface         ║
    │                         │      ║  I{{ServiceName}}Service  ║
    │                         │      ║  {                        ║
    │                         │      ║    Task<{{ReturnType}}>   ║
    │                         │      ║    {{MethodName}}Async... ║
    │                         │      ║  }                        ║
    └─────────────────────────┘      ╚═══════════════════════════╝
               │
               ▼
    ┌─────────────────────────┐
    │  Get Cursor Position    │
    │  const position =       │
    │  editor.selection.active│
    └─────────────────────────┘
               │
               ▼
    ┌─────────────────────────┐
    │  Insert Code at Cursor  │
    │  await editor.edit(     │
    │    editBuilder => {     │
    │      editBuilder.insert │
    │      (position, snippet)│
    │    });                  │
    └─────────────────────────┘
               │
               ▼
    ┌─────────────────────────┐
    │  Show Success Message   │
    │  '✅ Inserted Foundation │
    │   Service Interface!'   │
    └─────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│                        GITHUB COPILOT INTEGRATION                           │
└─────────────────────────────────────────────────────────────────────────────┘

    ┌─────────────────────────┐
    │  Code Inserted in       │      ╔═══════════════════════════╗
    │  Editor with Template   │ ────▶║  GitHub Copilot detects:  ║
    │  Placeholders           │      ║                           ║
    │  {{ServiceName}}        │      ║  - Sitecore patterns      ║
    │  {{ReturnType}}         │      ║  - Interface structure    ║
    │  {{MethodName}}         │      ║  - Helix architecture     ║
    └─────────────────────────┘      ║  - Async/await patterns   ║
               │                     ╚═══════════════════════════╝
               ▼                              │
    ┌─────────────────────────┐               ▼
    │  User Starts Typing     │      ╔═══════════════════════════╗
    │  to Replace Placeholders│ ────▶║  Copilot Provides Smart   ║
    │                         │      ║  Suggestions Based on:    ║
    │  I{{ServiceName}}Service│      ║                           ║
    │  becomes                │      ║  - DXP template context   ║
    │  ILoggingService        │      ║  - Sitecore conventions   ║
    └─────────────────────────┘      ║  - Industry best practices║
               │                     ╚═══════════════════════════╝
               ▼
    ┌─────────────────────────┐
    │  Final Production-Ready │
    │  Sitecore Code:         │
    │                         │
    │  public interface       │
    │  ILoggingService        │
    │  {                      │
    │    Task LogAsync(string │
    │      message, LogLevel  │
    │      level);            │
    │    void LogError(       │
    │      Exception ex);     │
    │  }                      │
    └─────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│                             FILE RELATIONSHIPS                              │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────┐    compiles to    ┌─────────────────┐
│ src/extension.ts│ ─────────────────▶│ out/extension.js│
│ (2,363 lines)   │                   │ (runtime)       │
│                 │                   │                 │
│ - Command       │                   │ - Compiled JS   │
│ - Handlers      │                   │ - Same logic    │
│ - Code gen      │                   │ - Optimized     │
└─────────────────┘                   └─────────────────┘
         │                                     ▲
         │ references                          │
         ▼                                     │ loaded by
┌─────────────────┐    copies to      ┌───────┴─────────┐
│src/promptData.   │ ─────────────────▶│out/promptData.  │
│json             │                   │json             │
│                 │                   │                 │
│ - Categories    │                   │ - Runtime data  │
│ - Templates     │                   │ - Search source │
│ - Prompts       │                   │ - Same content  │
└─────────────────┘                   └─────────────────┘
                                               ▲
                                               │ loaded by
                              ┌────────────────┴─────────────────┐
                              │         VS Code                  │
                              │                                  │
                              │ 1. Reads package.json            │
                              │ 2. Loads out/extension.js        │
                              │ 3. Registers commands            │
                              │ 4. Shows in Command Palette      │
                              └──────────────────────────────────┘
```

## 🔧 Key Code Locations for Adding New Commands

### 1. Package.json (Command Registration)
```json
// Lines 25-50: Add new command
{
    "command": "dxpPromptLibrary.yourNewCommand",
    "title": "DXP: Your New Command",
    "category": "DXP Prompt Library"
}

// Lines 70-85: Add to command palette
{
    "command": "dxpPromptLibrary.yourNewCommand"
}
```

### 2. Extension.ts (Command Handler)
```typescript
// Inside activate() function (around line 400):
const yourNewCommand = vscode.commands.registerCommand('dxpPromptLibrary.yourNewCommand', async () => {
    // Your command logic here
});
context.subscriptions.push(yourNewCommand);
```

### 3. PromptData.json (Optional Data)
```json
// Add new category or extend existing ones
"yourCategory": {
    "name": "Your Category",
    "prompts": {
        "yourPrompt": {
            "prompt": "Your detailed prompt text",
            "tags": ["tag1", "tag2"]
        }
    }
}
```

## 🚀 Build & Deploy Process

```
npm run compile ────▶ TypeScript to JavaScript
        │
        ▼
npm run copy-assets ──▶ Copy promptData.json to out/
        │
        ▼
npx vsce package ────▶ Create .vsix file
        │
        ▼
code --install-extension ──▶ Install in VS Code
```

This architecture provides a robust, extensible system for Sitecore development that leverages both structured templates and AI-powered code generation.
