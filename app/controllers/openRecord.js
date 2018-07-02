var Room = require('../models/room');
var app;
class openRecordController{
 static appFetcher(app){
    this.app=app;
}


    static getChat(req,res)
    {
        
        var user2=req.params.username;
        console.log(user2);
        var user1=req.user.username;
        console.log(user1);
        var roomExists=0;
        Room.find({},function(err,docs)
	  {
	    if(err)
          return next(err);
          console.log("check room");
          if(err)
	      return next(err);
	    for(var i=0;i<docs.length;i++)
	    {
	      if((docs[i].user1==user1 || docs[i].user1==user2 )&& (docs[i].user2==user1 || docs[i].user2==user2))
	      {
	        roomExists=1;
            console.log("RoomExists="+roomExists);
           // res.send("Room already exists");
	      }
	    }
	    if(!roomExists)
	    {
	      var room=new Room({user1:user1,user2:user2},{user2:user2});
	      room.save(room,function(err,docs)
	      {
	        if (err)
	        {
	          throw (err);
            }
            console.log(docs);
            
           // res.send("Room created");
          });
          console.log("RoomdoNotExists="+roomExists);
	    }    
    })
        res.render('chat',{user:req.user,user2:user2})
}
}
module.exports=openRecordController;