require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const user = require('./routes/User')
const product = require('./routes/Product')
const PORT = process.env.PORT
const URI = process.env.URI

mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true } )
    .then(() => {
        const app = express()

        app.use((req, res, next) => {
            const allowedOrigins = ['https://www.seanburman.ca', 'http://localhost:3000'];
            const origin = req.headers.origin;
            if (allowedOrigins.includes(origin)) {
              res.setHeader('Access-Control-Allow-Origin', origin);    
            }
            res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept');
            next();
            });

        app.use(express.json())
        app.use("/api", user)
        app.use("/api", product)

        app.listen(PORT, () => {
            console.log(`Server listening on port ${PORT}...`)
        })
    })

