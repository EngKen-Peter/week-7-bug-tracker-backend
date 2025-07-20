import { Bug } from '../models/Bug.js';

// @desc Get all bugs
export const getBugs = async (req, res) => {
  const bugs = await Bug.find();
  res.json(bugs);
};

// @desc Get single bug
export const getBugById = async (req, res) => {
  const bug = await Bug.findById(req.params.id);
  if (bug) {
    res.json(bug);
  } else {
    res.status(404).json({ message: 'Bug not found' });
  }
};

// @desc Create new bug
export const createBug = async (req, res) => {
  const { title, description, status, priority } = req.body;
  const bug = new Bug({ title, description, status, priority });
  const createdBug = await bug.save();
  res.status(201).json(createdBug);
};

// @desc Update bug
export const updateBug = async (req, res) => {
  const bug = await Bug.findById(req.params.id);

  if (bug) {
    bug.title = req.body.title || bug.title;
    bug.description = req.body.description || bug.description;
    bug.status = req.body.status || bug.status;
    bug.priority = req.body.priority || bug.priority;

    const updatedBug = await bug.save();
    res.json(updatedBug);
  } else {
    res.status(404).json({ message: 'Bug not found' });
  }
};

// @desc Delete bug
export const deleteBug = async (req, res) => {
  const bug = await Bug.findById(req.params.id);
  if (bug) {
    await bug.remove();
    res.json({ message: 'Bug removed' });
  } else {
    res.status(404).json({ message: 'Bug not found' });
  }
};
