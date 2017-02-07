const mongoose = require('mongoose');

const movieSchema = mongoose.Schema({

    id: String,
    title: String,
    url: String,
    released: {
        type: String,
        required: true
    }

});

module.exports = mongoose.model('Movie', movieSchema);