const moogoose = require('mongoose')

const solutionSchema = new moogoose.Schema({
    solutionType:{
        type: String,
        required: [true, 'Solution field must not be empty'],
        unique: true,
    },
    createdAT: {
        type: Date,
        default: Date.now(),
        select: false
    },
    isActive: {
        type: Boolean,
        default:true,
        select: false
    }

})

const solution = moogoose.model('solution_types', solutionSchema)

module.exports = solution;