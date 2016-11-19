using Microsoft.AspNet.Identity;
using System.Configuration;
using System.Threading.Tasks;
using System.Web.Http;
using WebServices.Models;
using WebServices.Services;

namespace WebServices.Controllers
{
    [RoutePrefix("api/mail")]
    [Authorize]
    public class MailController : BaseApiController
    {
        [HttpPost]
        [Route("sendMail")]
        public async Task<IHttpActionResult> SendMail(SimpleMailModel mail)
        {
            EmailService emailService = new EmailService(false);

            await emailService.SendAsync(new IdentityMessage()
            {
                Destination = ConfigurationManager.AppSettings["mailAccount"],
                Subject = "[" + mail.From + "]" + mail.Subject,
                Body = mail.Content
            });

            return Ok();
        }
    }
}