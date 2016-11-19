-- REQUIRES: none
:r .\IdentityTables\AspNetRoles.sql
:r .\Category.sql
:r .\Status.sql
:r .\Tag.sql

-- REQUIRES dbo.AspNetRoles
:r .\IdentityTables\AspNetUsers.sql
----------------------------------------------

-- REQUIRES dbo.AspNetRoles, dbo.AspNetUsers
:r .\IdentityTables\AspNetUserRoles.sql
----------------------------------------------