CREATE TABLE users (
    id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    email TEXT NOT NULL,
    username TEXT NOT NULL,
    userpassword TEXT NOT NULL
)