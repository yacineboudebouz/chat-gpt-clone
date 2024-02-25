import { Response, Request } from "express";
import User from "../models/User.js"

export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.find();
        res.status(200).json({ message: "Ok", data: users });
    } catch (e) {
        res.status(500).json({ message: "Error", error: e.message });
    }
}