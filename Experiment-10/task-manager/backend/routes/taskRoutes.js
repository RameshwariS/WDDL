const express = require('express');
const {
  getTasks,
  getTask,
  addTask,
  updateTask,
  deleteTask,
} = require('../controllers/taskController');

const router = express.Router();

const { protect } = require('../middleware/auth');

router.route('/').get(protect, getTasks).post(protect, addTask);
router
  .route('/:id')
  .get(protect, getTask)
  .put(protect, updateTask)
  .delete(protect, deleteTask);

module.exports = router;