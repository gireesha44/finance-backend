const userService = require('../services/user.service');

const getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json({
      success: true,
      data: users
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.id);
    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
};

const updateUserRole = async (req, res) => {
  try {
    const { role } = req.body;
    if (!['viewer', 'analyst', 'admin'].includes(role)) {
      return res.status(400).json({
        success: false,
        message: 'Role must be viewer, analyst or admin'
      });
    }

    const user = await userService.updateUserRole(req.params.id, role);
    res.status(200).json({
      success: true,
      message: 'User role updated successfully',
      data: user
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const updateUserStatus = async (req, res) => {
  try {
    const { status } = req.body;
    if (!['active', 'inactive'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Status must be active or inactive'
      });
    }

    const user = await userService.updateUserStatus(req.params.id, status);
    res.status(200).json({
      success: true,
      message: 'User status updated successfully',
      data: user
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

module.exports = { getAllUsers, getUserById, updateUserRole, updateUserStatus };