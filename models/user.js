import mongoose from "mongoose"

const UserSchema = mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, unique: true },
    type: { type: String, enum: ['owner', 'developer', 'user'], required: true  },
    otp: { type: Number, unique: true },
    timestamp: { type: String, required: true },
})


export default mongoose.models.User || mongoose.model('User', UserSchema)