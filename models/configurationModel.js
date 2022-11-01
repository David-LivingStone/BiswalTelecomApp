const moogoose = require('mongoose')

const configSchema = new moogoose.Schema({
    configuration:{
        type: String,
        required: [true, 'Configuration field must not be empty'],
        unique: true
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

const config = moogoose.model('configurations', configSchema)

module.exports = config;