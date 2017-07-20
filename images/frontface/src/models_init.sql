-- ...Region
INSERT INTO Region(name) VALUES ('Краснодарский край');
INSERT INTO Region(name) VALUES ('Ростовская область');
INSERT INTO Region(name) VALUES ('Ставропольский край');

-- ..Sity
INSERT INTO Sity(region_id, name) select id ,'Краснодар' from Region where name = 'Краснодарский край';
INSERT INTO Sity(region_id, name) select id ,'Кропоткин' from Region where name = 'Краснодарский край';
INSERT INTO Sity(region_id, name) select id ,'Славянск' from Region where name = 'Краснодарский край';
-- ..
INSERT INTO Sity(region_id, name) select id ,'Ростов' from Region where name = 'Ростовская область';
INSERT INTO Sity(region_id, name) select id ,'Шахты' from Region where name = 'Ростовская область';
INSERT INTO Sity(region_id, name) select id ,'Батайск' from Region where name = 'Ростовская область';
-- ..
INSERT INTO Sity(region_id, name) select id ,'Ставрополь' from Region where name = 'Ставропольский край';
INSERT INTO Sity(region_id, name) select id ,'Пятигорск' from Region where name = 'Ставропольский край';