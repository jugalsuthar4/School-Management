import express, { NextFunction, Request, Response, Router } from "express";
import { validateStudentData } from "../middleware/ValidateStudent";
import studentController from "../controller/Student";
const router = express.Router();

router.post("/", validateStudentData, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await studentController.registerStudent(req.body);
    if (result.error) {
      throw result.error;
    }
    return res.status(201).json({ message: result.data! });
  } catch (error) {
    next(error);
  }
});

export default router;
