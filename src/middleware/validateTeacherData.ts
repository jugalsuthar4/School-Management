import { Request, Response, NextFunction } from "express";
export const validateTeacherData = (req: Request, res: Response, next: NextFunction) => {
  const { username, first_name, last_name, email, phone_number, subject } = req.body;

  if (!username || !first_name || !last_name || !email || !phone_number || !subject) {
    return res.status(400).json({ message: "All parameters are required" });
  }

  next();
};
