import express, { Request, Response, Router } from "express";
import { validateStudentData } from "../middleware/ValidateStudent";
const router = express.Router();

router.post("/", validateStudentData, (req: Request, res: Response) => {});

export default router;
