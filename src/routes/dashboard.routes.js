const express = require('express');
const router = express.Router();
const { getSummary, getByCategory, getTrends, getRecentActivity } = require('../controllers/dashboard.controller');
const { protect } = require('../middleware/auth.middleware');
const { authorize } = require('../middleware/role.middleware');

// Dashboard — analyst and admin only
router.use(protect, authorize('analyst', 'admin'));

router.get('/summary', getSummary);
router.get('/by-category', getByCategory);
router.get('/trends', getTrends);
router.get('/recent', getRecentActivity);

module.exports = router;