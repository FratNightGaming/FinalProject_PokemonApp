--create Database PokemonDB;

--create Table Users
--(
--ID int Primary Key identity (1,1),
--UserName nvarchar(30)
----GoogleID nvarchar(30)
--);

--create Table PokemonRankings
--(
--Id int Primary Key identity (1,1),
--UserId int foreign key references Users(ID),
--UserRank int,
--PokemonAPIID int,
--Criteria nvarchar(25),
--);

--insert into Users
--values 
--('Jake'),
--('Sean'),
--('Wail')
--;

--insert into PokemonRankings values
--(1, 1, 25, 'Design'),
--(1, 2, 7, 'Design'),
--(1, 3, 150, 'Design'),
--(1, 4, 1, 'Design'),
--(1, 5, 39, 'Design'),
--(1, 6, 149, 'Design'),
--(1, 7, 6, 'Design'),
--(1, 8, 94, 'Design'),
--(1, 9, 59, 'Design'),
--(1, 10, 123, 'Design')
--;


