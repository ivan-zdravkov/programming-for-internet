using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebServices.Interfaces
{
    public interface IImageServiceInterface
    {
        string GenerateImageURLFromImage(string base64Image, string imageName);
    }
}