const express = require("express");
const { body, validationResult } = require("express-validator");
const Lead    = require("../models/Lead");
const { protect } = require("../middleware/auth");

const router = express.Router();
router.use(protect);

// GET /api/leads  — list with search + filters + pagination
router.get("/", async (req, res) => {
  try {
    const { status, source, search, page = 1, limit = 10 } = req.query;
    const query = {};
    if (status) query.status = status;
    if (source) query.source = source;
    if (search) {
      query.$or = [
        { name:  { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { phone: { $regex: search, $options: "i" } },
      ];
    }
    const total = await Lead.countDocuments(query);
    const leads = await Lead.find(query)
      .populate("assignedTo", "name email")
      .populate("createdBy",  "name email")
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.json({ leads, total, page: Number(page), pages: Math.ceil(total / limit) });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/leads/stats  — dashboard numbers
router.get("/stats", async (req, res) => {
  try {
    const total    = await Lead.countDocuments();
    const byStatus = await Lead.aggregate([{ $group: { _id: "$status", count: { $sum: 1 } } }]);
    const bySource = await Lead.aggregate([{ $group: { _id: "$source", count: { $sum: 1 } } }]);
    const recent   = await Lead.find().sort({ createdAt: -1 }).limit(5).populate("assignedTo", "name");
    res.json({ total, byStatus, bySource, recent });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/leads/:id
router.get("/:id", async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id)
      .populate("assignedTo", "name email")
      .populate("createdBy",  "name email");
    if (!lead) return res.status(404).json({ message: "Lead not found" });
    res.json(lead);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/leads
router.post(
  "/",
  [
    body("name").notEmpty().withMessage("Name required"),
    body("email").isEmail().withMessage("Valid email required"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    try {
      const lead = await Lead.create({ ...req.body, createdBy: req.user._id });
      res.status(201).json(lead);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
);

// PUT /api/leads/:id
router.put("/:id", async (req, res) => {
  try {
    const lead = await Lead.findByIdAndUpdate(req.params.id, req.body, {
      new: true, runValidators: true,
    }).populate("assignedTo", "name email");
    if (!lead) return res.status(404).json({ message: "Lead not found" });
    res.json(lead);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE /api/leads/:id
router.delete("/:id", async (req, res) => {
  try {
    const lead = await Lead.findByIdAndDelete(req.params.id);
    if (!lead) return res.status(404).json({ message: "Lead not found" });
    res.json({ message: "Lead deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
