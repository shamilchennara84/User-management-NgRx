const adminRouter = require("express").Router();
const adminController = require("../controllers/adminController")

require('dotenv').config()


adminRouter.post('/login',adminController.loginAdmin)
adminRouter.post('/logout',adminController.logout)
adminRouter.get('/adminHome',adminController.loadHome)
adminRouter.get('/usersList',adminController.loadUsersList)
adminRouter.delete('/deleteUser/:id',adminController.deleteUser)
adminRouter.get('/userDetails/:id',adminController.userDetails)
adminRouter.patch('/editUser',adminController.editUser)
adminRouter.post("/createUser", adminController.createUser);