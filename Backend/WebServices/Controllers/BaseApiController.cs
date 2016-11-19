using Microsoft.AspNet.Identity.Owin;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using WebServices.Infrastructure;
using System.Data.Entity;
using WebServices.Filters;
using Microsoft.AspNet.Identity;
using DAL;

namespace WebServices.Controllers
{
    [GlobalExceptionFilterAttribute]
    public class BaseApiController : ApiController
    {
        private string currentUserId = null;
        private ProgrammingForInternetDAL dal = null;
        private ApplicationUserManager appUserManager = null;
        private ApplicationRoleManager appRoleManager = null;

        public BaseApiController()
        {
            if (HttpContext.Current != null && HttpContext.Current.User != null && HttpContext.Current.User.Identity != null)
            {
                this.currentUserId = HttpContext.Current.User.Identity.GetUserId();
            }

            if (this.currentUserId == null)
            {
                this.currentUserId = GlobalConstants.SystemAdministratorId;
            }

            dal = new ProgrammingForInternetDAL(this.currentUserId);
        }

        protected string CurrentUserId
        {
            get
            {
                return this.currentUserId;
            }
        }

        protected ProgrammingForInternetDAL DAL
        {
            get { return this.dal; }
        }

        protected ApplicationUserManager AppUserManager
        {
            get
            {
                return this.appUserManager ?? Request.GetOwinContext().GetUserManager<ApplicationUserManager>();
            }
        }

        protected ApplicationRoleManager AppRoleManager
        {
            get
            {
                return this.appRoleManager ?? Request.GetOwinContext().GetUserManager<ApplicationRoleManager>();
            }
        }
    }
}