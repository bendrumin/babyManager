var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create the Schema
var personSchema = new Schema({
  name: {type: String, required: true},
  phoneNumber: {type: String, required: true},
  notes: {type: String},
  allMeds: [] // [medicationSchema]
});
// export our model
module.exports = mongoose.model('Person', personSchema);
