import { Schema, model, connect } from 'mongoose';
import validator from 'validator';
import { Guardian, LocalGuardian, Student, UserName, } from './student.interface';


const userNameSchema = new Schema<UserName>({
  firstName: { 
    type: String, 
    required: [true, "firstName is required"] ,
    // trim: true,
    maxlength: [20, " First name can not more than 20 characters"],
    validate : {
      validator: function(value : string){
        const firstNameStr = value.charAt(0).toLocaleUpperCase() + value.slice(1);
        return firstNameStr === value;
      },
      message: '{VALUE} is not in capitalize format'
    }
  },
  middleName: { 
    type: String 
  },
  lastName: { 
    type: String, 
    required: [true, "lastName is required"],
    validate: {
      validator: (value : string) => validator.isAlpha(value),
      message: '{VALUE} is not valid'
    }
   },
});

const guardianSchema = new Schema<Guardian>({
  fatherName: { 
    type: String, 
    required: [true, "fatherName is required"]
  },
  fatherOccupation: { 
    type: String,
     required: [true, "fatherOccupation is required"] 
    },
  fatherContactNo: {
     type: String, 
     required: [true, "fatherContactNo is required"]
    },
  motherName: { 
    type: String, 
    required: [true, " motherName is required"]
  },
  motherOccupation: { 
    type: String, 
    required: [true, "motherOccupation is required"]
  },
  motherContactNo: { 
    type: String, 
    required: [true, "motherContactNo is required"]
  },
});

const localGuardianSchema = new Schema<LocalGuardian>({
  name: { 
    type: String, 
    required: [true, " name is required"]
  },
  occupation: { 
    type: String, 
    required: [true, "occupation is required"]
  },
  contactNo: {
    type: String, 
    required: [true, "contactNo is required"]
  },
  address: { 
    type: String, 
    required: [true, " address is required"]
  },
});

const studentSchema = new Schema<Student>({
  id: { 
    type: String,
    required: true,
    unique: true

  },
  user: {
    type: Schema.Types.ObjectId,
    required: [true, 'User id is required'],
    unique: true,
    ref: 'User',
  },
  name: {
    type: userNameSchema,
    required: [true, " name is required"],
  },
  gender: {
    type: String,
    enum: {
      values: ['male', 'female', "others"],
      message: '{VALUE} is not valid'
    },
    required: true, 
  },
  dateOfBirth: { type: String },
  email: { 
    type: String, 
    required: [true, " dateOfBirth is required"],
    unique: true,
    validate: {
      validator:(value : string) => validator.isEmail(value),
      message: '{VALUE} is not valid email type'
    }
  },
  contactNo: { 
    type: String, 
    required: [true, " contactNo is required"]
  },
  emergencyContactNo: { 
    type: String, 
    required: [true, " emergencyContactNo is required"]
  },
  bloodGroup: {
    type : String,
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']
  },
  presentAddress: { 
    type: String, 
    required: [true, " presentAddress is required"]
  },
  permanentAddress: { 
    type: String, 
    required: [true, " permanentAddress is required"]
  },
  guardian: {
    type: guardianSchema,
    required: [true, " guardian is required"]
  },
  localGuardian: {
    type: localGuardianSchema,
    required: [true, " localGuardian is required"]
  },
  profileImg: { type: String },
  admissionSemester: {
    type: Schema.Types.ObjectId,
    ref: 'AcademicSemester',
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
},
{
  toJSON: {
    virtuals: true,
  },
}
);

studentSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

//creating a custom static method
studentSchema.statics.isUserExists = async function (id: string) {
  const existingUser = await StudentModel.findOne({ id });
  return existingUser;
};



export const StudentModel = model<Student>('Student', studentSchema);
