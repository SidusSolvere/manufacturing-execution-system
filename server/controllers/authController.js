import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import Company from '../models/Company.js';

const SALT_ROUNDS = parseInt(process.env.BCRYPT_SALT_ROUNDS || '10', 10);
const JWT_SECRET = process.env.JWT_SECRET || 'dev_jwt_secret';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';
const SUPER_ADMIN_EMAIL = process.env.SUPER_ADMIN_EMAIL || 'adminS@mail.com';


const genPasskey = () => {
  return Math.random().toString(36).slice(2, 10) + Math.random().toString(36).slice(2,6);
};

export const registerUser = async (req, res) => {
  try {
    const { name, email, password, requestedRole, companyName } = req.body;

    if (!name || !email || !password || !companyName || !requestedRole) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    
    const company = await Company.findOne({ companyName });
    if (!company) {
      return res.status(404).json({ message: "Company not registered" });
    }

    
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    const hashed = await bcrypt.hash(password, 10);

    await User.create({
      name,
      email: email.toLowerCase(),
      password: hashed,
      company: company._id,
      companyName, 
      companyRole: "USER",
      requestedRole,
      isApproved: false
    });

    res.status(201).json({
      message: "Registered successfully. Awaiting admin approval."
    });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const registerCompany = async (req, res) => {
  const {
    companyName,
    companyEmail,
    idType,
    companyId,
    password
  } = req.body;
  console.log("registerCompany payload:", req.body);
  if (!companyName || !companyEmail || !password) {
    return res.status(400).json({ message: "Missing required fields" });
  }
  const existingCompany = await Company.findOne({ companyName });
  if (existingCompany) {
    return res.status(409).json({ message: "Company already exists" });
  }

  const hashed = await bcrypt.hash(password, 10);

  const company = await Company.create({
    companyName,
    companyEmail,
    idType,
    companyId,
    superAdmin: null
  });

  const superAdmin = await User.create({
    name: `${companyName} Super Admin`,
    email: `${companyName}.admin@mail.com`.toLowerCase(),
    password: hashed,
    company: company._id,
    companyName: companyName, 
    companyRole: "SUPER_ADMIN",
    requestedRole: "LEAD_AUTOMATION_ENGINEER",
    isApproved: true
  });

  company.superAdmin = superAdmin._id;
  await company.save();

  res.status(201).json({
    message: "Company registered and SuperAdmin created successfully"
  });
};




export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email: email.toLowerCase() });
  if (!user) return res.status(401).json({ message: "Invalid credentials" });

  if (!user.isApproved)
    return res.status(403).json({ message: "Awaiting approval" });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(401).json({ message: "Invalid credentials" });

  req.session.user = {
    id: user._id,
    company: user.company,
    companyName: user.companyName,
    companyRole: user.companyRole,
    requestedRole: user.requestedRole,
    isApproved: user.isApproved,
  };
  console.log("session after login:", req.session.user);
  console.log("User logged in:", user);
  res.json({ message: "Logged in" });
};


export const getSession = (req, res) => {
  if (req.session.user) return res.json(req.session.user);
  res.status(401).json({ message: "No active session" });
};

export const logout = (req, res) => {
  req.session.destroy(() => {
    res.clearCookie('connect.sid');
    res.json({ message: "Logged out" });
  });
};
export const getPendingUsers = async (req, res) => {
  const users = await User.find({
    company: req.user.company,
    isApproved: false
  }).select("-password");

  res.json(users);
};
export const approveUser = async (req, res) => {
  const user = await User.findById(req.params.userId);

  user.isApproved = true;
  user.approvedBy = req.user.id;
  await user.save();

  res.json({ message: "User approved" });
};
export const createAdmin = async (req, res) => {
  const { name, email, password } = req.body;

  const hashed = await bcrypt.hash(password, 10);

  const admin = await User.create({
    name,
    email: email.toLowerCase(),
    password: hashed,
    company: req.user.company,
    companyRole: "ADMIN",
    requestedRole: "TEAM_LEAD",
    isApproved: true,
    approvedBy: req.user.id
  });

  res.status(201).json({ message: "Admin created", adminId: admin._id });
};
