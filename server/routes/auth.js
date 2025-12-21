

import express from 'express';
import { registerUser, registerCompany, login, getSession, logout, getPendingUsers, approveUser, createAdmin } from '../controllers/authController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { requireCompanyRole } from '../middlewares/requireCompanyRole.js';

const router = express.Router();

router.get('/session', getSession);
router.post('/logout', logout);
router.post("/register-company", registerCompany);
router.post("/login", login);
router.post("/register", registerUser);
router.get("/pending-users", authMiddleware, requireCompanyRole(["ADMIN","SUPER_ADMIN"]), getPendingUsers );
router.post( "/approve-user/:userId", authMiddleware, requireCompanyRole(["ADMIN","SUPER_ADMIN"]), approveUser );
router.post( "/create-admin", authMiddleware, requireCompanyRole(["SUPER_ADMIN"]), createAdmin);
router.post("/logout", authMiddleware, logout);

export default router;