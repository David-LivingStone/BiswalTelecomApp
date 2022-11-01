const moogoose = require('mongoose')

const classSchema = new moogoose.Schema({
    class:{
        type: String,
        required: [true, 'Class field must not be empty'],
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

const classtype = moogoose.model('classes', classSchema)

module.exports = classtype;