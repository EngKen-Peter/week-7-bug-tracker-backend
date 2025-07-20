// server/src/routes/bugRoutes.js
import express from 'express';
import {
  getBugs,
  getBugById,
  createBug,
  updateBug,
  deleteBug,
} from '../controllers/bugController.js';

const router = express.Router();

router.get('/', getBugs);
router.get('/:id', getBugById);
router.post('/', createBug);
router.put('/:id', updateBug);
router.delete('/:id', deleteBug);

export default router;
