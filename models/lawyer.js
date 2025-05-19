import mongoose from "mongoose"

const LawyerSchema = mongoose.Schema({
	username: { type: String, required: true, unique: true },
	email: { type: String, required: true, unique: true },
	photo: { type: String, required: true },
	phone:  { type: Number, required: true },
	status: { type: Boolean, required: true },
    description: { type: String, required: true },
	otp: { type: Number, unique: true },
	fatherName: { type: String, required: true },
    address: { type: String, required: true },
    enrolmentNumber: { type: String, required: true, unique: true },
	timestamp: { type: String, required: true },
	membership: { type: String, required: true },
})


export default mongoose.models.Lawyer || mongoose.model('Lawyer', LawyerSchema)