import mongoose from "mongoose"

const LinkSchema = mongoose.Schema({
    title: { type: String, required: true },
    link: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    timestamp: { type: String, required: true },
    type: { type: String, enum: ['hyperlink', 'photo', 'pdf'], required: true },
    category: { type: String, enum: ['carousels-1', 'carousels-2', 'transaction-pdf'], required: true },
})


export default mongoose.models.Link || mongoose.model('Link', LinkSchema)