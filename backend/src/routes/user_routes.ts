import { Router } from "express";
import {
  getAllUsers,
  userLogin,
  userSignup,
  verifyUser,
} from "../controllers/user_controller.js";
import {
  signinValidator,
  signupValidator,
  validate,
} from "../utils/validators.js";
import { verifyToken } from "../utils/token-manager.js";

const userRoutes = Router();

// routes

userRoutes.get("/", getAllUsers);
userRoutes.post("/signup", validate(signupValidator), userSignup);
userRoutes.post("/login", validate(signinValidator), userLogin);
userRoutes.get("/auth-status", verifyToken, verifyUser);

export default userRoutes;
