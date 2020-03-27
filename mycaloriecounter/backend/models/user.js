const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  firstname: {
    type: String,
    defualt: ''
  },
  surname: {
    type: String,
    defualt: ''
  },
  email: {
    type: String,
    defualt: ''
  },
  password: {
    type: String,
    default: ''
  },
  age: {
    type: Number,
    default: ''
  },
  weight: {
    type: Number,
    default: ''
  },
  goalweight: {
    type: Number,
    default: '',
  },
  height: {
    type: Number,
    default: ''
  },
  gender: {
    type: String,
    default: ''
  },
  activity: {
    type: Number,
    default: ''
  },
  recommendations: {
    type: Object,
    calories: Number,
    carbs: Number,
    proteins: Number,
    fats: Number
  },
  points: {
    type: Object,
    calories: Number,
    carbs: Number,
    proteins: Number,
    fats: Number
  },
  gamification: {
    type: Boolean,
    default: true
  },
  isDeleted: {
    type: Boolean,
    default: false
  },
  signUpDate: {
    type: Date,
    default: Date.now()
  }
});

UserSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

UserSchema.methods.validPassword = function(password){
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('user', UserSchema);
