const mongoose = require("mongoose")

const timeEstimationSchema = new mongoose.Schema({
    high: Number,
    low: Number,
    units: String,
})

const assignmentSchema = new mongoose.Schema({
    name: String,
    classId: Number,
    assignmentId: Number,
    timeEstimation: {
        type: timeEstimationSchema,
    },
    estimationBounds: {
        highBound: {
            type: timeEstimationSchema
        },
        lowBound: {
            type: timeEstimationSchema
        }
    }
})

module.exports = mongoose.model('assignmentSchema', assignmentSchema, 'Datasets')
