const express = require("express");
const openRecordsController = require("../controllers/openRecord");
const getUserID = () => {
    console.log("inside openHome.js Routes")
    const openRouter = express.Router();
    openRouter.get('/:username', openRecordsController.getChat);
    return openRouter;
}
module.exports=getUserID;