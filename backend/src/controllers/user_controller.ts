import { Response, Request, NextFunction } from "express";
import User from "../models/User.js"
import { hash, compare } from "bcrypt";

// get all the ueres
export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.find();
        res.status(200).json({ message: "Ok", data: users });
        return;
    } catch (e) {
        res.status(500).json({ message: "Error", error: e.message });
        return;
    }
}
// login user
export const userLogin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email })
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        const isValid = await compare(password, user.password);
        if (!isValid) {
            res.status(403).json({ message: "Invalid password" });
            return;
        }

        res.status(200).json({ message: "OK", id: user._id.toString() });
        return;

    } catch (e) {
        res.status(500).json({ message: "Error", error: e.message });
        return;
    }
}
// creating a new user 
export const userSignup = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            res.status(400).json({ message: "User exists" });
            return;
        }
        const hashedPassword = await hash(password, 10);
        const user = new User({ name, email, password: hashedPassword });
        await user.save();
        res.status(201).json({ message: "User created", id: user._id.toString() });
        return;
    } catch (e) {
        res.status(500).json({ message: "Error", error: e.message });
        return;
    }

}


