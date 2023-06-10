import IStudent from "../Interface/IStudent";
import { Student } from "../model/user";

// Repository method to insert a student into the database
const InsertStudent = async (studentData: IStudent): Promise<{ Success: boolean }> => {
  try {
    const student = new Student(studentData);
    await student.save();
    return {
      Success: true,
    };
  } catch (error) {
    return {
      Success: false,
    };
  }
};

// Repository method to check if a student with a given username exists
const checkStudentExists = async (username: string): Promise<boolean> => {
  try {
    const student = await Student.findOne({ username });
    return !!student;
  } catch (error) {
    throw new Error(`Failed to check if student exists: ${error.message}`);
  }
};

export { InsertStudent, checkStudentExists };
