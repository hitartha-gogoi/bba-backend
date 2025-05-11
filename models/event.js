import mongoose from "mongoose"

const EventSchema = mongoose.Schema({
    title: { type: String, required: true },
    photo: { type: String, required: true },
    location:  { type: String, required: true },
    status: { type: Boolean, required: true },
    description: { type: String, required: true },
    timestamp: { type: String, required: true },
    startDate: { type: String, required: true },
    endDate: { type: String, required: true },
})


export default mongoose.models.Event || mongoose.model('Event', EventSchema)