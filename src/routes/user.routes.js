const express = require('express');
const router = express.Router();
const { getAllUsers, getUserById, updateUserRole, updateUserStatus } = require('../controllers/user.controller');
const { protect } = require('../middleware/auth.middleware');
const { authorize } = require('../middleware/role.middleware');

// All user routes — admin only
router.use(protect, authorize('admin'));

router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.patch('/:id/role', updateUserRole);
router.patch('/:id/status', updateUserStatus);

module.exports = router;