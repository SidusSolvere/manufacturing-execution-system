import Project from "../models/Project.js";
import mongoose from "mongoose";

import User from "../models/User.js";

export const inviteCollaborator = async (req, res) => {
  if (!req.session.user)
    return res.status(401).json({ message: "Not authenticated" });

  const ownerId = req.session.user.id;
  const { userId } = req.body;

  const project = await Project.findOne({
    _id: req.params.id,
    owner: ownerId,
  });

  if (!project)
    return res.status(403).json({ message: "Not project owner" });

  const user = await User.findById(userId);
  if (!user) return res.status(404).json({ message: "User not found" });

  if (user.companyName !== req.session.user.companyName)
    return res.status(403).json({ message: "Different company" });

  if (project.collaborators.includes(userId))
    return res.status(400).json({ message: "Already invited" });

  project.collaborators.push(userId);
  await project.save();

  res.json({ message: "User invited" });
};
