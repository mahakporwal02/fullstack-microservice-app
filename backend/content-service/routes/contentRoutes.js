const { Router } = require('express');
const validateUser= require('../middleware/validateUser');
const getContent = require('../middleware/getContent');
const readCSV = require('../middleware/readCSV');
const ingestContent = require('../middleware/ingestContent');

const router = Router();

router.get('/getContent', validateUser, getContent);
router.post('/ingest',validateUser, readCSV, ingestContent, getContent)


module.exports = router;