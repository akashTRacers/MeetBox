const path= require('path');

 const dbManager=require('./dbManager');
const cookieParser=require('cookie-parser');
const bodyParser=require('body-parser');
const expressValidator= require('express-validator');
var exphbs = require('express-handlebars');
const flash= require('connect-flash');
const session= require('express-session');
const passport= require('passport');
const initRoutes= require('../app/routes/');  

// Init App
const express = require('express');
const app = express();
var server = require('http').Server(app);

var io = require('socket.io')(server);

// Socket
// const http = require('http').Server(app);
// const client= require('socket.io')(http);

// View Engine
app.use(express.static(`${__dirname}/../public`));
app.set('views', path.join(__dirname, '../views'));
app.engine('handlebars', exphbs({defaultLayout:'layout'}));
app.set('view engine', 'handlebars');
app.use(expressValidator());

//Body Parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cookieParser());

//Express Session 
app.use(session({
  secret: 'secret',
  saveUninitialized: true,
  resave: true
}));

//Passport init
app.use(session({secret: 'mySecretKey'}));
app.use(passport.initialize());
app.use(passport.session());

// Connect Flash
app.use(flash());

//Global Vars
app.use(function(req,res,next){
res.locals.success_msg=req.flash('success-msg');
res.locals.error_msg= req.flash('error_msg');
res.locals.error= req.flash('error');
next();
});

//Set Port
const port = process.env.PORT || 9000;

// start server
server.listen(port, () => {
  console.log(`listening to port ${port}`);
});

//initialize passport
var initPassport=require('./passport/init');
initPassport(passport);
initRoutes(app,passport);
dbManager();

require('../app/sockets/chatting')(io);

const openRecordsController=require('../app/controllers/openRecord');
openRecordsController.appFetcher(app);