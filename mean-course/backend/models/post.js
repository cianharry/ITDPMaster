const mongoose = require('mongoose');

// This is the blueprint not the model
const postSchema = mongoose.Schema({
  // passing Javascript object containing additional metadata
  title: { type: String, required: true },
  salary: { type: String, required: true },
  location: { type: String, required: true },
  client: { type: String, required: true },
  duration: { type: String, required: true },
  desc: { type: String, required: true }
});

module.exports= mongoose.model('Post', postSchema);
