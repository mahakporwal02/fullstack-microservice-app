const { Router } = require('express');
const validateUser = require('../middleware/validateUser');
const updateLikes = require('../middleware/updateLikes');
const validateTitle = require('../middleware/validateTitle');
const getLikes = require('../middleware/getLikes');

const router = Router();

router.put('/update', validateUser, validateTitle, updateLikes);
router.get('/read', getLikes);

module.exports = router;