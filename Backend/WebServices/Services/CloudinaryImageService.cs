using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using WebServices.Interfaces;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using System.Configuration;
using System.IO;

namespace WebServices.Services
{
    public class CloudinaryImageService : IImageServiceInterface
    {
        public string GenerateImageURLFromImage(string base64Image, string imageName)
        {
            try
            {
                Account account = new Account(ConfigurationManager.AppSettings["imageServiceCloudName"],
                                              ConfigurationManager.AppSettings["imageServiceAPIKey"],
                                              ConfigurationManager.AppSettings["imageServiceAPISecret"]);

                Cloudinary cloudinary = new Cloudinary(account);

                base64Image = this.NormalizeBase64(base64Image);

                byte[] imageByteArray = Convert.FromBase64String(base64Image);

                ImageUploadParams imageParameters = new ImageUploadParams()
                {
                    File = new FileDescription(imageName, new MemoryStream(imageByteArray))
                };

                ImageUploadResult result = cloudinary.Upload(imageParameters);

                return result.Uri.AbsoluteUri;
            }
            catch (Exception ex)
            {
                return String.Empty;
            }
        }

        private string NormalizeBase64(string base64Image)
        {
            base64Image = base64Image.Replace('-', '+');
            base64Image = base64Image.Replace('_', '/');

            return base64Image.Split(',')[1];
        }
    }
}