const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Post = require('./models/post');

const app = express();

// connection to MongoDB Atlas cloud server
mongoose.connect('mongodb+srv://cian:8zWDHq8iWGDyfNMz@cluster0-kbtyk.mongodb.net/contract-hub?retryWrites=true')
  .then(() => {
    console.log('Connected to DB')
  })
  .catch(() => {
    console.log('Connection Failed!')
  });

// used to parse the body of the data response for the post method
app.use(bodyParser.json());

app.use((req, res, next) => {
  // this means no matter what domain an app send the request from it allows it to access the resources
  res.setHeader('Access-Control-Allow-Origin', '*');
  // restricts to demains with a certain set of headers that are not the default headers
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
    );
  // allows the http verbs that will be used
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, DELETE, OPTIONS'
  );
  next();
});
// MongoDB password: 8zWDHq8iWGDyfNMz
// storing new contract posts in Mongo
app.post('/api/posts', (req, res, next) => {
  // instantiation of the Post model
  // imported from the constructor function exported from post.js
  const post = new Post({
    title: req.body.title,
    salary: req.body.salary,
    location: req.body.location,
    client: req.body.client,
    duration: req.body.duration,
    desc: req.body.desc
  });
  // saves the mongoose model
  post.save().then(createdPost => {
    res.status(201).json({
      message: 'post added successfully',
      postId: createdPost._id
    });
  });
});

app.get('/api/posts', (req, res, next) => {
  Post.find()
  .then(documents => {
    res.status(200).json({
      posts: documents
    });
  });
});

app.delete('/api/posts/:id', (req, res, next) => {
  Post.deleteOne({ _id: req.params.id}).then(result => {
    console.log(result);
    res.status(200).json({ message: 'Contract deleted!' });
  });
});

module.exports = app;
