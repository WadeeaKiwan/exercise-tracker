const router = require('express').Router();
const User = require('../models/user.model');

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
    .catch(err => res.status(400).json({ Error: err }));
});

module.exports = router;
