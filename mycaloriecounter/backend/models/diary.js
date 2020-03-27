/**
 * @Date:   2020-02-12T11:06:09+00:00
 * @Last modified time: 2020-02-28T20:30:47+00:00
 */
 const User = require("./user");

 const mongoose = require('mongoose');
 const Schema = mongoose.Schema;

 const DiarySchema = new Schema({
   belongsto: {type: Schema.Types.ObjectId, ref: 'user'},
   diaryCode: {type: String, required: true, unique: true},
   day: {type: Date, required: true},
   submitted: {type: Boolean, required: true},
   totals:
   {type: Object,
     calories: Number,
     carbs: Number,
     proteins: Number,
     fats: Number
   },
   originalTotals:
   {type: Object,
     calories: Number,
     carbs: Number,
     proteins: Number,
     fats: Number
   },
   originalRecommendations:
   {type: Object,
     calories: Number,
     carbs: Number,
     proteins: Number,
     fats: Number
   },
   entries: [
     {type: Schema.Types.ObjectId, ref: 'Food'}
   ]

 }, {
   timestamps: true,
 });

 const Diary = mongoose.model('Diary', DiarySchema);

 module.exports = Diary;
