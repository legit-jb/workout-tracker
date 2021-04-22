const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const workoutSchema = new Schema({
    day: {
        type: String,
        default: () => new Date()
    },

    exercises: [
        {
            type: {
                type: String,
                trim: true,
                required: "Please specify resistance or cardio"
            },
            name: {
                type: String,
                trim: true,
                required: "Please choose an exercise name"
            },
            duration: {
                type: Number
            },
            weight: {
                type: Number
            },
            reps: {
                type: Number
            },
            duration: {
                sets: Number
            }
        },

    ]
});


const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;