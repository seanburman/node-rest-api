const express = require("express")
const Product = require('../models/Product')
const router = express.Router()

////////////////////////////////////////////////////////////////////////////
//Gets /////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////

//Get all products for all users
router.get("/products", async (req, res) => {
    try {
        let products = await Product.find()
        res.send(products)        
    } catch (error) {
        console.error(error)
    }
})

//Get product by association with user email
router.get("/products/:userEmail", async (req, res) => {
    let product = await Product.find({ userEmail: req.params.userEmail })
    res.send(product)
})

//Get product by title
router.get("/products/:title", async (req, res) => {
    let product = await Product.find({ title: req.params.title })
        .then(res.send(product))
        .catch(error => console.log(error))   
})

////////////////////////////////////////////////////////////////////////////
//Posts ////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////

//Create a product with
router.post("/products/create-product", async (req, res) => {
    //Check if product exists
    //TO DO
    //Need to match userEmail and title, may be duplicate title names
    //in products colelction
    let checkProduct = await Product.find({ title: req.body.title }).countDocuments()

    //If product exists, send message
    if(checkProduct > 0) {
        res.send({ "create-product": false })
    } else {
        //Create new product
        const product = new Product({
                userEmail: req.body.userEmail,
                title: req.body.title,
                description: req.body.description,
                price: req.body.price,
            })
            await product.save()
            .then(res.send(product))
            .catch(error => console.log(error))    
    }
})

router.post("/users/update-username", async (req, res) => {
    let user = await User.findOneAndUpdate(
        { email : req.body.email},
        { username: req.body.username },
        )
        await user.save()
        .then(res.send(user))
        .catch(error => console.log(error))  
})

////////////////////////////////////////////////////////////////////////////
//Deletes //////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////

router.delete("/products/", async (req, res) => {
        await Product.findOneAndDelete({ title: req.body.title })
        .then(res.send({"delete-product": true}))
        .catch(error => console.log(error))   
})

module.exports = router