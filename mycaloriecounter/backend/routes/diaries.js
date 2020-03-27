/**
 * @Date:   2020-02-12T11:09:28+00:00
 * @Last modified time: 2020-02-27T18:15:45+00:00
 */
 const router = require('express').Router();
 const passport = require('passport');
 const settings = require('../config/passport')(passport);
 let Diary = require('../models/diary');
 let User = require('../models/user');

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

 // router.route('/post/:id').post((req, res) => {
 //
 // .catch(err => res.status(400).json('Error: ' + err));
 // });

 router.route('/').get((req, res) => {
   Diary.find()                               //get a list of all foods in the database
     .then(diaries => res.json(diaries))         //response in json format
     .catch(err => res.status(400).json('Error: ' + err));
 });

 router.route("/:id").get((req, res) => {
   Diary.findById(req.params.id)
   .then(diary => res.json(diary))
   .catch(err => res.status(400).json('Error: ' + err))
 });

 router.route("/").post(passport.authenticate('jwt', { session: false }), (req, res) => {
   const token = getToken(req.headers);
   const diary = req.body;

   if (token) {
     if (!diary.day) {
       return res.status(400).json({
         message: "Diary Day cannot be empty"
       });
     }

     const newDiary = new Diary(diary);

     newDiary.save()
             .then(data => {
               res.json(data);
             })
             .catch(err => res.status(400).json('Error: ' + err));
   } else {
     return res.status(403).json({success: false, message: 'Unauthorized.'});
   }
 });

 router.route('/:id').delete((req, res) => {
   Diary.findByIdAndDelete(req.params.id)
   .then(() => res.json('Diary Deleted.'))
   .catch(err => res.status(400).json('Error: ' + err));
 });

 router.route("/log/:id").get((req, res) => {
   const userId = req.params.id
   User.findOne({_id: userId}, (err, user) => {
     Diary.find({belongsto: user._id})
     .then(diaries => res.json(diaries))
     .catch(err => res.status(400).json('Error: ' + err));
   })
 })

 router.route("/:id/today/:date").get((req, res) => {

   const userId = req.params.id;
   const date = req.params.date;

   let day = date.substr(0,2);
   let month = date.substr(2,2);
   let year = date.substr(4,4);

   let formattedDate = `${year}-${month}-${day}T00:00:00.000Z`;

     User.findOne({_id: userId}, (err, user) => {


       Diary.find({belongsto: user._id, day: formattedDate})
            .populate('entries')
            .exec((err, diary) => {
              res.json(diary);
            });
     });
 });

 router.route('/update/:id').post((req, res) => {
     Diary.findById(req.params.id)
       .then(diary => {
         diary.belongsto = req.body.belongsto;
         diary.submitted = req.body.submitted;
         diary.createdby = req.body.createdby;
         diary.day = req.body.day;
         diary.totals = req.body.totals;
         diary.originalTotals = req.body.originalTotals;
         diary.originalRecommendations = req.body.originalRecommendations;
         diary.entries = req.body.entries;
 diary.save().then(() => res.json('Diary Submitted!')).catch(err => res.status(400).json('Error: ' + err));

       })
       .catch(err => res.status(400).json('Error: ' + err));
 })

 router.route('/update/totals/:id').post((req, res) => {
     Diary.findById(req.params.id)
       .then(diary => {
         diary.totals = req.body.totals;
 diary.save().then(() => res.json('Diary Submitted!')).catch(err => res.status(400).json('Error: ' + err));

       })
       .catch(err => res.status(400).json('Error: ' + err));
 })



 module.exports = router;
