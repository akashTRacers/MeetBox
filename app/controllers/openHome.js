var express = require('express');
//var client= require('../../lib/app');
var app=express();
const http = require('http').Server(app);
const client= require('socket.io')(http);
var router = express.Router();
const path="../views/index"
class openHomeController{
    static getHome(req,res)
    {
        console.log("inside openHome Controller");
        res.render('index');
        
       
    }
}

module.exports=openHomeController;