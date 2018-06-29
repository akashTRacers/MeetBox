//const client = require('../../lib/app');
var User = require('../models/user');

class UserController{

    static showRegisterDetails(req,res){
        res.render('register');
      }
      static showLoginDetails(req,res){
        res.render('login');
      }  

      static logOutUser(req,res){
        req.logout();
        req.flash('success_msg', 'You are logged out');
        res.redirect('/users/login');
      }
      
      static insertRegisterDetails(req,res){	
        console.log("inside controllers ");
        var name = req.body.name;
        var email = req.body.email;
        var username = req.body.username;
        var password = req.body.password;
        var password2 = req.body.password2;
        console.log("<<<<<<<<<<<<<<<<<<<<<<<<<<<<");
        User.findOne({ username: { 
                "$regex": "^" + username + "\\b", "$options": "i"
                }}, function (err, user) {
                     User.findOne({ email: { "$regex": "^" + email + "\\b", "$options": "i"}}, 
                      function (err, mail) {
                        if (user || mail) {
                          res.render('register', {user: user,mail: mail});
                        }
                        else {
                          var newUser = new User({
                          name: name,
                          email: email,
                          username: username,
                          password: password });
                          User.createUser(newUser, function (err, user) {
                            if (err) throw err;
                            console.log(user);
                          });
                          req.flash('success_msg', 'You are registered and can now login');
                          res.redirect('/users/login');
                        }
                    });
                  });
                }

  static insertLoginDetails(req,res){
    console.log("insert Login Details controller*************");
    //console.log("&&&&&&&&&&&&&&&&&&&&&&&&",client);
    User.find({}, function(err, results){
      
      var arr1 = results;
	let emailHolder = arr1.map((val, i, arr1) => {
  return "http://127.0.0.1:9000/?email="+val.email;
});
for(let arr2 of emailHolder){
  console.log(arr2);
  }


      var players = results;
      const result = players.filter(player=> player.username!= req.user.username);
      //console.log(">>>>>>>>>>>>>>>>>>>",result);
      if(err)
      {
          console.log(err);
      }
      else{
         // console.log("results are",results);
          res.render('index',{user:req.user, member:result});
      } 
    })
  }
}
//Class ends here 
module.exports=UserController