using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace ImageViewer.Pages;

public class ImagesModel : PageModel
{
    private readonly ILogger<ImagesModel> _logger;

    public ImagesModel(ILogger<ImagesModel> logger)
    {
        _logger = logger;
    }

    public void OnGet()
    {
        _logger.LogInformation($"Image viewer page visited at {DateTime.UtcNow.ToLongTimeString()}");
    }
}

