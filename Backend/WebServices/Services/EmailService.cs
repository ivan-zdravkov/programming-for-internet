using Microsoft.AspNet.Identity;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;
using System.Web;

namespace WebServices.Services
{
    public class EmailService : IIdentityMessageService
    {
        private bool isHtml;
        private SmtpClient mailClient = null;
        
        public EmailService(bool isHtml) : base()
        {
            this.isHtml = isHtml;

            this.mailClient = new SmtpClient("smtp.gmail.com", 587)
            {
                UseDefaultCredentials = false,
                Credentials = new NetworkCredential(ConfigurationManager.AppSettings["mailAccount"], ConfigurationManager.AppSettings["mailPassword"]),
                EnableSsl = true
            };
        }

        public async Task SendAsync(IdentityMessage identityMessage)
        {
            await this.ConfigSendGridasync(identityMessage);
        }

        private async Task ConfigSendGridasync(IdentityMessage identityMessage)
        {
            MailAddress from = new MailAddress(ConfigurationManager.AppSettings["mailAccount"], "Do it yourself!");
            MailAddress to = new MailAddress(identityMessage.Destination);

            MailMessage message = new MailMessage(from, to)
            {
                Subject = identityMessage.Subject,
                Body = identityMessage.Body,
                IsBodyHtml = this.isHtml,
            };

            await this.mailClient.SendMailAsync(message);
        }
    }
}