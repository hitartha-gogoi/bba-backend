import express from "express"
import upload from "../middlewares/upload.js"
import CreateUser from "../controllers/create-user.js"
import getUsers from "../controllers/get-users.js"
import updateUser from "../controllers/update-user.js"
import deleteUser from "../controllers/delete-user.js"
import SearchUsername from "../controllers/search-username.js"
import authenticate from "../middlewares/authenticate.js"

const router = express.Router()

router.post("/create-user", upload.single("photo"), CreateUser)

router.get("/lawyers", getUsers)

router.put("/lawyer/:id", updateUser)

router.delete("/lawyer/:id", deleteUser)

router.get("/search", SearchUsername)

const UserRoutes = router
export default UserRoutes