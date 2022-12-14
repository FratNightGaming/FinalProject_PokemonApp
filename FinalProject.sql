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

--Jake Rankings
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

--Sean Rankings
--insert into PokemonRankings values
--(2, 1, 58, 'Design'),
--(2, 2, 25, 'Design'),
--(2, 3, 31, 'Design'),
--(2, 4, 64, 'Design'),
--(2, 5, 68, 'Design'),
--(2, 6, 104, 'Design'),
--(2, 7, 112, 'Design'),
--(2, 8, 94, 'Design'),
--(2, 9, 62, 'Design'),
--(2, 10, 12, 'Design')
--;

--Wail Rankings
--insert into PokemonRankings values
--(3, 1, 6, 'Design'),
--(3, 2, 130, 'Design'),
--(3, 3, 248, 'Design'),
--(3, 4, 306, 'Design'),
--(3, 5, 330, 'Design'),
--(3, 6, 384, 'Design'),
--(3, 7, 398, 'Design'),
--(3, 8, 445, 'Design'),
--(3, 9, 553, 'Design'),
--(3, 10, 567, 'Design')
--;

