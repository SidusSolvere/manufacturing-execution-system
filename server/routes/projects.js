import express from "express";
import {
  getProjects,
  getProjectById,
  saveProject,
  createProject,
  listProjects,
  assignUserToProject,
  getProjectWorkspace,
  getProjectMembers,
} from "../controllers/projectController.js";
import { inviteCollaborator } from "../controllers/projectInviteController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { requireProjectCreator } from "../middlewares/requireProjectCreator.js";
import { requireWorkspaceAccess } from "../middlewares/requireWorkspaceAccess.js";
import { requireCompanyRole } from "../middlewares/requireCompanyRole.js";

const router = express.Router();
router.get("/:id", getProjectById);
router.post("/save", saveProject);
router.post("/:id/invite", inviteCollaborator);
router.post( "/", authMiddleware, requireProjectCreator, createProject );
router.get( "/", authMiddleware, listProjects );
router.get( "/:projectId/members", authMiddleware, requireCompanyRole(["ADMIN","SUPER_ADMIN"]), getProjectMembers);
router.post("/:projectId/assign", authMiddleware, requireCompanyRole(["ADMIN","SUPER_ADMIN"]), assignUserToProject);
router.get( "/:projectId/workspace", authMiddleware, requireWorkspaceAccess, getProjectWorkspace);
router.get
export default router;