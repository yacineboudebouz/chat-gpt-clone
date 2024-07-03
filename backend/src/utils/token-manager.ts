import { Response, Request, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { COOKIE_NAME } from "./constants.js";

export const createToken = (id: string, email: string, expiresIn: string) => {
  const payload = { id, email };
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: expiresIn,
  });
  return token;
};

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.signedCookies[`${COOKIE_NAME}`];
    if (!token || token.trim() === "") {
      return res.status(401).json({ message: "Unauthorized" });
    }
    return new Promise<void>((resolve, reject) => {
      return jwt.verify(token, process.env.JWT_SECRET, (err, success) => {
        if (err) {
          reject(err.message);
          return res.status(401).json({ message: "Unauthorized" });
        } else {
          resolve();
          res.locals.jwtData = success;
          return next();
        }
      });
    });
  } catch (e) {
    return null;
  }
};
