import express from "express";
import { getAllRoles, updateRole } from "../controllers/executive-committee.js";

const router = express.Router();

router.get("/executive-committee", getAllRoles);
router.put("/executive-committee/:id", updateRole); // updates one role

const execRoutes = router
export default execRoutes;
