const express = require("express");
const validationMiddleWare = require("../validations/validation");
const UserController = require("../controllers/users");
const initUsers=(passport)=>{
  const userRouter=express.Router();
  //console.log("passport*********************1"+passport);
  userRouter.get('/register',UserController.showRegisterDetails);
  userRouter.get('/login',UserController.showLoginDetails);
  userRouter.get('/logout',UserController.logOutUser);
  userRouter.post('/register',validationMiddleWare.validateDetails,UserController.insertRegisterDetails);
  userRouter.post('/login',passport.authenticate('login', {failureRedirect: '/users/login', failureFlash: true }),UserController.insertLoginDetails);
   return userRouter;
  }
 module.exports= initUsers; 