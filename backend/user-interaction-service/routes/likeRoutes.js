const { Router } = require('express');
const validateUser = require('../middleware/validateUser');
const updateLikes = require('../middleware/updateLikes');

const router = Router();

router.put('/update', validateUser, updateLikes);

module.exports = router;