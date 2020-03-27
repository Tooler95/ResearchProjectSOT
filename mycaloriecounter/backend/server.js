/**
 * @Date:   2020-02-06T09:54:51+00:00
 * @Last modified time: 2020-02-28T18:43:57+00:00
 */



const express = require('express');
const body_parser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');


const app = express();

app.use(body_parser.json());
app.use(cors());


const uri = process.env.ATLAS_URI;

mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true
});

const connection = mongoose.connection;

connection.once('open', () =>{
  console.log("MongoDB database connection established successfully");
});


app.get("/", (req, res) => {
  res.json({message: "You are in the root route"});
});

const foodsRouter = require('./routes/foods');
const authRouter = require('./routes/auth');
const diaryRouter = require('./routes/diaries');
app.use('/diary', diaryRouter);
app.use('/foods', foodsRouter);
app.use('/account', authRouter);



const port = 4000;

app.listen(port, () => {
  console.log(`Server listening on ${port}`);
});
