
import { StudentModel } from './student.model';

// const createStudentIntoDB = async (student: Student) => {
//   const result = await StudentModel.create(student);
//   return result;
// };

const getAllStudentsFromDB = async () => {
  const result = await StudentModel.find();
  return result;
};

const getSingleStudentFromDB = async (id: string) => {
  const result = await StudentModel.findOne({ id });
  return result;
};

const deleteStudentFromDB = async (_id: string) => {
  const result = await StudentModel.findByIdAndDelete({ _id });
return result;
};


export const StudentServices = {
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  deleteStudentFromDB,
};
