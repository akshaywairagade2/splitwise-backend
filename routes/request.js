const express = require('express')
const { invite, display, acceptInvite, RejectInvite } = require('../controllers/requests')

const router = express.Router();

router.post('/invite', invite);
router.post('/display', display);
router.post('/acceptinvite', acceptInvite)
router.post('/rejectinvite', RejectInvite)


module.exports = router;