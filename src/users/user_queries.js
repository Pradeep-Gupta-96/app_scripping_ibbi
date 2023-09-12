export const createUsersTable = `
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    role VARCHAR(50) NOT NULL
);
`;


// SQL query to check if a user with a given email exists in the users table
export const checkEmailExist = 'SELECT * FROM users WHERE email = $1';


export const queryforsignup = `
    INSERT INTO users (username, email, password, role)
    VALUES ($1, $2, $3, $4)
    RETURNING id;
`;

export const emailCheckQuery = `
SELECT id
FROM users
WHERE email = $1;
`;

export const query = `
SELECT id, email, password
FROM users
WHERE email = $1;
`;

// Check if a user with the provided email exists
export const userQuery = `
    SELECT id, password
    FROM users
    WHERE email = $1;
`;

// Update the user's password in the database
export const updatePasswordQuery = `
        UPDATE users
        SET password = $1
        WHERE id = $2;
        `;
