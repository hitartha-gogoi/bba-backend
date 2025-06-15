import express from "express"
import morgan from "morgan"
import cors from "cors"
import 'dotenv/config'
import path from "path"
import RazorPayWebhook from "./controllers/webhook.js"
import fetch from "node-fetch"
import Lawyer from "./models/lawyer.js";
import Transaction from "./models/transaction.js";
import LawyerRoutes from "./routes/lawyers.js"
import connectDB from "./config/connect-db.js"
import EventRoutes from "./routes/events.js"
import LinkRoutes from "./routes/links.js"
import UserRoutes from "./routes/users.js"
import PaymentRoutes from "./routes/payment.js"
import execRoutes from "./routes/executive-committee.js"
import HOME_PAGE_TEMPLATE from "./templates/home.js";

const app = express()

app.post("/webhook", express.raw({ type: 'application/json' }), RazorPayWebhook)

app.use('/assets', express.static(path.join(process.cwd(), 'assets')));

// Serve 'gallery-images'
app.use('/gallery-images', express.static(path.join(process.cwd(), 'gallery-images')));

// Serve 'lawyer-images'
app.use('/lawyer-images', express.static(path.join(process.cwd(), 'lawyer-images')));

// Serve 'receipts'
app.use('/receipts', express.static(path.join(process.cwd(), 'receipts')));

// Serve 'vakalatnamas'
app.use('/vakalatnamas', express.static(path.join(process.cwd(), 'vakalatnamas')));


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors())
app.use(morgan('dev'))


// ENDPOINTS
app.use(LawyerRoutes)
app.use(EventRoutes)
app.use(UserRoutes)
app.use(LinkRoutes)
app.use(PaymentRoutes)
app.use(execRoutes)
app.use(express.static('./uploads'))
 
// CONNECT DATABASE
connectDB()

app.get("/", async(req, res)=>{
   try {

      const [lawyers, transactions ] = await Promise.all([ Lawyer.countDocuments(), Transaction.countDocuments() ]);

      const html = HOME_PAGE_TEMPLATE({ stats: { lawyers, transactions, uptime: "99.99%" }});

      return res.status(200).send(html);
      
   } catch(error){
      res.status(500).json({
         message: error
      })
   }
})

export default app