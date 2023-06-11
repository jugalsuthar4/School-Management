import ITeacher from "../Interface/ITeacher";
import { CustomError } from "../middleware/error";
import teacherRepository from "../repositories/Teacher";

const registerTeacher = async (teacher: ITeacher) => {
  try {
    const checkTeacherExistOrNot = teacherRepository.checkTeacherExists(teacher.username);
    if (checkTeacherExistOrNot) {
      const err: CustomError = {
        customMessage: `teacher with username ${teacher.username} already exist`,
        statusCode: 400,
      };
      throw err;
    }
    const result = await teacherRepository.InsertTeacher(teacher);
    if (!result.Success) {
      const err: CustomError = {
        statusCode: 500,
        customMessage: "unable to save Teacher in DB",
      };
      throw err;
    }
    return {
      isError: false,
      data: "teacher details saved in DB successfully",
    };
  } catch (error) {
    return {
      isError: true,
      error,
    };
  }
};

export default { registerTeacher };
