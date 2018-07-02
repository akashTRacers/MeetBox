const initUsers = require("./users");
const openHome= require("./openHome.js");
const getUserID=require("./openRecord.js");
const initRoutes = (app,passport) => {
    console.log("inside index.js");
    app.use('/', openHome());
    app.use('/users', initUsers(passport)); 
    app.use('/user2',getUserID());

}
module.exports = initRoutes;  
