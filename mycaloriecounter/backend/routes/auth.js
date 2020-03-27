/**
 * @Date:   2020-02-06T09:54:51+00:00
 * @Last modified time: 2020-02-27T19:35:09+00:00
 */



const passport = require('passport');
const settings = require('../config/passport')(passport);
const jwt = require('jsonwebtoken');
const router = require('express').Router();

let User = require("../models/user");
let Diary = require("../models/diary");
let Food = require("../models/Foods");

router.route('/').get((req, res) => {
  User.find()                               //get a list of all foods in the database
    .then(users => res.json(users))         //response in json format
    .catch(err => res.status(400).json('Error: ' + err));
});

router.post('/register', (req, res) => {
  const {body} = req;
  const {
    password
  } = body;
  let {
    firstname,surname,email,age,weight,goalweight,height,gender,activity,recommendations,points,gamification
  } = body;


  if(!email) {
    return res.json({
      success: false,
      message: 'Error, email can not be empty'
    });
  }
  if(!password) {
    return res.json({
      success: false,
      message: 'Error, passowrd can not be empty'
    });
  }
  email = email.toLowerCase();
  email = email.trim();

  User.find({
    email: email
  }, (err, previousUsers) => {
    if(err){
      return res.json({
        success: false,
        message: 'Error, server Error'
      });
    } else if(previousUsers.length > 0) {
      return res.json({
        success: false,
        message: 'Error: Account already exists'
      });
    }

    const newUser = new User();
    newUser.firstname = firstname;
    newUser.surname = surname;
    newUser.email = email;
    newUser.age = age;
    newUser.weight = weight;
    newUser.goalweight = goalweight;
    newUser.height = height;
    newUser.gender = gender;
    newUser.activity = activity;
    newUser.recommendations = recommendations;
    newUser.points = points;
    newUser.gamification = gamification;
    newUser.password = newUser.generateHash(password);
    newUser.save((err, user) => {
      if( err){
        return res.json({
          success: false,
          message: 'error, server error'
        });
      }
      return res.json({
        success: true,
        message: 'Account created for User'
      });
    });
  });
});

router.post('/login', function(req, res) {
  const { body } = req;
  const { password } = body;
  let { email } = body;
  if (!email) {
    return res.json({
      success: false,
      message: 'Error: Email cannot be blank.'
    });
  }
  if (!password) {
    return res.json({
      success: false,
      message: 'Error: Password cannot be blank.'
    });
  }
  email = email.toLowerCase().trim();

  User.findOne({ email }, function(err, user) {
    if (err) throw err;

    if (!user) {
      res.status(401).json({success: false, message: 'Authentication failed. User not found.'});
    } else {
      if (user.validPassword(password)) {
        let token = jwt.sign(user.toJSON(), process.env.API_SECRET);
        let name = user._id;
        res.json({success: true, token: 'JWT ' + token, id: name});
      }
      else {
        res.status(401).json({success: false, message: 'Authentication failed. Wrong Password.'});
      }
    }
  });
});










router.route('/').get((req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
})
router.route("/:id").get((req, res) => {

  const userId = req.params.id;

    User.findById(userId)
        .then(result => {
            if(!result){
                return res.status(404).json({
                        message: "User not found with id " + userId
                });
            }
            res.json(result);
        })

        .catch(err =>{
            if(err.kind === 'ObjectId') {
                return res.status(404).json({
                        message: "User not found with id " + userId
                });
            }
            return res.status(500).json({
                    message: "Error retrieving User with id " + userId
            });
        });

});



router.get('/profile', passport.authenticate('jwt', {session: false}), function(req,res){

  console.log(req.user);
  res.json({
    firstname: req.user.firstname,
    surname: req.user.surname,
    email: req.user.email,
    age: req.user.age,
    weight: req.user.weight,
    goalweight: req.user.goalweight,
    height: req.user.height,
    gender: req.user.gender,
    activity: req.user.activity,
    recommendations: req.user.recommendations,
    points: req.user.points
  })
});

router.route('/update/:id').post((req, res) => {
    User.findById(req.params.id)
      .then(user => {
        user.firstname = req.body.firstname;
        user.surname = req.body.surname;
        user.email = req.body.email;
        user.age = req.body.age;
        user.weight = req.body.weight;
        user.goalweight = req.body.goalweight;
        user.height = req.body.height;
        user.gender = req.body.gender;
        user.activity = req.body.activity;
        user.recommendations = req.body.recommendations;
user.save().then(() => res.json('User Updated!')).catch(err => res.status(400).json('Error: ' + err));

      })
      .catch(err => res.status(400).json('Error: ' + err));
})
router.route('/update/gamification/:id').post((req, res) => {
    User.findById(req.params.id)
      .then(user => {
          user.gamification = req.body.gamification
user.save().then(() => res.json('User Updated!')).catch(err => res.status(400).json('Error: ' + err));

      })
      .catch(err => res.status(400).json('Error: ' + err));
})




// passport.authenticate('jwt', { session: false }) ,
router.route('/:id').get((req, res) => {
  User.find()
    .then(user => res.json(user))
    .catch(err => res.status(400).json('Error: ' + err));
})


router.route('/add/points/:id').post((req, res) => {
  User.findById(req.params.id)
    .then(user => {
        user.points = req.body.points;
         user.save().then(() => res.json('Points Added!')).catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
})




















module.exports = router;
