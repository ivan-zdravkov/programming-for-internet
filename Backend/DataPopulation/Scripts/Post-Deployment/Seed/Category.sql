SET IDENTITY_INSERT [dbo].[Category] ON

INSERT [dbo].[Category] ([Id], [Name], [CreatedBy], [CreatedAt]) 
	VALUES (1, N'Cooking', N'633d03e5-86fb-4b61-9fec-25fffff534b7', GETDATE()) 
INSERT [dbo].[Category] ([Id], [Name], [CreatedBy], [CreatedAt]) 
	VALUES (2, N'Cleaning', N'633d03e5-86fb-4b61-9fec-25fffff534b7', GETDATE()) 
INSERT [dbo].[Category] ([Id], [Name], [CreatedBy], [CreatedAt]) 
	VALUES (3, N'Ironing', N'633d03e5-86fb-4b61-9fec-25fffff534b7', GETDATE()) 
INSERT [dbo].[Category] ([Id], [Name], [CreatedBy], [CreatedAt]) 
	VALUES (4, N'Pet Handling', N'633d03e5-86fb-4b61-9fec-25fffff534b7', GETDATE()) 

SET IDENTITY_INSERT [dbo].[Category] OFF