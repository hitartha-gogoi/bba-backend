import express from "express"
import upload from "../middlewares/upload.js"
import CreateUser from "../controllers/create-user.js"
import getUsers from "../controllers/get-users.js"
import authenticate from "../middlewares/authenticate.js"

const router = express.Router()

router.post("/create-user", upload.single("photo"), CreateUser)

router.get("/lawyers", getUsers)

const UserRoutes = router
export default UserRoutes