using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Models
{
    public class ArticleInputModel
    {
        [Required]
        [StringLength(1000)]
        public string Title { get; set; }

        public string Image { get; set; }

        public string ImageURL { get; set; }

        [Required]
        public string Content { get; set; }

        public IEnumerable<string> Tags { get; set; }

        [Required]
        public int CategoryId { get; set; }
    }
}
