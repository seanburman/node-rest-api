const express = require("express")
const User = require('../models/User')
const router = express.Router()

////////////////////////////////////////////////////////////////////////////
//Gets /////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////

//Get all users
router.get("/users", async (req, res) => {
    const users = await User.find()
    res.send(users)
})

//Get user by email
router.get("/users/:email", async (req, res) => {
    const user = await User.findOne({ email: req.params.email })
    res.send(user)
})

////////////////////////////////////////////////////////////////////////////
//Posts/////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////

//Create new user
router.post("/users/create-user", async (req, res) => {
    //Check if user exists
    const checkUser = await User.find({ email: req.body.email}).countDocuments()

    //If user exists, send message
    if(checkUser > 0) {
        res.send({ "create-user": false })
    } else {
        //Create new user
        const user = new User({
                email: req.body.email,
            })
            await user.save()
            .then(res.send(user))
            .catch(error => console.log(error))    
    }
})

router.post("/users/update-username", async (req, res) => {
    const user = await User.findOneAndUpdate(
        { email : req.body.email},
        { username: req.body.username },
        )
        await user.save()
        .then(res.send(user))
        .catch(error => console.log(error))  
})

////////////////////////////////////////////////////////////////////////////
//Deletes///////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////
//TO DO: Users should be able to delete their own account

module.exports = router