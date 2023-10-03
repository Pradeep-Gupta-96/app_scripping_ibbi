// SQL Queries
export const createtestimonialsTableQuery = `
CREATE TABLE IF NOT EXISTS testimonials (
    ID SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    image VARCHAR(255),
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`;


export const inserttestimonialsQuery = `
INSERT INTO testimonials (title, image, description)
VALUES ($1, $2, $3)
RETURNING *;
`;

export const getAlltestimonialsQuery = "SELECT * FROM testimonials";

export const gettestimonialsByIdQuery = "SELECT * FROM testimonials WHERE id = $1";

export const updatetestimonialsByIdQuery = `
UPDATE testimonials
SET title = $1, image = $2, description = $3
WHERE id = $4
RETURNING *;
`;

export const deletetestimonialsByIdQuery = "DELETE FROM testimonials WHERE id = $1";


