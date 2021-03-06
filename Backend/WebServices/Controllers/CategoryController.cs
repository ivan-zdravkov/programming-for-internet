using DAL.Models;
using System.Collections;
using System.Collections.Generic;
using System.Web.Http;
using WebServices.Models;

namespace WebServices.Controllers
{
    [RoutePrefix("api/category")]
    [Authorize]
    public class CategoryController : BaseApiController
    {
        [HttpGet]
        [Route("getAll")]
        [AllowAnonymous]
        public IHttpActionResult GetAllCategories()
        {
            IEnumerable<CategoryOutputModel> allCategories = this.DAL.GetAllCategories();

            return Ok(allCategories);
        }

        [HttpPost]
        [Route("create")]
        [Authorize(Roles = "Administrator")]
        public IHttpActionResult CreateCategory(BasicModel category)
        {
            int categoryId = this.DAL.CreateCategory(category);

            return Ok(categoryId);
        }

        [HttpPut]
        [Route("update")]
        [Authorize(Roles = "Administrator")]
        public IHttpActionResult UpdateCategory(BasicModel category)
        {
            this.DAL.UpdateCategory(category);

            return Ok();
        }

        [HttpDelete]
        [Route("delete/{categoryId}")]
        [Authorize(Roles = "Administrator")]
        public IHttpActionResult DeleteCategory(int categoryId)
        {
            this.DAL.DeleteCategory(categoryId);

            return Ok();
        }
    }
}