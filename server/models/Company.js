import mongoose from "mongoose";

const CompanySchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: true,
    unique: true
  },

  companyEmail: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },

  idType: {
    type: String,
    default: ""
  },

  companyId: {
    type: String,
    default: ""
  },

  superAdmin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("Company", CompanySchema);
