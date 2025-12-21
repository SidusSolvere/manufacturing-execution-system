import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },

  password: { type: String, required: true },

  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
    required: true
  },
  companyName: {
    type: String,
    required: true
  },
  
  
  companyRole: {
    type: String,
    enum: ["SUPER_ADMIN", "ADMIN", "USER"],
    default: "USER"
  },

  requestedRole: {
    type: String,
    enum: [
      "LEAD_AUTOMATION_ENGINEER",
      "AUTOMATION_ENGINEER",
      "MACHINE_OPERATOR",
      "SUPERVISOR",
      "TEAM_LEAD"
    ],
    required: true
  },

  isApproved: { type: Boolean, default: false },

  approvedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }

}, { timestamps: true });

export default mongoose.model("User", UserSchema);
