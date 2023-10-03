import { pool } from '../config/database.js'
import { createhighlightsTableQuery, deletehighlightsByIdQuery, getAllhighlightsQuery, gethighlightsByIdQuery, inserthighlightsQuery, updatehighlightsByIdQuery } from './highlights.queries.js'


// CREATE TABLE IF NOT EXISTS
export const createhighlightsTable = async (req, res) => {
    try {
        await pool.query(createhighlightsTableQuery);
        res.status(200).json({ message: "Table Created Successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// INSERT
export const inserthighlights = async (req, res) => {
    const { title, description } = req.body;
    const image = req.file ? `uploads/${req.file.filename}` : null; // Get image path if uploaded
    try {
        const result = await pool.query(inserthighlightsQuery, [title, image, description]);
        res.status(201).json({ message: "highlights created successfully", highlights: result.rows[0] });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// GET ALL
export const getAllhighlights = async (req, res) => {
    try {
        const result = await pool.query(getAllhighlightsQuery);
        res.status(200).json({ message: "Fetched all highlightss", highlightss: result.rows });
    } catch (error) {
        res.status(500).json({ message: "An error occurred on the server side", error });
    }
};



// GET BY ID
export const gethighlightsById = async (req, res) => {
    const id = req.params.id;
    try {
        const result = await pool.query(gethighlightsByIdQuery, [id]);
        if (result.rows.length === 0) {
            res.status(404).json({ message: "highlights not found" });
        } else {
            res.status(200).json({ message: "Fetched highlights by ID", highlights: result.rows[0] });
        }
    } catch (error) {
        res.status(500).json({ message: "An error occurred on the server side", error });
    }
};


// UPDATE BY ID
export const updatehighlightsById = async (req, res) => {
    const id = req.params.id;
    const { title, description } = req.body;
    let imagePath = null;

    // Check if a new image file was uploaded
    if (req.file) {
        imagePath = `uploads/${req.file.filename}`;
    }

    try {
        // Fetch the current record to check if it exists
        const currenthighlights = await pool.query(gethighlightsByIdQuery, [id]);

        if (currenthighlights.rows.length === 0) {
            return res.status(404).json({ message: "highlights not found" });
        }

        // Update the record in the database, including the image path if provided
        const result = await pool.query(updatehighlightsByIdQuery, [title, imagePath, description, id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "highlights not found" });
        } else {
            return res.status(200).json({ message: "highlights updated successfully", highlights: result.rows[0] });
        }
    } catch (error) {
        res.status(500).json({ message: "An error occurred on the server side", error });
    }
};


// DELETE BY ID
export const deletehighlightsById = async (req, res) => {
    const id = req.params.id;
    try {
        const result = await pool.query(deletehighlightsByIdQuery, [id]);
        if (result.rowCount === 0) {
            res.status(404).json({ message: "highlights not found" });
        } else {
            res.status(204).send();
        }
    } catch (error) {
        res.status(500).json({ message: "An error occurred on the server side", error });
    }
};



