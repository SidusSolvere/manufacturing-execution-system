export const requireProjectCreator = (req, res, next) => {
  const allowed =
    ["SUPER_ADMIN", "ADMIN"].includes(req.user.companyRole) ||
    req.user.requestedRole === "LEAD_AUTOMATION_ENGINEER";

  if (!allowed) {
    return res.status(403).json({ message: "Cannot create project" });
  }

  next();
};
