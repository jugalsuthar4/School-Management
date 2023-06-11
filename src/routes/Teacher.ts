import express, { NextFunction, Request, Response, Router } from "express";
import { validateTeacherData } from "../middleware/validateTeacherData";
import teacherController from "../controller/Teacher";
import logger from "../utils/Logger";
const router = express.Router();

router.post("/", validateTeacherData, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await teacherController.registerTeacher(req.body);
    if (result.isError) {
      throw result.error;
    }
    return res.status(201).json({ message: result?.data! });
  } catch (error) {
    logger.error(`[@route/api/teacher/] => ${JSON.stringify(error)} `);

    next(error);
  }
});

export default router;
