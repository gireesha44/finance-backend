const User = require('../models/User');

const getAllUsers = async () => {
  return await User.find().select('-password');
};

const getUserById = async (id) => {
  const user = await User.findById(id).select('-password');
  if (!user) throw new Error('User not found');
  return user;
};

const updateUserRole = async (id, role) => {
  const user = await User.findByIdAndUpdate(
    id,
    { role },
    { new: true }
  ).select('-password');
  if (!user) throw new Error('User not found');
  return user;
};

const updateUserStatus = async (id, status) => {
  const user = await User.findByIdAndUpdate(
    id,
    { status },
    { new: true }
  ).select('-password');
  if (!user) throw new Error('User not found');
  return user;
};

module.exports = { getAllUsers, getUserById, updateUserRole, updateUserStatus };