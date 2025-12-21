import express from "express";
import { getCompanyUsers } from "../controllers/userController.js";

const router = express.Router();

router.get("/company", getCompanyUsers);

export default router;
