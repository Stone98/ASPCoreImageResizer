using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace ASPCoreImageResizer.Pages
{
    public class BufferedSingleFileUploadDbModelModel : PageModel
    {
        [BindProperty]
        public BufferedSingleFileUploadDb FileUpload { get; set; }
        public void OnGet()
        {
        }
        public async Task<IActionResult> OnPostUploadAsync(List<IFormFile> files)
        {
            long size = files.Sum(f => f.Length);

            foreach (var formFile in files)
            {
                if (formFile.Length > 0)
                {
                    var filePath = Path.GetTempFileName();

                    //using (var stream = System.IO.File.Create(filePath))
                    //{
                    //    await formFile.CopyToAsync(stream);
                    //}
                }
            }
            return (IActionResult)Task.CompletedTask;
        }
    }
    public class BufferedSingleFileUploadDb
    {
        [Required]
        [Display(Name = "File")]
        public IFormFile FormFile { get; set; }
    }
}
