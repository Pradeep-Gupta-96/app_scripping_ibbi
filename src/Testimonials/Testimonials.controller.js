import { pool } from '../config/database.js'
import { createtestimonialsTableQuery, deletetestimonialsByIdQuery, getAlltestimonialsQuery, gettestimonialsByIdQuery, inserttestimonialsQuery, updatetestimonialsByIdQuery } from './Testimonials.queries.js'


// CREATE TABLE IF NOT EXISTS
export const createtestimonialsTable = async (req, res) => {
    try {
        await pool.query(createtestimonialsTableQuery);
        res.status(200).json({ message: "Table Created Successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// INSERT
export const inserttestimonials = async (req, res) => {
    const { title, description } = req.body;
    const image = req.file ? `uploads/${req.file.filename}` : null; // Get image path if uploaded
    try {
        const result = await pool.query(inserttestimonialsQuery, [title, image, description]);
        res.status(201).json({ message: "testimonials created successfully", testimonials: result.rows[0] });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// GET ALL
export const getAlltestimonials = async (req, res) => {
    try {
        const result = await pool.query(getAlltestimonialsQuery);
        res.status(200).json({ message: "Fetched all testimonialss", testimonialss: result.rows });
    } catch (error) {
        res.status(500).json({ message: "An error occurred on the server side", error });
    }
};



// GET BY ID
export const gettestimonialsById = async (req, res) => {
    const id = req.params.id;
    try {
        const result = await pool.query(gettestimonialsByIdQuery, [id]);
        if (result.rows.length === 0) {
            res.status(404).json({ message: "testimonials not found" });
        } else {
            res.status(200).json({ message: "Fetched testimonials by ID", testimonials: result.rows[0] });
        }
    } catch (error) {
        res.status(500).json({ message: "An error occurred on the server side", error });
    }
};


// UPDATE BY ID
export const updatetestimonialsById = async (req, res) => {
    const id = req.params.id;
    const { title, description } = req.body;
    let imagePath = null;

    // Check if a new image file was uploaded
    if (req.file) {
        imagePath = `uploads/${req.file.filename}`;
    }

    try {
        // Fetch the current record to check if it exists
        const currenttestimonials = await pool.query(gettestimonialsByIdQuery, [id]);

        if (currenttestimonials.rows.length === 0) {
            return res.status(404).json({ message: "testimonials not found" });
        }

        // Update the record in the database, including the image path if provided
        const result = await pool.query(updatetestimonialsByIdQuery, [title, imagePath, description, id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "testimonials not found" });
        } else {
            return res.status(200).json({ message: "testimonials updated successfully", testimonials: result.rows[0] });
        }
    } catch (error) {
        res.status(500).json({ message: "An error occurred on the server side", error });
    }
};


// DELETE BY ID
export const deletetestimonialsById = async (req, res) => {
    const id = req.params.id;
    try {
        const result = await pool.query(deletetestimonialsByIdQuery, [id]);
        if (result.rowCount === 0) {
            res.status(404).json({ message: "testimonials not found" });
        } else {
            res.status(204).send();
        }
    } catch (error) {
        res.status(500).json({ message: "An error occurred on the server side", error });
    }
};



