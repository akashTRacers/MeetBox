const mongoose=require("mongoose");
var dbManager = () => {
  console.log("inside dbmanger");
  mongoose.connect('mongodb://localhost:27017/mongochat');
  let db=mongoose.connection;

  //check connection
  db.once('open',function(){
    console.log("connected to mongoDB");    
  })

  //check for DB errors
  db.on('error',function(err){
    console.log("Error found");
  });

};
module.exports = dbManager;







