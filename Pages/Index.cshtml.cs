using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.Extensions.Logging;
using SixLabors.ImageSharp;
using SixLabors.ImageSharp.Processing;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Threading.Tasks;
namespace ASPCoreImageResizer.Pages
{
    [ValidateAntiForgeryToken]
    public class IndexModel : PageModel
    {
        private IWebHostEnvironment Environment;
        public IndexModel(IWebHostEnvironment _environment, ILogger<IndexModel> logger)
        {
            this.Environment = _environment;
            _logger = logger;
        }
        private readonly ILogger<IndexModel> _logger;

        public void OnGet()
        {

        }

        public async Task<JsonResult> OnPostAsync(IFormFile file)
        {
            string uploads = Path.Combine(Environment.WebRootPath, "uploads");
            string fileName = Path.GetRandomFileName();
            FileInfo fi = new FileInfo(file.FileName);
            string extension = fi.Extension;
            fileName += extension;
            string filePath = Path.Combine(uploads, fileName);
            var dict = new Dictionary<string, object>();
            var coll = Request.Form;
            foreach (var item in coll)
            {
                if (item.Key != "__RequestVerificationToken")
                {
                    Debug.WriteLine($"{item.Key} {item.Value}");
                    dict[item.Key] = item.Value[0];
                }

            }
            int newWidth = Convert.ToInt32(dict["img-new-width"]);
            int newHeight = Convert.ToInt32(dict["img-new-height"]);
            // resize here
            using (var image = Image.Load(file.OpenReadStream()))
            {
                image.Mutate(x => x.Resize(newWidth, newHeight));
                await image.SaveAsync(filePath);
                dict["path"] = "/uploads/" + fileName;
            }
            return new JsonResult(dict);
        }
    }
}
