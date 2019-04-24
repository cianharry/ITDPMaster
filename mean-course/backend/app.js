const express = require('express');
const bodyParser = require('body-parser');

const app = express();

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

app.post('/api/posts', (req, res, next) => {
  const post = req.body;
  console.log(post);
  res.status(201).json({
    message: 'post added successfully'
  });
});

app.get('/api/posts', (req, res, next) => {
  const posts = [
    {
      id: "1",
      title: "Softare Eng",
      salary: "3000"
    },
    {
      id: "2",
      title: "Programmer",
      salary: "5000"
    }
  ];
  res.status(200).json({
    posts: posts
  });
});

module.exports = app;
