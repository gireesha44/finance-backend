const FinancialRecord = require('../models/FinancialRecord');

const createRecord = async (data, userId) => {
  return await FinancialRecord.create({ ...data, createdBy: userId });
};

const getAllRecords = async ({ type, category, from, to, page = 1, limit = 10 }) => {
  const query = { isDeleted: false };

  if (type) query.type = type;
  if (category) query.category = category;
  if (from || to) {
    query.date = {};
    if (from) query.date.$gte = new Date(from);
    if (to) query.date.$lte = new Date(to);
  }

  const skip = (page - 1) * limit;
  const total = await FinancialRecord.countDocuments(query);
  const records = await FinancialRecord.find(query)
    .populate('createdBy', 'name email')
    .sort({ date: -1 })
    .skip(skip)
    .limit(Number(limit));

  return {
    total,
    page: Number(page),
    totalPages: Math.ceil(total / limit),
    records
  };
};

const getRecordById = async (id) => {
  const record = await FinancialRecord.findById(id).populate('createdBy', 'name email');
  if (!record || record.isDeleted) throw new Error('Record not found');
  return record;
};

const updateRecord = async (id, data) => {
  const record = await FinancialRecord.findByIdAndUpdate(
    { _id: id, isDeleted: false },
    data,
    { new: true, runValidators: true }
  );
  if (!record) throw new Error('Record not found');
  return record;
};

const deleteRecord = async (id) => {
  const record = await FinancialRecord.findByIdAndUpdate(
    { _id: id, isDeleted: false },
    { isDeleted: true },
    { new: true }
  );
  if (!record) throw new Error('Record not found');
  return record;
};

module.exports = { createRecord, getAllRecords, getRecordById, updateRecord, deleteRecord };