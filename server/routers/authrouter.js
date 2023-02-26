const router=require('express').Router();
const authcontroller=require('../controlers/authcontroller')

router.post('/signup',authcontroller.signupcontroller)
router.post('/login',authcontroller.logincontroller)
router.get('/refresh',authcontroller.refreshaccesstokencontroller)


module.exports=router       