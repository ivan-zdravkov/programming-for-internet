using DAL;
using Microsoft.AspNet.Identity;
using Microsoft.Owin.Security.DataHandler.Encoder;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using WebServices.Controllers.Models;
using WebServices.Infrastructure;
using WebServices.Models;

namespace WebServices.Controllers
{
    [RoutePrefix("api/accounts")]
    [Authorize]
    public class AccountsController : BaseApiController
    {
        /// <summary>
        /// [Administrator] Get all users.
        /// </summary>
        [HttpGet]
        [Route("users")]
        [Authorize(Roles = "Administrator")]
        public IHttpActionResult GetUsers()
        {
            return Ok(this.AppUserManager.Users.ToList().Select(u => new UserModel(u, this.AppUserManager, this.AppRoleManager)));
        }

        /// <summary>
        /// [Administrator] Get a single user.
        /// </summary>
        /// <param name="Id">GUID id of user.</param>
        [HttpGet]
        [Route("user/{id:guid}", Name = "GetUser")]
        [Authorize(Roles = "Administrator")]
        public async Task<IHttpActionResult> GetUser(string Id)
        {
            var user = await this.AppUserManager.FindByIdAsync(Id);

            if (user != null)
            {
                return Ok(new UserModel(user, this.AppUserManager, this.AppRoleManager));
            }

            return NotFound();
        }

        /// <summary>
        /// [Administrator] Delete a user.
        /// </summary>
        /// <param name="id">GUID id of user.</param>
        [HttpDelete]
        [Route("user/{id:guid}")]
        [Authorize(Roles = "Administrator")]
        public async Task<IHttpActionResult> DeleteUser(string id)
        {
            var user = await this.AppUserManager.FindByIdAsync(id);

            if (user != null)
            {
                IdentityResult result = await this.AppUserManager.DeleteAsync(user);

                if (result.Succeeded)
                {
                    return Ok();
                }
                else
                {
                    return BadRequest("User could not be deleted.");
                }
            }

            return NotFound();
        }

        /// <summary>
        /// [Anonymous] Create a user.
        /// </summary>
        [HttpPost]
        [Route("create")]
        [AllowAnonymous]
        public async Task<IHttpActionResult> CreateUser(RegisterUserModel createUserModel)
        {
            if (ModelState.IsValid)
            {
                if (this.AppUserManager.FindByEmail(createUserModel.Email) == null)
                {
                    ApplicationUser user = new ApplicationUser()
                    {
                        UserName = createUserModel.Email,
                        Email = createUserModel.Email,
                        CreatedBy = this.CurrentUserId,
                        CreatedAt = DateTime.UtcNow
                    };

                    IdentityResult addUserResult = await this.AppUserManager.CreateAsync(user, createUserModel.Password);

                    if (addUserResult.Succeeded)
                    {
                        this.AppUserManager.AddToRole(user.Id, "User");

                        string code = await this.AppUserManager.GenerateEmailConfirmationTokenAsync(user.Id);

                        await this.AppUserManager.SendEmailAsync(user.Id, 
                            "Confirm your account", 
                            "Please confirm your account by clicking <a href=\"" + new Uri(Url.Link("ConfirmEmailRoute", new { userId = user.Id, code = code })) + "\">here</a>");

                        return Created(new Uri(Url.Link("GetUser", new { id = user.Id })), new UserModel(user, this.AppUserManager, this.AppRoleManager));
                    }
                    else
                    {
                        return InternalServerError();
                    }
                }
                else
                {
                    return BadRequest("This email has already been registered.");
                }
            }
            else
            {
                return BadRequest(ModelState);
            }
        }

        /// <summary>
        /// [User] Changes the password of the current user.
        /// </summary>
        [HttpPut]
        [Route("changePassword")]
        public async Task<IHttpActionResult> ChangePassword(ChangePasswordModel model)
        {
            if (ModelState.IsValid)
            {
                IdentityResult result = await this.AppUserManager.ChangePasswordAsync(User.Identity.GetUserId(), model.OldPassword, model.NewPassword);

                if (result.Succeeded)
                {
                    return Ok();       
                }
                else
                {
                    return BadRequest("Could not change password.");
                }
            }
            else
            {
                return BadRequest(ModelState);
            }
        }

        /// <summary>
        /// [Anonymous] Checks whether the provided email is available for register.
        /// </summary>
        [HttpPost]
        [Route("isEmailAvailable")]
        [AllowAnonymous]
        public IHttpActionResult IsEmailAvailable([FromBody]string email)
        {
            if (email != null)
            {
                return Ok(this.AppUserManager.FindByEmail(email) == null);
            }
            else
            {
                return BadRequest();
            }
        }

        /// <summary>
        /// [Anonymous] Confirms the email when registering a new user.
        /// </summary>
        [HttpGet]
        [Route("confirmEmail", Name = "ConfirmEmailRoute")]
        [AllowAnonymous]
        public async Task<IHttpActionResult> ConfirmEmail(string userId = "", string code = "")
        {
            if (string.IsNullOrWhiteSpace(userId) || string.IsNullOrWhiteSpace(code))
            {
                ModelState.AddModelError("", "User Id and Code are required");
                return BadRequest(ModelState);
            }

            IdentityResult result = await this.AppUserManager.ConfirmEmailAsync(userId, code);

            if (result.Succeeded)
            {
                return Ok();
            }
            else
            {
                return BadRequest("The email could not be varified.");
            }
        }

        /// <summary>
        /// [User] Checks whether the current user is in role "Administrator".
        /// </summary>
        [HttpGet]
        [Route("isAdmin")]
        public IHttpActionResult IsAdmin()
        {
            bool isAdmin = this.AppUserManager.IsInRole(this.CurrentUserId, "Administrator");

            return Ok(isAdmin);
        }
    }
}