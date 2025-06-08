import express from "express"
import upload from "../middlewares/upload.js"
import authenticate from "../middlewares/authenticate.js"
import Signup from "../controllers/signup.js"
import Login from "../controllers/login.js"
import SearchAdmin from "../controllers/search-admin.js"
import GetAdmins from "../controllers/all-admins.js"
import DeleteAdmin from "../controllers/delete-admin.js"
import HandleAction from "../controllers/handle-action.js"

const router = express.Router()

router.post("/signup", upload.single("photo"), Signup)

router.post("/login", Login)

router.get("/search-admin", SearchAdmin)

router.get("/admins", GetAdmins)

router.delete("/admin/:id", authenticate, DeleteAdmin)

router.post("/handle-action", HandleAction)

const UserRoutes = router
export default UserRoutes