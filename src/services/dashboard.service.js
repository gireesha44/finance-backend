const FinancialRecord = require('../models/FinancialRecord');

const getSummary = async () => {
  const result = await FinancialRecord.aggregate([
    { $match: { isDeleted: false } },
    {
      $group: {
        _id: '$type',
        total: { $sum: '$amount' }
      }
    }
  ]);

  let totalIncome = 0;
  let totalExpense = 0;

  result.forEach(item => {
    if (item._id === 'income') totalIncome = item.total;
    if (item._id === 'expense') totalExpense = item.total;
  });

  return {
    totalIncome,
    totalExpense,
    netBalance: totalIncome - totalExpense
  };
};

const getByCategory = async () => {
  return await FinancialRecord.aggregate([
    { $match: { isDeleted: false } },
    {
      $group: {
        _id: { category: '$category', type: '$type' },
        total: { $sum: '$amount' }
      }
    },
    { $sort: { total: -1 } }
  ]);
};

const getTrends = async () => {
  return await FinancialRecord.aggregate([
    { $match: { isDeleted: false } },
    {
      $group: {
        _id: {
          year: { $year: '$date' },
          month: { $month: '$date' },
          type: '$type'
        },
        total: { $sum: '$amount' }
      }
    },
    { $sort: { '_id.year': -1, '_id.month': -1 } }
  ]);
};

const getRecentActivity = async () => {
  return await FinancialRecord.find({ isDeleted: false })
    .populate('createdBy', 'name email')
    .sort({ createdAt: -1 })
    .limit(10);
};

module.exports = { getSummary, getByCategory, getTrends, getRecentActivity };