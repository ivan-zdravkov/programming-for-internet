using DAL.EntityFramework;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Core.Objects;
using System.Data.Entity.Infrastructure;
using System.Data.Entity.Validation;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Extensions
{
    public class ExtendedProgrammingForInternetEntities : ProgrammingForInternetEntities
    {
        private string userId;

        public ExtendedProgrammingForInternetEntities(string userId)
        {
            this.userId = userId;
        }

        public override int SaveChanges()
        {
            ChangeTracker.DetectChanges();

            ObjectContext ctx = ((IObjectContextAdapter)this).ObjectContext;
            List<ObjectStateEntry> objectStateEntryList = ctx.ObjectStateManager.GetObjectStateEntries(EntityState.Added | EntityState.Modified | EntityState.Deleted).ToList();

            foreach (ObjectStateEntry entry in objectStateEntryList)
            {
                if (entry.State == EntityState.Added)
                {
                    if (entry.Entity.GetType().GetProperties().Where(t => t.Name == "CreatedBy").Any())
                    {
                        Type type = entry.Entity.GetType();
                        type.GetProperties().Where(t => t.Name == "CreatedBy").First().SetValue(entry.Entity, this.userId);
                    }

                    if (entry.Entity.GetType().GetProperties().Where(t => t.Name == "CreatedAt").Any())
                    {
                        Type type = entry.Entity.GetType();
                        type.GetProperties().Where(t => t.Name == "CreatedAt").First().SetValue(entry.Entity, DateTime.UtcNow);
                    }
                }
            }

            var trackables = ChangeTracker.Entries();
            foreach (var entry in trackables.Where(t => t.State == EntityState.Modified))
            {
                if (entry.Entity.GetType().GetProperties().Where(t => t.Name == "LastModifiedBy").Any())
                {
                    Type type = entry.Entity.GetType();
                    type.GetProperties().Where(t => t.Name == "LastModifiedBy").First().SetValue(entry.Entity, this.userId);
                }

                if (entry.Entity.GetType().GetProperties().Where(t => t.Name == "LastModifiedAt").Any())
                {
                    Type type = entry.Entity.GetType();
                    type.GetProperties().Where(t => t.Name == "LastModifiedAt").First().SetValue(entry.Entity, DateTime.UtcNow);
                }
            }

            try
            {
                return base.SaveChanges();
            }
            catch (DbEntityValidationException ex)
            {
                var errorMessages = ex.EntityValidationErrors.SelectMany(x => x.ValidationErrors).Select(x => x.ErrorMessage);

                var fullErrorMessage = string.Join("; ", errorMessages);
                var exceptionMessage = string.Concat(ex.Message, " The validation errors are: ", fullErrorMessage);

                throw new DbEntityValidationException(exceptionMessage, ex.EntityValidationErrors);
            }
        }
    }
}
