CREATE TABLE [dbo].[Status](
	[Id]				int						IDENTITY (1, 1) NOT NULL,
	[Name]				nvarchar(100)			NOT NULL,
	
	[CreatedBy]			nvarchar(450)			NOT NULL,
	[CreatedAt]			datetime				NOT NULL,
	[LastModifiedBy]	nvarchar(450)			NULL,
	[LastModifiedAt]	datetime				NULL,

	CONSTRAINT [PK_Status] PRIMARY KEY CLUSTERED ([Id] ASC)
)