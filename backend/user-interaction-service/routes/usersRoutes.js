const { Router } = require('express');
const registerUser = require('../middleware/registerUser');
const userAuth = require('../middleware/userAuth');
const validateUser = require('../middleware/validateUser');
const validateCredentials = require('../middleware/validateCredentials');

const router = Router();

router.post('/register', validateCredentials, registerUser);
router.post('/login', validateCredentials, userAuth);
router.get('/validate', validateUser, async(req,res)=>{
    res.status(200).json({user_id: req.user_id});
})

module.exports = router;