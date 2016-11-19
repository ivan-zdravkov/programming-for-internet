CREATE TABLE [dbo].[ArticleTag](
	[Id]				int						IDENTITY (1, 1) NOT NULL,
	[ArticleID]			int						NOT NULL,
	[TagID]				int						NOT NULL,
	
	[CreatedBy]			nvarchar(450)			NOT NULL,
	[CreatedAt]			datetime				NOT NULL,
	[LastModifiedBy]	nvarchar(450)			NULL,
	[LastModifiedAt]	datetime				NULL,

	CONSTRAINT [PK_ArticleTag] PRIMARY KEY CLUSTERED ([Id] ASC),
	CONSTRAINT [FK_ArticleTag_Article] FOREIGN KEY ([ArticleID]) REFERENCES [dbo].[Article] ([Id]),
	CONSTRAINT [FK_ArticleTag_Tag] FOREIGN KEY ([TagID]) REFERENCES [dbo].[Tag] ([Id]),
)