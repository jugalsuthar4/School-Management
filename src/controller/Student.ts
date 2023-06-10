import IStudent from "../Interface/IStudent";
import { CustomError } from "../middleware/error";
import studentRepository from "../repositories/Student";

const registerStudent = async (student: IStudent) => {
  try {
    // Insert the student into the database

    const checkStudentExistOrNot = await studentRepository.checkStudentExists(student.username);

    if (checkStudentExistOrNot) {
      const err: CustomError = {
        customMessage: `student with username ${student.username} already exist`,
        statusCode: 400,
      };
      throw err;
    }

    const result = await studentRepository.InsertStudent(student);
    if (!result.Success) {
      const err: CustomError = {
        statusCode: 500,
        customMessage: "unable to save student in DB",
      };
      throw err;
    }
    return {
      isError: false,
      data: "student saved in DB successfully",
    };
  } catch (error) {
    return {
      isError: true,
      error,
    };
  }
};

export default { registerStudent };
