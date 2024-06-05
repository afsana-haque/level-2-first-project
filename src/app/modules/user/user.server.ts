import config from '../../config';
import { Student } from '../student/student.interface';
import { StudentModel } from '../student/student.model';
import { AcademicSemester } from './../academicSemester/academicSemester.model';
import { TUser } from './user.interface';
import { User } from './user.model';
import { generateStudentId } from './user.utils';



const createStudentIntoDB = async (password: string, payload: Student) => {
 
    // create a user object
    const userData: Partial<TUser> = {};

    //if password is not given , use default password
    userData.password = password || (config.default_password as string);
  
    //set student role
    userData.role = 'student';

  
    // find academic semester info
    const admissionSemester = await AcademicSemester.findById(
      payload.admissionSemester,
    );
  
    if(admissionSemester) {
      userData.id = await generateStudentId(admissionSemester);
    }
    else{
      throw new Error("Admission Semester is error")
    }
    //set  generated id
    
  
    // create a user
    const newUser = await User.create(userData);
  
    //create a student
    if (Object.keys(newUser).length) {
      // set id , _id as user
      payload.id = newUser.id;
      payload.user = newUser._id; //reference _id
  
      const newStudent = await StudentModel.create(payload);
      return newStudent;
    }
};

export const UserServices = {
  createStudentIntoDB,
};



