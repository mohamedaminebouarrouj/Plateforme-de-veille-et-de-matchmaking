const express= require('express');
const cors= require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app= express();
const port= process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


const uri = process.env.ATLAS_URI;

mongoose.connect(uri,{useNewUrlParser:true, useCreateIndex: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open',()=>{
    console.log("MongoDB database connection established successfully");
});

//Route
const secteursRouter = require('./Routes/secteurs');
const usersRouter = require('./Routes/users');
const domaineRouter = require('./Routes/domaines');
const challengeRouter = require('./Routes/challenges');
const startupRouter = require('./Routes/startups');
const tendanceRouter = require('./Routes/tendances');





app.use('/secteurs',secteursRouter);
app.use('/users',usersRouter);
app.use('/domaines',domaineRouter);
app.use('/challenges',challengeRouter);
app.use('/startups',startupRouter);
app.use('/tendances',tendanceRouter);



//
app.listen(port, ()=> {
    console.log(`Server is running on port: ${port}`);
    });


