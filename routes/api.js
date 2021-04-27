let Workout = require("../models/workout");

module.exports = (app) => {

    app.get('/api/workouts', (req, res) => {
        Workout.aggregate([
            {
                $addFields: {
                    totalDuration: { $sum: "$exercises.duration" }

                }
            }
        ])
            .then(dbData => {
                res.json(dbData);
            })
            .catch(err => {
                res.status(400).json(err);
            });

    })

    app.put('/api/workouts/:id', (req, res) => {
        Workout.findByIdAndUpdate(req.params.id,
            {
                $push: {
                    exercises: req.body
                }
            },
            // "runValidators" will ensure new exercises meet our schema requirements
            { new: true, runValidators: true }
        )
            .then(dbData => {
                res.json(dbData);
            })
            .catch(err => {
                res.status(400).json(err);
            });
    })

    app.post('/api/workouts', (req, res) => {
        Workout.create(req.body)
            .then(dbData => {
                res.json(dbData);
            })
            .catch(err => {
                res.status(400).json(err);
            });

    })

    app.get('/api/workouts/range', (req, res) => {
        Workout.aggregate([
            {
                $addFields: {
                    totalDuration: { $sum: "$exercises.duration" },
                    totalWeight: { $sum: "$exercises.weight" },
                    totalReps: { $sum: "$exercises.reps" },
                    totalSets: { $sum: "$exercises.sets" },
                    totalDistance: { $sum: "$exercises.distance" }
                }

            }
        ])
            .then(dbData => {
                res.json(dbData);
            })
            .catch(err => {
                res.status(400).json(err);
            });
    })
};