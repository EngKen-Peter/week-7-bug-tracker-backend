const express = require("express");
const Bug = require("../models/Bug"); // Bug model
const router = express.Router();

// @desc    Get all bugs
// @route   GET /api/bugs
router.get("/", async (req, res) => {
  try {
    const bugs = await Bug.find();
    res.json(bugs);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// @desc    Create a new bug
// @route   POST /api/bugs
router.post("/", async (req, res) => {
  try {
    const bug = new Bug(req.body);
    await bug.save();
    res.status(201).json(bug);
  } catch (err) {
    res.status(400).json({ error: "Invalid bug data" });
  }
});

// @desc    Get a single bug by ID
// @route   GET /api/bugs/:id
router.get("/:id", async (req, res) => {
  try {
    const bug = await Bug.findById(req.params.id);
    if (!bug) return res.status(404).json({ error: "Bug not found" });
    res.json(bug);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// @desc    Update a bug
// @route   PUT /api/bugs/:id
router.put("/:id", async (req, res) => {
  try {
    const updatedBug = await Bug.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedBug) return res.status(404).json({ error: "Bug not found" });
    res.json(updatedBug);
  } catch (err) {
    res.status(400).json({ error: "Invalid update data" });
  }
});

// @desc    Delete a bug
// @route   DELETE /api/bugs/:id
router.delete("/:id", async (req, res) => {
  try {
    const deletedBug = await Bug.findByIdAndDelete(req.params.id);
    if (!deletedBug) return res.status(404).json({ error: "Bug not found" });
    res.json({ message: "Bug deleted" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
