import mongoose from "mongoose";
import e, { Request, Response } from "express";
import UserModel from "../Models/UserModel.js";
import bcrypt from "bcrypt";


export async function signUpUser(req: Request, res: Response) {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const UserName = username.toUpperCase();

        // Checking here,  if user already exists ani
        const existingUser = await UserModel.findOne({ username: UserName });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // segregating based on keywordsin username
        let role = "student"; 
        if (username.includes("BD")) {
            role = "student";
        } else if (username.includes("#123")) {
            role = "faculty";
        } else if (UserName.includes("ADMIN")) {
            return res.status(400).json({ message: "Admin sign-ups are not allowed" });
        }

        
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newUser = new UserModel({
            username: UserName,
            password: hashedPassword,
            role,
            loginTimestamps: [] //  empty array firstly
        });

        await newUser.save();

        return res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        console.error("Error creating user:", error.message);
        return res.status(500).json({ message: "Server error. Please try again later." });
    }
}


export const loginUser = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;


        if (!username || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const UserName = username.toUpperCase();

        const user = await UserModel.findOne({ username: UserName });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }


        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }


        // Updating timestamps while logins, can remove for now le
        // user.loginTimestamps.push(new Date());
        // await user.save();

        // Respond with success
        return res.status(200).json({ message: "Login successful" });
    } catch (error) {
        console.error("Error logging in user:", error.message);
        return res.status(500).json({ message: "Server error. Please try again later." });
    }
};
