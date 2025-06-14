import express from "express"
import upload from "../middlewares/upload.js"
import CreateLawyer from "../controllers/create-lawyer.js"
import GetLawyers from "../controllers/get-lawyers.js"
import UpdateLawyer from "../controllers/update-lawyer.js"
import DeleteLawyer from "../controllers/delete-lawyer.js"
import SearchUsername from "../controllers/search-username.js"
import authenticate from "../middlewares/authenticate.js"
import ContactForm from "../controllers/contact-form.js"
import GetPhoneNumber from "../controllers/get-phone-number.js"
import UpdateLawyerPhoto from "../controllers/update-lawyer-photo.js"
import GetLawyerList from "../controllers/lawyer-list.js"

const router = express.Router()

router.post("/create-user", upload.single("photo"), CreateLawyer)

router.get("/lawyers", GetLawyers)

router.put("/lawyer/:id", UpdateLawyer)

router.delete("/lawyer/:id", DeleteLawyer)

router.get("/search", SearchUsername)

router.post("/contact", ContactForm)

router.get("/phone-number", GetPhoneNumber)

router.get("/lawyer-list", GetLawyerList)

router.put("/update-lawyer-photo/:id", upload.single("photo"), UpdateLawyerPhoto)

const LawyerRoutes = router
export default LawyerRoutes