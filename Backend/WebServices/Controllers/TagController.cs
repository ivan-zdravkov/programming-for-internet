using DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;

namespace WebServices.Controllers
{
    [RoutePrefix("api/tag")]
    [Authorize]
    public class TagController : BaseApiController
    {
        /// <summary>
        /// [Anonymous] Get all tags.
        /// </summary>
        [HttpGet]
        [Route("getAll")]
        [AllowAnonymous]
        public IHttpActionResult GetAllTags()
        {
            IEnumerable<BasicModel> allTags = this.DAL.GetAllTags();

            return Ok(allTags);
        }

        /// <summary>
        /// [Anonymous] Get all tags similar to the provided parameter.
        /// </summary>
        /// <param name="tagName">Tag name to find similar tags against.</param>
        [HttpGet]
        [Route("getAllLike/{tagName}")]
        [AllowAnonymous]
        public IHttpActionResult GetAllTagsLike(string tagName)
        {
            IEnumerable<BasicModel> allTagsLike = this.DAL.GetAllTagsLike(tagName);

            return Ok(allTagsLike);
        } 
    }
}