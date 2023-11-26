const express = require('express')

const router = express.Router();

router.post('/friends', signup);
router.post('/accept', login);
router.post('/invite',);


module.exports = router;