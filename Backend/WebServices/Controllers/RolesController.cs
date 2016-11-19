using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using WebServices.Models;

namespace WebServices.Controllers
{
    [Authorize]
    [RoutePrefix("api/roles")]
    public class RolesController : BaseApiController
    {
        [HttpGet]
        [Route("all")]
        public IHttpActionResult GetAll()
        {
            return Ok(this.AppRoleManager.Roles.ToList().Select(r => new RoleModel() { Id = r.Id, Name = r.Name }));
        }

        [HttpPut]
        [Route("addRoleToUser/{roleName}/{userId:guid}")]
        [Authorize(Roles = "Administrator")]
        public async Task<IHttpActionResult> AddRoleToUser(string userId, string roleName)
        {
            var appUser = await this.AppUserManager.FindByIdAsync(userId);

            if (appUser == null)
            {
                return NotFound();
            }

            if (this.AppUserManager.IsInRole(userId, roleName))
            {
                return Ok("Role already exists.");
            }
            else
            {
                IdentityResult addResult = await this.AppUserManager.AddToRoleAsync(userId, roleName);

                if (!addResult.Succeeded)
                {
                    ModelState.AddModelError("", String.Format("Failed to add role {0} to user.", roleName));
                    return BadRequest(ModelState);
                }

                return Ok();
            }
        }

        [HttpDelete]
        [Route("removeRoleFromUser/{roleName}/{userId:guid}")]
        [Authorize(Roles = "Administrator")]
        public async Task<IHttpActionResult> RemoveRoleFromUser(string userId, string roleName)
        {
            var appUser = await this.AppUserManager.FindByIdAsync(userId);

            if (appUser == null)
            {
                return NotFound();
            }

            if (!this.AppUserManager.IsInRole(userId, roleName))
            {
                return Ok("User does not have that role.");
            }
            else
            {
                IdentityResult removeResult = await this.AppUserManager.RemoveFromRoleAsync(userId, roleName);

                if (!removeResult.Succeeded)
                {
                    ModelState.AddModelError("", String.Format("Failed to remove role {0} from user.", roleName));
                    return BadRequest(ModelState);
                }

                return Ok();
            }
        }
    }
}