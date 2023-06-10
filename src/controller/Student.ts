import IStudent from "../Interface/IStudent";
import { CustomError } from "../middleware/error";
import { InsertStudent } from "../repositories/Student";

export const registerStudent = async (student: IStudent) => {
  try {
    // Insert the student into the database
    const result = await InsertStudent(student);
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
