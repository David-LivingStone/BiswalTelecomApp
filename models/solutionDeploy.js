const moogoose = require('mongoose');
const { default: mongoose } = require('mongoose');
const validator = require('validator');


const solutionDeploySchema = new moogoose.Schema({
    Deployment: {
        type: String,
        required: [true, 'Deployment Solution field must not be empty'],
        unique: true,
    },
    createdAT: {
        type: Date,
        default: Date.now(),
        select: false
    },
    updatedAt: {
        type: Date
    },
    isActive: {
        type: Boolean,
        default:true,
        select: false
    }

});

const solutionDeploy = mongoose.model('solution_Deploy', solutionDeploySchema);

module.exports = solutionDeploy;