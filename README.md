# Sreeni DXP Prompt Library

[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](https://marketplace.visualstudio.com/items?itemName=cognizant-dxp.cognizant-dxp-prompt-library)
[![VS Code](https://img.shields.io/badge/VS%20Code-1.74.0+-blue.svg)](https://code.visualstudio.com/)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

A comprehensive prompt library designed specifically for **Sitecore 10.4** development using **Helix architecture**, optimized to enhance GitHub Copilot suggestions for enterprise-grade web development.

## 🚀 Features

### 📋 Comprehensive Component Library
- **Carousel Component**: Responsive carousel with accessibility features
- **Custom Forms**: Dynamic form builder with validation and GDPR compliance
- **Navigation**: Multi-level responsive navigation with search integration
- **CTA Modal**: Call-to-action components with modal dialogs and e-commerce integration

### 🔄 Full SDLC Coverage
Each component includes prompts for all software development lifecycle stages:
- **Requirements Analysis**: Functional and non-functional requirements
- **Technical Design**: Architecture and design specifications
- **Implementation**: Code generation and development patterns
- **Unit Testing**: Comprehensive testing strategies
- **Integration Testing**: System integration and workflows
- **Deployment**: DevOps and deployment procedures
- **Maintenance**: Ongoing support and optimization

### 🎯 Smart Contextual Suggestions
- **File-based Detection**: Automatically suggests relevant prompts based on file names and content
- **Language-aware**: Provides appropriate prompts for C#, TypeScript, SCSS, and Razor files
- **Tag-based Filtering**: Advanced search and filtering capabilities
- **Fuzzy Search**: Intelligent search across all prompts using Fuse.js

### 🛠 GitHub Copilot Integration
- **Optimized Prompts**: Specifically crafted for enhanced AI code generation
- **Comment Insertion**: Prompts are inserted as comments for seamless Copilot integration
- **Context Preservation**: Maintains development context for better suggestions

## 📦 Installation

### From VS Code Marketplace
1. Open VS Code
2. Go to Extensions (`Ctrl+Shift+X`)
3. Search for "DXP Prompt Library"
4. Click Install

### From VSIX Package
1. Download the `.vsix` file from releases
2. Open VS Code
3. Run `Extensions: Install from VSIX...` from Command Palette
4. Select the downloaded `.vsix` file

## 🎮 Usage

### Quick Start
1. **Open Prompt Palette**: `Ctrl+Shift+P` → "DXP: Open Prompt Palette"
2. **Insert at Cursor**: `Ctrl+Shift+P` → "DXP: Insert Prompt"
3. **Search Prompts**: `Ctrl+Shift+P` → "DXP: Search Prompts"

### Commands

| Command | Description | Keybinding |
|---------|-------------|------------|
| `DXP: Open Prompt Palette` | Browse all available prompts | `Ctrl+Shift+P` |
| `DXP: Insert Prompt` | Insert contextual prompt at cursor | - |
| `DXP: Search Prompts` | Search prompts by keyword | - |
| `DXP: Filter by Component` | Filter prompts by component type | - |
| `DXP: Filter by SDLC Stage` | Filter prompts by development stage | - |

### Contextual Usage
The extension automatically detects your current context and suggests relevant prompts:

- **Controller files** → MVC development prompts
- **Test files** → Unit testing prompts
- **Files containing "carousel"** → Carousel component prompts
- **Files containing "form"** → Custom forms prompts

### Working with GitHub Copilot
1. Insert a relevant prompt using the extension
2. Let GitHub Copilot generate code based on the prompt
3. Refine and customize the generated code
4. Use additional prompts for different development stages

## ⚙️ Configuration

Access settings via `File > Preferences > Settings` and search for "DXP Prompt Library":

```json
{
    "dxpPromptLibrary.autoSuggest": true,
    "dxpPromptLibrary.defaultSDLCStage": "development",
    "dxpPromptLibrary.enableInlineComments": true,
    "dxpPromptLibrary.promptPrefix": "// DXP Prompt:"
}
```

### Settings

| Setting | Description | Default | Options |
|---------|-------------|---------|---------|
| `autoSuggest` | Enable automatic prompt suggestions | `true` | `true`, `false` |
| `defaultSDLCStage` | Default SDLC stage for suggestions | `"development"` | `"requirements"`, `"design"`, `"development"`, `"unit_testing"`, `"integration"`, `"deployment"`, `"maintenance"` |
| `enableInlineComments` | Insert prompts as comments | `true` | `true`, `false` |
| `promptPrefix` | Prefix for inserted prompts | `"// DXP Prompt:"` | Any string |

## 🏗 Architecture & Best Practices

### Helix Architecture Compliance
All prompts follow Sitecore Helix principles:
- **Foundation Layer**: Base utilities and dependencies
- **Feature Layer**: Business logic and data templates
- **Project Layer**: Site-specific implementations

### Code Quality Standards
- **Accessibility**: WCAG 2.1 AA compliance
- **Performance**: Core Web Vitals optimization
- **Security**: GDPR compliance and secure coding practices
- **Testing**: Comprehensive testing strategies
- **Documentation**: Thorough documentation requirements

### Supported Technologies
- **Backend**: Sitecore 10.4, C# .NET, ASP.NET MVC
- **Frontend**: TypeScript/JavaScript, SCSS/CSS, HTML5
- **Testing**: MSTest, NUnit, Jest
- **DevOps**: Azure DevOps, PowerShell, Docker
- **Tools**: Glass Mapper, Sitecore CLI, TDS

## 📖 Examples

### Example 1: Creating a Carousel Component

1. **Create Controller File**: `CarouselController.cs`
2. **Extension Auto-detects**: Suggests carousel development prompts
3. **Insert Prompt**: Choose "Carousel - Implementation"
4. **GitHub Copilot Generates**: Complete controller code with error handling, dependency injection, and Helix patterns

### Example 2: Unit Testing Workflow

1. **Create Test File**: `CarouselControllerTests.cs`
2. **Use Command**: "DXP: Filter by SDLC Stage" → "Unit Testing"
3. **Select Component**: Choose carousel testing prompt
4. **Generate Tests**: Copilot creates comprehensive test suite with mocks and edge cases

### Example 3: Requirements Documentation

1. **Create Requirements Doc**: `Requirements.md`
2. **Search Prompts**: "DXP: Search Prompts" → "requirements carousel"
3. **Insert Prompt**: Detailed requirements prompt for carousel
4. **Generate Documentation**: Complete functional and non-functional requirements

## 🧪 Development

### Prerequisites
- Node.js 16.x or higher
- VS Code 1.74.0 or higher
- TypeScript 4.9.4 or higher

### Setup
```bash
# Clone repository
git clone https://github.com/cognizant/dxp-prompt-library.git
cd dxp-prompt-library

# Install dependencies
npm install

# Compile TypeScript
npm run compile

# Watch for changes
npm run watch
```

### Building
```bash
# Build extension
npm run compile

# Package extension
npm run package

# Publish to marketplace
npm run publish
```

### Testing
```bash
# Run linter
npm run lint

# Run tests
npm test
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

### Types of Contributions
- **New Prompts**: Add prompts for additional components or scenarios
- **Improvements**: Enhance existing prompts or functionality
- **Bug Fixes**: Fix issues or improve performance
- **Documentation**: Improve documentation and examples

### Development Process
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📝 Prompt Structure

Prompts are structured as JSON objects with the following schema:

```json
{
  "prompt": "Detailed instruction for AI code generation...",
  "context": "requirements_analysis | technical_design | implementation | unit_testing | integration_testing | deployment | maintenance",
  "tags": ["tag1", "tag2", "tag3"]
}
```

### Prompt Categories
- **Components**: carousel, custom_forms, navigation, cta_modal
- **SDLC Stages**: requirements, design, development, unit_testing, integration, deployment, maintenance
- **Technologies**: sitecore, helix, mvc, typescript, scss, accessibility, testing

## 🔧 Troubleshooting

### Common Issues

**Extension not activating**
- Ensure VS Code version is 1.74.0 or higher
- Check if extension is enabled in Extensions panel

**Prompts not loading**
- Verify `promptData.json` exists in the extension directory
- Check VS Code Developer Console for errors

**GitHub Copilot not responding to prompts**
- Ensure GitHub Copilot extension is installed and active
- Try rephrasing prompts or adding more context

**Performance issues**
- Disable auto-suggestions if experiencing lag
- Reduce prompt complexity for better performance

### Support
- [Issues](https://github.com/cognizant/dxp-prompt-library/issues)
- [Discussions](https://github.com/cognizant/dxp-prompt-library/discussions)
- [Wiki](https://github.com/cognizant/dxp-prompt-library/wiki)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🏢 About Sreeni

Hi there! My name is Sreeni, and I'm a Senior Project Manager. With over a decade of experience in the tech industry, I've cultivated a passion for all things technology. As a full-stack web developer, I've honed my skills in both front-end and back-end development, and I'm always eager to take on new challenges.

As a project manager, I excel in a variety of areas, including:

Initiation and Planning: I'm skilled at kickstarting projects and setting them up for success. Whether it's defining project scope, establishing timelines, or allocating resources, I ensure that everything runs smoothly from the get-go.
Execution and Monitoring: Once a project is underway, I closely monitor progress, identify potential roadblocks, and implement corrective measures when needed. My goal is always to deliver high-quality outputs that meet client expectations.
Control and Closure: As a project nears completion, I ensure that all loose ends are tied up and that the final product meets the required standards. I also facilitate knowledge transfer to the client and provide ongoing support to ensure a seamless transition.
Agile Methodologies: I'm well-versed in both Waterfall and Agile methodologies, and I know when to apply each approach depending on the project's unique demands.
Practice Development: I'm constantly looking for ways to improve our services and offerings. From identifying market gaps to creating innovative solutions, I drive practice development initiatives that help us stay ahead of the curve.
People Development: As a people manager, I prioritize the growth and well-being of my team members. Whether it's providing guidance, mentorship, or training opportunities, I strive to foster a culture of excellence and collaboration.
Financial Management: I'm responsible for meeting revenue and gross profit targets, and I work closely with our finance team to ensure that we're on track to achieve these goals.
Overall, my strengths lie in my ability to lead high-performing teams, manage complex projects, and drive business growth through innovative practices and offerings. and I look forward to taking on new challenges in the future.

## 🔮 Roadmap

### Version 1.1
- [ ] Additional Sitecore components (Hero Banner, Content Grid, Product Catalog)
- [ ] Integration with Sitecore Horizon
- [ ] Advanced personalization prompts

### Version 1.2
- [ ] Multi-language support
- [ ] Custom prompt creation
- [ ] Team sharing capabilities
- [ ] Analytics and usage tracking

### Version 2.0
- [ ] AI-powered prompt optimization
- [ ] Integration with other CMS platforms
- [ ] Advanced workflow automation
- [ ] Enterprise administration features

---

**Made with ❤️ by the Sreeni**
