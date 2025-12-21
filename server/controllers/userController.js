import User from "../models/User.js";

export const getCompanyUsers = async (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  const companyName = req.session.user.companyName;
  const currentUserId = req.session.user.id;
  console.log("session from userController:", req.session.user);
  if (!companyName) {
    console.log("No companyName in session user");
    return res.json([]);
  }

  const users = await User.find({
    companyName,
    _id: { $ne: currentUserId }, 
  });
  console.log("getCompanyUsers:", users);
  res.json(users);
};
