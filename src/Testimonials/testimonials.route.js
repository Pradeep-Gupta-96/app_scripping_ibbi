import express from 'express';
import multer from 'multer';

import {
    createtestimonialsTable,
    inserttestimonials,
    getAlltestimonials,
    gettestimonialsById,
    updatetestimonialsById,
    deletetestimonialsById,
} from './Testimonials.controller.js';
import { authMiddleware } from '../users/authMiddileware.js';

export const router = express.Router();


// Define a storage engine for multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'src/Testimonials/uploads/'); // Specify the directory where you want to save the images
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname); // Use the original filename for the uploaded file
    },
});

// Create a multer instance with the defined storage engine
const upload = multer({ storage });

// Create testimonials Table if it doesn't exist
router.get('/createtestimonialsTable',authMiddleware, createtestimonialsTable);

// Create a new testimonials
router.post('/inserttestimonials', authMiddleware, upload.single('image'), inserttestimonials);

// Get all testimonialss
router.get('/getAlltestimonials', getAlltestimonials);

// Get a testimonials by ID
router.get('/gettestimonialsById/:id', gettestimonialsById);

// Update a testimonials by ID
router.put('/updatetestimonialsById/:id', authMiddleware, upload.single('image'), updatetestimonialsById);

// Delete a testimonials by ID
router.delete('/deletetestimonialsById/:id', authMiddleware, deletetestimonialsById);
