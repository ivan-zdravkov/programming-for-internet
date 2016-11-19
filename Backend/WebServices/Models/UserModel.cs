using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Web;
using WebServices.Infrastructure;

namespace WebServices.Controllers.Models
{
    public class UserModel
    {
        public string Id { get; set; }
        public string Email { get; set; }
        public bool EmailConfirmed { get; set; }
        public string UserName { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }        
        public DateTime? Birthday { get; set; }
        public IEnumerable<string> RoleIds { get; set; }

        public string CreatedBy { get; set; }
        public DateTime? CreatedAt { get; set; }
        public string LastModifiedBy { get; set; }
        public DateTime? LastModifiedAt { get; set; }

        public UserModel(ApplicationUser user, ApplicationUserManager userManager, ApplicationRoleManager roleManager)
        {
            ApplicationUser createdByUser = userManager.FindByIdAsync(user.CreatedBy).Result;
            ApplicationUser modifiedByUser = userManager.FindByIdAsync(user.LastModifiedBy).Result;

            this.Id = user.Id;
            this.Email = user.Email;
            this.EmailConfirmed = user.EmailConfirmed;
            this.UserName = user.UserName;
            this.FirstName = user.FirstName;
            this.LastName = user.LastName;
            this.Birthday = user.Birthday;
            this.RoleIds = roleManager.Roles.Where(r => r.Users.Any(u => u.UserId == user.Id)).Select(r => r.Id);
            this.CreatedBy = createdByUser != null ? String.Format("{0} {1}", createdByUser.FirstName, createdByUser.LastName) : String.Empty;
            this.CreatedAt = user.CreatedAt;
            this.LastModifiedBy = modifiedByUser != null ? String.Format("{0} {1}", modifiedByUser.FirstName, modifiedByUser.LastName) : String.Empty;
            this.LastModifiedAt = user.LastModifiedAt; 
        }
    }
}