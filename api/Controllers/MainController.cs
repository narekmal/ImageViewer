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

    [HttpGet(Name = "Folders")]
    public string[] Folders()
    {
        string rootPath = Directory.GetCurrentDirectory() + "\\root-folder";
        var folders = Directory.GetDirectories(rootPath);

        string[] blackList = System.IO.File.ReadAllLines(rootPath + "\\black-list.txt");
        Array.Sort(blackList);

        string foldersLimitStr = HttpContext.Request.Query["folders_limit"];
        foldersLimitStr = (String.IsNullOrEmpty(foldersLimitStr) ? "10" : foldersLimitStr);
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

    [HttpGet(Name = "Images")]
    public Tuple<string, int, int>[] Images()
    {
        string folder = HttpContext.Request.Query["folder"].ToString();

        string wwwRootPath = Directory.GetCurrentDirectory();
        var files = System.IO.Directory.GetFiles(wwwRootPath + "\\root-folder\\" + folder);

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
        string folder = HttpContext.Request.Query["folder"].ToString();
        string imageName = HttpContext.Request.Query["image"].ToString();
        string wwwRootPath = Directory.GetCurrentDirectory();
        var image = System.IO.File.OpenRead(wwwRootPath + "\\root-folder\\" + folder + "\\" + imageName);
        string contentType = imageName.EndsWith("svg") ? "image/svg+xml" : "image/jpeg";
        return File(image, contentType);
    }
}
