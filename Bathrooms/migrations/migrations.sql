DROP DATABASE IF EXISTS bathroom
CREATE DATABASE bathroom;

\c bathroom

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR NOT NULL,
  password VARCHAR NOT NULL
  );

CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  body VARCHAR NOT NULL,
  user_id INTEGER REFERENCES users (id)
  );
