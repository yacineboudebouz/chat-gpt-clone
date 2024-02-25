import { Response, Request, NextFunction } from "express";
import User from "../models/User.js"
import { hash } from "bcrypt";

// get all the ueres
export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.find();
        res.status(200).json({ message: "Ok", data: users });
    } catch (e) {
        res.status(500).json({ message: "Error", error: e.message });
    }
}


// creating a new user 
export const userSignup = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, email, password } = req.body;
        const hashedPassword = await hash(password, 10);
        const user = new User({ name, email, password: hashedPassword });
        await user.save();
        res.status(201).json({ message: "User created", id: user._id.toString() });
    } catch (e) {
        res.status(500).json({ message: "Error", error: e.message });
    }

}


