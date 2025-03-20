const { loginValidation, signupValidation } = require('../middlewares/AuthValidation.js')
const { signup, Login }=require('../controllers/AuthController.js')

const router=require('express').Router()
router.post('/login',loginValidation, Login)
router.post('/signup',signupValidation,signup)
module.exports = router