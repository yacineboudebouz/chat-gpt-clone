import { Router } from "express";
import {
  getAllUsers,
  userLogin,
  userSignup,
} from "../controllers/user_controller.js";
import {
  signinValidator,
  signupValidator,
  validate,
} from "../utils/validators.js";

const userRoutes = Router();

// routes

userRoutes.get("/", getAllUsers);
userRoutes.post("/signup", validate(signupValidator), userSignup);
userRoutes.post("/login", validate(signinValidator), userLogin);

export default userRoutes;
