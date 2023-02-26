const router=require('express').Router();
const postcontroller=require('../controlers/postcontroller')
const requireuser=require('../middlewares/requireuser')

router.get('/all',requireuser,postcontroller.gteallpostcontroller)

module.exports=router 