const express = require("express");
const { body, validationResult } = require("express-validator");
const Note    = require("../models/Note");
const { protect } = require("../middleware/auth");

const router = express.Router();
router.use(protect);

// GET /api/notes/:leadId
router.get("/:leadId", async (req, res) => {
  try {
    const notes = await Note.find({ lead: req.params.leadId })
      .populate("author", "name email")
      .sort({ createdAt: -1 });
    res.json(notes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/notes
router.post(
  "/",
  [
    body("content").notEmpty().withMessage("Content required"),
    body("lead").notEmpty().withMessage("Lead ID required"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    try {
      const note = await Note.create({ ...req.body, author: req.user._id });
      await note.populate("author", "name email");
      res.status(201).json(note);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
);

// DELETE /api/notes/:id
router.delete("/:id", async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ message: "Note not found" });
    if (note.author.toString() !== req.user._id.toString())
      return res.status(403).json({ message: "Not authorised" });
    await note.deleteOne();
    res.json({ message: "Note deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
