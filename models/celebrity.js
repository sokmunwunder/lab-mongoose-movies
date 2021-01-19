const mongoose = require('mongoose');
//const Schema = mongoose.Schema;

const celebritySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  occupation: {
    type: String,
    enum: ['actor', 'singer', 'comedian', 'unknown']
  },
  catchPhrase: {
    type: String
  }
});

const Celebrity = mongoose.model('Celebritie', celebritySchema);

module.exports = Celebrity;
