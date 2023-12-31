const adminRouter = require("express").Router();
const adminController = require("../controllers/adminController")

require('dotenv').config()
console.log('hello admin');

adminRouter.post('/login',adminController.loginAdmin)
adminRouter.post('/logout',adminController.logout)
adminRouter.get('/active',adminController.isActive)
adminRouter.get('/adminHome',adminController.loadHome)
adminRouter.get('/usersList',adminController.loadUsersList)
adminRouter.delete('/deleteUser/:id',adminController.deleteUser)
adminRouter.get('/userDetails/:id',adminController.userDetails)
adminRouter.put('/editUser',adminController.editUser)
adminRouter.post("/createUser", adminController.createUser);

module.exports = adminRouter