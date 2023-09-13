const express =  require('express');
const router = express.Router();
const authController = require('../../controllers/auth.controller');
const emailController = require('../../controllers/email.controler')
const auth = require('../../middlewares/auth')
const upload = require('../../middlewares/upload')

router.post('/login', authController.signin)
router.post('/signup', authController.signup)
router.get('/current', auth, authController.current)
router.post('/logout', auth, authController.logout)
router.patch('/avatars/test', auth, authController.avatar)
router.patch('/avatars', auth, upload('file'), authController.avatar)

router.post('/send', emailController.send)
router.get('/verify/:verificationToken', authController.verify)
router.post('/verify', authController.sendAgain)

module.exports = router;