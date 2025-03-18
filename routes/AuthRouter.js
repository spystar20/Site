const { loginValidation, signupValidation } = require('../middleware/AuthValidation')
const { signup, Login }=require('../controllers/AuthController')

const router=require('express').Router()
router.post('/login',loginValidation, Login)
router.post('/signup',signupValidation,signup)
module.exports = router