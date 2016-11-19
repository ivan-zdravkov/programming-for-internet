CREATE TABLE [dbo].[Article](
	[Id]				int						IDENTITY (1, 1) NOT NULL,
	[Name]				nvarchar(1000)			NOT NULL,
	[Text]				nvarchar(max)			NOT NULL,
	[Image]				nvarchar(3000)			NULL,
	[CategoryID]		int						NOT NULL,
	[StatusID]			int						NOT NULL,
	
	[CreatedBy]			nvarchar(450)			NOT NULL,
	[CreatedAt]			datetime				NOT NULL,
	[LastModifiedBy]	nvarchar(450)			NULL,
	[LastModifiedAt]	datetime				NULL,

	CONSTRAINT [PK_Article] PRIMARY KEY CLUSTERED ([Id] ASC),
	CONSTRAINT [FK_Article_Category] FOREIGN KEY ([CategoryID]) REFERENCES [dbo].[Category] ([Id]),
	CONSTRAINT [FK_Article_Status] FOREIGN KEY ([StatusID]) REFERENCES [dbo].[Status] ([Id]),
)