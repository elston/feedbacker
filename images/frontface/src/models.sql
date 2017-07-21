CREATE TABLE Region(
    -- ...
    id integer primary key not null, 
    name varchar(127) not null,
    -- ..
    constraint region_idx1 unique (name)
);

CREATE TABLE City(
    -- ...
    id integer primary key not null, 
    name varchar(127) not null,
    region_id integer not null,    
    -- ..
    -- constraint city_idx1 unique (name),    
    constraint city_fk1 foreign key(region_id) references Region(id)
);

CREATE TABLE Feedback(
    -- ...
    id integer primary key not null, 
    -- ...
    firstname varchar(30) not null,
    lastname varchar(30) not null,
    midname varchar(30),
    city_id integer not null,
    phone varchar(127),
    email varchar(255),
    comment text,
    -- ..
    constraint feedback_fk1 foreign key(city_id) references City(id)
);