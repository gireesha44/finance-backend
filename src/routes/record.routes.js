const express = require('express');
const router = express.Router();
const { createRecord, getAllRecords, getRecordById, updateRecord, deleteRecord } = require('../controllers/record.controller');
const { protect } = require('../middleware/auth.middleware');
const { authorize } = require('../middleware/role.middleware');
const { recordValidator } = require('../validators/record.validator');

// View records — all roles
router.get('/', protect, getAllRecords);
router.get('/:id', protect, getRecordById);

// Modify records — admin only
router.post('/', protect, authorize('admin'), recordValidator, createRecord);
router.patch('/:id', protect, authorize('admin'), updateRecord);
router.delete('/:id', protect, authorize('admin'), deleteRecord);

module.exports = router;