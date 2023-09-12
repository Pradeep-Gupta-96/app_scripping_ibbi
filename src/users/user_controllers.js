import { pool } from "../config/database.js"
import bcrypt from 'bcrypt'; // Import bcrypt for password hashing  
import jwt from 'jsonwebtoken'; // Import JWT for token generation


import { createUsersTable, queryforsignup, emailCheckQuery, query, userQuery, updatePasswordQuery } from "./user_queries.js";

// Define a function to create the users table if it doesn't exist
export const createUserTable = async (req, res) => {
    try {
        // Execute the SQL query to create the users table
        pool.query(createUsersTable, (error, result) => {
            if (error) throw error; // Throw an error if the query encounters an error
            res.status(200).json({ message: "Table created successfully" });
        });
    } catch (error) {
        res.status(500).json({ message: error.message }); // Handle errors and respond with an error message
    }
};


export const signup = async (req, res) => {
    try {
        // Extract user input from the request body
        const { username, email, password } = req.body;

        // Validate user input (e.g., check for required fields, valid email format, etc.)
        if (!username || !email || !password) {
            return res.status(400).json({ message: "Please provide all required fields." });
        }

        const emailCheckResult = await pool.query(emailCheckQuery, [email]);

        // If the email is already registered, return the user's ID in the response
        if (emailCheckResult.rows.length > 0) {
            return res.status(409).json({ message: "Email is already registered", userId: emailCheckResult.rows[0].id });
        }

        // Hash the user's password for security
        const hashedPassword = await bcrypt.hash(password, 10); // You can adjust the salt rounds

        const values = [username, email, hashedPassword, 'admin']; // Assuming 'user' is the default role

        const result = await pool.query(queryforsignup, values);

        // You can optionally send a confirmation email to the user here

        // Return a success response
        res.status(201).json({ message: "User registered successfully", userId: result.rows[0].id });
    } catch (error) {
        console.error("Error in signup:", error);
        res.status(500).json({ message: "An error occurred on the server side" });
    }
};


export const signin = async (req, res) => {
    try {
        // Extract user input from the request body
        const { email, password } = req.body;

        // Validate user input (e.g., check for required fields)
        if (!email || !password) {
            return res.status(400).json({ message: "Please provide both email and password." });
        }

        const result = await pool.query(query, [email]);

        // Check if a user with the provided email exists
        if (result.rows.length === 0) {
            return res.status(401).json({ message: "Invalid credentials." });
        }

        // Compare the provided password with the hashed password stored in the database
        const user = result.rows[0];
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ message: "Invalid credentials." });
        }

        // If credentials are valid, generate a JWT token with user information
        const token = jwt.sign({ userId: user.id, email: user.email }, process.env.SECRET_KEY, { expiresIn: '1h' }); // Include user data in the token

        // Return the user information and token as a response
        res.status(200).json({ user, token });
    } catch (error) {
        console.error("Error in signin:", error);
        res.status(500).json({ message: "An error occurred on the server side" });
    }
};



export const resetPassword = async (req, res) => {
    try {
        const { email, password, newPassword } = req.body;

        // Validate user input (e.g., check for required fields)
        if (!email || !password || !newPassword) {
            return res.status(400).json({ message: "Please provide all required fields." });
        }
        const userResult = await pool.query(userQuery, [email]);

        if (userResult.rows.length === 0) {
            return res.status(404).json({ message: "Email not found." });
        }

        const user = userResult.rows[0];

        // Compare the provided current password with the hashed password stored in the database
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ message: "Invalid current password." });
        }

        // Hash the new password for security
        const hashedNewPassword = await bcrypt.hash(newPassword, 10); // You can adjust the salt rounds


        await pool.query(updatePasswordQuery, [hashedNewPassword, user.id]);

        res.status(200).json({ message: "Password reset successful." });
    } catch (error) {
        console.error("Error in resetPassword:", error);
        res.status(500).json({ message: "An error occurred on the server side" });
    }
};

