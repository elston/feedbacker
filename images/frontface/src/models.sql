CREATE TABLE Region(
    -- ...
    id integer primary key not null, 
    name varchar(127) not null,
    -- ..
    constraint region_idx1 unique (name)
);

CREATE TABLE Sity(
    -- ...
    id integer primary key not null, 
    name varchar(127) not null,
    region_id integer not null,    
    -- ..
    -- constraint sity_idx1 unique (name),    
    constraint sity_fk1 foreign key(region_id) references Region(id)
);

CREATE TABLE Feedback(
    -- ...
    id integer primary key not null, 
    -- ...
    firstname varchar(30) not null,
    lastname varchar(30) not null,
    midname varchar(30),
    sity_id integer not null,
    phone varchar(127),
    email varchar(255),
    comment text,
    -- ..
    constraint feedback_fk1 foreign key(sity_id) references Sity(id)
);