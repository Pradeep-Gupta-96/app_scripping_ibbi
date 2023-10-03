import express from 'express';
import multer from 'multer';

import {
    createhighlightsTable,
    inserthighlights,
    getAllhighlights,
    gethighlightsById,
    updatehighlightsById,
    deletehighlightsById,
} from './highlights.controller.js';
import { authMiddleware } from '../users/authMiddileware.js';

export const router = express.Router();


// Define a storage engine for multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'src/Highlights/uploads/'); // Specify the directory where you want to save the images
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname); // Use the original filename for the uploaded file
    },
});

// Create a multer instance with the defined storage engine
const upload = multer({ storage });

// Create highlights Table if it doesn't exist
router.get('/createhighlightsTable',authMiddleware, createhighlightsTable);

// Create a new highlights
router.post('/inserthighlights', authMiddleware, upload.single('image'), inserthighlights);

// Get all highlightss
router.get('/getAllhighlights', getAllhighlights);

// Get a highlights by ID
router.get('/gethighlightsById/:id', gethighlightsById);

// Update a highlights by ID
router.put('/updatehighlightsById/:id', authMiddleware, upload.single('image'), updatehighlightsById);

// Delete a highlights by ID
router.delete('/deletehighlightsById/:id', authMiddleware, deletehighlightsById);
