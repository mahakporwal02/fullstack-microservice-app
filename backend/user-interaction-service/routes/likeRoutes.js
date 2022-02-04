const { Router } = require('express');
const validateUser = require('../middleware/validateUser');
const updateLikes = require('../middleware/updateLikes');
const validateContent = require('../middleware/validateContent');
const getContentLikes = require('../middleware/getContentLikes');

const router = Router();

router.put('/update', validateUser, validateContent, updateLikes);
router.get('/getContentLikes', getContentLikes)

module.exports = router;