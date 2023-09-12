import express from 'express';
import multer from 'multer';

import {
    createTodoTable,
    insertTodo,
    getAllTodo,
    getTodoById,
    updateTodoById,
    deleteTodoById,
} from './blog.controller.js';
import { authMiddleware } from '../users/authMiddileware.js';

export const router = express.Router();


// Define a storage engine for multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'src/blog_post/uploads/'); // Specify the directory where you want to save the images
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname); // Use the original filename for the uploaded file
    },
});

// Create a multer instance with the defined storage engine
const upload = multer({ storage });

// Create Todo Table if it doesn't exist
router.get('/createTodoTable',authMiddleware, createTodoTable);

// Create a new Todo
router.post('/insertTodo', authMiddleware, upload.single('image'), insertTodo);

// Get all Todos
router.get('/getAllTodo', authMiddleware, getAllTodo);

// Get a Todo by ID
router.get('/getTodoById/:id', authMiddleware, getTodoById);

// Update a Todo by ID
router.put('/updateTodoById/:id', authMiddleware, upload.single('image'), updateTodoById);

// Delete a Todo by ID
router.delete('/deleteTodoById/:id', authMiddleware, deleteTodoById);
