import ITeacher from "../Interface/ITeacher";
import { Teacher } from "../model/user";

// Repository method to insert a teacher into the database
const InsertTeacher = async (teacherData: ITeacher): Promise<ITeacher> => {
  try {
    const teacher = new Teacher(teacherData);
    const savedTeacher = await teacher.save();
    return savedTeacher;
  } catch (error) {
    throw new Error(`Failed to insert teacher: ${error.message}`);
  }
};

const checkTeacherExists = async (username: string): Promise<boolean> => {
  try {
    const teacher = await Teacher.findOne({ username });
    return !!teacher;
  } catch (error) {
    throw new Error(`Failed to check if teacher exists: ${error.message}`);
  }
};

export default { InsertTeacher, checkTeacherExists };
