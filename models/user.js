import mongoose from "mongoose"
const { ObjectId } = mongoose.Schema.Types

const UserSchema = mongoose.Schema({
	username: { type: String, required: true, unique: true },
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	photo: { type: String, required: true },
	phone:  { type: Number, required: true },
	status: { type: Boolean, required: true },
    description: { type: String, required: true },
	otp: { type: Number, unique: true },
    officeAddress: { type: String },
    residentalAddress: { type: String },
    enrolmentNumber: { type: String },
    associationNumber: { type: String },
	timestamp: { type: String, required: true },
})


export default mongoose.models.User || mongoose.model('User', UserSchema)