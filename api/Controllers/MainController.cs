using Microsoft.AspNetCore.Mvc;
using System.IO;

namespace api.Controllers;

[ApiController]
[Route("[controller]/[action]")]
public class MainController : ControllerBase
{
    private readonly ILogger<MainController> _logger;

    public MainController(ILogger<MainController> logger)
    {
        _logger = logger;
    }

    [HttpGet]
    public string[] Folders()
    {
        _logger.LogInformation($"Folders requested");

        string rootPath = Directory.GetCurrentDirectory() + "\\" + Constants.RootFolderName;
        var folders = Directory.GetDirectories(rootPath);

        string[] blackList = System.IO.File.ReadAllLines(rootPath + "\\" + Constants.BlackListFileName);
        Array.Sort(blackList);

        string foldersLimitStr = HttpContext.Request.Query[Constants.FoldersLimitQueryParam];
        int foldersLimit = int.Parse(foldersLimitStr);
        foldersLimit = Math.Max(1, foldersLimit);

        folders = folders.Select(path => {
                DirectoryInfo dirInfo = new DirectoryInfo(path);
                return dirInfo.Name; 
            })
            .Where(folderName => Array.BinarySearch(blackList, folderName) < 0)
            .Take(foldersLimit)
            .ToArray();

        return folders;
    }

    [HttpGet]
    public Tuple<string, int, int>[] Images()
    {
        string folder = HttpContext.Request.Query[Constants.FolderQueryParam].ToString();

        _logger.LogInformation($"Images requested for folder " + folder);

        string wwwRootPath = Directory.GetCurrentDirectory();
        var files = System.IO.Directory.GetFiles(wwwRootPath + "\\" + Constants.RootFolderName + "\\" + folder);

        var tuples = files.Select(path => {
            System.IO.FileInfo fileInfo = new System.IO.FileInfo(path);
            try {
                var img = System.Drawing.Bitmap.FromFile(path);
                return new Tuple<string, int, int>(fileInfo.Name, img.Width, img.Height);
            }
            catch(Exception e) {
                return new Tuple<string, int, int>(fileInfo.Name, -1, -1);
            }
            }).ToArray();

        return tuples;
    }

    [HttpGet]
    public IActionResult Image()
    {
        string folder = HttpContext.Request.Query[Constants.FolderQueryParam].ToString();
        string imageName = HttpContext.Request.Query[Constants.ImageQueryParam].ToString();

        _logger.LogInformation($"Image requested, folder: " + folder + ", image: " + imageName);

        string wwwRootPath = Directory.GetCurrentDirectory();
        var image = System.IO.File.OpenRead(wwwRootPath + "\\" + Constants.RootFolderName + "\\" + folder + "\\" + imageName);
        string contentType = imageName.EndsWith("svg") ? Constants.SvgContentType : Constants.ImageContentType;
        return File(image, contentType);
    }
}
