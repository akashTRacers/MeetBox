var mongoose = require('mongoose');
const chats= require('../models/chat');
const users = require('../models/user');
//let chat = db.collection('chats');

module.exports = function(client){
    console.log("################## Before user connection");
    client.on('connection',function(socket){
        console.log("user connected");


        //send status
        sendStatus=function(s){
            socket.emit('status', s);
        }

        //Display Chat
        chats.find({}, function(err, results){
            if(err)
            {
                console.log(err);
            }
           
            socket.emit('output', results);
        }).skip().limit(10).sort({_id:-1});

         // input message into DB 
         socket.on('input',function(data){
            let name=data.name;
            let message=data.message;
            console.log(name+"    "+message);
            //check for name and message
            if(name == '' ||message=='')
            {
                //send error status
                sendStatus("please enter name and message");

            }
            else {
                //Insert message
                let chat1 = new chats(data);
                chat1.save((err, result) => {
                if (err) {  throw err}
                client.emit('output', [data]);

                    // Send status object
                    sendStatus({
                        message: 'Message sent',
                        clear: true
                    });
                });
            }
        })
        socket.on('disconnect', function(){
            console.log('user disconnected');
          });

    })

   
}  

