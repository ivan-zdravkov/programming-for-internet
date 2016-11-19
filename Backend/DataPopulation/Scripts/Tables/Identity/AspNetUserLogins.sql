CREATE TABLE [dbo].[AspNetUserLogins] (
	[UserId]				nvarchar(450)			NOT NULL,
    [LoginProvider]			nvarchar(450)			NOT NULL,
    [ProviderKey]			nvarchar(450)			NOT NULL,
	[ProviderDisplayName]	nvarchar(max)			NULL,

	CONSTRAINT [PK_AspNetUserLogins] PRIMARY KEY CLUSTERED ([UserId] ASC, [LoginProvider] ASC, [ProviderKey] ASC),
	CONSTRAINT [FK_AspNetUserLogins_AspNetUsers] FOREIGN KEY ([UserId]) REFERENCES [dbo].[AspNetUsers] ([Id]) ON DELETE CASCADE
)