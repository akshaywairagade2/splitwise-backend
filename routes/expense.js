const express = require('express')
const { getExpenses, addExpense, settleUp } = require('../controllers/expenses')

const router = express.Router();

router.post('/addexpense', addExpense);
router.post('/getexpenses', getExpenses);
router.post('/settleup', settleUp);

module.exports = router;