const mongoose = require('mongoose');


const userSchema = mongoose.Schema({
  google: {
    id: String
  },
  id: String,
  token: String,
  email: String,
  name: String,
  img: String,
  movies: []

});

module.exports = mongoose.model('User', userSchema);