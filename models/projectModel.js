const moogoose = require('mongoose')

const projectSchema = new moogoose.Schema({
    projectOption:{
        type: String,
        required: [true, 'Project Option field must not be empty'],
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

const project = moogoose.model('project_options', projectSchema)

module.exports = project;