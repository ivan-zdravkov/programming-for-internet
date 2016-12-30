using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Models
{
    public class ArticleOutputModel
    {
        public int Id { get; set; }

        public string Title { get; set; }

        public string Image { get; set; }

        public string Content { get; set; }

        public int StatusId { get; set; }

        public BasicModel Category { get; set; }

        public IEnumerable<BasicModel> SelectedTags { get; set; }
 
        public DateTime CreatedDate { get; set; }
    }
}
