const Placement = require("../models/Placement");
const Performance = require("../models/Performance");
const User = require("../models/User");

// ADMIN: Create Placement Drive
exports.createPlacement = async (req, res) => {
  try {
    const { companyName, eligibility, description, location, salary, date } = req.body;

    if (!companyName || !eligibility) {
      return res.status(400).json({ message: "Company name and eligibility are required" });
    }

    const placement = new Placement({
      companyName,
      eligibility,
      description,
      location,
      salary,
      date
    });

    await placement.save();
    res.status(201).json({
      message: "Placement drive created successfully",
      placement
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ADMIN / RECRUITER: View all placement drives
exports.getPlacements = async (req, res) => {
  try {
    const placements = await Placement.find()
      .populate("appliedStudents", "name email department cgpa")
      .populate("shortlistedStudents", "name email department cgpa")
      .sort({ date: -1 });

    res.json(placements);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single placement
exports.getPlacementById = async (req, res) => {
  try {
    const placement = await Placement.findById(req.params.id)
      .populate("appliedStudents", "name email department cgpa")
      .populate("shortlistedStudents", "name email department cgpa");

    if (!placement) {
      return res.status(404).json({ message: "Placement not found" });
    }

    res.json(placement);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// STUDENT: Apply for placement
exports.applyForPlacement = async (req, res) => {
  try {
    const placement = await Placement.findById(req.params.id);

    if (!placement) {
      return res.status(404).json({ message: "Placement not found" });
    }

    if (placement.appliedStudents.includes(req.user.id)) {
      return res.status(400).json({ message: "You have already applied for this placement" });
    }

    placement.appliedStudents.push(req.user.id);
    await placement.save();

    res.json({ message: "Applied for placement successfully", placement });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ADMIN: Shortlist student
exports.shortlistStudent = async (req, res) => {
  try {
    const { studentId } = req.body;
    const placement = await Placement.findById(req.params.id);

    if (!placement) {
      return res.status(404).json({ message: "Placement not found" });
    }

    if (!placement.shortlistedStudents.includes(studentId)) {
      placement.shortlistedStudents.push(studentId);
    }

    await placement.save();

    res.json({ message: "Student shortlisted successfully", placement });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// STUDENT: Get my applications
exports.getMyApplications = async (req, res) => {
  try {
    const placements = await Placement.find({ appliedStudents: req.user.id })
      .populate("appliedStudents", "name email")
      .populate("shortlistedStudents", "name email");

    res.json(placements);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ADMIN: Close placement
exports.closePlacement = async (req, res) => {
  try {
    const placement = await Placement.findByIdAndUpdate(
      req.params.id,
      { open: false, status: "Closed" },
      { new: true }
    );

    if (!placement) {
      return res.status(404).json({ message: "Placement not found" });
    }

    res.json({ message: "Placement closed", placement });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
