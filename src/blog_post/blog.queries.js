// SQL Queries
export const createTodoTableQuery = `
CREATE TABLE IF NOT EXISTS todo (
    ID SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    image VARCHAR(255),
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`;


export const insertTodoQuery = `
INSERT INTO todo (title, image, description)
VALUES ($1, $2, $3)
RETURNING *;
`;

export const getAllTodoQuery = "SELECT * FROM todo";

export const getTodoByIdQuery = "SELECT * FROM todo WHERE id = $1";

export const updateTodoByIdQuery = `
UPDATE todo
SET title = $1, image = $2, description = $3
WHERE id = $4
RETURNING *;
`;

export const deleteTodoByIdQuery = "DELETE FROM todo WHERE id = $1";


