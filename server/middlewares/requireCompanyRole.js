export const requireCompanyRole = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.companyRole)) {
      console.log(`Authorization failed: User role ${req.user.companyRole} not in ${roles}`);
      return res.status(403).json({ message: "Forbidden" });
    }
    next();
  };
};
