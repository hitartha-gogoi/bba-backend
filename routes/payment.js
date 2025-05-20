import express from "express"
import upload from "../middlewares/upload.js"
import PayFee from "../controllers/pay-fee.js"
import GetEnrolmentId from "../controllers/get-enrolment.js"
import RazorPayWebhook from "../controllers/webhook.js";

const router = express.Router()

router.get("/enrolment", GetEnrolmentId)

router.post("/create-payment-link", PayFee)

router.post("/webhook", express.raw({ type: 'application/json' }), RazorPayWebhook)

const PaymentRoutes = router
export default PaymentRoutes