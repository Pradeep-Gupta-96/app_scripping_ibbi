// SQL Queries
export const createhighlightsTableQuery = `
CREATE TABLE IF NOT EXISTS highlights (
    ID SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    image VARCHAR(255),
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`;


export const inserthighlightsQuery = `
INSERT INTO highlights (title, image, description)
VALUES ($1, $2, $3)
RETURNING *;
`;

export const getAllhighlightsQuery = "SELECT * FROM highlights";

export const gethighlightsByIdQuery = "SELECT * FROM highlights WHERE id = $1";

export const updatehighlightsByIdQuery = `
UPDATE highlights
SET title = $1, image = $2, description = $3
WHERE id = $4
RETURNING *;
`;

export const deletehighlightsByIdQuery = "DELETE FROM highlights WHERE id = $1";


