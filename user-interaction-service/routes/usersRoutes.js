const { Router } = require('express');
const registerUser = require('../middleware/registerUser');
const userAuth = require('../middleware/userAuth');

const router = Router();

router.post('/register', registerUser);
router.post('/login', userAuth);

module.exports = router;