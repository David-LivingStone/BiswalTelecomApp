const moogoose = require('mongoose')

const networkSchema = new moogoose.Schema({
    networkStatus:{
        type: String,
        required: [true, 'Network Status field must not be empty'],
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

const network = moogoose.model('network_status', networkSchema)

module.exports = network;