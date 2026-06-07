import express from "express";
import authMiddleware from "../middleware/authMiddleware";
import authorizedRoles from "../middleware/adminMiddleware";
import { getAdminStats, getAllInterviews, getAllUsers } from "../controllers/adminController";

const router = express.Router();

router.get("/stats", authMiddleware, authorizedRoles("admin"), getAdminStats)
router.get("/users", authMiddleware, authorizedRoles("admin"), getAllUsers)
router.get("/interviews", authMiddleware, authorizedRoles("admin"), getAllInterviews)

export default router;