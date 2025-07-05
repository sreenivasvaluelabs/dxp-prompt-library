import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    console.log('🚀 DXP Extension - PRODUCTION VERSION ACTIVATING');
    
    // Show immediate activation proof
    vscode.window.showInformationMessage('🚀 DXP Extension Activated Successfully!');
    
    // CRITICAL: Register ALL commands FIRST, with bulletproof implementations
    console.log('📝 Registering commands with bulletproof handlers...');
    
    let promptManager: any = null; // Will be loaded later
    
    try {
        // 1. Test command - simplest possible
        const testCommand = vscode.commands.registerCommand('dxpPromptLibrary.test', () => {
            console.log('✅ TEST COMMAND EXECUTED');
            const status = promptManager ? 'with full PromptManager functionality' : 'in basic mode';
            vscode.window.showInformationMessage(`✅ DXP Extension is working perfectly ${status}! 🎉`);
        });
        context.subscriptions.push(testCommand);
        console.log('✅ Test command registered');

        // 2. Open Prompt Palette - with enhanced implementation using real prompt data
        const openPromptPalette = vscode.commands.registerCommand('dxpPromptLibrary.openPromptPalette', async () => {
            console.log('🎯 openPromptPalette executed');
            try {
                if (promptManager) {
                    await promptManager.openPromptPalette();
                } else {
                    // Enhanced implementation with real Sitecore Helix prompts
                    const prompts = [
                        {
                            label: '🏗️ Sitecore Helix: Create Foundation Module',
                            description: 'Generate a complete Foundation layer module with services and utilities',
                            detail: 'Creates foundation module structure, DI configuration, and base services'
                        },
                        {
                            label: '🎯 Sitecore Helix: Create Feature Module',
                            description: 'Generate a Feature layer module with controllers, models, and views',
                            detail: 'Creates feature module with MVC components and data templates'
                        },
                        {
                            label: '🚀 Sitecore Helix: Create Project Module',
                            description: 'Generate a Project layer module with site-specific implementations',
                            detail: 'Creates project module with site configuration and layouts'
                        },
                        {
                            label: '🎠 Sitecore Component: Carousel',
                            description: 'Generate responsive carousel component with accessibility features',
                            detail: 'Creates carousel with data templates, controllers, views, and TypeScript'
                        },
                        {
                            label: '📝 Sitecore Component: Custom Forms',
                            description: 'Generate dynamic form builder with validation and submission handling',
                            detail: 'Creates form component with validation, file upload, and GDPR compliance'
                        },
                        {
                            label: '🧭 Sitecore Component: Navigation',
                            description: 'Generate multi-level responsive navigation with breadcrumbs',
                            detail: 'Creates navigation with search integration and accessibility features'
                        }
                    ];
                    
                    const selected = await vscode.window.showQuickPick(prompts, {
                        placeHolder: 'Select a DXP prompt template',
                        matchOnDescription: true,
                        matchOnDetail: true
                    });
                    
                    if (selected) {
                        await generateSitecoreCode(selected.label, context);
                    }
                }
            } catch (error) {
                console.error('Error in openPromptPalette:', error);
                vscode.window.showErrorMessage(`Prompt Palette error: ${error}`);
            }
        });
        context.subscriptions.push(openPromptPalette);
        console.log('✅ Open Prompt Palette command registered');

        // 3. Insert Prompt - with enhanced implementation using prompt data
        const insertPrompt = vscode.commands.registerCommand('dxpPromptLibrary.insertPrompt', async () => {
            console.log('🎯 insertPrompt executed');
            try {
                if (promptManager) {
                    await promptManager.insertPromptAtCursor();
                } else {
                    // Enhanced implementation with real Sitecore prompts
                    const editor = vscode.window.activeTextEditor;
                    if (!editor) {
                        vscode.window.showWarningMessage('No active editor found');
                        return;
                    }
                    
                    const prompts = [
                        {
                            label: '🏗️ Foundation Service Interface',
                            snippet: `// Foundation service interface
public interface I{{ServiceName}}Service
{
    Task<{{ReturnType}}> {{MethodName}}Async({{Parameters}});
    void LogOperation(string operation, object data = null);
}`,
                            description: 'Creates a foundation layer service interface'
                        },
                        {
                            label: '🎯 Feature Controller Action',
                            snippet: `// Feature controller action
public ActionResult {{ActionName}}()
{
    try
    {
        var datasource = GetDatasource<I{{ModelName}}>();
        var viewModel = new {{ViewModelName}}(datasource);
        
        _loggingService.LogInformation($"{{ActionName}} rendered for item: {datasource?.Id}");
        return View(viewModel);
    }
    catch (Exception ex)
    {
        _loggingService.LogError("Error rendering {{ActionName}}", ex);
        return View(new {{ViewModelName}}(null));
    }
}`,
                            description: 'Creates a feature controller action with error handling'
                        },
                        {
                            label: '📝 Glass Mapper Model',
                            snippet: `// Glass Mapper model interface
[SitecoreType(TemplateId = "{{{TemplateId}}}", AutoMap = true)]
public interface I{{ModelName}}
{
    [SitecoreId]
    Guid Id { get; set; }

    [SitecoreField("{{FieldName}}")]
    string {{PropertyName}} { get; set; }

    [SitecoreField("{{ImageFieldName}}")]
    Glass.Mapper.Sc.Fields.Image {{ImagePropertyName}} { get; set; }

    [SitecoreField("{{LinkFieldName}}")]
    Glass.Mapper.Sc.Fields.Link {{LinkPropertyName}} { get; set; }
}`,
                            description: 'Creates a Glass Mapper model interface'
                        },
                        {
                            label: '🎨 Razor View Template',
                            snippet: `@model {{Namespace}}.{{ViewModelName}}

@if (Model.HasContent)
{
    <div class="{{cssClass}}" role="region" aria-label="{{AriaLabel}}">
        <h2 class="{{cssClass}}__title">@Model.{{TitleProperty}}</h2>
        
        @if (!string.IsNullOrEmpty(Model.{{DescriptionProperty}}))
        {
            <p class="{{cssClass}}__description">@Model.{{DescriptionProperty}}</p>
        }
        
        @if (Model.{{ImageProperty}} != null)
        {
            @Html.Glass().RenderImage(Model.{{ImageProperty}}, new { @class = "{{cssClass}}__image", alt = Model.{{AltTextProperty}} })
        }
    </div>
}`,
                            description: 'Creates an accessible Razor view template'
                        },
                        {
                            label: '🧪 Unit Test Template',
                            snippet: `// Unit test for {{ComponentName}}
[TestMethod]
public void {{TestMethodName}}_{{Scenario}}_{{ExpectedResult}}()
{
    // Arrange
    var mockContext = new Mock<ISitecoreContext>();
    var mockLogger = new Mock<ILoggingService>();
    var controller = new {{ControllerName}}(mockContext.Object, mockLogger.Object);
    
    var testData = new {{ModelName}}
    {
        {{PropertyName}} = "{{TestValue}}"
    };
    
    mockContext.Setup(x => x.GetCurrentItem<I{{ModelName}}>()).Returns(testData);
    
    // Act
    var result = controller.{{ActionName}}() as ViewResult;
    
    // Assert
    Assert.IsNotNull(result);
    Assert.IsInstanceOfType(result.Model, typeof({{ViewModelName}}));
    var viewModel = result.Model as {{ViewModelName}};
    Assert.AreEqual("{{ExpectedValue}}", viewModel.{{PropertyName}});
}`,
                            description: 'Creates a unit test with mocking setup'
                        },
                        {
                            label: '🎭 SCSS Component Styles',
                            snippet: `// {{ComponentName}} component styles (BEM methodology)
.{{componentName}} {
  // Base styles
  display: block;
  margin: 0;
  padding: 0;

  &__title {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 1rem;
    color: var(--color-text-primary);
  }

  &__description {
    font-size: 1rem;
    line-height: 1.6;
    margin-bottom: 1rem;
    color: var(--color-text-secondary);
  }

  &__image {
    max-width: 100%;
    height: auto;
    border-radius: var(--border-radius);
  }

  // Modifiers
  &--featured {
    background-color: var(--color-background-highlight);
    padding: 2rem;
  }

  // States
  &:hover {
    transform: translateY(-2px);
    transition: transform 0.2s ease;
  }

  // Responsive
  @media (max-width: 768px) {
    padding: 1rem;
    
    &__title {
      font-size: 1.25rem;
    }
  }
}`,
                            description: 'Creates responsive SCSS component styles'
                        }
                    ];
                    
                    const selected = await vscode.window.showQuickPick(prompts, {
                        placeHolder: 'Select code snippet to insert',
                        matchOnDescription: true
                    });
                    
                    if (selected) {
                        const position = editor.selection.active;
                        await editor.edit(editBuilder => {
                            editBuilder.insert(position, selected.snippet + '\n\n');
                        });
                        
                        vscode.window.showInformationMessage(`✅ Inserted ${selected.label} snippet!`);
                    }
                }
            } catch (error) {
                console.error('Error in insertPrompt:', error);
                vscode.window.showErrorMessage(`Insert Prompt error: ${error}`);
            }
        });
        context.subscriptions.push(insertPrompt);
        console.log('✅ Insert Prompt command registered');

        // 4. Search Prompts - with enhanced implementation using comprehensive search
        const searchPrompts = vscode.commands.registerCommand('dxpPromptLibrary.searchPrompts', async () => {
            console.log('🎯 searchPrompts executed');
            try {
                if (promptManager) {
                    await promptManager.searchPrompts();
                } else {
                    // Enhanced search implementation with comprehensive prompt database
                    const searchTerm = await vscode.window.showInputBox({
                        prompt: 'Search DXP prompts and templates',
                        placeHolder: 'Enter search term (e.g., "controller", "helix", "carousel", "testing")',
                        title: '🔍 DXP Prompt Search'
                    });
                    
                    if (searchTerm && searchTerm.trim()) {
                        const searchResults = await performPromptSearch(searchTerm.toLowerCase());
                        
                        if (searchResults.length === 0) {
                            vscode.window.showInformationMessage(`No prompts found for "${searchTerm}". Try terms like: controller, model, test, carousel, foundation`);
                            return;
                        }

                        const selected = await vscode.window.showQuickPick(searchResults, {
                            placeHolder: `Found ${searchResults.length} results for "${searchTerm}"`,
                            matchOnDescription: true,
                            matchOnDetail: true
                        });

                        if (selected) {
                            await handleSearchResult(selected, context);
                        }
                    }
                }
            } catch (error) {
                console.error('Error in searchPrompts:', error);
                vscode.window.showErrorMessage(`Search error: ${error}`);
            }
        });
        context.subscriptions.push(searchPrompts);
        console.log('✅ Search Prompts command registered');

        // 5. Filter by Component - with enhanced implementation using real data
        const filterByComponent = vscode.commands.registerCommand('dxpPromptLibrary.filterByComponent', async () => {
            console.log('🎯 filterByComponent executed');
            try {
                if (promptManager) {
                    await promptManager.filterByComponent();
                } else {
                    const components = [
                        {
                            label: '🏗️ Foundation',
                            description: 'Base services, utilities, and shared functionality',
                            detail: 'Logging, caching, configuration, dependency injection'
                        },
                        {
                            label: '🎯 Feature', 
                            description: 'Business logic components and functionality',
                            detail: 'Controllers, models, views, services specific to features'
                        },
                        {
                            label: '🚀 Project',
                            description: 'Site-specific implementations and configurations',
                            detail: 'Layouts, site settings, project-specific overrides'
                        },
                        {
                            label: '🎠 Components',
                            description: 'Reusable UI components (Carousel, Forms, Navigation)',
                            detail: 'Interactive components with data templates and styling'
                        },
                        {
                            label: '📊 Data Templates',
                            description: 'Sitecore data template definitions and serialization',
                            detail: 'Content types, field definitions, template inheritance'
                        },
                        {
                            label: '🎨 Frontend',
                            description: 'CSS/SCSS, TypeScript, and responsive design',
                            detail: 'Styling, JavaScript functionality, accessibility features'
                        },
                        {
                            label: '🧪 Testing',
                            description: 'Unit tests, integration tests, and test utilities',
                            detail: 'MSTest, mocking, test data builders, automation'
                        }
                    ];
                    
                    const selected = await vscode.window.showQuickPick(components, {
                        placeHolder: 'Filter prompts by Helix component type',
                        matchOnDescription: true,
                        matchOnDetail: true
                    });
                    
                    if (selected) {
                        await showComponentPrompts(selected.label);
                    }
                }
            } catch (error) {
                console.error('Error in filterByComponent:', error);
                vscode.window.showErrorMessage(`Filter error: ${error}`);
            }
        });
        context.subscriptions.push(filterByComponent);
        console.log('✅ Filter by Component command registered');

        // 6. Filter by SDLC - with enhanced implementation using comprehensive SDLC stages
        const filterBySDLC = vscode.commands.registerCommand('dxpPromptLibrary.filterBySDLC', async () => {
            console.log('🎯 filterBySDLC executed');
            try {
                if (promptManager) {
                    await promptManager.filterBySDLCStage();
                } else {
                    // Enhanced SDLC implementation with comprehensive stages and practices
                    const stages = [
                        {
                            label: '📋 Planning & Analysis',
                            description: 'Requirements gathering, architecture design, and project planning',
                            detail: 'User stories, technical specifications, architecture diagrams, project setup'
                        },
                        {
                            label: '💻 Development & Implementation',
                            description: 'Coding, component development, and feature implementation',
                            detail: 'Controllers, models, views, services, data templates, frontend components'
                        },
                        {
                            label: '🧪 Testing & Quality Assurance',
                            description: 'Unit testing, integration testing, and quality validation',
                            detail: 'Unit tests, integration tests, E2E tests, performance testing, security testing'
                        },
                        {
                            label: '🚀 Deployment & DevOps',
                            description: 'CI/CD pipelines, deployment automation, and environment management',
                            detail: 'Azure DevOps, PowerShell scripts, environment configuration, monitoring'
                        },
                        {
                            label: '🔧 Maintenance & Support',
                            description: 'Monitoring, troubleshooting, optimization, and ongoing support',
                            detail: 'Performance monitoring, log analysis, security updates, documentation'
                        },
                        {
                            label: '📈 Optimization & Enhancement',
                            description: 'Performance tuning, feature enhancements, and continuous improvement',
                            detail: 'Performance optimization, A/B testing, user feedback, feature expansion'
                        }
                    ];
                    
                    const selected = await vscode.window.showQuickPick(stages, {
                        placeHolder: 'Filter prompts by SDLC stage',
                        matchOnDescription: true,
                        matchOnDetail: true
                    });
                    
                    if (selected) {
                        await showSDLCPrompts(selected.label);
                    }
                }
            } catch (error) {
                console.error('Error in filterBySDLC:', error);
                vscode.window.showErrorMessage(`SDLC filter error: ${error}`);
            }
        });
        context.subscriptions.push(filterBySDLC);
        console.log('✅ Filter by SDLC command registered');

        console.log('🎉 ALL 6 COMMANDS REGISTERED SUCCESSFULLY!');
        
        // Immediate verification
        setTimeout(() => {
            vscode.commands.getCommands(true).then(commands => {
                const dxpCommands = commands.filter(cmd => cmd.startsWith('dxpPromptLibrary'));
                console.log(`🔍 Verification: ${dxpCommands.length}/6 DXP commands found`);
                console.log('📋 Found commands:', dxpCommands);
                
                if (dxpCommands.length === 6) {
                    console.log('✅ All commands verified in command registry');
                } else {
                    console.warn(`⚠️ Only ${dxpCommands.length}/6 commands found in registry`);
                }
            });
        }, 500);
        
    } catch (error) {
        console.error('❌ CRITICAL ERROR during command registration:', error);
        vscode.window.showErrorMessage(`Extension activation failed: ${error}`);
    }
    
    // Helper function to generate Sitecore code
    async function generateSitecoreCode(templateType: string, context: vscode.ExtensionContext) {
        try {
            const editor = vscode.window.activeTextEditor;
            if (!editor) {
                // Create new file if no editor is open
                const doc = await vscode.workspace.openTextDocument({
                    content: '',
                    language: 'csharp'
                });
                await vscode.window.showTextDocument(doc);
            }
            
            let codeTemplate = '';
            let fileName = '';
            
            switch (templateType) {
                case '🏗️ Sitecore Helix: Create Foundation Module':
                    codeTemplate = generateFoundationModule();
                    fileName = 'FoundationModule.cs';
                    break;
                case '🎯 Sitecore Helix: Create Feature Module':
                    codeTemplate = generateFeatureModule();
                    fileName = 'FeatureModule.cs';
                    break;
                case '🚀 Sitecore Helix: Create Project Module':
                    codeTemplate = generateProjectModule();
                    fileName = 'ProjectModule.cs';
                    break;
                case '🎠 Sitecore Component: Carousel':
                    codeTemplate = generateCarouselComponent();
                    fileName = 'CarouselController.cs';
                    break;
                case '📝 Sitecore Component: Custom Forms':
                    codeTemplate = generateCustomFormsComponent();
                    fileName = 'CustomFormsController.cs';
                    break;
                case '🧭 Sitecore Component: Navigation':
                    codeTemplate = generateNavigationComponent();
                    fileName = 'NavigationController.cs';
                    break;
                default:
                    codeTemplate = '// Selected template: ' + templateType + '\n// Code generation coming soon!';
            }
            
            // Insert the generated code
            const currentEditor = vscode.window.activeTextEditor;
            if (currentEditor) {
                const position = currentEditor.selection.active;
                await currentEditor.edit(editBuilder => {
                    editBuilder.insert(position, codeTemplate);
                });
                
                vscode.window.showInformationMessage(`✅ Generated ${fileName} - Sitecore Helix code ready!`);
            }
            
        } catch (error) {
            console.error('Error generating code:', error);
            vscode.window.showErrorMessage(`Code generation error: ${error}`);
        }
    }

    // Helper function to show component-specific prompts
    async function showComponentPrompts(componentType: string) {
        const prompts: { [key: string]: any[] } = {
            '🏗️ Foundation': [
                { label: 'Service Interface', description: 'Create foundation service interface with DI' },
                { label: 'Logging Service', description: 'Implement logging service with Sitecore.Diagnostics' },
                { label: 'Cache Service', description: 'Create caching service with Sitecore cache' },
                { label: 'Configuration Service', description: 'Build configuration service for settings' },
                { label: 'DI Configuration', description: 'Set up dependency injection configuration' }
            ],
            '🎯 Feature': [
                { label: 'Controller Action', description: 'Create feature controller with error handling' },
                { label: 'View Model', description: 'Build view model with validation' },
                { label: 'Glass Mapper Model', description: 'Create Glass Mapper interface for data template' },
                { label: 'Service Layer', description: 'Implement feature-specific service' },
                { label: 'Razor View', description: 'Create accessible Razor view template' }
            ],
            '🚀 Project': [
                { label: 'Site Controller', description: 'Create project-specific site controller' },
                { label: 'Layout View', description: 'Build main layout view for site' },
                { label: 'Site Configuration', description: 'Configure site settings and multi-site setup' },
                { label: 'Global Navigation', description: 'Implement site-wide navigation components' },
                { label: 'Asset Pipeline', description: 'Set up CSS/JS bundling and optimization' }
            ],
            '🎠 Components': [
                { label: 'Carousel Component', description: 'Generate responsive carousel with accessibility' },
                { label: 'Form Component', description: 'Create dynamic form builder with validation' },
                { label: 'Navigation Component', description: 'Build multi-level responsive navigation' },
                { label: 'Search Component', description: 'Implement search with auto-complete' },
                { label: 'Media Gallery', description: 'Create responsive image/video gallery' }
            ],
            '📊 Data Templates': [
                { label: 'Base Template', description: 'Create base template with common fields' },
                { label: 'Content Template', description: 'Build content template with rich text and media' },
                { label: 'Settings Template', description: 'Create configuration/settings template' },
                { label: 'Template Serialization', description: 'Generate serialization files for TDS/Unicorn' },
                { label: 'Template Validation', description: 'Add field validation and business rules' }
            ],
            '🎨 Frontend': [
                { label: 'SCSS Component', description: 'Create component styles with BEM methodology' },
                { label: 'TypeScript Module', description: 'Build TypeScript module for interactivity' },
                { label: 'Responsive Grid', description: 'Implement CSS Grid/Flexbox layout system' },
                { label: 'Accessibility Features', description: 'Add ARIA labels and keyboard navigation' },
                { label: 'Animation Library', description: 'Create CSS animations and transitions' }
            ],
            '🧪 Testing': [
                { label: 'Unit Test', description: 'Create unit test with mocking setup' },
                { label: 'Integration Test', description: 'Build integration test for Sitecore components' },
                { label: 'Test Data Builder', description: 'Create test data builder pattern' },
                { label: 'Mock Configuration', description: 'Set up mocking for Sitecore context' },
                { label: 'E2E Test', description: 'Create end-to-end test with Selenium' }
            ]
        };

        const componentPrompts = prompts[componentType] || [];
        
        if (componentPrompts.length === 0) {
            vscode.window.showInformationMessage(`No specific prompts available for ${componentType} yet.`);
            return;
        }

        const selected = await vscode.window.showQuickPick(componentPrompts, {
            placeHolder: `Select ${componentType} prompt template`,
            matchOnDescription: true
        });

        if (selected) {
            vscode.window.showInformationMessage(`Selected: ${selected.label} - Implementation coming soon!`);
            // TODO: Implement specific prompt generation based on selection
        }
    }
    
    // Code generation functions
    function generateFoundationModule(): string {
        return `// Foundation Module - Base Services and Utilities
using Microsoft.Extensions.DependencyInjection;
using Sitecore.DependencyInjection;

namespace Foundation.YourModule
{
    /// <summary>
    /// Foundation module providing core services and utilities following Helix architecture
    /// </summary>
    public class ServicesConfigurator : IServicesConfigurator
    {
        public void Configure(IServiceCollection serviceCollection)
        {
            // Register foundation services
            serviceCollection.AddScoped<ILoggingService, LoggingService>();
            serviceCollection.AddScoped<ICacheService, CacheService>();
            serviceCollection.AddScoped<IConfigurationService, ConfigurationService>();
        }
    }

    /// <summary>
    /// Base logging service for foundation layer
    /// </summary>
    public interface ILoggingService
    {
        void LogError(string message, Exception exception = null);
        void LogInformation(string message);
        void LogWarning(string message);
    }

    public class LoggingService : ILoggingService
    {
        public void LogError(string message, Exception exception = null)
        {
            Sitecore.Diagnostics.Log.Error(message, exception, this);
        }

        public void LogInformation(string message)
        {
            Sitecore.Diagnostics.Log.Info(message, this);
        }

        public void LogWarning(string message)
        {
            Sitecore.Diagnostics.Log.Warn(message, this);
        }
    }

    /// <summary>
    /// Base caching service for foundation layer
    /// </summary>
    public interface ICacheService
    {
        T Get<T>(string key) where T : class;
        void Set<T>(string key, T value, TimeSpan? expiration = null) where T : class;
        void Remove(string key);
    }

    public class CacheService : ICacheService
    {
        private readonly Sitecore.Caching.Cache _cache;

        public CacheService()
        {
            _cache = Sitecore.Caching.CacheManager.GetNamedInstance("Foundation.YourModule", StringUtil.ParseSizeString("10MB"));
        }

        public T Get<T>(string key) where T : class
        {
            return _cache.GetValue(key) as T;
        }

        public void Set<T>(string key, T value, TimeSpan? expiration = null) where T : class
        {
            var expirationTime = expiration ?? TimeSpan.FromHours(1);
            _cache.Add(key, value, DateTime.UtcNow.Add(expirationTime));
        }

        public void Remove(string key)
        {
            _cache.Remove(key);
        }
    }
}

// TODO: Add unit tests for foundation services
// TODO: Configure dependency injection in Foundation.DI module
// TODO: Add configuration settings in Foundation.Configuration module
`;
    }

    function generateFeatureModule(): string {
        return `// Feature Module - Business Logic and Components
using System;
using System.Web.Mvc;
using Sitecore.Mvc.Controllers;
using Glass.Mapper.Sc;

namespace Feature.YourFeature.Controllers
{
    /// <summary>
    /// Feature controller following Helix architecture principles
    /// </summary>
    public class YourFeatureController : SitecoreController
    {
        private readonly ISitecoreContext _sitecoreContext;
        private readonly Foundation.YourModule.ILoggingService _loggingService;

        public YourFeatureController(
            ISitecoreContext sitecoreContext,
            Foundation.YourModule.ILoggingService loggingService)
        {
            _sitecoreContext = sitecoreContext ?? throw new ArgumentNullException(nameof(sitecoreContext));
            _loggingService = loggingService ?? throw new ArgumentNullException(nameof(loggingService));
        }

        public ActionResult Index()
        {
            try
            {
                var datasource = GetDatasource<IYourFeatureModel>();
                var viewModel = new YourFeatureViewModel(datasource);
                
                _loggingService.LogInformation($"YourFeature rendered for item: {datasource?.Id}");
                return View(viewModel);
            }
            catch (Exception ex)
            {
                _loggingService.LogError("Error rendering YourFeature", ex);
                return View(new YourFeatureViewModel(null));
            }
        }

        private T GetDatasource<T>() where T : class
        {
            if (RenderingContext.Current?.Rendering?.Item != null)
            {
                return _sitecoreContext.Cast<T>(RenderingContext.Current.Rendering.Item);
            }
            return _sitecoreContext.GetCurrentItem<T>();
        }
    }

    /// <summary>
    /// Glass Mapper model for YourFeature data template
    /// </summary>
    [SitecoreType(TemplateId = "{YOUR-TEMPLATE-ID}", AutoMap = true)]
    public interface IYourFeatureModel
    {
        [SitecoreId]
        Guid Id { get; set; }

        [SitecoreField("Title")]
        string Title { get; set; }

        [SitecoreField("Description")]
        string Description { get; set; }

        [SitecoreField("Image")]
        Glass.Mapper.Sc.Fields.Image Image { get; set; }

        [SitecoreField("Link")]
        Glass.Mapper.Sc.Fields.Link Link { get; set; }
    }

    /// <summary>
    /// View model for YourFeature component
    /// </summary>
    public class YourFeatureViewModel
    {
        public IYourFeatureModel Datasource { get; }
        public bool HasContent => Datasource != null && !string.IsNullOrEmpty(Datasource.Title);

        public YourFeatureViewModel(IYourFeatureModel datasource)
        {
            Datasource = datasource;
        }
    }
}

// TODO: Create corresponding Razor view in Views/YourFeature/Index.cshtml
// TODO: Create data template in Sitecore with fields: Title, Description, Image, Link
// TODO: Add rendering definition in Sitecore
// TODO: Create unit tests for controller and view model
// TODO: Add CSS/SCSS styles following BEM methodology
// TODO: Add TypeScript for any interactive functionality
`;
    }

    function generateProjectModule(): string {
        return `// Project Module - Site-specific Implementation
using System.Web.Mvc;
using Sitecore.Mvc.Controllers;

namespace Project.YourSite.Controllers
{
    /// <summary>
    /// Project-specific controller for site-wide functionality
    /// </summary>
    public class SiteController : SitecoreController
    {
        private readonly Foundation.YourModule.ILoggingService _loggingService;
        private readonly Foundation.YourModule.IConfigurationService _configurationService;

        public SiteController(
            Foundation.YourModule.ILoggingService loggingService,
            Foundation.YourModule.IConfigurationService configurationService)
        {
            _loggingService = loggingService;
            _configurationService = configurationService;
        }

        /// <summary>
        /// Header component for the site
        /// </summary>
        public ActionResult Header()
        {
            var viewModel = new HeaderViewModel
            {
                SiteName = _configurationService.GetSetting("SiteName", "Your Site"),
                LogoUrl = _configurationService.GetSetting("LogoUrl", "/images/logo.png"),
                ShowSearch = _configurationService.GetBoolSetting("ShowHeaderSearch", true)
            };

            return View(viewModel);
        }

        /// <summary>
        /// Footer component for the site
        /// </summary>
        public ActionResult Footer()
        {
            var viewModel = new FooterViewModel
            {
                CopyrightText = _configurationService.GetSetting("CopyrightText", "© 2025 Your Site"),
                ShowSocialLinks = _configurationService.GetBoolSetting("ShowSocialLinks", true),
                ContactEmail = _configurationService.GetSetting("ContactEmail", "contact@yoursite.com")
            };

            return View(viewModel);
        }
    }

    /// <summary>
    /// Header view model
    /// </summary>
    public class HeaderViewModel
    {
        public string SiteName { get; set; }
        public string LogoUrl { get; set; }
        public bool ShowSearch { get; set; }
    }

    /// <summary>
    /// Footer view model
    /// </summary>
    public class FooterViewModel
    {
        public string CopyrightText { get; set; }
        public bool ShowSocialLinks { get; set; }
        public string ContactEmail { get; set; }
    }
}

// Project Module Configuration
namespace Project.YourSite.DI
{
    using Microsoft.Extensions.DependencyInjection;
    using Sitecore.DependencyInjection;

    public class ServicesConfigurator : IServicesConfigurator
    {
        public void Configure(IServiceCollection serviceCollection)
        {
            // Register project-specific services
            serviceCollection.AddScoped<ISiteSettingsService, SiteSettingsService>();
            serviceCollection.AddScoped<INavigationService, NavigationService>();
        }
    }
}

// TODO: Create layout views for the site (Main.cshtml, etc.)
// TODO: Configure site definition in Sitecore
// TODO: Set up multi-site configuration if needed
// TODO: Create CSS/SCSS for site-specific styling
// TODO: Configure CDN and static asset handling
// TODO: Set up analytics and tracking codes
`;
    }

    function generateCarouselComponent(): string {
        return `// Carousel Component - Responsive carousel with accessibility features
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using Sitecore.Mvc.Controllers;
using Glass.Mapper.Sc;

namespace Feature.Carousel.Controllers
{
    /// <summary>
    /// Carousel component controller with accessibility and responsive features
    /// </summary>
    public class CarouselController : SitecoreController
    {
        private readonly ISitecoreContext _sitecoreContext;
        private readonly Foundation.YourModule.ILoggingService _loggingService;

        public CarouselController(
            ISitecoreContext sitecoreContext,
            Foundation.YourModule.ILoggingService loggingService)
        {
            _sitecoreContext = sitecoreContext;
            _loggingService = loggingService;
        }

        public ActionResult Index()
        {
            try
            {
                var datasource = GetDatasource<ICarouselModel>();
                var slides = GetCarouselSlides(datasource);
                var renderingParameters = GetRenderingParameters();

                var viewModel = new CarouselViewModel
                {
                    Datasource = datasource,
                    Slides = slides,
                    AutoPlay = renderingParameters.AutoPlay,
                    AutoPlayInterval = renderingParameters.AutoPlayInterval,
                    ShowIndicators = renderingParameters.ShowIndicators,
                    ShowArrows = renderingParameters.ShowArrows,
                    InfiniteLoop = renderingParameters.InfiniteLoop
                };

                return View(viewModel);
            }
            catch (Exception ex)
            {
                _loggingService.LogError("Error rendering Carousel component", ex);
                return View(new CarouselViewModel());
            }
        }

        private ICarouselModel GetDatasource<T>() where T : class
        {
            if (RenderingContext.Current?.Rendering?.Item != null)
            {
                return _sitecoreContext.Cast<ICarouselModel>(RenderingContext.Current.Rendering.Item);
            }
            return _sitecoreContext.GetCurrentItem<ICarouselModel>();
        }

        private IEnumerable<ICarouselSlideModel> GetCarouselSlides(ICarouselModel datasource)
        {
            return datasource?.Slides?.Where(slide => slide != null) ?? Enumerable.Empty<ICarouselSlideModel>();
        }

        private CarouselRenderingParameters GetRenderingParameters()
        {
            var parameters = RenderingContext.Current?.Rendering?.Parameters;
            return new CarouselRenderingParameters
            {
                AutoPlay = parameters?["AutoPlay"] == "1",
                AutoPlayInterval = int.TryParse(parameters?["AutoPlayInterval"], out var interval) ? interval : 5000,
                ShowIndicators = parameters?["ShowIndicators"] != "0",
                ShowArrows = parameters?["ShowArrows"] != "0",
                InfiniteLoop = parameters?["InfiniteLoop"] != "0"
            };
        }
    }

    /// <summary>
    /// Glass Mapper model for Carousel data template
    /// </summary>
    [SitecoreType(TemplateId = "{CAROUSEL-TEMPLATE-ID}", AutoMap = true)]
    public interface ICarouselModel
    {
        [SitecoreId]
        Guid Id { get; set; }

        [SitecoreField("Title")]
        string Title { get; set; }

        [SitecoreField("Slides")]
        IEnumerable<ICarouselSlideModel> Slides { get; set; }
    }

    /// <summary>
    /// Glass Mapper model for Carousel Slide data template
    /// </summary>
    [SitecoreType(TemplateId = "{CAROUSEL-SLIDE-TEMPLATE-ID}", AutoMap = true)]
    public interface ICarouselSlideModel
    {
        [SitecoreId]
        Guid Id { get; set; }

        [SitecoreField("Title")]
        string Title { get; set; }

        [SitecoreField("Description")]
        string Description { get; set; }

        [SitecoreField("Image")]
        Glass.Mapper.Sc.Fields.Image Image { get; set; }

        [SitecoreField("Link")]
        Glass.Mapper.Sc.Fields.Link Link { get; set; }

        [SitecoreField("AltText")]
        string AltText { get; set; }
    }

    /// <summary>
    /// View model for Carousel component
    /// </summary>
    public class CarouselViewModel
    {
        public ICarouselModel Datasource { get; set; }
        public IEnumerable<ICarouselSlideModel> Slides { get; set; } = Enumerable.Empty<ICarouselSlideModel>();
        public bool AutoPlay { get; set; }
        public int AutoPlayInterval { get; set; } = 5000;
        public bool ShowIndicators { get; set; } = true;
        public bool ShowArrows { get; set; } = true;
        public bool InfiniteLoop { get; set; } = true;
        public bool HasSlides => Slides?.Any() == true;
        public string CarouselId => $"carousel-{Datasource?.Id.ToString("N") ?? Guid.NewGuid().ToString("N")}";
    }

    /// <summary>
    /// Rendering parameters for Carousel component
    /// </summary>
    public class CarouselRenderingParameters
    {
        public bool AutoPlay { get; set; }
        public int AutoPlayInterval { get; set; }
        public bool ShowIndicators { get; set; }
        public bool ShowArrows { get; set; }
        public bool InfiniteLoop { get; set; }
    }
}

/*
TypeScript for Carousel functionality:

export class CarouselComponent {
    private carousel: HTMLElement;
    private slides: HTMLElement[];
    private currentSlide: number = 0;
    private autoPlayInterval: number;
    private autoPlayTimer?: number;

    constructor(carouselId: string, options: CarouselOptions) {
        this.carousel = document.getElementById(carouselId)!;
        this.slides = Array.from(this.carousel.querySelectorAll('.carousel-slide'));
        this.autoPlayInterval = options.autoPlayInterval || 5000;
        
        this.init();
        
        if (options.autoPlay) {
            this.startAutoPlay();
        }
    }

    private init(): void {
        this.setupEventListeners();
        this.setupAccessibility();
        this.showSlide(0);
    }

    private setupEventListeners(): void {
        // Keyboard navigation
        this.carousel.addEventListener('keydown', (e) => {
            switch (e.key) {
                case 'ArrowLeft':
                    this.previousSlide();
                    break;
                case 'ArrowRight':
                    this.nextSlide();
                    break;
            }
        });

        // Touch/swipe support
        let startX: number;
        this.carousel.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        });

        this.carousel.addEventListener('touchend', (e) => {
            const endX = e.changedTouches[0].clientX;
            const diff = startX - endX;
            
            if (Math.abs(diff) > 50) {
                if (diff > 0) {
                    this.nextSlide();
                } else {
                    this.previousSlide();
                }
            }
        });
    }

    private setupAccessibility(): void {
        this.carousel.setAttribute('role', 'region');
        this.carousel.setAttribute('aria-label', 'Image carousel');
        
        this.slides.forEach((slide, index) => {
            slide.setAttribute('aria-hidden', index === 0 ? 'false' : 'true');
            slide.setAttribute('role', 'group');
            slide.setAttribute('aria-roledescription', 'slide');
            slide.setAttribute('aria-label', \`Slide \${index + 1} of \${this.slides.length}\`);
        });
    }

    public nextSlide(): void {
        this.currentSlide = (this.currentSlide + 1) % this.slides.length;
        this.showSlide(this.currentSlide);
    }

    public previousSlide(): void {
        this.currentSlide = this.currentSlide === 0 ? this.slides.length - 1 : this.currentSlide - 1;
        this.showSlide(this.currentSlide);
    }

    private showSlide(index: number): void {
        this.slides.forEach((slide, i) => {
            slide.style.transform = \`translateX(\${(i - index) * 100}%)\`;
            slide.setAttribute('aria-hidden', i === index ? 'false' : 'true');
        });
    }

    private startAutoPlay(): void {
        this.autoPlayTimer = window.setInterval(() => {
            this.nextSlide();
        }, this.autoPlayInterval);
    }

    public stopAutoPlay(): void {
        if (this.autoPlayTimer) {
            clearInterval(this.autoPlayTimer);
        }
    }
}
*/

// TODO: Create Razor view with accessibility features
// TODO: Create SCSS styles following BEM methodology  
// TODO: Add data templates for Carousel and CarouselSlide
// TODO: Create rendering parameters template
// TODO: Add unit tests for controller logic
// TODO: Add E2E tests for carousel functionality
`;
    }

    function generateCustomFormsComponent(): string {
        return `// Custom Forms Component - Dynamic form builder with validation
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web.Mvc;
using System.Threading.Tasks;
using Sitecore.Mvc.Controllers;

namespace Feature.CustomForms.Controllers
{
    /// <summary>
    /// Custom Forms controller with dynamic form generation and validation
    /// </summary>
    public class CustomFormsController : SitecoreController
    {
        private readonly IFormBuilderService _formBuilderService;
        private readonly IFormSubmissionService _submissionService;
        private readonly Foundation.YourModule.ILoggingService _loggingService;

        public CustomFormsController(
            IFormBuilderService formBuilderService,
            IFormSubmissionService submissionService,
            Foundation.YourModule.ILoggingService loggingService)
        {
            _formBuilderService = formBuilderService;
            _submissionService = submissionService;
            _loggingService = loggingService;
        }

        public ActionResult Index()
        {
            try
            {
                var formDefinition = _formBuilderService.GetFormDefinition(RenderingContext.Current?.Rendering?.Item);
                var viewModel = new CustomFormViewModel
                {
                    FormDefinition = formDefinition,
                    FormId = Guid.NewGuid().ToString()
                };

                return View(viewModel);
            }
            catch (Exception ex)
            {
                _loggingService.LogError("Error rendering Custom Form", ex);
                return View(new CustomFormViewModel());
            }
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Submit(FormSubmissionModel submission)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return Json(new { success = false, errors = GetModelErrors() });
                }

                var validationResult = await _submissionService.ValidateSubmission(submission);
                if (!validationResult.IsValid)
                {
                    return Json(new { success = false, errors = validationResult.Errors });
                }

                var submissionId = await _submissionService.ProcessSubmission(submission);
                
                _loggingService.LogInformation($"Form submission processed: {submissionId}");
                
                return Json(new { 
                    success = true, 
                    message = "Form submitted successfully!",
                    submissionId = submissionId 
                });
            }
            catch (Exception ex)
            {
                _loggingService.LogError("Error processing form submission", ex);
                return Json(new { success = false, errors = new[] { "An error occurred processing your submission." } });
            }
        }

        private string[] GetModelErrors()
        {
            return ModelState.Values
                .SelectMany(v => v.Errors)
                .Select(e => e.ErrorMessage)
                .ToArray();
        }
    }

    /// <summary>
    /// Form builder service interface
    /// </summary>
    public interface IFormBuilderService
    {
        FormDefinition GetFormDefinition(Sitecore.Data.Items.Item formItem);
        IEnumerable<FormField> GetFormFields(FormDefinition definition);
    }

    /// <summary>
    /// Form submission service interface
    /// </summary>
    public interface IFormSubmissionService
    {
        Task<ValidationResult> ValidateSubmission(FormSubmissionModel submission);
        Task<string> ProcessSubmission(FormSubmissionModel submission);
        Task SendNotifications(FormSubmissionModel submission);
    }

    /// <summary>
    /// Form definition model
    /// </summary>
    public class FormDefinition
    {
        public string FormId { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public IEnumerable<FormField> Fields { get; set; } = Enumerable.Empty<FormField>();
        public FormSettings Settings { get; set; } = new FormSettings();
    }

    /// <summary>
    /// Form field model
    /// </summary>
    public class FormField
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string Label { get; set; }
        public FormFieldType Type { get; set; }
        public bool Required { get; set; }
        public string Placeholder { get; set; }
        public string HelpText { get; set; }
        public IEnumerable<FormFieldOption> Options { get; set; } = Enumerable.Empty<FormFieldOption>();
        public ValidationRule[] ValidationRules { get; set; } = Array.Empty<ValidationRule>();
    }

    /// <summary>
    /// Form field types
    /// </summary>
    public enum FormFieldType
    {
        Text,
        Email,
        Phone,
        Number,
        TextArea,
        Select,
        Checkbox,
        Radio,
        FileUpload,
        Date,
        Hidden
    }

    /// <summary>
    /// Form field option for select/radio/checkbox fields
    /// </summary>
    public class FormFieldOption
    {
        public string Value { get; set; }
        public string Text { get; set; }
        public bool Selected { get; set; }
    }

    /// <summary>
    /// Form settings
    /// </summary>
    public class FormSettings
    {
        public bool RequireAuthentication { get; set; }
        public bool EnableCaptcha { get; set; }
        public bool SaveToDatabase { get; set; }
        public bool SendEmailNotification { get; set; }
        public string SuccessMessage { get; set; } = "Thank you for your submission!";
        public string RedirectUrl { get; set; }
        public int MaxFileSize { get; set; } = 5; // MB
        public string[] AllowedFileTypes { get; set; } = { ".pdf", ".doc", ".docx", ".jpg", ".png" };
    }

    /// <summary>
    /// Form submission model
    /// </summary>
    public class FormSubmissionModel
    {
        public string FormId { get; set; }
        public Dictionary<string, object> FieldValues { get; set; } = new Dictionary<string, object>();
        public DateTime SubmittedAt { get; set; } = DateTime.UtcNow;
        public string UserAgent { get; set; }
        public string IpAddress { get; set; }
    }

    /// <summary>
    /// Validation result
    /// </summary>
    public class ValidationResult
    {
        public bool IsValid { get; set; }
        public string[] Errors { get; set; } = Array.Empty<string>();
    }

    /// <summary>
    /// Validation rule
    /// </summary>
    public class ValidationRule
    {
        public string Type { get; set; } // "required", "email", "minLength", "maxLength", "pattern"
        public string Value { get; set; }
        public string ErrorMessage { get; set; }
    }

    /// <summary>
    /// Custom form view model
    /// </summary>
    public class CustomFormViewModel
    {
        public FormDefinition FormDefinition { get; set; }
        public string FormId { get; set; }
        public bool HasFields => FormDefinition?.Fields?.Any() == true;
    }
}

/*
JavaScript for dynamic form functionality:

class CustomFormHandler {
    constructor(formId) {
        this.form = document.getElementById(formId);
        this.init();
    }

    init() {
        this.setupValidation();
        this.setupConditionalFields();
        this.setupFileUpload();
        this.setupFormSubmission();
    }

    setupValidation() {
        // Real-time validation
        this.form.querySelectorAll('input, textarea, select').forEach(field => {
            field.addEventListener('blur', (e) => this.validateField(e.target));
            field.addEventListener('input', (e) => this.clearFieldError(e.target));
        });
    }

    validateField(field) {
        const rules = JSON.parse(field.dataset.validationRules || '[]');
        const errors = [];

        rules.forEach(rule => {
            if (!this.validateRule(field.value, rule)) {
                errors.push(rule.errorMessage);
            }
        });

        this.displayFieldErrors(field, errors);
        return errors.length === 0;
    }

    validateRule(value, rule) {
        switch (rule.type) {
            case 'required':
                return value.trim() !== '';
            case 'email':
                return /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(value);
            case 'minLength':
                return value.length >= parseInt(rule.value);
            case 'maxLength':
                return value.length <= parseInt(rule.value);
            case 'pattern':
                return new RegExp(rule.value).test(value);
            default:
                return true;
        }
    }

    setupFormSubmission() {
        this.form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            if (!this.validateForm()) {
                return;
            }

            const formData = new FormData(this.form);
            
            try {
                const response = await fetch('/CustomForms/Submit', {
                    method: 'POST',
                    body: formData
                });

                const result = await response.json();
                
                if (result.success) {
                    this.showSuccess(result.message);
                } else {
                    this.showErrors(result.errors);
                }
            } catch (error) {
                this.showErrors(['An error occurred submitting the form.']);
            }
        });
    }
}
*/

// TODO: Implement IFormBuilderService and IFormSubmissionService
// TODO: Create data templates for form definitions and fields
// TODO: Add GDPR compliance features (consent checkboxes, data retention)
// TODO: Implement file upload with virus scanning
// TODO: Add form analytics and conversion tracking
// TODO: Create admin interface for form management
// TODO: Add email templates for notifications
// TODO: Implement form export functionality (Excel, CSV)
`;
    }

    function generateNavigationComponent(): string {
        return `// Navigation Component - Multi-level responsive navigation
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using Sitecore.Mvc.Controllers;
using Glass.Mapper.Sc;

namespace Feature.Navigation.Controllers
{
    /// <summary>
    /// Navigation controller with multi-level menu and breadcrumbs
    /// </summary>
    public class NavigationController : SitecoreController
    {
        private readonly ISitecoreContext _sitecoreContext;
        private readonly INavigationService _navigationService;
        private readonly Foundation.YourModule.ILoggingService _loggingService;

        public NavigationController(
            ISitecoreContext sitecoreContext,
            INavigationService navigationService,
            Foundation.YourModule.ILoggingService loggingService)
        {
            _sitecoreContext = sitecoreContext;
            _navigationService = navigationService;
            _loggingService = loggingService;
        }

        /// <summary>
        /// Main navigation menu
        /// </summary>
        public ActionResult MainMenu()
        {
            try
            {
                var currentItem = _sitecoreContext.GetCurrentItem<INavigationItem>();
                var rootItem = _navigationService.GetNavigationRoot(currentItem);
                var menuItems = _navigationService.GetNavigationItems(rootItem, 3); // 3 levels deep

                var viewModel = new MainMenuViewModel
                {
                    MenuItems = menuItems,
                    CurrentItem = currentItem
                };

                return View(viewModel);
            }
            catch (Exception ex)
            {
                _loggingService.LogError("Error rendering main navigation", ex);
                return View(new MainMenuViewModel());
            }
        }

        /// <summary>
        /// Breadcrumb navigation
        /// </summary>
        public ActionResult Breadcrumbs()
        {
            try
            {
                var currentItem = _sitecoreContext.GetCurrentItem<INavigationItem>();
                var breadcrumbs = _navigationService.GetBreadcrumbs(currentItem);

                var viewModel = new BreadcrumbViewModel
                {
                    Items = breadcrumbs,
                    ShowHome = true,
                    ShowCurrentPage = true
                };

                return View(viewModel);
            }
            catch (Exception ex)
            {
                _loggingService.LogError("Error rendering breadcrumbs", ex);
                return View(new BreadcrumbViewModel());
            }
        }

        /// <summary>
        /// Left navigation for current section
        /// </summary>
        public ActionResult LeftNavigation()
        {
            try
            {
                var currentItem = _sitecoreContext.GetCurrentItem<INavigationItem>();
                var sectionRoot = _navigationService.GetSectionRoot(currentItem);
                var navItems = _navigationService.GetNavigationItems(sectionRoot, 2);

                var viewModel = new LeftNavigationViewModel
                {
                    SectionRoot = sectionRoot,
                    NavigationItems = navItems,
                    CurrentItem = currentItem
                };

                return View(viewModel);
            }
            catch (Exception ex)
            {
                _loggingService.LogError("Error rendering left navigation", ex);
                return View(new LeftNavigationViewModel());
            }
        }
    }

    /// <summary>
    /// Navigation service interface
    /// </summary>
    public interface INavigationService
    {
        INavigationItem GetNavigationRoot(INavigationItem currentItem);
        INavigationItem GetSectionRoot(INavigationItem currentItem);
        IEnumerable<INavigationItem> GetNavigationItems(INavigationItem rootItem, int maxLevels);
        IEnumerable<INavigationItem> GetBreadcrumbs(INavigationItem currentItem);
        bool IsItemInNavigation(INavigationItem item);
        bool IsCurrentItem(INavigationItem item, INavigationItem currentItem);
        bool IsAncestorOfCurrentItem(INavigationItem item, INavigationItem currentItem);
    }

    /// <summary>
    /// Navigation service implementation
    /// </summary>
    public class NavigationService : INavigationService
    {
        private readonly ISitecoreContext _sitecoreContext;

        public NavigationService(ISitecoreContext sitecoreContext)
        {
            _sitecoreContext = sitecoreContext;
        }

        public INavigationItem GetNavigationRoot(INavigationItem currentItem)
        {
            // Find the site root or navigation root
            var item = currentItem;
            while (item?.Parent != null && !item.IsNavigationRoot)
            {
                item = item.Parent;
            }
            return item;
        }

        public INavigationItem GetSectionRoot(INavigationItem currentItem)
        {
            // Find the section root (typically 2nd level)
            var item = currentItem;
            var root = GetNavigationRoot(currentItem);
            
            while (item?.Parent != null && item.Parent.Id != root.Id)
            {
                item = item.Parent;
            }
            
            return item ?? currentItem;
        }

        public IEnumerable<INavigationItem> GetNavigationItems(INavigationItem rootItem, int maxLevels)
        {
            return GetNavigationItemsRecursive(rootItem, 0, maxLevels);
        }

        private IEnumerable<INavigationItem> GetNavigationItemsRecursive(INavigationItem item, int currentLevel, int maxLevels)
        {
            if (item == null || currentLevel >= maxLevels) yield break;

            if (IsItemInNavigation(item))
            {
                yield return item;

                foreach (var child in item.Children?.Where(IsItemInNavigation) ?? Enumerable.Empty<INavigationItem>())
                {
                    foreach (var descendant in GetNavigationItemsRecursive(child, currentLevel + 1, maxLevels))
                    {
                        yield return descendant;
                    }
                }
            }
        }

        public IEnumerable<INavigationItem> GetBreadcrumbs(INavigationItem currentItem)
        {
            var breadcrumbs = new List<INavigationItem>();
            var item = currentItem;

            while (item != null)
            {
                if (IsItemInNavigation(item))
                {
                    breadcrumbs.Insert(0, item);
                }
                item = item.Parent;
            }

            return breadcrumbs;
        }

        public bool IsItemInNavigation(INavigationItem item)
        {
            return item != null && 
                   item.ShowInNavigation && 
                   !string.IsNullOrEmpty(item.NavigationTitle);
        }

        public bool IsCurrentItem(INavigationItem item, INavigationItem currentItem)
        {
            return item?.Id == currentItem?.Id;
        }

        public bool IsAncestorOfCurrentItem(INavigationItem item, INavigationItem currentItem)
        {
            var current = currentItem?.Parent;
            while (current != null)
            {
                if (current.Id == item.Id)
                    return true;
                current = current.Parent;
            }
            return false;
        }
    }

    /// <summary>
    /// Glass Mapper model for navigation items
    /// </summary>
    [SitecoreType(AutoMap = true)]
    public interface INavigationItem
    {
        [SitecoreId]
        Guid Id { get; set; }

        [SitecoreField("Navigation Title")]
        string NavigationTitle { get; set; }

        [SitecoreInfo(SitecoreInfoType.DisplayName)]
        string DisplayName { get; set; }

        [SitecoreInfo(SitecoreInfoType.Url)]
        string Url { get; set; }

        [SitecoreField("Show in Navigation")]
        bool ShowInNavigation { get; set; }

        [SitecoreField("Is Navigation Root")]
        bool IsNavigationRoot { get; set; }

        [SitecoreField("Navigation Description")]
        string NavigationDescription { get; set; }

        [SitecoreField("Open in New Window")]
        bool OpenInNewWindow { get; set; }

        [SitecoreParent]
        INavigationItem Parent { get; set; }

        [SitecoreChildren]
        IEnumerable<INavigationItem> Children { get; set; }
    }

    /// <summary>
    /// Main menu view model
    /// </summary>
    public class MainMenuViewModel
    {
        public IEnumerable<INavigationItem> MenuItems { get; set; } = Enumerable.Empty<INavigationItem>();
        public INavigationItem CurrentItem { get; set; }
        public bool HasMenuItems => MenuItems?.Any() == true;
    }

    /// <summary>
    /// Breadcrumb view model
    /// </summary>
    public class BreadcrumbViewModel
    {
        public IEnumerable<INavigationItem> Items { get; set; } = Enumerable.Empty<INavigationItem>();
        public bool ShowHome { get; set; } = true;
        public bool ShowCurrentPage { get; set; } = true;
        public bool HasBreadcrumbs => Items?.Any() == true;
    }

    /// <summary>
    /// Left navigation view model
    /// </summary>
    public class LeftNavigationViewModel
    {
        public INavigationItem SectionRoot { get; set; }
        public IEnumerable<INavigationItem> NavigationItems { get; set; } = Enumerable.Empty<INavigationItem>();
        public INavigationItem CurrentItem { get; set; }
        public bool HasNavigationItems => NavigationItems?.Any() == true;
    }
}

/*
SCSS for responsive navigation:

.main-navigation {
  &__list {
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
    
    @media (max-width: 768px) {
      flex-direction: column;
      position: fixed;
      top: 60px;
      left: -100%;
      width: 100%;
      background: white;
      transition: left 0.3s ease;
      
      &--open {
        left: 0;
      }
    }
  }

  &__item {
    position: relative;
    
    &:hover .main-navigation__submenu {
      opacity: 1;
      visibility: visible;
      transform: translateY(0);
    }
  }

  &__link {
    display: block;
    padding: 1rem;
    text-decoration: none;
    transition: background-color 0.2s;
    
    &:hover,
    &:focus {
      background-color: #f5f5f5;
    }
    
    &--current {
      font-weight: bold;
      background-color: #e3f2fd;
    }
  }

  &__submenu {
    position: absolute;
    top: 100%;
    left: 0;
    min-width: 200px;
    background: white;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    opacity: 0;
    visibility: hidden;
    transform: translateY(-10px);
    transition: all 0.2s ease;
    z-index: 1000;
    
    @media (max-width: 768px) {
      position: static;
      opacity: 1;
      visibility: visible;
      transform: none;
      box-shadow: none;
      margin-left: 1rem;
    }
  }

  &__toggle {
    display: none;
    
    @media (max-width: 768px) {
      display: block;
      background: none;
      border: none;
      font-size: 1.5rem;
      cursor: pointer;
    }
  }
}

.breadcrumbs {
  &__list {
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
    flex-wrap: wrap;
  }

  &__item {
    &:not(:last-child)::after {
      content: ' / ';
      margin: 0 0.5rem;
      color: #666;
    }
  }

  &__link {
    color: #0066cc;
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
    
    &--current {
      color: #333;
      pointer-events: none;
    }
  }
}
*/

// TODO: Create Razor views for MainMenu, Breadcrumbs, and LeftNavigation
// TODO: Add data templates with navigation fields
// TODO: Implement search functionality in navigation
// TODO: Add mobile hamburger menu JavaScript
// TODO: Create sitemap generation functionality
// TODO: Add navigation caching for performance
// TODO: Implement mega menu support for large sites
// TODO: Add structured data for breadcrumbs (JSON-LD)
`;
    }
    
    // STEP 2: Try to load PromptManager AFTER commands are stable
    setTimeout(() => {
        try {
            console.log('🔧 Attempting to load PromptManager...');
            const { PromptManager } = require('./promptManager');
            promptManager = new PromptManager(context);
            console.log('✅ PromptManager loaded successfully!');
            
            // Setup event listeners
            const onDidChangeActiveTextEditor = vscode.window.onDidChangeActiveTextEditor(() => {
                if (promptManager) promptManager.onEditorChanged();
            });
            
            const onDidChangeTextDocument = vscode.workspace.onDidChangeTextDocument((event) => {
                if (promptManager) promptManager.onDocumentChanged(event);
            });
            
            context.subscriptions.push(onDidChangeActiveTextEditor, onDidChangeTextDocument);
            
            // Initialize auto-suggestions if enabled
            const config = vscode.workspace.getConfiguration('dxpPromptLibrary');
            if (config.get('autoSuggest')) {
                promptManager.enableAutoSuggestions();
            }
            
            vscode.window.showInformationMessage('🎉 DXP Prompt Library fully loaded! All Sitecore/Helix features available.');
            
        } catch (error) {
            console.warn('⚠️ PromptManager failed to load, but commands still work in basic mode:', error);
            vscode.window.showInformationMessage('📝 DXP Extension running in basic mode. Core commands available.');
        }
    }, 2000); // Delay PromptManager loading to ensure commands are registered first

    // Helper function for comprehensive prompt search
    async function performPromptSearch(searchTerm: string): Promise<any[]> {
        const allPrompts = [
            // Foundation prompts
            { label: '🏗️ Foundation Service Interface', description: 'Create foundation service interface with DI', detail: 'Foundation layer service with dependency injection', category: 'Foundation', keywords: ['foundation', 'service', 'interface', 'di', 'dependency'] },
            { label: '🏗️ Logging Service', description: 'Implement logging service with Sitecore.Diagnostics', detail: 'Comprehensive logging with Sitecore integration', category: 'Foundation', keywords: ['logging', 'diagnostics', 'foundation', 'service'] },
            { label: '🏗️ Cache Service', description: 'Create caching service with Sitecore cache', detail: 'Caching implementation with Sitecore cache manager', category: 'Foundation', keywords: ['cache', 'caching', 'foundation', 'performance'] },
            
            // Feature prompts
            { label: '🎯 Feature Controller', description: 'Create feature controller with error handling', detail: 'MVC controller with proper error handling and logging', category: 'Feature', keywords: ['controller', 'feature', 'mvc', 'error', 'handling'] },
            { label: '🎯 Glass Mapper Model', description: 'Create Glass Mapper interface for data template', detail: 'Model interface with Glass Mapper attributes', category: 'Feature', keywords: ['model', 'glass', 'mapper', 'template', 'interface'] },
            { label: '🎯 View Model', description: 'Build view model with validation', detail: 'View model with proper validation and business logic', category: 'Feature', keywords: ['viewmodel', 'view', 'model', 'validation'] },
            { label: '🎯 Razor View', description: 'Create accessible Razor view template', detail: 'Responsive Razor view with accessibility features', category: 'Feature', keywords: ['razor', 'view', 'template', 'accessibility', 'responsive'] },
            
            // Project prompts
            { label: '🚀 Site Controller', description: 'Create project-specific site controller', detail: 'Project layer controller for site-wide functionality', category: 'Project', keywords: ['project', 'site', 'controller', 'layout'] },
            { label: '🚀 Layout View', description: 'Build main layout view for site', detail: 'Master layout with navigation and footer', category: 'Project', keywords: ['layout', 'master', 'site', 'navigation'] },
            { label: '🚀 Site Configuration', description: 'Configure site settings and multi-site setup', detail: 'Multi-site configuration and settings', category: 'Project', keywords: ['configuration', 'site', 'settings', 'multisite'] },
            
            // Component prompts
            { label: '🎠 Carousel Component', description: 'Generate responsive carousel with accessibility' },
            { label: '📝 Custom Forms', description: 'Create dynamic form builder with validation' },
            { label: '🧭 Navigation', description: 'Build multi-level responsive navigation' },
            
            // Testing prompts
            { label: '🧪 Unit Test', description: 'Create unit test with mocking setup', detail: 'Comprehensive unit test with mocking framework', category: 'Testing', keywords: ['unit', 'test', 'mock', 'testing', 'mstest'] },
            { label: '🧪 Integration Test', description: 'Build integration test for Sitecore components', detail: 'Integration test with Sitecore context', category: 'Testing', keywords: ['integration', 'test', 'sitecore', 'context'] },
            { label: '🧪 E2E Test', description: 'Create end-to-end test with Selenium', detail: 'Browser automation test with Selenium', category: 'Testing', keywords: ['e2e', 'selenium', 'automation', 'browser', 'test'] },
            
            // Frontend prompts
            { label: '🎨 SCSS Component', description: 'Create component styles with BEM methodology', detail: 'Responsive SCSS with BEM naming convention', category: 'Frontend', keywords: ['scss', 'css', 'bem', 'responsive', 'styles'] },
            { label: '🎨 TypeScript Module', description: 'Build TypeScript module for interactivity', detail: 'TypeScript module with proper typing and error handling', category: 'Frontend', keywords: ['typescript', 'javascript', 'module', 'interactive'] },
            { label: '🎨 Responsive Grid', description: 'Implement CSS Grid/Flexbox layout system', detail: 'Modern CSS layout with Grid and Flexbox', category: 'Frontend', keywords: ['grid', 'flexbox', 'layout', 'responsive', 'css'] },
            
            // DevOps/Deployment prompts
            { label: '🚀 Azure DevOps Pipeline', description: 'Create CI/CD pipeline for Sitecore deployment', detail: 'Complete Azure DevOps pipeline with build and deployment', category: 'DevOps', keywords: ['azure', 'devops', 'pipeline', 'cicd', 'deployment'] },
            { label: '🚀 PowerShell Scripts', description: 'Generate deployment and maintenance scripts', detail: 'PowerShell scripts for deployment automation', category: 'DevOps', keywords: ['powershell', 'scripts', 'deployment', 'automation'] },
            { label: '🚀 Docker Configuration', description: 'Set up Docker containers for Sitecore', detail: 'Docker compose and configuration for Sitecore development', category: 'DevOps', keywords: ['docker', 'container', 'sitecore', 'development'] }
        ];

        return allPrompts.filter(prompt => {
            const searchLower = searchTerm.toLowerCase();
            return prompt.label.toLowerCase().includes(searchLower) ||
                   prompt.description.toLowerCase().includes(searchLower) ||
                   prompt.detail.toLowerCase().includes(searchLower) ||
                   prompt.category.toLowerCase().includes(searchLower) ||
                   prompt.keywords.some(keyword => keyword.includes(searchLower));
        });
    }

    // Helper function to handle search results
    async function handleSearchResult(selectedResult: any, context: vscode.ExtensionContext) {
        try {
            // Check if it's a complete template that should generate code
            if (selectedResult.label.includes('Foundation') || 
                selectedResult.label.includes('Feature') || 
                selectedResult.label.includes('Project') ||
                selectedResult.label.includes('Component')) {                // For Foundation/Feature/Project templates, generate full modules
                    if (selectedResult.category === 'Foundation') {
                        await generateSitecoreCode('🏗️ Sitecore Helix: Create Foundation Module', context);
                    } else if (selectedResult.category === 'Feature') {
                        await generateSitecoreCode('🎯 Sitecore Helix: Create Feature Module', context);
                    } else if (selectedResult.category === 'Project') {
                        await generateSitecoreCode('🚀 Sitecore Helix: Create Project Module', context);
                    } else if (selectedResult.category === 'Components') {
                        if (selectedResult.label.includes('Carousel')) {
                            await generateSitecoreCode('🎠 Sitecore Component: Carousel', context);
                        } else if (selectedResult.label.includes('Forms')) {
                            await generateSitecoreCode('📝 Sitecore Component: Custom Forms', context);
                        } else if (selectedResult.label.includes('Navigation')) {
                            await generateSitecoreCode('🧭 Sitecore Component: Navigation', context);
                        }
                    } else {
                        // For other items, insert snippet
                        await insertRelatedSnippet(selectedResult);
                    }
            } else {
                // For other prompts, insert snippet or show more options
                const action = await vscode.window.showQuickPick([
                    { label: '📝 Insert Code Snippet', description: 'Insert a code snippet for this template' },
                    { label: '📖 Show Implementation Guide', description: 'Display step-by-step implementation guide' },
                    { label: '🔗 Open Documentation', description: 'Open relevant documentation and best practices' }
                ], {
                    placeHolder: `What would you like to do with "${selectedResult.label}"?`
                });

                if (action) {
                    switch (action.label) {
                        case '📝 Insert Code Snippet':
                            await insertRelatedSnippet(selectedResult);
                            break;
                        case '📖 Show Implementation Guide':
                            await showImplementationGuide(selectedResult);
                            break;
                        case '🔗 Open Documentation':
                            await openRelatedDocumentation(selectedResult);
                            break;
                    }
                }
            }
        } catch (error) {
            console.error('Error handling search result:', error);
            vscode.window.showErrorMessage(`Error handling search result: ${error}`);
        }
    }

    // Helper function to show SDLC-specific prompts
    async function showSDLCPrompts(sdlcStage: string) {
        const sdlcPrompts: { [key: string]: any[] } = {
            '📋 Planning & Analysis': [
                { label: 'User Story Template', description: 'Create comprehensive user stories with acceptance criteria' },
                { label: 'Technical Requirements', description: 'Document technical requirements and constraints' },
                { label: 'Architecture Diagram', description: 'Generate Helix architecture documentation' },
                { label: 'API Specification', description: 'Create API documentation and OpenAPI specs' },
                { label: 'Data Model Design', description: 'Design Sitecore data templates and relationships' },
                { label: 'Security Requirements', description: 'Define security requirements and compliance needs' }
            ],
            '💻 Development & Implementation': [
                { label: 'Foundation Module', description: 'Create complete Foundation layer module' },
                { label: 'Feature Module', description: 'Generate Feature layer with MVC components' },
                { label: 'Project Module', description: 'Build Project layer with site-specific code' },
                { label: 'Component Library', description: 'Create reusable UI component collection' },
                { label: 'API Endpoints', description: 'Implement REST API with proper error handling' },
                { label: 'Database Integration', description: 'Set up Entity Framework and data access' }
            ],
            '🧪 Testing & Quality Assurance': [
                { label: 'Unit Test Suite', description: 'Comprehensive unit tests with mocking' },
                { label: 'Integration Tests', description: 'Integration tests for Sitecore components' },
                { label: 'E2E Test Framework', description: 'End-to-end testing with Selenium' },
                { label: 'Performance Tests', description: 'Load testing and performance benchmarks' },
                { label: 'Security Testing', description: 'Security testing and vulnerability assessment' },
                { label: 'Accessibility Testing', description: 'WCAG compliance and accessibility validation' }
            ],
            '🚀 Deployment & DevOps': [
                { label: 'Azure DevOps Pipeline', description: 'Create CI/CD pipeline for Sitecore deployment' },
                { label: 'Docker Setup', description: 'Containerization for development and deployment' },
                { label: 'Environment Configuration', description: 'Multi-environment setup and management' },
                { label: 'Monitoring Setup', description: 'Application monitoring and alerting' },
                { label: 'Backup Strategy', description: 'Backup and disaster recovery procedures' },
                { label: 'SSL Configuration', description: 'HTTPS setup and certificate management' }
            ],
            '🔧 Maintenance & Support': [
                { label: 'Monitoring Dashboard', description: 'Application health monitoring and dashboards' },
                { label: 'Log Analysis', description: 'Log aggregation and analysis setup' },
                { label: 'Performance Optimization', description: 'Performance tuning and optimization guides' },
                { label: 'Troubleshooting Guide', description: 'Common issues and resolution procedures' },
                { label: 'Security Updates', description: 'Security patch management and updates' },
                { label: 'User Documentation', description: 'End-user and admin documentation' }
            ],
            '📈 Optimization & Enhancement': [
                { label: 'Performance Analysis', description: 'Performance profiling and optimization recommendations' },
                { label: 'A/B Testing Setup', description: 'A/B testing framework and analytics integration' },
                { label: 'User Feedback System', description: 'Feedback collection and analysis system' },
                { label: 'Feature Enhancement', description: 'Feature improvement and expansion templates' },
                { label: 'Analytics Integration', description: 'Advanced analytics and tracking setup' },
                { label: 'Scalability Planning', description: 'Scalability assessment and improvement plan' }
            ]
        };

        const stagePrompts = sdlcPrompts[sdlcStage] || [];
        
        if (stagePrompts.length === 0) {
            vscode.window.showInformationMessage(`No specific prompts available for ${sdlcStage} yet.`);
            return;
        }

        const selected = await vscode.window.showQuickPick(stagePrompts, {
            placeHolder: `Select ${sdlcStage} template`,
            matchOnDescription: true
        });

        if (selected) {
            await handleSDLCSelection(selected, sdlcStage);
        }
    }

    // Helper function to handle SDLC selection
    async function handleSDLCSelection(selection: any, stage: string) {
        const action = await vscode.window.showQuickPick([
            { label: '📝 Generate Template', description: 'Create template or code for this item' },
            { label: '📖 Show Best Practices', description: 'Display best practices and guidelines' },
            { label: '🔗 Open Resources', description: 'Open relevant documentation and resources' }
        ], {
            placeHolder: `What would you like to do with "${selection.label}"?`
        });

        if (action) {
            switch (action.label) {
                case '📝 Generate Template':
                    await generateSDLCTemplate(selection, stage);
                    break;
                case '📖 Show Best Practices':
                    await showBestPractices(selection, stage);
                    break;
                case '🔗 Open Resources':
                    await openSDLCResources(selection, stage);
                    break;
            }
        }
    }

    // Additional helper functions for enhanced functionality
    async function insertRelatedSnippet(item: any) {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            vscode.window.showWarningMessage('No active editor found');
            return;
        }

        let snippet = `// ${item.label} - ${item.description}\n// TODO: Implement ${item.label}\n`;
        
        if (item.category === 'Foundation') {
            snippet += `// Foundation layer implementation\n// Add service interface and implementation\n`;
        } else if (item.category === 'Feature') {
            snippet += `// Feature layer implementation\n// Add controller, model, and view\n`;
        } else if (item.category === 'Testing') {
            snippet += `// Testing implementation\n// Add test setup and assertions\n`;
        }

        const position = editor.selection.active;
        await editor.edit(editBuilder => {
            editBuilder.insert(position, snippet + '\n');
        });

        vscode.window.showInformationMessage(`✅ Inserted snippet for ${item.label}!`);
    }

    async function showImplementationGuide(item: any) {
        const guide = `# Implementation Guide: ${item.label}

## Description
${item.description}

## Category
${item.category}

## Implementation Steps
1. Set up the basic structure
2. Implement core functionality
3. Add error handling and logging
4. Create unit tests
5. Add documentation

## Best Practices
- Follow Helix architecture principles
- Use dependency injection
- Implement proper error handling
- Add comprehensive logging
- Include unit tests

## Related Resources
- Sitecore Helix Documentation
- Best Practices Guide
- Code Examples`;

        // Create and show the guide in a new document
        const doc = await vscode.workspace.openTextDocument({
            content: guide,
            language: 'markdown'
        });
        await vscode.window.showTextDocument(doc);
    }

    async function openRelatedDocumentation(item: any) {
        const urls = {
            'Foundation': 'https://helix.sitecore.net/principles/architecture-principles/layers.html',
            'Feature': 'https://helix.sitecore.net/principles/architecture-principles/layers.html',
            'Project': 'https://helix.sitecore.net/principles/architecture-principles/layers.html',
            'Testing': 'https://docs.microsoft.com/en-us/dotnet/core/testing/',
            'DevOps': 'https://docs.microsoft.com/en-us/azure/devops/'
        };

        const url = urls[item.category as keyof typeof urls] || 'https://helix.sitecore.net/';
        vscode.env.openExternal(vscode.Uri.parse(url));
        vscode.window.showInformationMessage(`Opening documentation for ${item.category}...`);
    }

    async function generateSDLCTemplate(selection: any, stage: string) {
        // Generate templates based on SDLC stage and selection
        const templates: { [key: string]: string } = {
            'User Story Template': `# User Story: ${selection.label}

## As a [user type]
I want [functionality]
So that [business value]

## Acceptance Criteria
- [ ] Criterion 1
- [ ] Criterion 2
- [ ] Criterion 3

## Definition of Done
- [ ] Code implemented
- [ ] Tests written and passing
- [ ] Code reviewed
- [ ] Documentation updated`,

            'Unit Test Suite': `// Unit Test Suite Template
[TestClass]
public class {{ComponentName}}Tests
{
    private Mock<ISitecoreContext> _mockContext;
    private Mock<ILoggingService> _mockLogger;
    private {{ComponentName}}Controller _controller;

    [TestInitialize]
    public void Setup()
    {
        _mockContext = new Mock<ISitecoreContext>();
        _mockLogger = new Mock<ILoggingService>();
        _controller = new {{ComponentName}}Controller(_mockContext.Object, _mockLogger.Object);
    }

    [TestMethod]
    public void Method_ValidInput_ReturnsExpectedResult()
    {
        // Arrange
        var testData = new TestModel { Property = "TestValue" };
        _mockContext.Setup(x => x.GetCurrentItem<ITestModel>()).Returns(testData);

        // Act
        var result = _controller.Index() as ViewResult;

        // Assert
        Assert.IsNotNull(result);
        Assert.IsInstanceOfType(result.Model, typeof(TestViewModel));
    }
}`,

            'Azure DevOps Pipeline': `# Azure DevOps Pipeline Template
trigger:
- main
- develop

pool:
  vmImage: 'windows-latest'

variables:
  buildConfiguration: 'Release'

stages:
- stage: Build
  displayName: 'Build Stage'
  jobs:
  - job: Build
    displayName: 'Build Job'
    steps:
    - task: NuGetRestore@1
      displayName: 'Restore NuGet packages'
    
    - task: VSBuild@1
      displayName: 'Build solution'
      inputs:
        solution: '**/*.sln'
        configuration: '\$(buildConfiguration)'
    
    - task: VSTest@2
      displayName: 'Run tests'
      inputs:
        testAssemblyPattern: '**/*Tests.dll'
        configuration: '\$(buildConfiguration)'`
            };

        const template = templates[selection.label] || `// Template for ${selection.label}\n// Implementation coming soon!`;
        
        const doc = await vscode.workspace.openTextDocument({
            content: template,
            language: selection.label.includes('Pipeline') ? 'yaml' : selection.label.includes('Story') ? 'markdown' : 'csharp'
        });
        await vscode.window.showTextDocument(doc);
        
        vscode.window.showInformationMessage(`✅ Generated ${selection.label} template!`);
    }

    async function showBestPractices(selection: any, stage: string) {
        const practices = `# Best Practices: ${selection.label}

## ${stage} Best Practices

### Key Principles
- Follow Sitecore Helix architecture
- Implement proper error handling
- Use dependency injection
- Write comprehensive tests
- Document your code

### Implementation Guidelines
- Start with interfaces
- Use meaningful naming conventions
- Implement proper logging
- Handle exceptions gracefully
- Follow SOLID principles

### Quality Assurance
- Code reviews are mandatory
- Unit tests must pass
- Integration tests required
- Performance considerations
- Security best practices`;

        const doc = await vscode.workspace.openTextDocument({
            content: practices,
            language: 'markdown'
        });
        await vscode.window.showTextDocument(doc);
    }

    async function openSDLCResources(selection: any, stage: string) {
        const resourceUrls: { [key: string]: string } = {
            'Planning': 'https://www.atlassian.com/agile/project-management/requirements',
            'Development': 'https://helix.sitecore.net/',
            'Testing': 'https://docs.microsoft.com/en-us/dotnet/core/testing/',
            'Deployment': 'https://docs.microsoft.com/en-us/azure/devops/',
            'Maintenance': 'https://docs.sitecore.com/',
            'Optimization': 'https://docs.sitecore.com/developers/101/platform-administration-and-architecture/en/performance-tuning.html'
        };

        const url = resourceUrls[stage.split(' ')[1]] || 'https://helix.sitecore.net/';
        vscode.env.openExternal(vscode.Uri.parse(url));
        vscode.window.showInformationMessage(`Opening resources for ${stage}...`);
    }
}

export function deactivate() {
    console.log('🛑 DXP Extension deactivated');
}
