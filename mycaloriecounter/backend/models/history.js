/**
 * @Date:   2020-02-12T18:11:38+00:00
 * @Last modified time: 2020-02-12T18:15:07+00:00
 */
 const mongoose = require('mongoose');
 const User = require('./user')
 const Schema = mongoose.Schema;

 const HistorySchema = new mongoose.Schema({
   createdby: {type: Schema.Types.ObjectId, ref: 'user'},
   name: {type: String, required: true},
   calories: {type: Number, required: true},
   carbs: {type: Number, required: true},
   proteins: {type: Number, required: true},
   fats: {type: Number, required: true}
 });

 const History = mongoose.model('History', HistorySchema);

 module.exports = History;
