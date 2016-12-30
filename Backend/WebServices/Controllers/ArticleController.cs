using DAL.Models;
using System;
using System.Linq;
using System.Collections.Generic;
using System.Web.Http;
using WebServices.Interfaces;
using WebServices.Models;
using WebServices.Services;

namespace WebServices.Controllers
{
    [RoutePrefix("api/article")]
    [Authorize]
    public class ArticleController : BaseApiController
    {
        private IImageServiceInterface imageHandler = new CloudinaryImageService();

        [HttpGet]
        [Route("getAll")]
        [AllowAnonymous]
        public IHttpActionResult GetAllArticles()
        {
            IEnumerable<ArticleOutputModel> allArticles = this.DAL.GetAllArticles();

            return Ok(allArticles);
        }

        [HttpGet]
        [Route("getArticlesPerCategoryOverview")]
        [AllowAnonymous]
        public IHttpActionResult GetArticlesPerCategoryOverview()
        {
            IEnumerable<ArticleOutputModel> allArticles = this.DAL.GetAllArticles();

            Dictionary<string, Dictionary<string, int>> statistics = allArticles
                .GroupBy(article => new { article.Category.Id, article.Category.Name })
                .ToDictionary(d => d.Key.Name,
                              d => d.GroupBy(art_cat_group => new { art_cat_group.CreatedDate.Month, art_cat_group.CreatedDate.Year })
                                    .ToDictionary(art_cat_group_month => art_cat_group_month.Key.Month.ToString() + '/' + art_cat_group_month.Key.Year.ToString(),
                                                  art_cat_group_month => art_cat_group_month.Count()));

            IEnumerable<string> months = allArticles
                .OrderBy(article => article.CreatedDate.Year)
                .ThenBy(article => article.CreatedDate.Month)
                .Select(article => article.CreatedDate.Month.ToString() + '/' + article.CreatedDate.Year.ToString())
                .Distinct();

            return Ok(new
            {
                months = months,
                articles = statistics
            });
        }

        [HttpGet]
        [Route("getAllInCategory/{categoryId}")]
        [AllowAnonymous]
        public IHttpActionResult GetAllArticlesInCategory(int categoryId)
        {
            IEnumerable<ArticleOutputModel> allArticlesInCategory = this.DAL.GetAllArticlesInCategory(categoryId);

            return Ok(allArticlesInCategory);
        }

        [HttpGet]
        [Route("getAllInTag/{tagId}")]
        [AllowAnonymous]
        public IHttpActionResult GetAllArticlesInTag(int tagId)
        {
            IEnumerable<ArticleOutputModel> allArticlesInTag = this.DAL.GetAllArticlesInTag(tagId);

            return Ok(allArticlesInTag);
        }

        [HttpGet]
        [Route("getById/{articleId}")]
        [AllowAnonymous]
        public IHttpActionResult GetArticleById(int articleId)
        {
            ArticleOutputModel article = this.DAL.GetArticleById(articleId);

            return Ok(article);
        }

        [HttpPost]
        [Route("submit")]
        public IHttpActionResult CreateArticle(ArticleInputModel article)
        {
            if (ModelState.IsValid)
            {
                if (!String.IsNullOrEmpty(article.Image))
                {
                    article.ImageURL = this.imageHandler.GenerateImageURLFromImage(article.Image, article.Title);
                }

                ArticleOutputModel createdArticle = this.DAL.CreateArticle(article, null);

                return Ok(createdArticle);
            }
            else
            {
                return BadRequest(ModelState);
            }
        }

        [HttpPost]
        [Route("create")]
        [Authorize(Roles = "Administrator")]
        public IHttpActionResult CreateArticleAsAdmin(ArticleInputAdminModel article)
        {
            if (ModelState.IsValid)
            {
                if (!String.IsNullOrEmpty(article.Image))
                {
                    article.ImageURL = this.imageHandler.GenerateImageURLFromImage(article.Image, article.Title);
                }

                ArticleOutputModel createdArticle = this.DAL.CreateArticle(article, article.StatusId);

                return Ok(createdArticle);
            }
            else
            {
                return BadRequest(ModelState);
            }
        }

        [HttpPut]
        [Route("update/{articleId}")]
        [Authorize(Roles = "Administrator")]
        public IHttpActionResult UpdateArticle(int articleId, ArticleInputModel article)
        {
            if (ModelState.IsValid)
            {
                if (!String.IsNullOrEmpty(article.Image))
                {
                    article.ImageURL = this.imageHandler.GenerateImageURLFromImage(article.Image, article.Title);
                }

                ArticleOutputModel updatedArticle = this.DAL.UpdateArticle(articleId, article);

                return Ok(updatedArticle);
            }
            else
            {
                return BadRequest(ModelState);
            }
        }

        [HttpPut]
        [Route("changeStatus")]
        [Authorize(Roles = "Administrator")]
        public IHttpActionResult ChangeArticleStatus(ArticleStatusModel model)
        {
            if (ModelState.IsValid)
            {
                this.DAL.ChangeArticleStatus(model);

                return Ok();
            }
            else
            {
                return BadRequest(ModelState);
            }
        }

        [HttpDelete]
        [Authorize(Roles = "Administrator")]
        [Route("delete/{articleId}")]
        public IHttpActionResult DeleteArticle(int articleId)
        {
            this.DAL.DeleteArticle(articleId);

            return Ok();
        }

        [HttpGet]
        [Route("getAllStatuses")]
        [Authorize(Roles = "Administrator")]
        public IHttpActionResult GetAllStatuses()
        {
            IEnumerable<BasicModel> allArticleStatuses = this.DAL.GetAllStatuses();

            return Ok(allArticleStatuses);
        }
    }
}