const { Router } = require('express');
const validateUser = require('../middleware/validateUser');
const updateLikes = require('../middleware/updateLikes');
const validateContent = require('../middleware/validateContent');

const router = Router();

router.put('/update', validateUser, validateContent, updateLikes);

module.exports = router;