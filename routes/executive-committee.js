import express from "express";
import { getAllRoles, updateName, updatePhoto } from "../controllers/executive-committee.js";
import upload from "../middlewares/upload.js"

const router = express.Router();

router.get("/executive-committee", getAllRoles);
router.put("/executive-committee/name/:id",  updateName); // updates one role
router.put("/executive-committee/photo/:id", upload.single("image"), updatePhoto); // updates one role

const execRoutes = router
export default execRoutes;
