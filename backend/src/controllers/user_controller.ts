import { Response, Request, NextFunction } from "express";
import User from "../models/User.js";
import { hash, compare } from "bcrypt";
import { createToken } from "../utils/token-manager.js";
import { COOKIE_NAME } from "../utils/constants.js";
import { Route } from "tsoa";

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
};
// login user
export const userLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    const isValid = await compare(password, user.password);
    if (!isValid) {
      res.status(401).json({ message: "Invalid password" });
      return;
    }
    res.clearCookie(COOKIE_NAME, {
      httpOnly: true,
      path: "/",
      domain: "localhost",
      signed: true,
    });
    // send token to the client with a cookie
    // we are using a cookie to store the token because we are using httpOnly: true and this will prevent the client from accessing the token
    const token = createToken(user._id.toString(), user.email, "7d");
    const expires = new Date();
    expires.setDate(expires.getDate() + 7);
    res.cookie(COOKIE_NAME, token, {
      httpOnly: true,
      path: "/",
      domain: "localhost",
      expires,
      signed: true,
    });
    res
      .status(200)
      .json({ message: "OK", name: user.name, email: user.email, token });
    return;
  } catch (e) {
    res.status(500).json({ message: "Error", error: e.message });
    return;
  }
};
// creating a new user
export const userSignup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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

    res.clearCookie(COOKIE_NAME, {
      httpOnly: true,
      path: "/",
      domain: "localhost",
      signed: true,
    });
    // send token to the client with a cookie
    // we are using a cookie to store the token because we are using httpOnly: true and this will prevent the client from accessing the token
    const token = createToken(user._id.toString(), user.email, "7d");
    const expires = new Date();
    expires.setDate(expires.getDate() + 7);
    res.cookie(COOKIE_NAME, token, {
      httpOnly: true,
      path: "/",
      domain: "localhost",
      expires,
      signed: true,
    });

    res.status(201).json({ message: "User created", id: user._id.toString() });
    return;
  } catch (e) {
    res.status(500).json({ message: "Error", error: e.message });
    return;
  }
};

export const verifyUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findById(res.locals.jwtData.id);

    if (!user) {
      res
        .status(401)
        .json({ message: "User not registred or token malfunctioned" });
      if (user._id.toString() !== res.locals.jwtData.id) {
        return res.status(401).json({ message: "Permissions didn't match" });
      }
    }
    res.status(200).json({ message: "OK", name: user.name, email: user.email });
    return;
  } catch (e) {
    res.status(500).json({ message: "Error", error: e.message });
    return;
  }
};
