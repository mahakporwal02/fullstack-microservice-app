const { Router } = require('express');
const validateUser= require('../middleware/validateUser');
const getContent = require('../middleware/getContent');
const readCSV = require('../middleware/readCSV');
const ingestContent = require('../middleware/ingestContent');
const validateTitle = require('../middleware/validateTitle');
const getLikes = require('../middleware/getLikes');

const router = Router();

router.get('/getContent', validateUser, getLikes, getContent);
router.post('/ingest',validateUser, readCSV, ingestContent, getLikes, getContent);
router.get('/validateTitle/:title', validateTitle);


module.exports = router;