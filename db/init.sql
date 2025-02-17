CREATE TABLE transactions (
    id SERIAL PRIMARY KEY,
    dateTime TIMESTAMP NOT NULL,
    author VARCHAR(255) NOT NULL,
    sum DECIMAL(10, 2) NOT NULL,
    category VARCHAR(255) NOT NULL,
    comment TEXT
);
