import { Router } from "express";
import { getAllUsers, userSignup } from "../controllers/user_controller.js";

const userRoutes = Router();

// routes 

userRoutes.get("/", getAllUsers)
userRoutes.post("/signup", userSignup)

export default userRoutes;