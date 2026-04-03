const jwt = require('jsonwebtoken');
const User = require('../models/User');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE
  });
};

const register = async ({ name, email, password, role }) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error('Email already registered');
  }

  const user = await User.create({ name, email, password, role });

  const token = generateToken(user._id);

  return {
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status
    }
  };
};

const login = async ({ email, password }) => {
  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    throw new Error('Invalid email or password');
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    throw new Error('Invalid email or password');
  }

  if (user.status === 'inactive') {
    throw new Error('Your account has been deactivated');
  }

  const token = generateToken(user._id);

  return {
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status
    }
  };
};

module.exports = { register, login };