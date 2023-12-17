
const userRoute = require('express').Router()
const upload = require('../config/multer')
const userController = require('../controllers/userController')

userRoute.get('/',userController.loadUserHome)
userRoute.post('/register',userController.registerUser)
userRoute.post('/login',userController.loginUser)
userRoute.post('/logout',userController.logout)
userRoute.post('/profile-image',upload.single('image'),userController.profileImage)
userRoute.get('/profile',userController.profile)


module.exports = userRoute;