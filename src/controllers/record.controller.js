const { validationResult } = require('express-validator');
const recordService = require('../services/record.service');

const createRecord = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array().map(e => e.msg)
      });
    }

    const record = await recordService.createRecord(req.body, req.user._id);
    res.status(201).json({
      success: true,
      message: 'Record created successfully',
      data: record
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const getAllRecords = async (req, res) => {
  try {
    const filters = {
      type: req.query.type,
      category: req.query.category,
      from: req.query.from,
      to: req.query.to,
      page: req.query.page,
      limit: req.query.limit
    };

    const result = await recordService.getAllRecords(filters);
    res.status(200).json({
      success: true,
      data: result
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getRecordById = async (req, res) => {
  try {
    const record = await recordService.getRecordById(req.params.id);
    res.status(200).json({
      success: true,
      data: record
    });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
};

const updateRecord = async (req, res) => {
  try {
    const record = await recordService.updateRecord(req.params.id, req.body);
    res.status(200).json({
      success: true,
      message: 'Record updated successfully',
      data: record
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const deleteRecord = async (req, res) => {
  try {
    await recordService.deleteRecord(req.params.id);
    res.status(200).json({
      success: true,
      message: 'Record deleted successfully'
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

module.exports = { createRecord, getAllRecords, getRecordById, updateRecord, deleteRecord };