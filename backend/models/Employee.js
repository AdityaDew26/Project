import mongoose from 'mongoose';

const employeeSchema = new mongoose.Schema({
    image: { type: String, default: 'default-avatar.jpg' }, // Default image for employees
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    mobileNo: { type: String, required: true },
    designation: { type: String, required: true },
    gender: { type: String, required: true },
    course: { type: String, required: true },
    createDate: { type: Date, default: Date.now },
});

const Employee = mongoose.model('Employee', employeeSchema);

export default Employee;