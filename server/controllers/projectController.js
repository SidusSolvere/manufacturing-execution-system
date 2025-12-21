import Project from "../models/Project.js";
import ProjectMember from "../models/ProjectMember.js";

export const fetchProjects = async (req, res) => {
  try {
    const user = req.user; // injected by auth middleware

    let projects = [];

    // 🔐 ADMIN / SUPER ADMIN → all company projects
    if (
      user.companyRole === "ADMIN" ||
      user.companyRole === "SUPER_ADMIN"
    ) {
      projects = await Project.find({
        company: user.company
      }).sort({ updatedAt: -1 });

    } 
    // 👷 NORMAL USERS → only projects they are members of
    else {
      const memberships = await ProjectMember.find({
        user: user._id
      }).select("project");

      const projectIds = memberships.map(m => m.project);

      projects = await Project.find({
        _id: { $in: projectIds }
      }).sort({ updatedAt: -1 });
    }

    return res.status(200).json({
      success: true,
      count: projects.length,
      data: projects
    });

  } catch (error) {
    console.error("❌ Fetch projects failed:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch projects"
    });
  }
};

export const getProjects = async (req, res) => {
  if (!req.session.user)
    return res.status(401).json({ message: "Not authenticated" });

  const userId = req.session.user.id;

  const projects = await Project.find({
    $or: [{ owner: userId }, { collaborators: userId }],
  }).select("_id name createdAt");

  res.json(projects);
};


export const getProjectById = async (req, res) => {
  if (!req.session.user)
    return res.status(401).json({ message: "Not authenticated" });

  const userId = req.session.user.id;

  const project = await Project.findOne({
    _id: req.params.id,
  });

  if (!project) return res.status(404).json({ message: "Project not found" });

  res.json(project);
};

export const saveProject = async (req, res) => {
  if (!req.session.user)
    return res.status(401).json({ message: "Not authenticated" });

  const { projectId, name, nodes, edges } = req.body;
  const userId = req.session.user.id;
  const companyId = req.session.user.company; // 👈 MUST exist in session

  // 🔄 UPDATE EXISTING PROJECT
  if (projectId) {
    const project = await Project.findOneAndUpdate(
      {
        _id: projectId,
        company: companyId // ✅ IMPORTANT
      },
      {
        nodes,
        edges
      },
      { new: true }
    );

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    return res.json(project);
  }

  // 🆕 CREATE NEW PROJECT
  const project = await Project.create({
    name,
    nodes,
    edges,
    company: companyId,     // ✅ REQUIRED
    createdBy: userId       // ✅ REQUIRED
  });

  res.status(201).json(project);
};


export const createProject = async (req, res) => {
  const { name } = req.body;

  const project = await Project.create({
    name,
    company: req.user.company,
    createdBy: req.user.id,
    nodes: [],
    edges: []
  });

  res.status(201).json(project);
};

export const listProjects = async (req, res) => {
  let projects;

  if (
    ["ADMIN", "SUPER_ADMIN"].includes(req.user.companyRole) ||
    req.user.requestedRole === "LEAD_AUTOMATION_ENGINEER"
  ) {
    projects = await Project.find({ company: req.user.company });
  } else {
    const memberships = await ProjectMember.find({ user: req.user.id })
      .populate("project");

    projects = memberships.map(m => m.project);
  }

  res.json(projects);
};
export const assignUserToProject = async (req, res) => {
  const { userId, role } = req.body;

  await ProjectMember.create({
    project: req.params.projectId,
    user: userId,
    role,
    assignedBy: req.user.id
  });

  res.json({ message: "User assigned to project" });
};
export const getProjectWorkspace = async (req, res) => {
  res.json({ message: "Workspace access granted" });
};


export const getProjectMembers = async (req, res) => {
  console.log("Fetching members for project:", req.params.projectId);
  try {
    const { projectId } = req.params;

    if (!projectId) {
      return res.status(400).json({
        success: false,
        message: "Project ID is required"
      });
    }

    const members = await ProjectMember.find({ project: projectId })
      .populate({
        path: "user",          
      })
      .populate("assignedBy", "name email") 
      .populate("project", "name");         

    return res.status(200).json({
      success: true,
      count: members.length,
      data: members
    });

  } catch (error) {
    console.error("❌ Error fetching project members:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching project members"
    });
  }
};
