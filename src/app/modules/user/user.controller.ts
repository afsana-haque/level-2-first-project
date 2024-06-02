import httpStatus from 'http-status';
import { UserServices } from './user.server';
import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';



const createStudent = catchAsync( async (req, res, next) => {

    const { password, student: studentData } = req.body;

    // const zodParsedData = studentValidationSchema.parse(studentData);

    const result = await UserServices.createStudentIntoDB(
      password,
      studentData,
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Student is created successfully',
      data: result,
    });

}
)

export const UserControllers = {
  createStudent,
};