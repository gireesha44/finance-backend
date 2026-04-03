const { body } = require('express-validator');

const recordValidator = [
  body('amount')
    .notEmpty().withMessage('Amount is required')
    .isNumeric().withMessage('Amount must be a number')
    .custom(val => val > 0).withMessage('Amount must be greater than 0'),

  body('type')
    .notEmpty().withMessage('Type is required')
    .isIn(['income', 'expense']).withMessage('Type must be income or expense'),

  body('category')
    .trim()
    .notEmpty().withMessage('Category is required'),

  body('date')
    .notEmpty().withMessage('Date is required')
    .isISO8601().withMessage('Date must be a valid date format')
];

module.exports = { recordValidator };