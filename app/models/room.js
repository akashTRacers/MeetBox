let mongoose= require('mongoose');
console.log("room schema file");
let userSchema= mongoose.Schema({
    
    user1:{
        type:String,
        required:true
    },
    user2:{
        type:String,
        required:true
    }
});
module.exports = mongoose.model('rooms',userSchema);