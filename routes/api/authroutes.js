const express =  require('express');
const router = express.Router();
const authController = require('../../controllers/auth.controller');
const auth = require('../../middlewares/auth')

router.post('/login', authController.signin)
router.post('/signup', authController.signup)
router.get('/current', auth, authController.current)
router.post('/logout', auth, authController.logout)

module.exports = router;