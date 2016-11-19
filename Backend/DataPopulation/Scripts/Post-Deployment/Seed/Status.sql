SET IDENTITY_INSERT [dbo].[Status] ON

INSERT [dbo].[Status] ([Id], [Name], [CreatedBy], [CreatedAt]) 
	VALUES (1, N'Confirmed', N'633d03e5-86fb-4b61-9fec-25fffff534b7', GETDATE()) 
INSERT [dbo].[Status] ([Id], [Name], [CreatedBy], [CreatedAt]) 
	VALUES (2, N'Pending', N'633d03e5-86fb-4b61-9fec-25fffff534b7', GETDATE()) 
INSERT [dbo].[Status] ([Id], [Name], [CreatedBy], [CreatedAt]) 
	VALUES (3, N'Canceled', N'633d03e5-86fb-4b61-9fec-25fffff534b7', GETDATE()) 
INSERT [dbo].[Status] ([Id], [Name], [CreatedBy], [CreatedAt]) 
	VALUES (4, N'Deleted', N'633d03e5-86fb-4b61-9fec-25fffff534b7', GETDATE()) 

SET IDENTITY_INSERT [dbo].[Status] OFF