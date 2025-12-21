import ProjectMember from "../models/ProjectMember.js";

export const requireWorkspaceAccess = async (req, res, next) => {
  if (req.user.requestedRole === "LEAD_AUTOMATION_ENGINEER") {
    return next();
  }

  if (["ADMIN", "SUPER_ADMIN"].includes(req.user.companyRole)) {
    return res.status(403).json({ message: "Admins cannot access workspace" });
  }

  const member = await ProjectMember.findOne({
    project: req.params.projectId,
    user: req.user.id
  });

  if (!member) {
    return res.status(403).json({ message: "No workspace access" });
  }

  next();
};
