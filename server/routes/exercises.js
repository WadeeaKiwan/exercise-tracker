const router = require('express').Router();
const Exercise = require('../models/exercise.model');

// @route GET /exercises/
// @desc Get all Exercises
// @access Public
router.route('/').get((req, res) => {
  Exercise.find()
    .then(exercises => res.json(exercises))
    .catch(err => res.status(400).json({ Error: err }));
});

// @route POST /exercises/add
// @desc Add an exercise
// @access Public
router.route('/add').post((req, res) => {
  const { username, description } = req.body;
  const duration = Number(req.body.duration);
  const date = Date.parse(req.body.date);

  const newExercise = new Exercise({
    username,
    description,
    duration,
    date,
  });

  newExercise
    .save()
    .then(() => res.json({ msg: 'Exercise added!' }))
    .catch(err => res.status(400).json({ Error: err }));
});

// @route GET /exercises/:id
// @desc Get exercise by ID
// @access Public
router.route('/:id').get((req, res) => {
  Exercise.findById(req.params.id)
    .then(exercise => res.json(exercise))
    .catch(err => res.status(400).json({ Error: err }));
});

// @route DELETE /exercises/:id
// @desc Delete an exercise
// @access Public
router.route('/:id').delete((req, res) => {
  Exercise.findByIdAndDelete(req.params.id)
    .then(() => res.json({ msg: 'Exercise Deleted!' }))
    .catch(err => res.status(400).json({ Error: err }));
});

// @route PUT /exercises/update/:id
// @desc Update an exercise
// @access Public
router.route('/update/:id').put((req, res) => {
  const { username, description } = req.body;
  const duration = Number(req.body.duration);
  const date = Date.parse(req.body.date);

  Exercise.findById(req.params.id)
    .then(exercise => {
      exercise.username = username;
      exercise.description = description;
      exercise.duration = duration;
      exercise.date = date;

      exercise
        .save()
        .then(() => res.status(201).json({ msg: 'Exercise Updated!' }))
        .catch(err => res.status(400).json({ Error: err }));
    })
    .catch(err => res.status(400).json({ Error: err }));

  // // Build exercise object
  // const exerciseFields = {};

  // exerciseFields.username = username;
  // exerciseFields.description = description;
  // exerciseFields.duration = duration;
  // exerciseFields.date = date;

  // Exercise.findByIdAndUpdate(req.params.id, { $set: exerciseFields }, { new: true, upsert: true })
  //   .then(exercise => res.json(exercise))
  //   .catch(err => res.status(400).json({ Error: err }));
});

module.exports = router;
