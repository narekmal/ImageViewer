using Microsoft.AspNetCore.Mvc;
using System.IO;

namespace api.Controllers;

[ApiController]
[Route("[controller]/[action]")]
public class TestController : ControllerBase
{
    private readonly ILogger<WeatherForecastController> _logger;

    public TestController(ILogger<WeatherForecastController> logger)
    {
        _logger = logger;
    }

    [HttpGet(Name = "Folders")]
    public string[] Folders()
    {
        string rootPath = Directory.GetCurrentDirectory() + "\\root-folder";
        var folders = Directory.GetDirectories(rootPath);
        var blackList = System.IO.File.ReadAllLines(rootPath + "\\black-list.txt");

        string foldersLimitStr = HttpContext.Request.Query["folders_limit"];
        foldersLimitStr = (String.IsNullOrEmpty(foldersLimitStr) ? "10" : foldersLimitStr);
        int foldersLimit = int.Parse(foldersLimitStr);
        foldersLimit = Math.Max(1, foldersLimit);

        folders = folders.Select(path => {
                DirectoryInfo dirInfo = new DirectoryInfo(path);
                return dirInfo.Name; 
            })
            .Where(folderName => !blackList.Contains(folderName))
            .Take(foldersLimit)
            .ToArray();

        return folders;
    }

    // [HttpGet(Name = "Images")]
    // public string[] Images()
    // {
    //     string folder = HttpContext.Request.Query["folder"].ToString();

    //     string wwwRootPath = Directory.GetCurrentDirectory() + "\\wwwroot";
    //     var files = System.IO.Directory.GetFiles(wwwRootPath + "\\root-folder\\" + folder);

    //     var fileNames = files.Select(path => {
    //         System.IO.FileInfo dir_info = new System.IO.FileInfo(path);
    //         return dir_info.Name;
    //         }).ToArray();

    //     var fileSizes = files.Select(path => {
    //         try {
    //             var img = System.Drawing.Bitmap.FromFile(path);
    //             return new Tuple<int, int>(img.Width, img.Height);
    //         }
    //         catch(Exception e) {
    //             return new Tuple<int, int>(-1, -1);
    //         }
    //         }).ToArray();

    //     var fileUrls = files.Select(path => path.Replace(wwwRootPath, "")).ToArray();
    // }
}
