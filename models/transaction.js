import mongoose from "mongoose"
const { ObjectId } = mongoose.Schema.Types

const TransactionSchema = mongoose.Schema({
    lawyer: { type: ObjectId, ref: 'User', required: true },
    email: { type: String, required: true },
    paymentId: { type: String },
    fee:  { type: Number, required: true },
    status: { type: Boolean, required: true },
    pdf: { type: String },
    transactionId: { type: String },
    type: { type: String, required: true, enum: ['vakalatnama', 'membership'] },
    enrolmentNumber: { type: String, required: true },
    timestamp: { type: String, required: true }
})


export default mongoose.models.Transaction || mongoose.model('Transaction', TransactionSchema)