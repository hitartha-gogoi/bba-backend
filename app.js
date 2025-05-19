import express from "express"
import morgan from "morgan"
import cors from "cors"
import 'dotenv/config'
import fetch from "node-fetch"
import LawyerRoutes from "./routes/lawyers.js"
import connectDB from "./config/connect-db.js"
import EventRoutes from "./routes/events.js"
import LinkRoutes from "./routes/links.js"
import UserRoutes from "./routes/users.js"
import PaymentRoutes from "./routes/payment.js"

const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors())
app.use(morgan('dev'))
app.use(LawyerRoutes)
app.use(EventRoutes)
app.use(UserRoutes)
app.use(LinkRoutes)
app.use(PaymentRoutes)
app.use(express.static('./uploads'))
 
connectDB()

app.get("/", async(req, res)=>{
   try {
      res.status(200).send("<h1> Hello World!</h1>")
   } catch(error){
      res.status(500).json({
         message: error
      })
   }
})

export default app