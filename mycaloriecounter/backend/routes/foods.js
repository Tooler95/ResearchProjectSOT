/**
 * @Date:   2020-02-06T09:54:51+00:00
 * @Last modified time: 2020-02-26T13:09:03+00:00
 */



const router = require('express').Router();
const passport = require('passport');
const settings = require('../config/passport')(passport);

const getToken = (headers) => {
  if (headers && headers.authorization) {
    var parted = headers.authorization.split(' ');
    if (parted.length === 2) {
      return parted[1];
    } else {
      return null;
    }
  } else {
    return null;
  }
};

let Food = require('../models/Foods');
let Diary = require('../models/diary');
let User = require('../models/user');

router.route('/').get((req, res) => {
  Food.find()
       .then(foods => res.json(foods))
       .catch(err => res.status(400).json('Error: ' + err));
});

//For getting all the foods that belong to a particular user
router.route('/log/:id').get((req, res) => {
  const userId = req.params.id
  User.findOne({_id: userId}, (err, user) => {
    Food.find({createdby: user._id})
         .then(foods => res.json(foods))
         .catch(err => res.status(400).json('Error: ' + err));
  });
  })


router.route("/:id").get((req, res) => {
  Food.findById(req.params.id)
  .then(food => res.json(food))
  .catch(err => res.status(400).json('Error: ' + err))
});

router.route("/diary/:id").get((req, res) => {
  Food.findById(req.params.id)
  .then(food => res.json(food.entrylist))
  .catch(err => res.status(400).json('Error: ' + err))
});






router.route("/:id").post(passport.authenticate('jwt', { session: false }), (req, res) => {
  const token = getToken(req.headers);
  const food = req.body;
  if (token) {
    if (!food.createdby) {
      return res.status(400).json({
        message: "Diary Day cannot be empty"
      });
    }
    const newFood = new Food(food);

    newFood.save()
            .then(data => {
              Diary.findOne({_id: req.params.id}, (error, s) => {
                s.entries.push(newFood._id)
                s.save();
              })
              res.json(data);
            })
            .catch(err => res.status(400).json('Error: ' + err));
  } else {
    return res.status(403).json({success: false, message: 'Unauthorized.'});
  }
});

router.route("/add/:id").post(passport.authenticate('jwt', { session: false }), (req, res) => {
  const token = getToken(req.headers);
  const food = req.body;
  if (token) {
    if (!food.createdby) {
      return res.status(400).json({
        message: "Diary Day cannot be empty"
      });
    }
      Diary.findOne({_id: req.params.id}, (error, s) => {
        s.entries.push(food._id)
        s.save();
      })

  } else {
    return res.status(403).json({success: false, message: 'Unauthorized.'});
  }
});






router.route('/:id').delete( async (req, res) => { //delete a food (diary object) from the database
  const id = req.params.id;
      await Diary.findOne({_id: req.body.diary_id}, (errm, diary) => {
        diary.entries = diary.entries.filter(d => d != id);
        diary.save((err, diary) => {
        });
      });
});

router.route('/remove/:id').delete((req, res) => {
  Food.findByIdAndDelete(req.params.id)
  .then(() => res.json('Food Deleted.'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req,res) => {   //Add
  Food.findById(req.params.id)
  .then(food => {
    food.createdby = req.body.createdby;
    food.meal = req.body.meal;
    food.name = req.body.name;
    food.calories = req.body.calories;
    food.carbs = req.body.carbs;
    food.proteins = req.body.proteins;
    food.fats = req.body.fats;

    food.save().then(() => res.json('Food Succesfully Updated')).catch(err => res.status(400).json('Error: ' + err));
  })
  .catch(err => res.status(400).json('Error: ' + err));
})


















module.exports = router;
