import ITeacher from "../Interface/ITeacher";
import { Teacher } from "../model/user";

// Repository method to insert a teacher into the database
const InsertTeacher = async (teacherData: ITeacher): Promise<{ Success: boolean }> => {
  try {
    const teacher = new Teacher(teacherData);
    await teacher.save();
    return {
      Success: true,
    };
  } catch (error) {
    return {
      Success: false,
    };
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
