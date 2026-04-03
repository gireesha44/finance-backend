const dashboardService = require('../services/dashboard.service');

const getSummary = async (req, res) => {
  try {
    const summary = await dashboardService.getSummary();
    res.status(200).json({ success: true, data: summary });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getByCategory = async (req, res) => {
  try {
    const data = await dashboardService.getByCategory();
    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getTrends = async (req, res) => {
  try {
    const data = await dashboardService.getTrends();
    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getRecentActivity = async (req, res) => {
  try {
    const data = await dashboardService.getRecentActivity();
    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getSummary, getByCategory, getTrends, getRecentActivity };