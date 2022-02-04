const { Router } = require('express');
const getContentLikes = require('../middleware/getContentLikes');
const validateUser= require('../middleware/validateUser');
const getContent = require('../middleware/getContent');
const validateContent = require('../middleware/validateContent');
const readCSV = require('../middleware/readCSV');

const router = Router();

router.get('/getContent', getContentLikes, getContent);
router.get('/validate', validateContent)
router.post('/ingest',validateUser, readCSV)


module.exports = router;