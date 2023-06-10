import { Request, Response, NextFunction } from "express";
import logger from "../utils/Logger";

export const validateStudentData = (req: Request, res: Response, next: NextFunction) => {
  const {
    username,
    first_name,
    last_name,
    date_of_birth,
    address,
    email,
    phone_number,
    guardian_name,
    guardian_phone,
  } = req.body;
  logger.info("@middleware/validateStudentData\n");
  if (
    !username ||
    !first_name ||
    !last_name ||
    !date_of_birth ||
    !address ||
    !email ||
    !phone_number ||
    !guardian_name ||
    !guardian_phone
  ) {
    return res.status(400).json({ message: "All parameters are required" });
  }

  next();
};
