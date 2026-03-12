const mongoose = require("mongoose");

const placementSchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: true
  },
  eligibility: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: "No additional information provided."
  },
  location: {
    type: String,
    default: "Remote"
  },
  salary: {
    type: String,
    default: "Competitive"
  },
  date: {
    type: Date,
    default: Date.now
  },
  appliedStudents: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }],
  shortlistedStudents: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }],
  open: {
    type: Boolean,
    default: true
  },
  status: {
    type: String,
    enum: ["Open", "Closed", "Hiring"],
    default: "Open"
  }
}, { timestamps: true });

module.exports = mongoose.model("Placement", placementSchema);
