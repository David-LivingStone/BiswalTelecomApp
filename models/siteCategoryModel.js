const moogoose = require('mongoose')

const siteSchema = new moogoose.Schema({
    siteCategory:{
        type: String,
        required: [true, 'Site Category field must not be empty'],
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

const siteCategory = moogoose.model('site_categories', siteSchema)

module.exports = siteCategory;