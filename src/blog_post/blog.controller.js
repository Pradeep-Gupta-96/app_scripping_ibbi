import { pool } from '../config/database.js'
import { createTodoTableQuery, deleteTodoByIdQuery, getAllTodoQuery, getTodoByIdQuery, insertTodoQuery, updateTodoByIdQuery } from './blog.queries.js'


// CREATE TABLE IF NOT EXISTS
export const createTodoTable = async (req, res) => {
    try {
        await pool.query(createTodoTableQuery);
        res.status(200).json({ message: "Table Created Successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// INSERT
export const insertTodo = async (req, res) => {
    const { title, description } = req.body;
    const image = req.file ? `uploads/${req.file.filename}` : null; // Get image path if uploaded

    try {
        const result = await pool.query(insertTodoQuery, [title, image, description]);
        res.status(201).json({ message: "Todo created successfully", todo: result.rows[0] });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// GET ALL
export const getAllTodo = async (req, res) => {
    try {
        const result = await pool.query(getAllTodoQuery);
        res.status(200).json({ message: "Fetched all todos", todos: result.rows });
    } catch (error) {
        res.status(500).json({ message: "An error occurred on the server side", error });
    }
};



// GET BY ID
export const getTodoById = async (req, res) => {
    const id = req.params.id;
    try {
        const result = await pool.query(getTodoByIdQuery, [id]);
        if (result.rows.length === 0) {
            res.status(404).json({ message: "Todo not found" });
        } else {
            res.status(200).json({ message: "Fetched todo by ID", todo: result.rows[0] });
        }
    } catch (error) {
        res.status(500).json({ message: "An error occurred on the server side", error });
    }
};


// UPDATE BY ID
export const updateTodoById = async (req, res) => {
    const id = req.params.id;
    const { title, description } = req.body;
    let imagePath = null;

    // Check if a new image file was uploaded
    if (req.file) {
        imagePath = `uploads/${req.file.filename}`;
    }

    try {
        // Fetch the current record to check if it exists
        const currentTodo = await pool.query(getTodoByIdQuery, [id]);

        if (currentTodo.rows.length === 0) {
            return res.status(404).json({ message: "Todo not found" });
        }

        // Update the record in the database, including the image path if provided
        const result = await pool.query(updateTodoByIdQuery, [title, imagePath, description, id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Todo not found" });
        } else {
            return res.status(200).json({ message: "Todo updated successfully", todo: result.rows[0] });
        }
    } catch (error) {
        res.status(500).json({ message: "An error occurred on the server side", error });
    }
};


// DELETE BY ID
export const deleteTodoById = async (req, res) => {
    const id = req.params.id;
    try {
        const result = await pool.query(deleteTodoByIdQuery, [id]);
        if (result.rowCount === 0) {
            res.status(404).json({ message: "Todo not found" });
        } else {
            res.status(204).send();
        }
    } catch (error) {
        res.status(500).json({ message: "An error occurred on the server side", error });
    }
};



