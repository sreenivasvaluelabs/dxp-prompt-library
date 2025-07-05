# DXP Prompt Library for Sitecore Development

🚀 **AI-powered prompt library for Sitecore 10.4 development with Helix architecture, designed to enhance GitHub Copilot suggestions**

[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](https://marketplace.visualstudio.com/items?itemName=cognizant-dxp.dxp-prompt-library)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE.txt)
[![Sitecore](https://img.shields.io/badge/Sitecore-10.4-red.svg)](https://www.sitecore.com/)
[![Helix](https://img.shields.io/badge/Architecture-Helix-orange.svg)](https://helix.sitecore.net/)

## ✨ Features

### 🎯 **Smart Code Generation**
- **Foundation Layer**: Service interfaces, dependency injection, logging services
- **Feature Layer**: Controllers, view models, Glass Mapper models, Razor views
- **Project Layer**: Site controllers, layouts, configurations, navigation components

### 🎠 **Component Library**
- **Carousel Component**: Responsive carousel with accessibility features
- **Custom Forms**: Dynamic form builder with validation and GDPR compliance
- **Navigation**: Multi-level responsive navigation with breadcrumbs
- **Search Component**: Auto-complete search with filtering
- **Media Gallery**: Responsive image/video gallery

### 📊 **SDLC Workflows**
- **Planning**: Requirements, user stories, acceptance criteria
- **Development**: Code standards, architecture guidelines
- **Testing**: Unit tests, integration tests, performance testing
- **Deployment**: CI/CD pipelines, environment configurations
- **Maintenance**: Monitoring, troubleshooting, optimization

### 🤖 **GitHub Copilot Enhancement**
Provides structured, Sitecore-specific templates that significantly improve GitHub Copilot's code suggestions for:
- Helix architecture patterns
- Sitecore best practices
- C# async/await patterns
- Glass Mapper configurations
- Dependency injection setups

## 🚀 Quick Start

### Installation

1. **From VS Code Marketplace** (Recommended)
   - Open VS Code
   - Go to Extensions (`Ctrl+Shift+X`)
   - Search for "DXP Prompt Library"
   - Click "Install"

2. **From VSIX File**
   - Download the `.vsix` file
   - Open VS Code
   - Press `Ctrl+Shift+P` → "Extensions: Install from VSIX"
   - Select the downloaded file

### Usage

1. **Open Command Palette**: `Ctrl+Shift+P`
2. **Type**: "DXP:" to see all available commands
3. **Select**: Any command to generate Sitecore code

![DXP Commands Demo](https://via.placeholder.com/800x400/0066cc/ffffff?text=DXP+Commands+in+Action)

## 📋 Available Commands

| Command | Description | Use Case |
|---------|-------------|----------|
| `DXP: Open Prompt Palette` | Browse categorized prompts | Quick access to all templates |
| `DXP: Insert Prompt` | Insert code snippets | Add common Sitecore patterns |
| `DXP: Filter by Component` | Component-specific generation | Create specific components |
| `DXP: Search Prompts` | Search templates by keyword | Find relevant templates quickly |
| `DXP: SDLC Workflows` | Development lifecycle templates | Follow best practices |
| `DXP: Filter by SDLC Stage` | Stage-specific templates | Structured development process |

## 💻 Code Examples

### Foundation Service Interface
```csharp
// Generated with DXP: Insert Prompt → Foundation Service Interface
public interface ILoggingService
{
    Task<bool> LogAsync(string message, LogLevel level);
    void LogOperation(string operation, object data = null);
    void LogError(Exception exception, string context = null);
}
```

### Feature Controller with Error Handling
```csharp
// Generated with DXP: Insert Prompt → Feature Controller Action
public ActionResult RenderCarousel()
{
    try
    {
        var datasource = GetDatasource<ICarouselModel>();
        var viewModel = new CarouselViewModel(datasource);
        
        _loggingService.LogInformation($"Carousel rendered for item: {datasource?.Id}");
        return View(viewModel);
    }
    catch (Exception ex)
    {
        _loggingService.LogError("Error rendering Carousel", ex);
        return View(new CarouselViewModel(null));
    }
}
```

### Glass Mapper Model
```csharp
// Generated with DXP: Insert Prompt → Glass Mapper Model
[SitecoreType(TemplateId = "{12345678-1234-1234-1234-123456789012}", AutoMap = true)]
public interface ICarouselModel
{
    [SitecoreId]
    Guid Id { get; set; }

    [SitecoreField("Title")]
    string Title { get; set; }

    [SitecoreField("Images")]
    Glass.Mapper.Sc.Fields.Image[] Images { get; set; }

    [SitecoreField("Link")]
    Glass.Mapper.Sc.Fields.Link CallToActionLink { get; set; }
}
```

## 🎯 GitHub Copilot Integration

The DXP Prompt Library **enhances** GitHub Copilot by providing structured starting points:

### Before DXP
```csharp
// Starting with blank file - Copilot struggles with Sitecore context
public class MyController
{
    // Generic suggestions, not Sitecore-specific
}
```

### After DXP
```csharp
// DXP inserts structured template
public class CarouselController : Controller
{
    private readonly ISitecoreContext _sitecoreContext;
    private readonly ILoggingService _loggingService;
    
    // Copilot now understands Sitecore patterns and provides better suggestions
    public ActionResult Index()
    {
        // Copilot suggests Sitecore-specific implementations
    }
}
```

## 🏗️ Architecture Support

### Helix Principles
- **Foundation**: Cross-cutting concerns and shared functionality
- **Feature**: Business logic and user-facing functionality  
- **Project**: Site-specific implementations and configurations

### Sitecore Best Practices
- Glass Mapper integration
- Dependency injection patterns
- Async/await implementations
- Error handling and logging
- Performance optimization
- Security considerations

## 📚 Documentation

### Quick Reference
- [Technical Deep Dive](TECHNICAL_DEEP_DIVE.md) - Complete technical explanation
- [Visual Flow Diagram](VISUAL_FLOW_DIAGRAM.md) - Architecture diagrams
- [Distribution Guide](DISTRIBUTION_GUIDE.md) - Installation and sharing

### Development Guides
- [Adding New Commands](TECHNICAL_DEEP_DIVE.md#adding-new-commands)
- [Customizing Templates](TECHNICAL_DEEP_DIVE.md#template-customization)
- [Contributing Guidelines](CONTRIBUTING.md)

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

### Development Setup
```bash
# Clone repository
git clone https://github.com/cognizant-dxp/dxp-prompt-library.git
cd dxp-prompt-library

# Install dependencies
npm install

# Compile TypeScript
npm run compile

# Run in development mode
code .
# Press F5 to launch Extension Development Host
```

## 📝 Requirements

- **VS Code**: Version 1.80.0 or higher
- **Node.js**: Version 16+ (for development)
- **Sitecore**: 10.4 (templates optimized for this version)
- **GitHub Copilot**: Recommended for enhanced experience

## 🔧 Configuration

The extension works out-of-the-box with no configuration required. Optional settings:

```json
{
    "dxpPromptLibrary.autoSuggest": true,
    "dxpPromptLibrary.preferredLanguage": "csharp",
    "dxpPromptLibrary.includeComments": true
}
```

## 📊 What's Included

- **8 Core Commands**: Complete workflow coverage
- **50+ Code Templates**: Foundation, Feature, Project patterns
- **Component Library**: 15+ ready-to-use components
- **SDLC Templates**: Complete development lifecycle
- **Best Practices**: Comprehensive guidelines
- **Error Handling**: Robust exception management

## 🚀 Performance

- **Lightweight**: ~75KB package size
- **Fast**: Instant command registration
- **Efficient**: On-demand template loading
- **Scalable**: Extensible architecture

## 🛠️ Troubleshooting

### Common Issues

**Commands not appearing in Command Palette**
- Restart VS Code
- Check if extension is enabled in Extensions tab

**Templates not inserting**
- Ensure you have an active editor window
- Check VS Code output panel for errors

**GitHub Copilot not providing better suggestions**
- Ensure Copilot is enabled and active
- Try inserting a few DXP templates to establish patterns

### Support

- [GitHub Issues](https://github.com/cognizant-dxp/dxp-prompt-library/issues)
- [Documentation](https://github.com/cognizant-dxp/dxp-prompt-library/wiki)
- [Troubleshooting Guide](TROUBLESHOOTING.md)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE.txt](LICENSE.txt) file for details.

## 🏢 About Cognizant DXP

Cognizant's Digital Experience Practice (DXP) specializes in creating exceptional digital experiences using Sitecore and other leading platforms. This extension embodies our commitment to developer productivity and code quality.

---

**🌟 Star this repository if you find it helpful!**

**📧 Questions? Create an issue or reach out to our team.**

---

*Made with ❤️ by the Cognizant DXP Team*
