export const authMiddleware = (req, res, next) => {
  if (!req.session || !req.session.user) {
    console.log("Authentication failed: No session or user");
    return res.status(401).json({ message: "Not authenticated" });
  }
  req.user = req.session.user;
  console.log(`Authenticated user: ${req.user.id}`);
  next();
};
