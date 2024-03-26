CREATE TABLE users(
  id serial NOT NULL,
  id_telegram int NOT NULL,
  first_name TEXT,
  last_name TEXT,
  surname TEXT,
  phone TEXT,
  date_create DATE,
  data_update DATE
);