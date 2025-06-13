import express from "express"
import GetLinks from "../controllers/all-links.js"
import CreateLink from "../controllers/create-link.js"
import UpdateLink from "../controllers/update-link.js"
import DeleteLink from "../controllers/delete-link.js"
import GetLink from "../controllers/get-link.js"
import DeleteGallery from "../controllers/delete-gallery.js"
import upload from "../middlewares/upload.js"
import CreateGalleryImage from "../controllers/create-gallery-image.js"
import CreatePDF from "../controllers/create-pdf.js"

const router = express.Router()

router.post("/create-link", CreateLink)

router.post("/gallery", upload.single("image"), CreateGalleryImage)

router.get("/link/:id", GetLink)

router.get("/links", GetLinks)

router.put("/link/:id", UpdateLink)

router.delete("/link/:id", DeleteLink)

router.delete("/gallery/:id", DeleteGallery)

router.post("/create-pdf", upload.single("photo"), CreatePDF)

const LinkRoutes = router
export default LinkRoutes