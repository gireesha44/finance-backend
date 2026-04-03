require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./src/models/User');
const FinancialRecord = require('./src/models/FinancialRecord');

const connectDB = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('✅ MongoDB connected!');
};

const seedData = async () => {
  await connectDB();

  // Clear existing data
  await User.deleteMany();
  await FinancialRecord.deleteMany();
  console.log('🗑️ Cleared existing data');

  // Create users
  const users = await User.create([
    { name: 'Admin User', email: 'admin@gmail.com', password: 'admin123', role: 'admin' },
    { name: 'Analyst User', email: 'analyst@gmail.com', password: 'analyst123', role: 'analyst' },
    { name: 'Viewer User', email: 'viewer@gmail.com', password: 'viewer123', role: 'viewer' }
  ]);
  console.log('✅ Users created');

  // Create records
  await FinancialRecord.create([
    { amount: 50000, type: 'income', category: 'salary', date: '2026-01-01', notes: 'January salary', createdBy: users[0]._id },
    { amount: 1500, type: 'expense', category: 'food', date: '2026-01-05', notes: 'Groceries', createdBy: users[0]._id },
    { amount: 10000, type: 'expense', category: 'rent', date: '2026-01-10', notes: 'Monthly rent', createdBy: users[0]._id },
    { amount: 25000, type: 'income', category: 'freelance', date: '2026-02-01', notes: 'Freelance project', createdBy: users[0]._id },
    { amount: 2000, type: 'expense', category: 'transport', date: '2026-02-05', notes: 'Monthly travel', createdBy: users[0]._id }
  ]);
  console.log('✅ Financial records created');

  console.log('🎉 Seed completed successfully!');
  process.exit();
};

seedData().catch(err => {
  console.error('❌ Seed failed:', err);
  process.exit(1);
});