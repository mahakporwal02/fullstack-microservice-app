const { Router } = require('express');
const getContent = require('../middleware/getContent');
const validateContent = require('../middleware/validateContent');

const router = Router();

router.get('/getContent', getContent);
router.get('/validate', validateContent)

module.exports = router;