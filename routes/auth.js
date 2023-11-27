const express = require('express')
const { signup, login, GetallUser } = require('../controllers/auth')

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/getalluser', GetallUser)


module.exports = router;