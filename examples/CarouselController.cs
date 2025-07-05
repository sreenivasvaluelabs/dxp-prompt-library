// Example: Using DXP Prompt Library with GitHub Copilot
// This file demonstrates how to use the prompt library for Sitecore component development

using System;
using System.Collections.Generic;
using System.Web.Mvc;
using Sitecore.Data.Items;
using Sitecore.Mvc.Controllers;
using Sitecore.Mvc.Presentation;

namespace Feature.Carousel.Controllers
{
    // DXP Prompt: Implement a Sitecore 10.4 Carousel component following Helix architecture patterns. Generate:
    // - Data template definition with serialization
    // - View model class with proper inheritance from RenderingModel
    // - Controller with dependency injection and error handling
    // - Razor view with accessibility features and responsive design
    // - TypeScript/JavaScript for carousel functionality
    // - SCSS styles following BEM naming convention
    // - Unit tests for view model and controller logic
    // - Integration with Sitecore Experience Editor
    // - Proper Glass Mapper or Synthesis mapping

    public class CarouselController : SitecoreController
    {
        // GitHub Copilot will generate the implementation based on the above prompt
        // The generated code will include:
        // - Dependency injection setup
        // - Error handling and logging
        // - Helix architecture compliance
        // - Performance optimizations
        // - Accessibility features
        // - Experience Editor integration
    }
}

/*
Expected GitHub Copilot Output (example):

public class CarouselController : SitecoreController
{
    private readonly ILogger _logger;
    private readonly ICarouselService _carouselService;

    public CarouselController(ILogger logger, ICarouselService carouselService)
    {
        _logger = logger ?? throw new ArgumentNullException(nameof(logger));
        _carouselService = carouselService ?? throw new ArgumentNullException(nameof(carouselService));
    }

    public ActionResult Index()
    {
        try
        {
            var datasource = RenderingContext.Current?.Rendering?.Item;
            if (datasource == null)
            {
                _logger.Warning("Carousel: No datasource item found");
                return new EmptyResult();
            }

            var viewModel = _carouselService.GetCarouselViewModel(datasource);
            return View(viewModel);
        }
        catch (Exception ex)
        {
            _logger.Error(ex, "Error rendering carousel component");
            return new EmptyResult();
        }
    }
}
*/
