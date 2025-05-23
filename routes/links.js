import express from "express"
import GetLinks from "../controllers/all-links.js"
import CreateLink from "../controllers/create-link.js"
import UpdateLink from "../controllers/update-link.js"
import DeleteLink from "../controllers/delete-link.js"
import GetLink from "../controllers/get-link.js"
import DeleteGallery from "../controllers/delete-gallery.js"

const router = express.Router()

router.post("/create-link", CreateLink)

router.get("/link/:id", GetLink)

router.get("/links", GetLinks)

router.put("/link/:id", UpdateLink)

router.delete("/link/:id", DeleteLink)

router.delete("/gallery/:id", DeleteGallery)

const LinkRoutes = router
export default LinkRoutes