const router = require('express').Router();
const User = require('../models/user.model');
const Exercise = require('../models/exercise.model');

// @route GET /users/
// @desc Get all Users
// @access Public
router.route('/').get((req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json({ Error: err }));
});

// @route POST /exercises/
// @desc Add a user
// @access Public
router.route('/add').post((req, res) => {
  const { username } = req.body;

  const newUser = new User({ username });

  newUser
    .save()
    .then(() => res.json({ msg: 'User added!' }))
    .catch(err => {
      if (err.code === 11000) {
        return res.json({ msg: `${username} already exists!` });
      }
      res.status(400).json({ Error: err });
    });
});

// @route GET /users/:id
// @desc Get the user by ID
// @access Public
router.route('/:id').get((req, res) => {
  Exercise.find({ user: req.params.id })
    .populate('user')
    .then(exercises => {
      console.log(exercises);
      res.json(exercises);
    })
    .catch(err => res.status(400).json({ Error: err }));

  // User.findOne({ _id: req.params.id })
  //   .then(user => {
  //     console.log(req.params.id);
  //     res.json(user);
  //   })
  //   .catch(err => res.status(400).json({ Error: err }));
});

// @route DELETE /users/:id
// @desc Delete The user with his/her exercises
// @access Public
router.route('/:id').delete((req, res) => {
  Exercise.deleteMany({ username: req.params.id })
    .then(() => res.json({ msg: 'Exercises Deleted!' }))
    .catch(err => res.status(400).json({ Error: err }));

  User.findOneAndDelete({ _id: req.params.id })
    .then(() => res.json({ msg: 'User Deleted!' }))
    .catch(err => res.status(400).json({ Error: err }));
});

module.exports = router;
