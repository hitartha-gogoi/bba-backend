import express from "express"
import upload from "../middlewares/upload.js"
import GetEvents from "../controllers/all-events.js"
import GetEvent from "../controllers/get-event.js"
import CreateEvent from "../controllers/create-event.js"
import UpdateEvent from "../controllers/update-event.js"
import DeleteEvent from "../controllers/delete-event.js"
import SearchEvent from "../controllers/search-events.js"
import authenticate from "../middlewares/authenticate.js"

const router = express.Router()

router.post("/create-event", upload.single("photo"), CreateEvent)

router.get("/event/:id", GetEvent)

router.get("/events", GetEvents)

router.put("/event/:id", UpdateEvent)

router.delete("/event/:id", DeleteEvent)

router.get("/search-event", SearchEvent)

const EventRoutes = router
export default EventRoutes