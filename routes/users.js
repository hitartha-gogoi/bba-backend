import express from "express"
import upload from "../middlewares/upload.js"
import CreateUser from "../controllers/create-user.js"

const router = express.Router()

router.post("/create-user", upload.single("photo"), CreateUser)

const UserRoutes = router
export default UserRoutes