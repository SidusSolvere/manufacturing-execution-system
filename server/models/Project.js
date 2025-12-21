import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema({
  name: { type: String, required: true },

  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
    required: true
  },

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  nodes: { type: Array, default: [] },
  edges: { type: Array, default: [] }

}, { timestamps: true });

export default mongoose.model("Project", ProjectSchema);
