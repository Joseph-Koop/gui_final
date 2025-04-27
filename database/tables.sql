-- tables.sql

drop table if exists cards;
drop table if exists decks;

create table decks (
    id serial primary key,
    name varchar(100) not null,
    created_at timestamp with time zone default now()
);

create table cards (
    id serial primary key,
    question varchar(100) not null,
    answer varchar(100) not null,
    deck_id int not null references decks(id) on delete cascade,
    created_at timestamp with time zone default now()
);

insert into decks (name)
values
    ('Animals'),
    ('Cities'),
    ('Population');

insert into cards (question, answer, deck_id)
values
    -- Animals
    ('Sheep', 'Mammal', 1),
    ('Eagle', 'Bird', 1),
    ('Shark', 'Fish', 1),
    ('Frog', 'Amphibian', 1),
    ('Cobra', 'Reptile', 1),
    ('Octopus', 'Cephalopod', 1),
    ('Kangaroo', 'Marsupial', 1),
    ('Ant', 'Insect', 1),
    ('Bat', 'Mammal', 1),
    ('Penguin', 'Bird', 1),

    -- Cities
    ('New Delhi', 'India', 2),
    ('Cairo', 'Egypt', 2),
    ('Buenos Aires', 'Argentina', 2),
    ('Toronto', 'Canada', 2),
    ('Oslo', 'Norway', 2),
    ('Bangkok', 'Thailand', 2),
    ('Lagos', 'Nigeria', 2),
    ('Karachi', 'Pakistan', 2),
    ('Melbourne', 'Australia', 2),
    ('Lisbon', 'Portugal', 2),

    -- Population
    ('Nicaragua', '7 million', 3),
    ('Japan', '125 million', 3),
    ('Greece', '10 million', 3),
    ('South Africa', '60 million', 3),
    ('Norway', '5 million', 3),
    ('Brazil', '215 million', 3),
    ('Thailand', '71 million', 3),
    ('Mexico', '130 million', 3),
    ('Peru', '34 million', 3),
    ('Vietnam', '100 million', 3);