import mongoose from "mongoose";
import e, { Request, Response } from "express";
import UserModel from "../Models/UserModel.js";
import bcrypt from "bcrypt";

// Function to sign up a new user
export async function signUpUser(req: Request, res: Response) {
    try {
        const { username, password } = req.body;

        // Validate input
        if (!username || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Convert username to uppercase for uniformity
        const UserName = username.toUpperCase();

        // Check if user already exists
        const existingUser = await UserModel.findOne({ username: UserName });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Determine role based on username pattern
        let role = "user"; // Default role
        if (username.includes("BD")) {
            role = "student";
        } else if (username.includes("#123")) {
            role = "faculty";
        } else if (UserName.includes("ADMIN")) {
            return res.status(400).json({ message: "Admin sign-ups are not allowed" });
        }

        // Hash the password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Create and save the new user
        const newUser = new UserModel({
            username: UserName,
            password: hashedPassword,
            role,
            loginTimestamps: [] // Initialize with an empty array
        });

        await newUser.save();

        // Respond with success
        return res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        console.error("Error creating user:", error.message);
        return res.status(500).json({ message: "Server error. Please try again later." });
    }
}

// Function to log in an existing user
export const loginUser = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;

        // Validate input
        if (!username || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Convert username to uppercase for uniformity
        const UserName = username.toUpperCase();

        // Find the user in the database
        const user = await UserModel.findOne({ username: UserName });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        // Compare the provided password with the stored hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Update the login timestamps
        user.loginTimestamps.push(new Date());
        await user.save();

        // Respond with success
        return res.status(200).json({ message: "Login successful" });
    } catch (error) {
        console.error("Error logging in user:", error.message);
        return res.status(500).json({ message: "Server error. Please try again later." });
    }
};
