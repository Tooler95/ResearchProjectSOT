/**
 * @Date:   2020-02-06T09:54:51+00:00
 * @Last modified time: 2020-02-24T16:00:06+00:00
 */



const mongoose = require('mongoose');
const User = require('./user')
const Diary = require('./diary')
const Schema = mongoose.Schema;

const FoodSchema = new mongoose.Schema({
  createdby: {type: Schema.Types.ObjectId, ref: 'user'},
  meal: {type: String, required: false},
  name: {type: String, required: true},
  calories: {type: Number, required: true},
  carbs: {type: Number, required: true},
  proteins: {type: Number, required: true},
  fats: {type: Number, required: true},
  isDuplicate: {type: Boolean, required: false}
});

const Food = mongoose.model('Food', FoodSchema);

module.exports = Food;
