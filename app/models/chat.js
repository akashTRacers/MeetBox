let mongoose= require('mongoose');
console.log("chat schema file");
let chatSchema= mongoose.Schema({
    
    name:{
        type:String,
        required:true
    },
    message:{
        type:String,
        required:true
    }
});
module.exports = mongoose.model('chats',chatSchema);