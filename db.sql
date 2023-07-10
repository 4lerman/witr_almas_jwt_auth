create TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    username VARCHAR(255) NOT NULL,
    password TEXT NOT NULL
);

create TABLE refresh_tokens (
    id INT,
    refreshToken TEXT NOT NULL
);