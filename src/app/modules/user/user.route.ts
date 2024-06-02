import express, { NextFunction, Request, Response } from 'express';
import { UserControllers } from './user.controller';
import validateRequest from '../../middlewares/validateRequest';
import { studentValidationSchema } from '../student/student.validation';



const router = express.Router();


// router.post('/create-student',ShenaBahini, UserControllers.createStudent);

router.post(
    '/create-student',
    validateRequest(studentValidationSchema),
    UserControllers.createStudent,
  );
  

export const UserRoutes = router;