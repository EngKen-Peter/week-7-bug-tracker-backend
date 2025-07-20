import express from "express";
const router = express.Router();

// Sample test route
router.get("/", (req, res) => {
  res.json({ message: "Bug routes are working!" });
});

export default router;
