import { Router } from "express";
import { getAllUsers } from "../controllers/user_controller.js";

const userRoutes = Router();

// routes 

userRoutes.get("/", getAllUsers)

export default userRoutes;